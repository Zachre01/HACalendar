"""Service handlers for HA Calendar Reminders."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv

from .const import (
    ATTR_CALENDAR_ENTITY_ID,
    ATTR_ENABLED,
    ATTR_EVENT_START,
    ATTR_EVENT_SUMMARY,
    ATTR_EVENT_UID,
    ATTR_MESSAGE,
    ATTR_MINUTES_BEFORE,
    ATTR_NOTIFY_SERVICE,
    ATTR_RULE_ID,
    DATA_SCHEDULER,
    DATA_STORE,
    DEFAULT_MINUTES_BEFORE,
    DOMAIN,
)
from .models import ReminderRule

_LOGGER = logging.getLogger(__name__)

SERVICE_SET = "set_reminder"
SERVICE_CLEAR = "clear_reminder"
SERVICE_GET = "get_reminder"
SERVICE_LIST = "list_reminders"

SET_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CALENDAR_ENTITY_ID): cv.entity_id,
        vol.Required(ATTR_EVENT_UID): cv.string,
        vol.Required(ATTR_EVENT_START): cv.string,
        vol.Optional(ATTR_EVENT_SUMMARY, default=""): cv.string,
        vol.Optional(ATTR_MINUTES_BEFORE, default=DEFAULT_MINUTES_BEFORE): vol.All(
            vol.Coerce(int), vol.Range(min=0, max=10080)
        ),
        vol.Required(ATTR_NOTIFY_SERVICE): cv.string,
        vol.Optional(ATTR_MESSAGE, default=""): cv.string,
        vol.Optional(ATTR_ENABLED, default=True): cv.boolean,
    }
)

CLEAR_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_RULE_ID): cv.string,
        vol.Optional(ATTR_CALENDAR_ENTITY_ID): cv.entity_id,
        vol.Optional(ATTR_EVENT_UID): cv.string,
    }
)

GET_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_CALENDAR_ENTITY_ID): cv.entity_id,
        vol.Required(ATTR_EVENT_UID): cv.string,
    }
)


@callback
def async_register_services(hass: HomeAssistant) -> None:
    """Register domain services once."""
    if hass.services.has_service(DOMAIN, SERVICE_SET):
        return

    async def async_set_reminder(call: ServiceCall) -> dict[str, Any]:
        store = hass.data[DOMAIN][DATA_STORE]
        scheduler = hass.data[DOMAIN][DATA_SCHEDULER]
        data = call.data
        rule = ReminderRule.new(
            calendar_entity_id=data[ATTR_CALENDAR_ENTITY_ID],
            event_uid=data[ATTR_EVENT_UID],
            event_start=data[ATTR_EVENT_START],
            event_summary=data.get(ATTR_EVENT_SUMMARY, ""),
            minutes_before=data.get(ATTR_MINUTES_BEFORE, DEFAULT_MINUTES_BEFORE),
            notify_service=data[ATTR_NOTIFY_SERVICE],
            message=data.get(ATTR_MESSAGE, ""),
            enabled=data.get(ATTR_ENABLED, True),
        )
        saved = await store.async_upsert(rule)
        scheduler.schedule_rule(saved)
        return {"reminder": saved.to_dict()}

    async def async_clear_reminder(call: ServiceCall) -> dict[str, Any]:
        store = hass.data[DOMAIN][DATA_STORE]
        scheduler = hass.data[DOMAIN][DATA_SCHEDULER]
        rule_id = call.data.get(ATTR_RULE_ID)
        cal = call.data.get(ATTR_CALENDAR_ENTITY_ID)
        uid = call.data.get(ATTR_EVENT_UID)
        if not rule_id and not (cal and uid):
            raise ServiceValidationError(
                "Provide rule_id or both calendar_entity_id and event_uid"
            )
        existing = (
            store.get(rule_id)
            if rule_id
            else store.find(cal, uid)  # type: ignore[arg-type]
        )
        if existing:
            scheduler.unschedule(existing.rule_id)
        deleted = await store.async_delete(
            rule_id=rule_id, calendar_entity_id=cal, event_uid=uid
        )
        return {"cleared": deleted}

    async def async_get_reminder(call: ServiceCall) -> dict[str, Any]:
        store = hass.data[DOMAIN][DATA_STORE]
        rule = store.find(
            call.data[ATTR_CALENDAR_ENTITY_ID], call.data[ATTR_EVENT_UID]
        )
        return {"reminder": rule.to_dict() if rule else None}

    async def async_list_reminders(call: ServiceCall) -> dict[str, Any]:
        store = hass.data[DOMAIN][DATA_STORE]
        return {"reminders": [r.to_dict() for r in store.list_rules()]}

    hass.services.async_register(
        DOMAIN,
        SERVICE_SET,
        async_set_reminder,
        schema=SET_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_CLEAR,
        async_clear_reminder,
        schema=CLEAR_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_GET,
        async_get_reminder,
        schema=GET_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_LIST,
        async_list_reminders,
        supports_response=SupportsResponse.ONLY,
    )
