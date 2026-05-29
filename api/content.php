<?php
/**
 * Furnicraft API - Content Management
 * GET = read content.json
 * POST = update content.json (with backup)
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Path setup
$base_dir = dirname(__DIR__);
$json_file = $base_dir . '/data/content.json';
$backup_dir = $base_dir . '/data/backups';

// Ensure backup dir exists
if (!is_dir($backup_dir)) {
    mkdir($backup_dir, 0755, true);
}

// GET — return content
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($json_file)) {
        http_response_code(404);
        echo json_encode(['error' => 'Content file not found']);
        exit;
    }
    echo file_get_contents($json_file);
    exit;
}

// POST — update content
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON: ' . json_last_error_msg()]);
        exit;
    }
    
    // Create backup
    $timestamp = date('Y-m-d_His');
    $backup_file = $backup_dir . '/content_' . $timestamp . '.json';
    copy($json_file, $backup_file);
    
    // Save new content
    $result = file_put_contents($json_file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to write file']);
        exit;
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Content updated',
        'backup' => basename($backup_file),
        'size' => $result
    ]);
    exit;
}

// PUT — partial update (update specific section)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $input = file_get_contents('php://input');
    $update = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }
    
    // Get current content
    $current = json_decode(file_get_contents($json_file), true);
    
    // Merge update into current
    $updated = array_merge($current, $update);
    
    // Backup
    $timestamp = date('Y-m-d_His');
    $backup_file = $backup_dir . '/content_' . $timestamp . '.json';
    copy($json_file, $backup_file);
    
    // Save
    file_put_contents($json_file, json_encode($updated, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    
    echo json_encode([
        'success' => true,
        'message' => 'Content partially updated',
        'backup' => basename($backup_file)
    ]);
    exit;
}

// DELETE — restore from backup
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $backup_file = $_GET['backup'] ?? '';
    $backup_path = $backup_dir . '/' . $backup_file;
    
    if (empty($backup_file) || !file_exists($backup_path)) {
        http_response_code(404);
        echo json_encode(['error' => 'Backup file not found']);
        exit;
    }
    
    copy($backup_path, $json_file);
    echo json_encode([
        'success' => true,
        'message' => 'Restored from backup: ' . $backup_file
    ]);
    exit;
}

// Method not allowed
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);