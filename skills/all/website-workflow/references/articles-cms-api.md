# Articles CMS API Pattern — News Portal / Blog

Complete pattern for building a **news portal** with: PHP REST API (articles CRUD) + JSON data store + dynamic frontend + admin CMS + category/region listing pages.

## Project Structure

```
/<nama-project>/
├── api/
│   └── articles.php          # REST API
├── data/
│   ├── articles.json         # Source of truth (array of articles)
│   └── backups/              # Auto-backup per change
└── public/
    ├── index.html            # Homepage (portal layout)
    ├── article.html          # Article detail page
    ├── category.html         # Category listing page
    └── region.html           # Region listing page
```

## articles.json Schema

```json
[
  {
    "id": "art_<timestamp>_<6char>",
    "title": "Judul Artikel",
    "slug": "judul-artikel-slug",
    "excerpt": "Ringkasan artikel...",
    "content": "<p>HTML content...</p>",
    "category": "Destinasi",
    "region": "Bali & Nusa",
    "tags": ["bali", "beach", "travel"],
    "image": "https://images.unsplash.com/photo-xxx?w=1200&q=80",
    "author": "Nama Author",
    "author_image": "https://images.unsplash.com/photo-xxx?w=100&q=80",
    "published_at": "2025-06-01T08:00:00+07:00",
    "updated_at": "2025-06-01T08:00:00+07:00",
    "views": 12450,
    "likes": 342,
    "read_time": 5,
    "featured": true,
    "status": "published"
  }
]
```

**Field descriptions:**
- `id` — unique ID format: `art_<timestamp>_<6char_hash>`
- `slug` — URL-safe title (auto-generated via `slugify()`)
- `excerpt` — short summary for cards/meta
- `content` — full HTML content (allow `<p>`, `<h3>`, `<ul>`, `<strong>`, etc.)
- `category` — e.g. "Destinasi", "Makanan", "Budaya", "Tips Travel", "Events", "Hotel", "Outdoor", "Nightlife"
- `region` — geographic region: "Bali & Nusa", "Jawa", "Sumatera", "Kalimantan", "Sulawesi", "Papua", "East Nusa Tenggara", "Umum"
- `tags` — array of lowercase strings
- `image` — hero image URL (Unsplash recommended — pre-verify with `curl -sI` before embedding)
- `author_image` — author avatar URL
- `featured` — boolean, featured articles show in hero + editor's pick
- `status` — "published" or "draft" (only published returned by default)
- `read_time` — estimated reading time in minutes
- `likes` — like count

## articles.php — Full CRUD API

### Routing — Critical for Subfolder APIs

When `articles.php` is in `/<project>/api/articles.php` (not at root), standard path parsing fails:

```
Request: GET /jelajah/api/articles.php/art_1748688001_a3f2b1
Path parts: ['jelajah', 'api', 'articles.php', 'art_1748688001_a3f2b1']
Problem: $parts[0] = 'jelajah' — wrong!
```

**Fix: detect article ID directly before normal route parsing:**

```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

define('DATA_DIR', __DIR__ . '/../data');
define('ARTICLES_FILE', DATA_DIR . '/articles.json');
define('BACKUP_DIR', DATA_DIR . '/backups');

if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
if (!is_dir(BACKUP_DIR)) mkdir(BACKUP_DIR, 0755, true);

// ─── Path parsing ───
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);
$parts = array_filter(explode('/', trim($path, '/')), fn($p) => $p !== '');
$parts = array_values($parts);

// SPECIAL: Direct ID access — e.g. /api/articles.php/art_xxx
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($parts[0]) && preg_match('/^art_/', $parts[0])) {
    $id = $parts[0];
    $route = '';
} else {
    $route = $parts[0] ?? '';
    $id = $parts[1] ?? null;
}
```

### Full PHP API (all endpoints)

