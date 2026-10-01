"""Config flow for HA Calendar Reminders."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResult
from homeassistant.helpers import selector

from .const import CONF_DEFAULT_MINUTES, CONF_DEFAULT_NOTIFY, DEFAULT_MINUTES_BEFORE, DOMAIN


async def _async_validate(
    hass: HomeAssistant, user_input: dict[str, Any]
) -> dict[str, str]:
    """Validate user input; return error map."""
    errors: dict[str, str] = {}
    notify = user_input.get(CONF_DEFAULT_NOTIFY, "")
    if notify and "." not in notify:
        errors[CONF_DEFAULT_NOTIFY] = "invalid_notify"
    return errors


class HaCalendarRemindersConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for HA Calendar Reminders."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Single-instance setup with optional defaults for the card."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        errors: dict[str, str] = {}
        if user_input is not None:
            errors = await _async_validate(self.hass, user_input)
            if not errors:
                return self.async_create_entry(
                    title="HA Calendar Reminders",
                    data={
                        CONF_DEFAULT_NOTIFY: user_input.get(CONF_DEFAULT_NOTIFY, ""),
                        CONF_DEFAULT_MINUTES: user_input.get(
                            CONF_DEFAULT_MINUTES, DEFAULT_MINUTES_BEFORE
                        ),
                    },
                )

        schema = vol.Schema(
            {
                vol.Optional(CONF_DEFAULT_NOTIFY, default=""): selector.TextSelector(),
                vol.Optional(
                    CONF_DEFAULT_MINUTES, default=DEFAULT_MINUTES_BEFORE
                ): selector.NumberSelector(
                    selector.NumberSelectorConfig(
                        min=0,
                        max=10080,
                        mode=selector.NumberSelectorMode.BOX,
                        unit_of_measurement="min",
                    )
                ),
            }
        )
        return self.async_show_form(
            step_id="user", data_schema=schema, errors=errors
        )
