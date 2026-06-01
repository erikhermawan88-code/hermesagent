# Flask MVP Build Reference — Common Patterns & Pitfalls

## Verified Working Flask App Pattern

### 1. app.py factory export

```python
# app.py — use factory + remember to call it
def create_app():
    app = Flask(__name__)
    # ... config, blueprints, db init ...
    return app

app = create_app()  # ← gunicorn needs this
```

**gunicorn invocation (correct):**
```bash
gunicorn -w 2 -b 0.0.0.0:5000 --chdir /path/to/project 'app:create_app()'
```

**gunicorn invocation (WRONG — worker exits with code 4):**
```bash
gunicorn -w 2 -b 0.0.0.0:5000 app:app   # ← fails if app.py uses factory
```

Exit code 4 = "App failed to load" — almost always an import error or wrong factory reference.

---

### 2. Flask-Login User model requirements

**Every User model MUST have these 4 properties:**

```python
from flask_login import UserMixin

class User(UserMixin, db.Model):
    # ... columns ...
    
    # Flask-Login required:
    @property
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id  # must return string
```

Without these, login/register returns 500 and `AttributeError: 'User' object has no attribute 'is_active'`.

---

### 3. Flask url_for() with Blueprints

```python
# Inside blueprint 'dashboard_bp' registered as 'dashboard'
return redirect(url_for('dashboard'))          # ← WRONG: 404
return redirect(url_for('dashboard.index'))   # ← CORRECT
return redirect(url_for('auth.login'))        # ← OK: default view works for simple blueprints
```

General rule: `url_for('blueprint_name')` → 404. Use `url_for('blueprint_name.view_name')`.

---

### 4. Session cookie domain issue

When testing login + dashboard in curl, use cookie jar:
```bash
curl -c /tmp/session.txt -X POST -d "email=...&password=..." http://localhost:5000/auth/login
curl -b /tmp/session.txt http://localhost:5000/dashboard/
```

Without `-c` / `-b`, the session cookie is not sent → always redirects to login.

---

### 5. Blueprint register pattern (app.py)

```python
def create_app():
    app = Flask(__name__)
    
    from routes.auth_routes import auth_bp
    from routes.dashboard_routes import dashboard_bp
    from routes.api_routes import api_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(api_bp)
    
    return app
```

Each blueprint file must have URL prefix in its constructor:
```python
# In routes/dashboard_routes.py
dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/dashboard')
```

---

### 6. Common form handling

Flask `request.form` — always `.get()` with defaults:
```python
name = request.form.get('name', '').strip()
email = request.form.get('email')
if not name or not email:
    flash('required field', 'error')
    return render_template('form.html')
```

Flask `request.files`:
```python
file = request.files.get('photo')
if file and file.filename:
    filename =secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
```

---

### 7. venv + uv pattern (no system pip)

```bash
cd /project
uv venv .venv
uv pip install --python .venv/bin/python3 flask flask-sqlalchemy flask-login pillow qrcode gunicorn
.venv/bin/python3 app.py  # dev
.venv/bin/gunicorn -w 2 -b 0.0.0.0:5000 'app:create_app()'  # prod
```

Never rely on system `pip` — use `uv pip install --python /path/to/.venv/bin/python3`.

---

## Quick Verification Checklist (after build)

```bash
# 1. Syntax check
.venv/bin/python3 -m py_compile app.py models.py routes/*.py

# 2. Import check
.venv/bin/python3 -c "from app import create_app; app = create_app(); print('OK')"

# 3. Routes respond
for route in "/" "/auth/login" "/auth/register" "/api/health"; do
  curl -so /dev/null -w "%{http_code} $route\n" http://localhost:5000$route
done

# 4. Register flow
curl -X POST -d "email=...&password=...&store_name=...&wa_number=..." \
  -H "Content-Type: application/x-www" \
  http://localhost:5000/auth/register | grep "Location:"

# 5. Login + auth check
curl -c /tmp/s.txt -X POST -d "email=test@example.com&password=test1234" \
  http://localhost:5000/auth/login | grep "Location:"
curl -b /tmp/s.txt http://localhost:5000/dashboard/ | grep "<title>"
```