```php
<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

define('DATA_DIR', __DIR__ . '/../data');
define('ARTICLES_FILE', DATA_DIR . '/articles.json');
define('BACKUP_DIR', DATA_DIR . '/backups');
if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
if (!is_dir(BACKUP_DIR)) mkdir(BACKUP_DIR, 0755, true);

function readArticles() { return json_decode(file_get_contents(ARTICLES_FILE), true) ?: []; }
function writeArticles($a) { file_put_contents(ARTICLES_FILE, json_encode($a, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)); }
function generateId() { return 'art_' . time() . '_' . substr(md5(uniqid()), 0, 6); }
function slugify($t) { return strtolower(preg_replace('/[^\p{L}\p{N}\s-]/u', '', preg_replace('/[\s-]+/', '-', trim($t, '-')))); }
function backup() { copy(ARTICLES_FILE, BACKUP_DIR . '/articles_' . date('Y-m-d_His') . '.json'); }
function getInput() { return json_decode(file_get_contents('php://input'), true) ?: []; }

$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);
$parts = array_filter(explode('/', trim($path, '/')), fn($p) => $p !== '');
$parts = array_values($parts);

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($parts[0]) && preg_match('/^art_/', $parts[0])) {
    $id = $parts[0]; $route = '';
} else {
    $route = $parts[0] ?? ''; $id = $parts[1] ?? null;
}
$method = $_SERVER['REQUEST_METHOD'];

// ─── GET /articles.php — List all ───
if ($method === 'GET' && ($route === '' || $route === 'articles') && !$id) {
    $articles = readArticles();

    if ($cat = $_GET['category'] ?? null) {
        $articles = array_filter($articles, fn($a) => strtolower($a['category'] ?? '') === strtolower($cat));
    }
    if ($region = $_GET['region'] ?? null) {
        $articles = array_filter($articles, fn($a) => strtolower($a['region'] ?? '') === strtolower($region));
    }
    if ($q = $_GET['q'] ?? null) {
        $q = strtolower($q);
        $articles = array_filter($articles, fn($a) => strpos(strtolower($a['title'] ?? ''), $q) !== false || strpos(strtolower($a['excerpt'] ?? ''), $q) !== false);
    }
    if (isset($_GET['featured'])) {
        $articles = array_filter($articles, fn($a) => $a['featured'] ?? false);
    }

    $articles = array_values($articles);

    if (isset($_GET['trending'])) {
        usort($articles, fn($a, $b) => ($b['views'] ?? 0) - ($a['views'] ?? 0));
        $articles = array_slice($articles, 0, 5);
        echo json_encode(['success' => true, 'data' => $articles]);
        exit;
    }

    // Pagination
    $page = max(1, intval($_GET['page'] ?? 1));
    $perPage = intval($_GET['per_page'] ?? 12);
    $total = count($articles);
    $offset = ($page - 1) * $perPage;
    $articles = array_slice($articles, $offset, $perPage);

    echo json_encode(['success' => true, 'data' => $articles, 'meta' => ['total' => $total, 'page' => $page, 'per_page' => $perPage]], JSON_UNESCAPED_UNICODE);
    exit;
}

// ─── GET /articles.php/:id — Single article ───
if ($method === 'GET' && $id && ($route === '' || $route === 'articles')) {
    $articles = readArticles();
    foreach ($articles as $i => $a) {
        if (($a['id'] ?? '') === $id || ($a['slug'] ?? '') === $id) {
            $a['views'] = ($a['views'] ?? 0) + 1;
            $articles[$i] = $a;
            writeArticles($articles);
            echo json_encode(['success' => true, 'data' => $a], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['success' => false, 'error' => 'Article not found']);
    exit;
}

// ─── GET /articles.php/categories ───
if ($method === 'GET' && $route === 'categories') {
    $articles = readArticles();
    $cats = [];
    foreach ($articles as $a) {
        $cat = $a['category'] ?? 'Umum';
        if (!isset($cats[$cat])) $cats[$cat] = ['slug' => slugify($cat), 'name' => $cat, 'count' => 0];
        $cats[$cat]['count']++;
    }
    echo json_encode(['success' => true, 'data' => array_values($cats)]);
    exit;
}

// ─── GET /articles.php/regions ───
if ($method === 'GET' && $route === 'regions') {
    $articles = readArticles();
    $regs = [];
    foreach ($articles as $a) {
        $reg = $a['region'] ?? 'Umum';
        if (!isset($regs[$reg])) $regs[$reg] = ['slug' => slugify($reg), 'name' => $reg, 'count' => 0];
        $regs[$reg]['count']++;
    }
    echo json_encode(['success' => true, 'data' => array_values($regs)]);
    exit;
}

// ─── POST — Create ───
if ($method === 'POST') {
    $input = getInput();
    if (empty($input['title']) || empty($input['content'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Title and content required']);
        exit;
    }
    $articles = readArticles();
    backup();
    $article = [
        'id' => generateId(),
        'slug' => slugify($input['title']) . '-' . substr(md5(time()), 0, 6),
        'title' => trim($input['title']),
        'excerpt' => trim($input['excerpt'] ?? substr(strip_tags($input['content']), 0, 200) . '...'),
        'content' => $input['content'],
        'category' => $input['category'] ?? 'Destinasi',
        'region' => $input['region'] ?? 'Umum',
        'tags' => $input['tags'] ?? [],
        'image' => $input['image'] ?? '',
        'author' => $input['author'] ?? 'Tim Jelajah',
        'author_image' => $input['author_image'] ?? '',
        'published_at' => date('c'),
        'updated_at' => date('c'),
        'views' => 0,
        'likes' => 0,
        'read_time' => $input['read_time'] ?? ceil(str_word_count(strip_tags($input['content'])) / 200),
        'featured' => $input['featured'] ?? false,
        'status' => $input['status'] ?? 'published'
    ];
    array_unshift($articles, $article);
    writeArticles($articles);
    echo json_encode(['success' => true, 'data' => $article]);
    exit;
}

// ─── PUT — Update ───
if ($method === 'PUT' && $id) {
    $input = getInput();
    $articles = readArticles();
    $found = false;
    foreach ($articles as $i => $a) {
        if (($a['id'] ?? '') === $id) {
            $articles[$i] = array_merge($a, [
                'title' => $input['title'] ?? $a['title'],
                'slug' => slugify($input['title'] ?? $a['title']) . '-' . substr(md5(time()), 0, 6),
                'excerpt' => $input['excerpt'] ?? $a['excerpt'],
                'content' => $input['content'] ?? $a['content'],
                'category' => $input['category'] ?? $a['category'],
                'region' => $input['region'] ?? $a['region'],
                'tags' => $input['tags'] ?? $a['tags'],
                'image' => $input['image'] ?? $a['image'],
                'author' => $input['author'] ?? $a['author'],
                'author_image' => $input['author_image'] ?? $a['author_image'],
                'updated_at' => date('c'),
                'featured' => $input['featured'] ?? $a['featured'],
                'status' => $input['status'] ?? $a['status']
            ]);
            $found = true;
            break;
        }
    }
    if (!$found) { http_response_code(404); echo json_encode(['success' => false, 'error' => 'Not found']); exit; }
    backup();
    writeArticles($articles);
    echo json_encode(['success' => true, 'data' => $articles[$i]]);
    exit;
}

// ─── DELETE ───
if ($method === 'DELETE' && $id) {
    $articles = readArticles();
    $initial = count($articles);
    $articles = array_values(array_filter($articles, fn($a) => ($a['id'] ?? '') !== $id));
    if (count($articles) < $initial) {
        backup();
        writeArticles($articles);
        echo json_encode(['success' => true, 'message' => 'Deleted']);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'error' => 'Not found']);
    }
    exit;
}

// ─── API Info (catch-all) ───
echo json_encode([
    'success' => true,
    'name' => 'Jelajah Articles API',
    'version' => '1.0',
    'endpoints' => [
        'GET  /' => 'List articles (?category=, &region=, &q=, &page=, &per_page=, &featured, &trending)',
        'GET  /:id' => 'Single article (+view count)',
        'GET  /categories' => 'All categories with counts',
        'GET  /regions' => 'All regions with counts',
        'POST /' => 'Create article',
        'PUT  /:id' => 'Update article',
        'DELETE /:id' => 'Delete article',
    ]
], JSON_UNESCAPED_UNICODE);
?>
```

