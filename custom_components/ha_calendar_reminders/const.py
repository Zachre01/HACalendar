"""Constants for HA Calendar Reminders."""

from __future__ import annotations

DOMAIN = "ha_calendar_reminders"
STORAGE_KEY = f"{DOMAIN}.rules"
STORAGE_VERSION = 1

CONF_DEFAULT_NOTIFY = "default_notify_service"
CONF_DEFAULT_MINUTES = "default_minutes_before"

ATTR_CALENDAR_ENTITY_ID = "calendar_entity_id"
ATTR_EVENT_UID = "event_uid"
ATTR_EVENT_START = "event_start"
ATTR_EVENT_SUMMARY = "event_summary"
ATTR_MINUTES_BEFORE = "minutes_before"
ATTR_NOTIFY_SERVICE = "notify_service"
ATTR_MESSAGE = "message"
ATTR_ENABLED = "enabled"
ATTR_RULE_ID = "rule_id"

DEFAULT_MINUTES_BEFORE = 30

DATA_STORE = "store"
DATA_SCHEDULER = "scheduler"
