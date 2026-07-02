<?php
/**
 * ADN Cars · Image Upload API
 * POST multipart/form-data cu câmpul "file"
 * → returnează {ok, url} sau {error}
 */
require_once __DIR__ . '/config.php';

ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.gc_maxlifetime', ADN_SESSION_LIFETIME);
session_name('adn_admin');
session_start();

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === 'https://' . ADN_DOMAIN || str_starts_with($origin, 'http://localhost') || str_starts_with($origin, 'http://127.0.0.1')) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (empty($_SESSION['adn_user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Autentificare necesară.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodă nepermisă.']);
    exit;
}

if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errCode = $_FILES['file']['error'] ?? -1;
    http_response_code(400);
    echo json_encode(['error' => 'Upload eșuat (cod ' . $errCode . '). Max 10MB.']);
    exit;
}

$f = $_FILES['file'];
$maxSize = 10 * 1024 * 1024; // 10 MB

if ($f['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'Fișier prea mare. Maximum 10 MB.']);
    exit;
}

// Verifică tipul MIME din conținutul fișierului (nu din header-ul browserului)
$finfo    = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($f['tmp_name']);
$allowed  = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/avif' => 'avif', 'image/gif' => 'gif'];

if (!isset($allowed[$mimeType])) {
    http_response_code(400);
    echo json_encode(['error' => 'Tip neacceptat (' . $mimeType . '). Acceptăm: JPG, PNG, WebP, AVIF.']);
    exit;
}

$ext      = $allowed[$mimeType];
$filename = 'car-' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$destDir  = ADN_UPLOADS_DIR;

if (!is_dir($destDir)) {
    mkdir($destDir, 0755, true);
}

$dest = $destDir . '/' . $filename;

if (!move_uploaded_file($f['tmp_name'], $dest)) {
    http_response_code(500);
    echo json_encode(['error' => 'Eroare la salvare pe server. Verifică permisiunile folderului uploads/ (755).']);
    exit;
}

$url = 'https://' . ADN_DOMAIN . '/uploads/' . $filename;
echo json_encode(['ok' => true, 'url' => $url]);
