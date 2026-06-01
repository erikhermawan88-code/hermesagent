# VPS Server Reference

## Contabo VPS — Known Servers

| Domain | IP | Notes |
|--------|-----|-------|
| digitalnusa.com | (existing) | Main hosting |
| carakapm.com | 109.123.232.85 | Same Contabo VPS. PT Caraka Perdana Megah — Geologix Software distributor |

## carakapm.com Details

- **IP:** 109.123.232.85
- **Server:** Apache/2
- **Document root:** Unknown (likely /var/www/carakapm.com or similar)
- **SSH:** Port 2222 (connection closed — may need different port or credentials)
- **Access:** FTP/SFTP or DirectAdmin credentials needed for file editing

## DirectAdmin Session Cookie Issue

DirectAdmin sessions expire and IP gets blacklisted after failed login attempts. When blacklisted:
1. Re-login via browser first
2. Then API calls will work again
