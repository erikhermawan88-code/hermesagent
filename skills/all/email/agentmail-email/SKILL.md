---
name: agentmail-email
description: AgentMail API for sending and receiving emails programmatically - create inboxes, send messages, manage threads, and automate email workflows.
tags: [email, api, automation, agentmail]
version: 1.0.0
created: 2026-05-27
---

# AgentMail Email API

## Setup

API Key already configured in memory: `am_us_f0fd830e05954179a246bcc41be46fbda9785dcb9689a431ffb1d5b3796caba3`

## Create Inbox

```bash
curl -X POST https://api.agentmail.to/inboxes \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "client_id": "unique-id-v1" }'
```

Response:
```json
{
  "inbox_id": "courageousbody104@agentmail.to",
  "email": "courageousbody104@agentmail.to",
  "organization_id": "..."
}
```

## Send Email

```bash
curl -X POST https://api.agentmail.to/inboxes/<inbox_id>/messages/send \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "recipient@example.com",
    "subject": "Subject here",
    "text": "Plain text body",
    "html": "<div>HTML body</div>"
  }'
```

## List Messages in Inbox

```bash
curl -X GET https://api.agentmail.to/inboxes/<inbox_id>/messages \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"
```

## Reply to Message

```bash
curl -X POST https://api.agentmail.to/inboxes/<inbox_id>/messages/reply \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message_id": "<original_message_id>",
    "text": "Reply text here"
  }'
```

## Labels

Labels manage email state and workflow. Common labels: `inbox`, `sent`, `archived`, `lead`, `customer`, `urgent`.

## Use Cases

1. **Auto-reply agent**: When customer emails, agent auto-responds with product info
2. **Lead follow-up**: Agent sends follow-up sequence to leads
3. **Order confirmation**: Agent sends confirmation emails after purchases
4. **Notification agent**: Agent sends notifications to users when events happen

## Notes

- OTP verification required for full access (6-digit code sent to email)
- Maximum 50 recipients per send (to + cc + bcc combined)
- Webhooks available for real-time inbound email processing
- Docs: https://docs.agentmail.to/llms.txt

## Common Workflows

### Inbox Setup for a New Client
1. Create inbox: `POST /inboxes` with `client_id` (e.g. "company-name-v1")
2. Response gives `inbox_id` and `email` address for that inbox
3. Use that email as the sender/from address in `messages/send`

### Send Transactional Email
```bash
curl -X POST https://api.agentmail.to/inboxes/<inbox_id>/messages/send \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "customer@example.com",
    "subject": "Order Confirmation - PT. Aulian Kurnia Berkah",
    "text": "Terima kasih atas pesanan Anda...",
    "html": "<div>Terima kasih...</div>"
  }'
```

### Receive and Process Inbound
```bash
# List messages in inbox
curl -X GET https://api.agentmail.to/inboxes/<inbox_id>/messages \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY"

# Reply to thread
curl -X POST https://api.agentmail.to/inboxes/<inbox_id>/messages/reply \
  -H "Authorization: Bearer $AGENTMAIL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message_id": "<0100019e673328e7-...>",
    "text": "Thank you for reaching us..."
  }'
```

## Pitfalls

- **Missing Bearer token**: All API calls require `Authorization: Bearer <key>`. Without it: `9106 Missing X-Auth-Email header` style errors.
- **Wrong inbox_id format**: Use full email address like `courageousbody104@agentmail.to`, not just the slug.
- **Message ID format**: Message IDs come as `<...@email.amazonses.com>` — include the angle brackets when replying.
- **HTTPS outbound blocked**: If VPS blocks HTTPS outbound, AgentMail API calls from that VPS will fail. Call from a machine with unrestricted internet.