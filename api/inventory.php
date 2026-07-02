<?php
/**
 * ADN Cars · Inventory API
 * GET  → returnează inventarul curent (public, fără autentificare)
 * POST → salvează inventarul (necesită sesiune admin activă)
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

$file = ADN_DATA_DIR . '/inventory.json';

// ── GET: public ─────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($file)) {
        // Cache scurt (30s) — public pages primesc date proaspete
        header('Cache-Control: public, max-age=30');
        echo file_get_contents($file);
    } else {
        echo '[]';
    }
    exit;
}

// ── POST: protejat ──────────────────────────────────────────────
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

$raw = file_get_contents('php://input');
if (!$raw) {
    http_response_code(400);
    echo json_encode(['error' => 'Body gol.']);
    exit;
}

$data = json_decode($raw);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Format invalid. Se așteaptă array JSON.']);
    exit;
}

// Creează directorul dacă nu există
if (!is_dir(ADN_DATA_DIR)) {
    mkdir(ADN_DATA_DIR, 0755, true);
}

// Scriere atomică: scrie în .tmp, apoi rename
$tmp = $file . '.tmp';
if (file_put_contents($tmp, $raw, LOCK_EX) !== false) {
    rename($tmp, $file);
    echo json_encode(['ok' => true, 'saved' => count($data)]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Eroare la scriere. Verifică permisiunile folderului data/ (trebuie 755).']);
}
