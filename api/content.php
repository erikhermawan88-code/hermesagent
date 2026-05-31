<?php
/**
 * Jelajah — Content API
 * Handles all CRUD operations for destinations, articles, social posts, video scripts
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data_file = __DIR__ . '/../data/content.json';
$backups_dir = __DIR__ . '/../data/backups';

// Helper: read JSON
function read_data($file) {
    if (!file_exists($file)) return [];
    $content = file_get_contents($file);
    return json_decode($content, true) ?: [];
}

// Helper: write JSON with backup
function write_data($file, $data, $backups_dir) {
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    // Auto-backup before write
    if (file_exists($file)) {
        $backup_file = $backups_dir . '/backup_' . date('Ymd_His') . '.json';
        copy($file, $backup_file);
        // Keep only last 10 backups
        $backups = glob($backups_dir . '/backup_*.json');
        if (count($backups) > 10) {
            array_map('unlink', array_slice($backups, 0, count($backups) - 10));
        }
    }
    file_put_contents($file, $json);
    return $json;
}

// Helper: get nested value
function get_in($arr, $keys, $default = null) {
    foreach ($keys as $k) {
        if (!isset($arr[$k])) return $default;
        $arr = $arr[$k];
    }
    return $arr;
}

// Helper: set nested value
function set_in(&$arr, $keys, $value) {
    $ref = &$arr;
    foreach ($keys as $k) {
        if (!isset($ref[$k])) $ref[$k] = [];
        $ref = &$ref[$k];
    }
    $ref = $value;
}

// Parse request
$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);
$parts = array_filter(explode('/', trim($path, '/')), fn($p) => $p !== '');

// If path was /folder/api/content.php, parts[0] is folder name 'jelajah'
// Skip it and any 'api' prefix to get to the resource
$parts = array_values($parts);
// If first part is not 'api', it's the folder — shift it out
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

// Route: GET /api/content.php
if ($_SERVER['REQUEST_METHOD'] === 'GET' && ($resource === 'content' || empty($resource))) {
    $data = read_data($data_file);
    echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit;
}

// Route: GET /api/content.php?resource=destinations
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = read_data($data_file);
    $resource_key = $resource === 'content' ? ($_GET['resource'] ?? 'info') : $resource;
    
    if (isset($data[$resource_key])) {
        echo json_encode($data[$resource_key], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(['error' => "Resource '$resource_key' not found", 'available' => array_keys($data)]);
    }
    exit;
}

// Route: POST /api/content.php?resource=destinations
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $data = read_data($data_file);
    $resource_key = $_GET['resource'] ?? $resource;
    
    if (!isset($data[$resource_key])) {
        $data[$resource_key] = [];
    }
    
    if (!is_array($data[$resource_key])) {
        $data[$resource_key] = [];
    }
    
    // Auto-generate ID if not provided
    if (!isset($input['id']) || empty($input['id'])) {
        $id = strtolower(str_replace(' ', '-', $input['name'] ?? uniqid('item_')));
        $input['id'] = $id;
    }
    
    // Add timestamps
    $input['created_at'] = $input['created_at'] ?? date('Y-m-d H:i:s');
    $input['updated_at'] = date('Y-m-d H:i:s');
    
    // Check for duplicate ID
    $exists = false;
    foreach ($data[$resource_key] as $i => $item) {
        if ($item['id'] === $input['id']) {
            $data[$resource_key][$i] = array_merge($item, $input);
            $exists = true;
            break;
        }
    }
    
    if (!$exists) {
        $data[$resource_key][] = $input;
    }
    
    // Update stats if applicable
    if ($resource_key === 'destinations') {
        $data['stats']['destinations_tracked'] = count($data['destinations']);
    }
    
    write_data($data_file, $data, $backups_dir);
    echo json_encode(['success' => true, 'id' => $input['id'], 'data' => $input]);
    exit;
}

// Route: PUT /api/content.php?resource=destinations&id=xxx
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $data = read_data($data_file);
    $resource_key = $_GET['resource'] ?? $resource;
    $item_id = $_GET['id'] ?? null;
    
    if (!$item_id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID required for PUT']);
        exit;
    }
    
    $found = false;
    foreach ($data[$resource_key] as $i => $item) {
        if ($item['id'] === $item_id) {
            $input['id'] = $item_id;
            $input['updated_at'] = date('Y-m-d H:i:s');
            $data[$resource_key][$i] = array_merge($item, $input);
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        http_response_code(404);
        echo json_encode(['error' => "Item '$item_id' not found in '$resource_key'"]);
        exit;
    }
    
    write_data($data_file, $data, $backups_dir);
    echo json_encode(['success' => true, 'data' => $data[$resource_key][$i]]);
    exit;
}

// Route: DELETE /api/content.php?resource=destinations&id=xxx
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = read_data($data_file);
    $resource_key = $_GET['resource'] ?? $resource;
    $item_id = $_GET['id'] ?? null;
    
    if (!$item_id) {
        http_response_code(400);
        echo json_encode(['error' => 'ID required for DELETE']);
        exit;
    }
    
    $found = false;
    foreach ($data[$resource_key] as $i => $item) {
        if ($item['id'] === $item_id) {
            array_splice($data[$resource_key], $i, 1);
            $found = true;
            break;
        }
    }
    
    if (!$found) {
        http_response_code(404);
        echo json_encode(['error' => "Item '$item_id' not found"]);
        exit;
    }
    
    write_data($data_file, $data, $backups_dir);
    echo json_encode(['success' => true, 'deleted' => $item_id]);
    exit;
}

// Fallback
http_response_code(404);
echo json_encode(['error' => 'Endpoint not found', 'hint' => 'Use GET /api/content.php or POST /api/content.php?resource=<type>']);