## Homepage Fetch Pattern

```javascript
const API_BASE = '/<project>/api/articles.php';

async function fetchArticles(params = '') {
    const res = await fetch(API_BASE + params);
    const json = await res.json();
    return json.data || [];
}

async function init() {
    const articles = await fetchArticles('?per_page=50');

    // Hero — first featured article
    const featured = articles.find(a => a.featured) || articles[0];
    if (featured) {
        document.querySelector('.hero-badge').textContent = featured.category;
        document.querySelector('.hero-main-overlay h1').textContent = featured.title;
        document.querySelector('.hero-main img').src = featured.image;
    }

    // Category pills — filter client-side
    document.querySelectorAll('.cat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const cat = pill.textContent.trim();
            const filtered = cat === 'Semua' ? articles : articles.filter(a => a.category === cat);
            renderGrid(filtered.slice(0, 8));
        });
    });

    // Region cards — navigate to region page (NOT client-side filter)
    document.querySelectorAll('.destinasi-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const region = card.dataset.region;
            window.location.href = '/<project>/public/region.html?name=' + encodeURIComponent(region);
        });
    });

    // Search
    document.querySelector('.search-box input').addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const q = e.target.value.trim();
            if (q) {
                const results = await fetchArticles('?q=' + encodeURIComponent(q) + '&per_page=20');
                renderGrid(results.slice(0, 8));
                document.querySelector('.articles-section').scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}
```

