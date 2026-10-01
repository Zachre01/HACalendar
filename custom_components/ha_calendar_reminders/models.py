"""Reminder rule model and helpers."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from datetime import datetime, timedelta
from typing import Any
from uuid import uuid4

from homeassistant.util import dt as dt_util


@dataclass
class ReminderRule:
    """A per-event reminder rule owned by this integration."""

    rule_id: str
    calendar_entity_id: str
    event_uid: str
    event_start: str  # ISO datetime
    event_summary: str
    minutes_before: int
    notify_service: str  # e.g. notify.mobile_app_phone
    message: str
    enabled: bool = True
    last_fired: str | None = None

    @staticmethod
    def new(
        *,
        calendar_entity_id: str,
        event_uid: str,
        event_start: str,
        event_summary: str,
        minutes_before: int,
        notify_service: str,
        message: str = "",
        enabled: bool = True,
    ) -> ReminderRule:
        """Create a new rule with a generated id."""
        return ReminderRule(
            rule_id=uuid4().hex,
            calendar_entity_id=calendar_entity_id,
            event_uid=event_uid,
            event_start=event_start,
            event_summary=event_summary,
            minutes_before=minutes_before,
            notify_service=notify_service,
            message=message,
            enabled=enabled,
        )

    def to_dict(self) -> dict[str, Any]:
        """Serialize for Store."""
        return asdict(self)

    @staticmethod
    def from_dict(data: dict[str, Any]) -> ReminderRule:
        """Deserialize from Store."""
        return ReminderRule(
            rule_id=str(data["rule_id"]),
            calendar_entity_id=str(data["calendar_entity_id"]),
            event_uid=str(data["event_uid"]),
            event_start=str(data["event_start"]),
            event_summary=str(data.get("event_summary") or ""),
            minutes_before=int(data.get("minutes_before") or 30),
            notify_service=str(data.get("notify_service") or ""),
            message=str(data.get("message") or ""),
            enabled=bool(data.get("enabled", True)),
            last_fired=data.get("last_fired"),
        )

    def key(self) -> tuple[str, str]:
        """Natural key: calendar + event uid."""
        return (self.calendar_entity_id, self.event_uid)

    def fire_at(self) -> datetime | None:
        """When this reminder should fire, or None if unparsable/disabled."""
        if not self.enabled:
            return None
        start = dt_util.parse_datetime(self.event_start)
        if start is None:
            # date-only
            try:
                start = datetime.fromisoformat(self.event_start)
            except ValueError:
                return None
        if start.tzinfo is None:
            start = start.replace(tzinfo=dt_util.DEFAULT_TIME_ZONE)
        return start - timedelta(minutes=self.minutes_before)

    def notify_payload(self) -> dict[str, Any]:
        """Build notify service data (best-effort; backends differ)."""
        title = self.event_summary or "Calendar reminder"
        body = self.message.strip() or (
            f"{self.event_summary} starts in {self.minutes_before} minutes"
            if self.event_summary
            else f"Event reminder ({self.minutes_before} min before)"
        )
        return {"title": title, "message": body}


def split_notify_service(service: str) -> tuple[str, str]:
    """Split 'notify.foo' into ('notify', 'foo')."""
    if "." in service:
        domain, name = service.split(".", 1)
        return domain, name
    return "notify", service
