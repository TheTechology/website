<?php
/**
 * ADN Cars · Auth API
 * GET    → verifică sesiunea activă → {ok, name, role}
 * POST   → autentificare {user, pass} → {ok, name, role}
 * DELETE → logout → {ok}
 */
require_once __DIR__ . '/config.php';

ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);   // necesită HTTPS
ini_set('session.cookie_samesite', 'Strict');
ini_set('session.gc_maxlifetime', ADN_SESSION_LIFETIME);
session_name('adn_admin');
session_start();

header('Content-Type: application/json; charset=utf-8');
// Permite request-uri de pe același domeniu (și localhost pentru dev)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === 'https://' . ADN_DOMAIN || str_starts_with($origin, 'http://localhost') || str_starts_with($origin, 'http://127.0.0.1')) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── GET: verifică sesiunea ──────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!empty($_SESSION['adn_user'])) {
        echo json_encode([
            'ok'   => true,
            'name' => $_SESSION['adn_name'],
            'role' => $_SESSION['adn_role'],
            'user' => $_SESSION['adn_user'],
        ]);
    } else {
        echo json_encode(['ok' => false]);
    }
    exit;
}

// ── DELETE: logout ──────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    session_destroy();
    echo json_encode(['ok' => true]);
    exit;
}

// ── POST: login ─────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodă nepermisă.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$user = strtolower(trim((string)($data['user'] ?? '')));
$pass = (string)($data['pass'] ?? '');

$admins = ADN_ADMINS;
if (!$user || !$pass || !isset($admins[$user]) || $admins[$user]['pass'] !== $pass) {
    // Mică întârziere anti-brute-force
    usleep(300000);
    http_response_code(401);
    echo json_encode(['error' => 'Utilizator sau parolă incorectă.']);
    exit;
}

$acc = $admins[$user];
$_SESSION['adn_user'] = $user;
$_SESSION['adn_name'] = $acc['name'];
$_SESSION['adn_role'] = $acc['role'];

echo json_encode([
    'ok'   => true,
    'name' => $acc['name'],
    'role' => $acc['role'],
]);
