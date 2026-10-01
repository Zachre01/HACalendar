# Reminders API contract (card ↔ integration)

Domain: `ha_calendar_reminders`  
Card UI calls these services; the integration owns persistence and scheduling.

## Rule model

| Field | Type | Notes |
| --- | --- | --- |
| `rule_id` | string | Generated; stable across upserts for same calendar+uid |
| `calendar_entity_id` | string | e.g. `calendar.family` |
| `event_uid` | string | Backend event uid |
| `event_start` | string | ISO datetime used to compute fire time |
| `event_summary` | string | For notify title/body |
| `minutes_before` | int | 0–10080 |
| `notify_service` | string | `notify.some_target` |
| `message` | string | Optional override body |
| `enabled` | bool | When false, not scheduled |
| `last_fired` | string\|null | ISO timestamp after a successful fire attempt |

Natural key: `(calendar_entity_id, event_uid)`.

## Services

### `set_reminder` (optional response)

```yaml
action: ha_calendar_reminders.set_reminder
data:
  calendar_entity_id: calendar.family
  event_uid: abc-123
  event_start: "2026-10-02T15:00:00+00:00"
  event_summary: School pickup
  minutes_before: 30
  notify_service: notify.mobile_app_phone
  message: Leave soon
  enabled: true
```

Response: `{ "reminder": { ...rule } }`

### `clear_reminder` (optional response)

```yaml
action: ha_calendar_reminders.clear_reminder
data:
  calendar_entity_id: calendar.family
  event_uid: abc-123
# or: rule_id: <id>
```

### `get_reminder` (response only)

```yaml
action: ha_calendar_reminders.get_reminder
data:
  calendar_entity_id: calendar.family
  event_uid: abc-123
```

Response: `{ "reminder": { ... } | null }`

### `list_reminders` (response only)

Response: `{ "reminders": [ ... ] }`

## Card behavior

- Form shows a Reminder section when the integration services are present.
- On save (edit): upsert or clear based on the form toggle.
- On create: reminder is applied only if create returns/resolves an `event_uid`.
- Placeholders for notify service are OK until configured.

## Reliability (honest scope)

MVP scheduler is in-process point-in-time tracking. Do **not** treat this as
guaranteed notification delivery until tested against your notify targets and
restart scenarios.
