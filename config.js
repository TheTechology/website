/* ADN Cars · Configurare runtime
 *
 * Configurația implicită folosește backend-ul PHP propriu din /api/contact.php
 * Acesta funcționează imediat după upload pe cPanel, fără cont extern.
 *
 * Dacă vrei să folosești Formspree (alternativă fără PHP):
 *   1. Cont gratuit la https://formspree.io
 *   2. Crează 2 formulare, copiază URL-urile
 *   3. Înlocuiește 'contactFormEndpoint' și 'bookingFormEndpoint' de mai jos
 */

window.ADN_CONFIG = {
  // ============================================================
  // CONTACT FORM SUBMISSION
  // ============================================================
  // Backend PHP propriu pe cPanel (default — funcționează imediat după upload)
  contactFormEndpoint: '/api/contact.php',
  bookingFormEndpoint: '/api/contact.php',

  // Email-ul care primește notificările (afișat și în pagina de confirmare)
  notificationEmail: 'salut@adncars.ro',

  // ============================================================
  // SITE METADATA
  // ============================================================
  siteUrl: 'https://adncars.ro',
  brandName: 'ADN Cars',
  phone: '+40 374 123 456',
  phoneRaw: '+40374123456',
  whatsapp: '+40 740 123 456',
  whatsappRaw: '40740123456',
  email: 'salut@adncars.ro',
  address: 'Str. Portului nr. 20, Cladirea Navlomar, parter, Galați',

  // ============================================================
  // ANALYTICS (înlocuiește după ce creezi conturi reale)
  // ============================================================
  ga4Id: '',           // 'G-XXXXXXXXXX' — Google Analytics 4 Measurement ID
  metaPixelId: '',     // Facebook Pixel ID (15 cifre)

  // ============================================================
  // SOCIAL LINKS
  // ============================================================
  social: {
    facebook: 'https://facebook.com/adncars',
    instagram: 'https://instagram.com/adncars',
    youtube: 'https://youtube.com/@adncars',
    tiktok: 'https://tiktok.com/@adncars',
  },
};
