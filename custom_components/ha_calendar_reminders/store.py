"""Persistent storage for reminder rules."""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION
from .models import ReminderRule

_LOGGER = logging.getLogger(__name__)


class ReminderStore:
    """JSON Store backed reminder rule collection."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._rules: dict[str, ReminderRule] = {}

    async def async_load(self) -> None:
        """Load rules from disk."""
        data = await self._store.async_load()
        self._rules = {}
        if not data:
            return
        for raw in data.get("items", []):
            try:
                rule = ReminderRule.from_dict(raw)
            except (KeyError, TypeError, ValueError) as err:
                _LOGGER.warning("Skipping invalid reminder rule: %s", err)
                continue
            self._rules[rule.rule_id] = rule
        _LOGGER.debug("Loaded %s reminder rules", len(self._rules))

    async def async_save(self) -> None:
        """Persist rules."""
        await self._store.async_save(
            {"items": [rule.to_dict() for rule in self._rules.values()]}
        )

    def list_rules(self) -> list[ReminderRule]:
        """Return all rules."""
        return list(self._rules.values())

    def get(self, rule_id: str) -> ReminderRule | None:
        """Get by rule id."""
        return self._rules.get(rule_id)

    def find(self, calendar_entity_id: str, event_uid: str) -> ReminderRule | None:
        """Find by calendar + event uid."""
        for rule in self._rules.values():
            if (
                rule.calendar_entity_id == calendar_entity_id
                and rule.event_uid == event_uid
            ):
                return rule
        return None

    async def async_upsert(self, rule: ReminderRule) -> ReminderRule:
        """Insert or replace a rule for the same calendar+uid."""
        existing = self.find(rule.calendar_entity_id, rule.event_uid)
        if existing:
            rule.rule_id = existing.rule_id
            # Preserve last_fired unless re-enabled with new start
            if rule.last_fired is None:
                rule.last_fired = existing.last_fired
        self._rules[rule.rule_id] = rule
        await self.async_save()
        return rule

    async def async_delete(
        self, *, rule_id: str | None = None, calendar_entity_id: str | None = None, event_uid: str | None = None
    ) -> bool:
        """Delete by rule_id or calendar+uid."""
        target: ReminderRule | None = None
        if rule_id:
            target = self._rules.get(rule_id)
        elif calendar_entity_id and event_uid:
            target = self.find(calendar_entity_id, event_uid)
        if not target:
            return False
        del self._rules[target.rule_id]
        await self.async_save()
        return True

    async def async_mark_fired(self, rule_id: str, when_iso: str) -> None:
        """Record last fire time."""
        rule = self._rules.get(rule_id)
        if not rule:
            return
        rule.last_fired = when_iso
        await self.async_save()
