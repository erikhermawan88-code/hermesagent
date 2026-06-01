# PHP API Subfolder Routing Fix

When `content.php` lives in a subfolder like `/jelajah/api/content.php` (not at root), the standard path parsing fails because the folder name gets included in the parts array.

## The Bug

Request: `GET /jelajah/api/content.php`

Standard parsing:
```php
$parts = explode('/', trim($path, '/'));  // ['jelajah', 'api', 'content.php']
$resource = $parts[0];                    // 'jelajah' — WRONG!
```

Result: `Resource 'jelajah' not found`

## The Fix

Strip the folder prefix first, then handle `api` + `.php` filename:

```php
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);
$parts = array_filter(explode('/', trim($path, '/')), fn($p) => $p !== '');
$parts = array_values($parts);

// If first part is not 'api', it's the folder name — shift it out
if (isset($parts[0]) && $parts[0] !== 'api') {
    array_shift($parts);
}
// Now parts[0] should be 'api' — shift it
if (isset($parts[0]) && $parts[0] === 'api') {
    array_shift($parts);
}
// parts[0] should now be 'content.php' or empty
if (empty($parts) || (isset($parts[0]) && strpos($parts[0], '.php') !== false)) {
    $resource = 'content';
} else {
    $resource = $parts[0] ?? 'content';
}
```

## Alternative Fix (simpler)

Use `$_GET['resource']` as the primary signal, ignore path parsing for subfolder:

```php
$resource = $_GET['resource'] ?? 'content';
// Default route returns full content.json
if ($resource === 'content' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    echo file_get_contents(__DIR__ . '/../data/content.json');
    exit;
}
```

Then: `GET /jelajah/api/content.php` → returns all data
Then: `GET /jelajah/api/content.php?resource=destinations` → returns destinations

This sidesteps the path parsing issue entirely.
