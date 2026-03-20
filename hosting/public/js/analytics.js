// =================== DespachDocs Analytics ===================
// Só executa se o usuário consentiu cookies analíticos

(function () {
  var DD = window.DDAnalytics = {};
  var queue = [];
  var sessionStart = Date.now();
  var maxScrollDepth = 0;
  var sectionsViewed = {};
  var clicks = [];

  // ---------- Visitor ID (anônimo, persistente) ----------
  function getVisitorId() {
    var id = localStorage.getItem('dd_visitor_id');
    if (!id) {
      id = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
      localStorage.setItem('dd_visitor_id', id);
    }
    return id;
  }

  // ---------- Session ID ----------
  function getSessionId() {
    var sid = sessionStorage.getItem('dd_session_id');
    if (!sid) {
      sid = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
      sessionStorage.setItem('dd_session_id', sid);
    }
    return sid;
  }

  // ---------- Checar consentimento ----------
  function hasAnalyticsConsent() {
    var consent = localStorage.getItem('cookieConsent');
    if (!consent) return false;
    if (consent === 'all') return true;
    if (consent === 'essential') return false;
    try {
      var prefs = JSON.parse(consent);
      return prefs.analytics === true;
    } catch (e) {
      return false;
    }
  }

  // ---------- Coletar dados do dispositivo ----------
  function getDeviceInfo() {
    var ua = navigator.userAgent;
    var mobile = /Mobi|Android|iPhone|iPad/i.test(ua);
    var tablet = /iPad|Tablet/i.test(ua);

    var browser = 'Outro';
    if (/Chrome/i.test(ua) && !/Edge|OPR/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Edge/i.test(ua)) browser = 'Edge';
    else if (/OPR|Opera/i.test(ua)) browser = 'Opera';

    var os = 'Outro';
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Mac OS/i.test(ua)) os = 'macOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Linux/i.test(ua)) os = 'Linux';

    return {
      tipo: tablet ? 'tablet' : (mobile ? 'mobile' : 'desktop'),
      navegador: browser,
      sistemaOperacional: os,
      tela: window.screen.width + 'x' + window.screen.height,
      viewport: window.innerWidth + 'x' + window.innerHeight,
      idioma: navigator.language || navigator.userLanguage || 'desconhecido',
      touchscreen: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
  }

  // ---------- UTM / Origem do tráfego ----------
  function getTrafficSource() {
    var params = new URLSearchParams(window.location.search);
    var ref = document.referrer;
    var source = {};

    // UTM params
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmKeys.forEach(function (key) {
      var val = params.get(key);
      if (val) source[key] = val;
    });

    // Referrer
    if (ref) {
      source.referrer = ref;
      try {
        var refHost = new URL(ref).hostname;
        if (/google\./i.test(refHost)) source.origem = 'Google';
        else if (/facebook\.com|fb\.com/i.test(refHost)) source.origem = 'Facebook';
        else if (/instagram\.com/i.test(refHost)) source.origem = 'Instagram';
        else if (/linkedin\.com/i.test(refHost)) source.origem = 'LinkedIn';
        else if (/bing\.com/i.test(refHost)) source.origem = 'Bing';
        else if (/yahoo\.com/i.test(refHost)) source.origem = 'Yahoo';
        else source.origem = refHost;
      } catch (e) {
        source.origem = 'desconhecido';
      }
    } else {
      source.origem = source.utm_source || 'direto';
    }

    return source;
  }

  // ---------- Enviar evento ao backend ----------
  function sendEvent(tipo, dados) {
    if (!hasAnalyticsConsent()) return;

    var payload = {
      tipo: tipo,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      dados: dados
    };

    // Usa sendBeacon para não perder dados ao fechar a aba
    var blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', blob);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function () {});
    }
  }

  // ---------- Page View ----------
  function trackPageView() {
    sendEvent('pageview', {
      pagina: window.location.pathname + window.location.hash,
      titulo: document.title,
      dispositivo: getDeviceInfo(),
      trafegoOrigem: getTrafficSource(),
      url: window.location.href
    });
  }

  // ---------- Scroll Depth ----------
  function trackScroll() {
    var docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var winHeight = window.innerHeight;
    var depth = Math.round((scrollTop + winHeight) / docHeight * 100);
    if (depth > maxScrollDepth) maxScrollDepth = depth;

    // Rastrear seções visíveis
    var sections = document.querySelectorAll('section[id]');
    sections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      if (rect.top < winHeight && rect.bottom > 0) {
        if (!sectionsViewed[sec.id]) {
          sectionsViewed[sec.id] = Date.now();
        }
      }
    });
  }

  // ---------- Cliques em CTAs ----------
  function trackClicks() {
    document.addEventListener('click', function (e) {
      if (!hasAnalyticsConsent()) return;
      var el = e.target.closest('a, button');
      if (!el) return;

      var label =
        el.textContent.trim().substring(0, 60) ||
        el.getAttribute('aria-label') ||
        'sem-label';

      var data = {
        elemento: el.tagName.toLowerCase(),
        texto: label,
        classe: el.className.split(' ').slice(0, 3).join(' '),
        href: el.getAttribute('href') || null,
        secao: (el.closest('section') || {}).id || 'nav/footer'
      };

      clicks.push(data);

      // Envia cliques importantes imediatamente
      var important = ['nav-cta', 'btn-primary', 'contact-whatsapp', 'whatsapp-float', 'form-submit', 'wpp-modal-send', 'cookie-btn-accept'];
      var isImportant = important.some(function (cls) {
        return el.className.indexOf(cls) !== -1;
      });

      if (isImportant) {
        sendEvent('cta_click', data);
      }
    });
  }

  // ---------- Tempo na página + resumo ao sair ----------
  function trackExit() {
    function sendExitData() {
      var tempoSegundos = Math.round((Date.now() - sessionStart) / 1000);
      sendEvent('session_end', {
        tempoNaPagina: tempoSegundos,
        scrollMaximo: maxScrollDepth + '%',
        secoesVisitadas: Object.keys(sectionsViewed),
        totalCliques: clicks.length,
        cliques: clicks.slice(0, 20) // limita a 20 para não estourar
      });
    }

    // visibilitychange é mais confiável que beforeunload no mobile
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') sendExitData();
    });

    window.addEventListener('beforeunload', sendExitData);
  }

  // ---------- Inicializar ----------
  DD.init = function () {
    if (!hasAnalyticsConsent()) return;

    trackPageView();
    trackClicks();
    trackExit();

    // Scroll com throttle
    var scrollTimer;
    window.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(trackScroll, 200);
    }, { passive: true });

    // Primeira medição
    trackScroll();
  };

  // Inicia se já tiver consentimento, senão espera
  if (hasAnalyticsConsent()) {
    DD.init();
  }

  // Expõe para o cookies.js chamar após consentimento
  DD.start = function () {
    if (hasAnalyticsConsent()) DD.init();
  };
})();
