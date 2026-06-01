# VPS Tunnel Alternatives (Troubleshooting Path)

## What to try when you need public URL for local server

### STEP 1: Check if port is already open first!

```bash
# Test if port is accessible from outside
curl -s -I http://<VPS_IP>:<PORT>

# If this returns HTTP/1.0 200 — port is already open, skip tunnel entirely
# Just run: python3 -m http.server <PORT>
```

### Tunnel services tested (2026-05-27, Contabo Singapore VPS 109.123.232.85):

| Service | URL | Port | Status |
|---------|-----|------|--------|
| bore.pub | bore.pub:PORT | any | ❌ Connection refused |
| localhost.run | localhost.run:443 | 443 | ❌ Connection refused (SSH port 22 blocked outbound) |
| pagekite.net | pagekite.net | 443 | ❌ wget failed (SSL cert issue) |
| **Direct VPS port** | 109.123.232.85:8080 | 8080 | ✅ WORKING |

### SSH Tunnel via outbound SSH (if VPS SSH is accessible from where you run):

```bash
# Method: reverse tunnel through VPS SSH
ssh -o StrictHostKeyChecking=no \
    -R 443:localhost:8080 \
    -p 22 \
    user@vps-host

# Note: requires VPS SSH port 22 to be reachable from YOUR machine, not the other way around
# This FAILS if outbound SSH to VPS is blocked (common in cloud environments)
```

### Cloudflare Tunnel (Argo Tunnel) — recommended for production:

```bash
# Install cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 \
  -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# Quick tunnel (no account needed for basic)
cloudflared tunnel --url http://localhost:8080

# Output: gives you a *.trycloudflare.com URL
```

### Serveo (alternative to localhost.run):

```bash
ssh -o StrictHostKeyChecking=no -R 80:localhost:8080 serveo.net
# Gives: https://your-site.serveo.net
```

### Ngrok (free tier):

```bash
# Install
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
# Download from https://ngrok.com/download

# Run
./ngrok http 8080
# Output: https://abc123.ngrok.io
```

### VPS as jump host (if direct port works):

If `curl -s -I http://109.123.232.85:8080` returns 200:
→ Just run `python3 -m http.server 8080` on VPS
→ No tunnel needed — port is already accessible
→ Point domain DNS A record to VPS IP

### Firewall checklist on VPS:

```bash
# Check UFW
sudo ufw status

# Check iptables rules
sudo iptables -L -n | grep 8080

# Allow port if needed
sudo ufw allow 8080/tcp

# Check if nginx/apache is binding
sudo netstat -tlnp | grep 8080
```

## Lesson (2026-05-27)

> Always test direct port access BEFORE trying tunnel services.  
> Tunnel services fail when outbound SSH (port 22) is blocked by the network.  
> bore.pub and localhost.run both failed for this reason.  
> Direct port 8080 access worked — saved 30 minutes of tunnel debugging.
