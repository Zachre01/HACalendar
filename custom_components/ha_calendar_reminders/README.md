"""HA Calendar Reminders — custom Home Assistant integration.

Companion to the `ha-calendar-card` Lovelace card. The card is the UI;
this integration owns reminder rule storage and best-effort notify firing.

## Install

1. Copy `custom_components/ha_calendar_reminders/` into your HA
   `config/custom_components/ha_calendar_reminders/`.
2. Restart Home Assistant.
3. **Settings → Devices & services → Add integration → HA Calendar Reminders**
4. Optionally set a default `notify.*` service and minutes-before.

## Services (card contract)

| Service | Purpose |
| --- | --- |
| `ha_calendar_reminders.set_reminder` | Upsert rule for `calendar_entity_id` + `event_uid` |
| `ha_calendar_reminders.clear_reminder` | Delete by `rule_id` or calendar+uid |
| `ha_calendar_reminders.get_reminder` | Response-only fetch for one event |
| `ha_calendar_reminders.list_reminders` | Response-only list all rules |

See repository `docs/reminders-api.md` for field details.

## Honesty

Firing uses `async_track_point_in_utc_time` + `notify` service calls.
Delivery is **best-effort** and not claimed reliable across all notify
backends, HA restarts mid-window, or offline devices until you validate
on your stack.
