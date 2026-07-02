<?php
/**
 * ADN Cars · Backend PHP minimalist pentru formularul de contact + programare
 *
 * UPLOAD: pune acest fișier pe hosting la calea: /public_html/api/contact.php
 * URL public: https://adncars.ro/api/contact.php
 *
 * CONFIGURARE: editează config.js din rădăcina site-ului ca să folosească acest URL
 * în loc de Formspree:
 *   contactFormEndpoint: '/api/contact.php',
 *   bookingFormEndpoint: '/api/contact.php',
 *
 * INSTALARE PE CPANEL:
 * 1. Login cPanel → File Manager → public_html
 * 2. Creează folder "api" (drepturi 755)
 * 3. Upload acest fișier înăuntru, redenumește la "contact.php" dacă e nevoie
 * 4. Editează valorile CONFIG de mai jos cu email-ul tău real
 * 5. Testează cu formularul de contact de pe site
 */

// =========================================================
// CONFIG — edit these values
// =========================================================
$CONFIG = [
    'receiver_email'  => 'salut@adncars.ro',   // unde primești notificările
    'from_email'      => 'noreply@adncars.ro', // email-ul de la care apare trimisul (trebuie să existe pe domeniu)
    'reply_to_user'   => true,                 // răspunzi direct la email-ul clientului când dai reply
    'log_to_file'     => true,                 // salvează submission-urile în /api/logs/contact.log
    'rate_limit'      => 5,                    // submission-uri / oră / IP
    'cors_origin'     => 'https://adncars.ro', // restrictionează la domeniul tău
    'recaptcha_secret' => '',                  // optional: cheie Google reCAPTCHA v3 (dacă activezi anti-spam)
];

// =========================================================
// CORS + Method check
// =========================================================
header('Access-Control-Allow-Origin: ' . $CONFIG['cors_origin']);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// =========================================================
// Rate limiting (file-based, simple)
// =========================================================
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/adncars_rl_' . md5($ip);
$now = time();
$attempts = file_exists($rateFile) ? json_decode(file_get_contents($rateFile), true) : [];
$attempts = array_filter($attempts, fn($t) => $t > $now - 3600);
if (count($attempts) >= $CONFIG['rate_limit']) {
    http_response_code(429);
    echo json_encode(['error' => 'Prea multe încercări. Te rugăm să încerci mai târziu.']);
    exit;
}
$attempts[] = $now;
file_put_contents($rateFile, json_encode($attempts));

// =========================================================
// Parse + validate input
// =========================================================
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Date invalide.']);
    exit;
}

// Anti-spam honeypot (dacă vine populat înseamnă bot)
if (!empty($data['website'])) {
    // Tăcut: returnăm succes ca să nu știe botul că a fost detectat
    echo json_encode(['ok' => true]);
    exit;
}

// Sanitize
$nume    = trim($data['nume'] ?? $data['name'] ?? '');
$email   = trim($data['email'] ?? '');
$telefon = trim($data['telefon'] ?? $data['phone'] ?? '');
$interes = trim($data['interes'] ?? $data['interest'] ?? '');
$masina  = trim($data['masina'] ?? $data['car'] ?? '');
$mesaj   = trim($data['mesaj'] ?? $data['message'] ?? $data['note'] ?? '');
$tip     = trim($data['tip'] ?? 'CONTACT'); // CONTACT | PROGRAMARE

// Programare-specific
$consultant = trim($data['consultant'] ?? '');
$dataProg   = trim($data['data'] ?? '');
$ora        = trim($data['ora'] ?? '');
$unde       = trim($data['unde'] ?? '');
$subiect    = trim($data['subiect'] ?? '');

if (!$nume || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Numele și emailul sunt obligatorii. Verifică emailul.']);
    exit;
}

// =========================================================
// Compose email
// =========================================================
$subjectPrefix = $tip === 'PROGRAMARE' ? '[ADN · PROGRAMARE]' : '[ADN · CONTACT]';
$subject = $subjectPrefix . ' ' . $nume . ($masina ? ' — ' . $masina : '');

$bodyLines = [
    "═══════════════════════════════════════",
    "  ADN Cars · " . ($tip === 'PROGRAMARE' ? 'Programare nouă' : 'Contact nou'),
    "═══════════════════════════════════════",
    "",
    "DATE CLIENT",
    "  Nume:    $nume",
    "  Email:   $email",
    "  Telefon: " . ($telefon ?: '—'),
    "",
];

if ($tip === 'PROGRAMARE') {
    $bodyLines = array_merge($bodyLines, [
        "PROGRAMARE",
        "  Consultant: " . ($consultant ?: '—'),
        "  Data:       " . ($dataProg ?: '—'),
        "  Ora:        " . ($ora ?: '—'),
        "  Locație:    " . ($unde ?: '—'),
        "  Subiect:    " . ($subiect ?: '—'),
        "  Mașina:     " . ($masina ?: '—'),
        "",
    ]);
} else {
    $bodyLines = array_merge($bodyLines, [
        "DETALII CERERE",
        "  Tip interes: " . ($interes ?: '—'),
        "  Mașina:      " . ($masina ?: '—'),
        "",
    ]);
}

$bodyLines[] = "MESAJ";
$bodyLines[] = $mesaj ?: '—';
$bodyLines[] = "";
$bodyLines[] = "───────────────────────────────────────";
$bodyLines[] = "Primit pe: " . date('Y-m-d H:i:s');
$bodyLines[] = "IP: " . $ip;
$bodyLines[] = "User-Agent: " . substr($_SERVER['HTTP_USER_AGENT'] ?? '—', 0, 200);

$body = implode("\n", $bodyLines);

$headers = [
    'From: ADN Cars <' . $CONFIG['from_email'] . '>',
    'Content-Type: text/plain; charset=utf-8',
    'X-Mailer: ADN-Cars-API/1.0',
];
if ($CONFIG['reply_to_user']) $headers[] = 'Reply-To: ' . $email;

// =========================================================
// Send
// =========================================================
$sent = @mail($CONFIG['receiver_email'], '=?utf-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

// =========================================================
// Log
// =========================================================
if ($CONFIG['log_to_file']) {
    $logDir = __DIR__ . '/logs';
    if (!is_dir($logDir)) @mkdir($logDir, 0755);
    $logLine = sprintf("[%s] %s | %s | %s | %s | sent=%s\n",
        date('Y-m-d H:i:s'), $tip, $nume, $email, ($masina ?: '-'), $sent ? 'yes' : 'no');
    @file_put_contents($logDir . '/contact.log', $logLine, FILE_APPEND | LOCK_EX);
}

if (!$sent) {
    http_response_code(500);
    echo json_encode(['error' => 'Mesajul nu a putut fi trimis. Te rugăm să ne suni la +40 374 123 456.']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Mesaj primit. Răspundem în 2 ore.']);
