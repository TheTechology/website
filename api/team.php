<?php
/**
 * ADN Cars · Team API
 * GET  → returnează echipa curentă (public)
 * POST → salvează echipa (necesită sesiune admin cu rol 'admin')
 */
require_once __DIR__ . '/config.php';

ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.gc_maxlifetime', ADN_SESSION_LIFETIME);
session_name('adn_admin');
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$file = ADN_DATA_DIR . '/team.json';

// ── GET: public ─────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file)) {
        header('Cache-Control: public, max-age=60');
        echo file_get_contents($file);
    } else {
        echo '[]';
    }
    exit;
}

// ── POST: doar admin ────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodă nepermisă.']);
    exit;
}

if (empty($_SESSION['adn_user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Autentificare necesară.']);
    exit;
}

if ($_SESSION['adn_role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Acces interzis. Necesită rol Administrator.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Format invalid.']);
    exit;
}

if (!is_dir(ADN_DATA_DIR)) {
    mkdir(ADN_DATA_DIR, 0755, true);
}

$tmp = $file . '.tmp';
if (file_put_contents($tmp, $raw, LOCK_EX) !== false) {
    rename($tmp, $file);
    echo json_encode(['ok' => true, 'saved' => count($data)]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Eroare la scriere. Verifică permisiunile data/.']);
}
