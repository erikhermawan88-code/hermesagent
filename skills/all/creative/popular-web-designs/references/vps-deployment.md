# Website Development & VPS Deployment Reference

Project-agnostic guide for building premium websites and deploying to VPS.

---

## Stack Choices

### Frontend (choose one per project)
| Stack | When to use |
|-------|------------|
| **Next.js + TailwindCSS + Framer Motion** | Full React app, SSR/SSG, premium animations |
| **Vite + TailwindCSS** | Simpler SPA, fast dev, good animations via CSS/GSAP |
| **HTML + TailwindCSS CDN** | Quick landing pages, prototypes, single-file delivery |

### Backend (if needed)
| Stack | When to use |
|-------|------------|
| **Next.js API routes** | Lightweight API, no separate server needed |
| **Node.js + Express** | Standalone API, webhooks, background jobs |
| **Supabase** | Auth, database, storage — fast to ship |

---

## Required VPS Access Info

Before starting deployment, user MUST provide:
```
- VPS IP address
- SSH username (usually 'root' or a sudo user)
- SSH password OR SSH private key
- Domain name (if pointing to VPS)
```

---

## Deployment Checklist

### Step 1: Set up VPS
```bash
# Update system
apt update && apt upgrade -y

# Install Nginx
apt install nginx -y

# Install Node.js (if using Next.js)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y
node -v  # confirm

# Install PM2 (process manager)
npm install -g pm2

# Install Certbot for SSL
apt install certbot python3-certbot-nginx -y
```

### Step 2: Configure Nginx
```bash
# Create nginx config
nano /etc/nginx/sites-available/default
```

Typical config for Next.js:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 3: SSL Certificate
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
# Follow prompts, choose redirect HTTP to HTTPS
```

### Step 4: Deploy Application
```bash
# Clone repo or upload files
git clone https://github.com/user/repo.git /var/www/app
cd /var/www/app

# Install dependencies
npm install

# Build (for Next.js)
npm run build

# Start with PM2
pm2 start npm --name "app" -- start
# Or: pm2 start npm --name "app" -- run start:prod

# Save PM2 process list
pm2 save

# Auto-start on reboot
pm2 startup
```

### Step 5: DNS & Domain
User must point domain DNS to VPS IP:
- A record: `@` → VPS IP
- A record: `www` → VPS IP

### Step 6: Verify
```bash
# Check Nginx status
systemctl status nginx

# Check PM2 status
pm2 status

# Test SSL
curl -I https://yourdomain.com
```

---

## File Structure Convention (on VPS)

```
/var/www/
  └── app/
      ├── src/          # Next.js src folder (if using)
      ├── public/        # Static assets
      ├── package.json
      ├── next.config.js
      └── ...config files

/etc/nginx/
  └── sites-available/
      └── default       # Main nginx config
  └── sites-enabled/
      └── default       # Symlink

/var/log/nginx/
  └── access.log
  └── error.log
```

---

## Troubleshooting VPS Issues

### Nginx 502 Bad Gateway
- Check if app is running: `pm2 status`
- Check app logs: `pm2 logs app`
- Verify proxy_pass port matches app port

### SSL Certificate Issues
- Check domain DNS propagated: `dig yourdomain.com`
- Try standalone certbot: `certbot certonly --standalone -d yourdomain.com`

### Nginx won't restart
- Test config first: `nginx -t`
- Check logs: `tail -20 /var/log/nginx/error.log`

### Permission denied (Node_modules/npm)
```bash
chown -R $USER:$USER /var/www/app
chmod -R 755 /var/www/app
```

---

## Quick Commands Reference

```bash
# Restart app + nginx
pm2 restart app && systemctl restart nginx

# View live logs
pm2 logs app --lines 50

# Check port usage
lsof -i :3000
netstat -tlnp | grep :80

# Free port
pm2 delete app && pkill -f "node"
```