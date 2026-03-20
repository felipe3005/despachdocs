// Show banner after short delay if not already accepted
(function () {
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(function () {
      document.getElementById('cookieBanner').classList.add('active');
    }, 1500);
  }
})();

function sendConsentToBackend(consent) {
  fetch('/api/cookie-consent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      consent: consent,
      userAgent: navigator.userAgent,
      screenSize: window.innerWidth + 'x' + window.innerHeight
    })
  }).catch(function () {});
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'all');
  sendConsentToBackend('all');
  closeBanner();
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'essential');
  sendConsentToBackend('essential');
  closeBanner();
}

function saveCookiePrefs() {
  var analytics = document.getElementById('cookieAnalytics').checked;
  var marketing = document.getElementById('cookieMarketing').checked;
  var prefs = { essential: true, analytics: analytics, marketing: marketing };
  var prefsStr = JSON.stringify(prefs);
  localStorage.setItem('cookieConsent', prefsStr);
  sendConsentToBackend(prefs);
  closeBanner();
}

function closeBanner() {
  document.getElementById('cookieBanner').classList.remove('active');
  closeCookiePrefs();
}

function openCookiePrefs(e) {
  if (e) e.preventDefault();
  document.getElementById('cookiePrefs').classList.add('open');
}

function closeCookiePrefs() {
  document.getElementById('cookiePrefs').classList.remove('open');
}
