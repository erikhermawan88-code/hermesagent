# FTP Upload — vsftpd Setup (2026-05-27)

## When to Use
When proftpd/pure-ftpd isn't available and DirectAdmin's FTP file manager returns 502 errors on write operations, vsftpd + a virtual FTP user bypasses the broken DirectAdmin infrastructure entirely.

## Setup Steps

### Step 1: Install vsftpd
```bash
yum install -y vsftpd  # or apt-get install vsftpd on Debian/Ubuntu
```

### Step 2: Create FTP user and directory structure
```bash
useradd -d /home/retrodayaenginering -s /bin/bash retroftp
echo "retroftp:FTPPass456" | chpasswd
chown -R retroftp:retroftp /var/www/retrodaya   # writable document root
mkdir -p /home/retrodayaenginering/domains
ln -s /var/www/retrodaya /home/retrodayaenginering/domains/retrodayaengineering.com
```

### Step 3: vsftpd Config (PAM disabled for fresh install)
```ini
listen=YES
listen_port=21
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
dirmessage_enable=YES
xferlog_enable=YES
connect_from_port_20=YES
pam_service_name=NO          # CRITICAL: bypass PAM on fresh servers
pasv_enable=YES
pasv_min_port=40000
pasv_max_port=40100
userlist_enable=NO
```

### Step 4: Start vsftpd
```bash
vsftpd /etc/vsftpd/vsftpd.conf &
# Verify:
netstat -tlnp | grep 21
ps aux | grep vsftpd | grep -v grep
```

### Step 5: FTP Upload in Python
```python
import ftplib, os

ftp = ftplib.FTP('127.0.0.1')
ftp.login('retroftp', 'FTPPass456')
ftp.cwd('domains/retrodayaengineering.com')
ftp.voidcmd('TYPE I')  # CRITICAL: force binary mode

local_dir = '/tmp/retrodaya_extract'
for item in os.listdir(local_dir):
    path = os.path.join(local_dir, item)
    if os.path.isfile(path):
        with open(path, 'rb') as f:
            ftp.storbinary(f'STOR {item}', f)
        print(f"Uploaded: {item}")
    elif os.path.isdir(path):
        try: ftp.mkd(item)
        except: pass
        # recurse...
```

### Step 6: Verify Upload
```python
# Check file sizes after upload
for item in os.listdir(local_dir):
    size = os.path.getsize(os.path.join(local_dir, item))
    print(f"  {item}: {size} bytes local")

# Remote verify:
print(ftp.retrlines('LIST'))
```

## Common Issues

### Login failing after user creation (530 Login incorrect)
- Symptom: PAM service name is valid but user can't authenticate
- Fix: Set `pam_service_name=NO` in vsftpd.conf to bypass PAM entirely
- Add `/sbin/nologin` to `/etc/shells` if not present

### All files uploaded as 0 bytes
- Cause: ftplib defaulted to ASCII mode
- Fix: Always call `ftp.voidcmd('TYPE I')` before `storbinary()` to force binary mode
- ASCII mode silently converts `\n` → `\r\n` on Windows or `\r` on some servers → 0-byte files

### Passive mode connection hanging
- Symptom: `lftp` or `ftp` client hangs on LIST after login
- Test active mode: `ftp -A 127.0.0.1` or in Python: `ftp.set_pasv(False)`
- Ensure PASV ports are open: `iptables -L -n` should show ACCEPT on 40000-40100

### All files are 0 bytes on server (recovered from local zip)
- Cause: Local source files in `/var/www/retrodaya/` were already 0 bytes (coredit bug earlier)
- Fix: Extract from zip (`unzip -d /tmp/extract *.zip`) to get real file content before uploading
- Always `ls -la` local files before uploading to catch this early
