# GitHub Push — hermesagent repo

## Token extraction from ~/.git-credentials

File format: `https://erikhermawan88-code:***@github.com`

```bash
# Extract token from ~/.git-credentials
TOKEN=$(grep github.com ~/.git-credentials | sed 's|.*erikhermawan88-code:||' | sed 's|@github.com||')
echo "$TOKEN"
```

## Remote setup for existing repo (hermesagent)

```bash
cd /home/admin/domains/digitalnusa.com/public_html/<project>/
git init
git config user.name "Erik Hermawan"
git config user.email "erik@digitalnusa.com"
git remote add origin "https://erikhermawan88-code:${TOKEN}@github.com/erikhermawan88-code/hermesagent.git"
git add -A
git commit -m "Add <project> website"
git push -u origin master --force
```

Key points:
- `--force` required because hermesagent remote already has commits
- hermesagent repo lives at: `https://github.com/erikhermawan88-code/hermesagent`
- Repo also has: furnicraft, roti-bakar-88, hermes, adminator_temp