"""HA Calendar Reminders integration.

Owns per-event reminder rules and best-effort notify firing.
The Lovelace card remains the UI and calls domain services.
"""

from __future__ import annotations

import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import DATA_SCHEDULER, DATA_STORE, DOMAIN
from .scheduler import ReminderScheduler
from .services import async_register_services
from .store import ReminderStore

_LOGGER = logging.getLogger(__name__)

PLATFORMS: list[Platform] = []


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up from YAML is unused; config entries only."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up HA Calendar Reminders from a config entry."""
    store = ReminderStore(hass)
    await store.async_load()
    scheduler = ReminderScheduler(hass, store)
    await scheduler.async_reschedule_all()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][DATA_STORE] = store
    hass.data[DOMAIN][DATA_SCHEDULER] = scheduler
    hass.data[DOMAIN]["entry"] = entry

    async_register_services(hass)

    _LOGGER.info(
        "HA Calendar Reminders ready (%s rules loaded). "
        "Notify delivery is best-effort until validated on your backends.",
        len(store.list_rules()),
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    data = hass.data.get(DOMAIN, {})
    scheduler: ReminderScheduler | None = data.get(DATA_SCHEDULER)
    if scheduler:
        scheduler.async_clear()

    # Services stay registered for domain lifetime; safe on single entry.
    hass.data.pop(DOMAIN, None)
    return True