## Article Detail Page

URL: `/project/public/article.html?id=art_xxx`

```javascript
async function fetchArticle(id) {
    const res = await fetch(API_BASE + '/' + id);
    const json = await res.json();
    return Array.isArray(json.data) ? json.data[0] : json.data;
}

async function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) { window.location.href = '/<project>/'; return; }

    const article = await fetchArticle(id);
    if (!article) { document.body.innerHTML = '<p>Article not found</p>'; return; }

    document.title = article.title + ' — Jelajah';
    document.querySelector('.article-category').textContent = article.category;
    document.querySelector('.article-title').textContent = article.title;
    document.querySelector('.article-cover img').src = article.image;
    document.querySelector('.article-body').innerHTML = article.content;

    // Tags
    document.querySelector('.article-tags').innerHTML = (article.tags || [])
        .map(t => `<span class="tag">#${t}</span>`).join('');

    // Related articles
    const all = await fetchArticles('?per_page=50');
    const related = all.filter(a => a.id !== id &&
        (a.category === article.category || a.region === article.region)).slice(0, 4);
    // render related...
}
```

## Category & Region Pages

URLs:
- `/project/public/category.html?name=Destinasi`
- `/project/public/region.html?name=Bali%20%26%20Nusa`

**Category page features:**
- Hero banner: category name + description + article count
- Sticky tab bar: all categories from `/categories` API
- Article grid with pagination (12 per page)
- Sort select: Terbaru / Terpopuler / Terlama
- Empty state when no articles

**Region page features:**
- Full-width hero image (pre-defined per region) + overlay with region name
- Sticky tab bar: all regions from `/regions` API
- Article grid filtered by region
- Region description + article count + categories in region
- Same pagination + sort as category page

**Region images map (pre-verify all with `curl -sI`):**
```javascript
const regionImages = {
    'Bali & Nusa': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1400&q=80',
    'Jawa': 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1400&q=80',
    'Papua': 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&q=80',
    'Umum': 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1400&q=80',
};
```

## Data Seeding

Generate 15-20 realistic articles covering all planned categories. Each article:
- Realistic Indonesian destination/food/culture content
- Unsplash image URL — **always pre-verify with `curl -sI` before embedding**
- Realistic author names (vary them across articles)
- Varied view counts (100–20,000 range)
- 2-3 `featured: true` articles for homepage hero
- Publish dates spread over past 2 weeks
- All categories and all regions covered

## Common Pitfalls

1. **article.html 404** — If public folder is `/project/public/`, article URLs must be `/project/public/article.html` (NOT `/project/article.html`). Update ALL href links AND the `filterByRegion()` JS redirect accordingly.
2. **PHP routing — ID detection** — Always add `preg_match('/^art_/', $parts[0])` check BEFORE normal route parsing, otherwise `GET /api/articles.php/art_xxx` returns the API info catch-all instead of the article.
3. **JSON array at root** — Articles data is `[]`, NOT `{ "articles": [] }`. Use `array_filter`, `usort`, `array_slice` directly on the array.
4. **Image fallback** — Always add `onerror="this.src='fallback.jpg'"` to `<img>` tags. Unsplash URLs can fail.
5. **Pre-verify Unsplash IDs** — Use `curl -sI` before embedding in seed data. Store verified IDs, don't assume arbitrary IDs work.
6. **Category/Region page empty state** — Always handle `pageArticles.length === 0` with friendly empty state UI (icon + message), not blank screen.
7. **Region filter → dedicated page** — Homepage `filterByRegion()` must redirect to `region.html?name=...`, NOT do client-side filter. This enables URL sharing and bookmarking.
8. **API response for single article** — The `fetchArticle()` JS function must handle `json.data` being either a single object or an array (some API implementations return `[{...}]`). Always check: `Array.isArray(json.data) ? json.data[0] : json.data`.
