"""Schedule and fire reminder notifications.

Best-effort: uses async_track_point_in_utc_time and notify services.
Not a guarantee of delivery across restarts/backends — scope is honest MVP.
"""

from __future__ import annotations

import logging
from datetime import datetime
from typing import TYPE_CHECKING

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.event import async_track_point_in_utc_time
from homeassistant.util import dt as dt_util

from .models import ReminderRule, split_notify_service

if TYPE_CHECKING:
    from .store import ReminderStore

_LOGGER = logging.getLogger(__name__)


class ReminderScheduler:
    """Track point-in-time callbacks for reminder rules."""

    def __init__(self, hass: HomeAssistant, store: ReminderStore) -> None:
        self.hass = hass
        self.store = store
        self._unsubs: dict[str, CALLBACK_TYPE] = {}

    async def async_reschedule_all(self) -> None:
        """Clear and reschedule every enabled future reminder."""
        self.async_clear()
        for rule in self.store.list_rules():
            self._schedule(rule)

    def async_clear(self) -> None:
        """Cancel all timers."""
        for unsub in self._unsubs.values():
            unsub()
        self._unsubs.clear()

    def schedule_rule(self, rule: ReminderRule) -> None:
        """(Re)schedule a single rule."""
        self.unschedule(rule.rule_id)
        self._schedule(rule)

    def unschedule(self, rule_id: str) -> None:
        """Cancel one rule's timer."""
        unsub = self._unsubs.pop(rule_id, None)
        if unsub:
            unsub()

    def _schedule(self, rule: ReminderRule) -> None:
        fire_at = rule.fire_at()
        if fire_at is None:
            return
        now = dt_util.utcnow()
        fire_utc = dt_util.as_utc(fire_at)
        if fire_utc <= now:
            _LOGGER.debug(
                "Reminder %s fire time %s is in the past; not scheduling",
                rule.rule_id,
                fire_utc,
            )
            return

        @callback
        def _fire(now_dt: datetime) -> None:
            self.hass.async_create_task(self._async_fire(rule.rule_id))

        self._unsubs[rule.rule_id] = async_track_point_in_utc_time(
            self.hass, _fire, fire_utc
        )
        _LOGGER.debug(
            "Scheduled reminder %s at %s via %s",
            rule.rule_id,
            fire_utc.isoformat(),
            rule.notify_service,
        )

    async def _async_fire(self, rule_id: str) -> None:
        self._unsubs.pop(rule_id, None)
        rule = self.store.get(rule_id)
        if not rule or not rule.enabled:
            return

        domain, service = split_notify_service(rule.notify_service)
        payload = rule.notify_payload()
        try:
            await self.hass.services.async_call(
                domain, service, payload, blocking=True
            )
            await self.store.async_mark_fired(
                rule_id, dt_util.utcnow().isoformat()
            )
            _LOGGER.info(
                "Fired reminder %s for %s/%s via %s.%s",
                rule_id,
                rule.calendar_entity_id,
                rule.event_uid,
                domain,
                service,
            )
        except Exception:  # noqa: BLE001 — surface failure without killing loop
            _LOGGER.exception(
                "Failed to fire reminder %s via %s.%s — delivery not guaranteed",
                rule_id,
                domain,
                service,
            )
