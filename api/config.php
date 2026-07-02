<?php
/**
 * ADN Cars · Admin Configuration
 * ─────────────────────────────────────────────────────────────
 * IMPORTANT: Schimbă ADN_SECRET_KEY cu un șir aleatoriu înainte
 * de a urca pe server! Nu comite acest fișier în repository public.
 */

// Secret key pentru sesiuni PHP (generează un șir random > 32 chars)
define('ADN_SECRET_KEY', 'ADN-Cars-2025-ChangeThisToARandomString-xK9mP2qL!');

// Credențiale admin — schimbă parolele înainte de producție
define('ADN_ADMINS', [
    'admin' => ['pass' => 'XApYu$JAA6%bPzhD2m!v', 'role' => 'admin', 'name' => 'Răzvan Iliescu'],
    'diana' => ['pass' => 'nQWU34@CqngA#h7hpjaa', 'role' => 'agent', 'name' => 'Diana Popescu'],
    'vlad'  => ['pass' => 'zk8SekQ2bQ%!V9!pdu9K', 'role' => 'agent', 'name' => 'Vlad Constantinescu'],
]);

// Căi absolute pe server
define('ADN_DATA_DIR',    dirname(__DIR__) . '/data');
define('ADN_UPLOADS_DIR', dirname(__DIR__) . '/uploads');

// Domeniu (folosit pentru CORS și URL-uri imagine)
define('ADN_DOMAIN', 'adncars.ro');

// Durata sesiunii admin în secunde (8 ore)
define('ADN_SESSION_LIFETIME', 28800);
