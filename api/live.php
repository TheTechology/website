<?php
/**
 * ADN Cars · Live Data Feed
 * Servește inventarul și echipa ca variabile JavaScript globale.
 * Inclus sincron în paginile publice — înlocuiește datele statice din data.js.
 *
 * URL canonical: /api/live.php  (rewrite → /api/live.js via .htaccess)
 */
header('Content-Type: application/javascript; charset=utf-8');
// No cache pentru public pages — vrem date proaspete la fiecare vizită
header('Cache-Control: no-store, must-revalidate');

$dataDir = dirname(__DIR__) . '/data';

// ── Inventory ────────────────────────────────────────────────────
$invFile = $dataDir . '/inventory.json';
if (file_exists($invFile)) {
    $raw = file_get_contents($invFile);
    if ($raw !== false) {
        $arr = json_decode($raw, true);
        if (is_array($arr) && count($arr) > 0) {
            echo 'window.INVENTORY=' . $raw . ';' . "\n";
        }
    }
}

// ── Team ─────────────────────────────────────────────────────────
$teamFile = $dataDir . '/team.json';
if (file_exists($teamFile)) {
    $raw = file_get_contents($teamFile);
    if ($raw !== false) {
        $arr = json_decode($raw, true);
        if (is_array($arr) && count($arr) > 0) {
            echo 'window.TEAM=' . $raw . ';' . "\n";
        }
    }
}
