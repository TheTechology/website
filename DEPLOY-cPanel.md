# ADN Cars — Ghid Deployment cPanel

## Structura fișierelor pe server

```
public_html/          ← rădăcina domeniului adncars.ro
├── .htaccess         ← ✅ creat — security headers, rewrite rules
├── index.html
├── stoc.html
├── auto.html
├── despre.html
├── admin.html
├── ... (restul fișierelor HTML/CSS/JS)
├── api/
│   ├── config.php    ← ⚠️ configurare credențiale + căi
│   ├── auth.php      ← autentificare sesiuni PHP
│   ├── inventory.php ← GET public / POST (auth) inventar
│   ├── team.php      ← GET public / POST (auth, admin only) echipă
│   ├── upload.php    ← POST (auth) upload imagini
│   ├── live.php      ← servit ca /api/live.js — date live pentru pagini
│   └── contact.php   ← existent
├── data/
│   ├── .htaccess     ← ✅ Deny from all — nu e accesibil public
│   ├── inventory.json
│   └── team.json
└── uploads/
    ├── .htaccess     ← ✅ blochează execuția PHP
    └── car-*.jpg     ← imagini încărcate din admin
```

---

## Pași de deployment

### 1. Urcă fișierele pe server
Folosește File Manager din cPanel sau FTP/SFTP pentru a urca tot conținutul
din `adncars.ro/` în `public_html/`.

### 2. Setează permisiunile dosarelor
În cPanel → File Manager, selectează dosarele și setează permisiunile:

| Dosar / Fișier     | Permisiuni |
|--------------------|-----------|
| `data/`            | **755**   |
| `data/inventory.json` | **644** |
| `data/team.json`   | **644**   |
| `uploads/`         | **755**   |
| `api/*.php`        | **644**   |

**Dacă `data/` nu e writable, salvarea din admin NU funcționează!**

### 3. Activează SSL (HTTPS)
În cPanel → SSL/TLS → Let's Encrypt, activează HTTPS pentru adncars.ro.
**Obligatoriu** — sesiunile PHP sunt configurate cu `cookie_secure=1`.

### 4. Verifică versiunea PHP
cPanel → PHP Selector → alege PHP **8.1** sau mai nou.
Extensiile `json`, `fileinfo`, `session` trebuie active (sunt default pe cPanel).

### 5. Testează API-ul
Deschide în browser:
- `https://adncars.ro/api/inventory.php` → trebuie să returneze `[]` sau lista de mașini
- `https://adncars.ro/api/team.php` → trebuie să returneze `[]` sau echipa
- `https://adncars.ro/api/live.js` → trebuie să returneze JavaScript (rewrite via .htaccess)

### 6. Primul login în admin
1. Mergi la `https://adncars.ro/admin.html`
2. Autentifică-te cu `admin` / `XApYu$JAA6%bPzhD2m!v`
3. Adaugă/modifică mașini → salvarea merge automat pe server
4. Verifică `https://adncars.ro/stoc.html` → mașinile publicate apar instant

---

## Flux de date (cum funcționează)

```
Admin adaugă mașină
       ↓
admin.html (React) → setCars(...)
       ↓
localStorage (instant, offline-first)
       ↓
POST /api/inventory.php (async, cu sesiune PHP)
       ↓
data/inventory.json (persistent pe server)
       ↓
Vizitator accesează stoc.html
       ↓
<script src="/api/live.js"> → citește inventory.json
       ↓
window.INVENTORY = [...] (suprascrie datele statice)
       ↓
Pagina afișează mașinile actualizate ✅
```

---

## Schimbarea parolelor

Editează `api/config.php`:

```php
define('ADN_ADMINS', [
    'admin' => ['pass' => 'PAROLA_NOUA_ADMIN', 'role' => 'admin', 'name' => 'Răzvan Iliescu'],
    'diana' => ['pass' => 'PAROLA_NOUA_DIANA', 'role' => 'agent', 'name' => 'Diana Popescu'],
    'vlad'  => ['pass' => 'PAROLA_NOUA_VLAD',  'role' => 'agent', 'name' => 'Vlad Constantinescu'],
]);
```

Generează parole puternice cu: https://passwordsgenerator.net/ (min 20 caractere, mixte)

---

## Upload imagini

Există două metode în admin:

1. **URL extern** — pastează URL din ibb.co, imgur sau orice CDN
2. **Fișier local** — buton "↑ Fișier local" → imaginea e urcată în `uploads/`

Dimensiune maximă upload: **10 MB** per imagine.
Formate acceptate: JPG, PNG, WebP, AVIF.

---

## Depanare frecventă

| Problemă | Cauză | Soluție |
|----------|-------|---------|
| Salvarea nu merge, eroare 401 | Sesiunea PHP a expirat | Re-autentifică-te în admin |
| Salvarea nu merge, eroare 500 | `data/` nu are permisiunile corecte | Setează `data/` la 755 în cPanel |
| `/api/live.js` returnează 404 | mod_rewrite nu e activat | Activează din cPanel → Apache Handlers |
| Upload imagini eșuează | `uploads/` nu e writable | Setează `uploads/` la 755 |
| Sesiunea se pierde imediat | HTTPS nu e activat | Activează SSL (cookie_secure=1) |
