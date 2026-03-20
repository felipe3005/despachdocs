const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();
const db = admin.database();

const corsHandler = cors({ origin: true });

// POST /api/cookie-consent
exports.saveCookieConsent = onRequest({ region: "southamerica-east1" }, (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    try {
      const { consent, userAgent, screenSize } = req.body;

      if (!consent) {
        return res.status(400).json({ error: "Dados de consentimento ausentes" });
      }

      const data = {
        consent,
        userAgent: userAgent || null,
        screenSize: screenSize || null,
        ip: req.ip || null,
        timestamp: admin.database.ServerValue.TIMESTAMP,
      };

      const ref = await db.ref("cookie_consents").push(data);
      return res.status(200).json({ success: true, id: ref.key });
    } catch (err) {
      console.error("Erro ao salvar consentimento:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  });
});

// POST /api/analytics
exports.saveAnalytics = onRequest({ region: "southamerica-east1" }, (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    try {
      const { tipo, visitorId, sessionId, dados } = req.body;

      if (!tipo || !visitorId) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      const data = {
        tipo,
        visitorId,
        sessionId: sessionId || null,
        dados: dados || {},
        ip: req.ip || null,
        timestamp: admin.database.ServerValue.TIMESTAMP,
      };

      // Salva em analytics/{tipo}/{id}
      const ref = await db.ref("analytics/" + tipo).push(data);

      // Atualiza resumo do visitante
      const visitorRef = db.ref("analytics/visitantes/" + visitorId);
      await visitorRef.update({
        ultimaVisita: admin.database.ServerValue.TIMESTAMP,
        totalEventos: admin.database.ServerValue.increment(1),
      });

      return res.status(200).json({ success: true, id: ref.key });
    } catch (err) {
      console.error("Erro ao salvar analytics:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  });
});

// POST /api/contact-form
exports.saveContactForm = onRequest({ region: "southamerica-east1" }, (req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método não permitido" });
    }

    try {
      const { nome, telefone, email, servico, mensagem } = req.body;

      if (!nome || !telefone) {
        return res.status(400).json({ error: "Nome e telefone são obrigatórios" });
      }

      const data = {
        nome: nome.trim(),
        telefone: telefone.trim(),
        email: email ? email.trim() : null,
        servico: servico || null,
        mensagem: mensagem ? mensagem.trim() : null,
        lido: false,
        timestamp: admin.database.ServerValue.TIMESTAMP,
      };

      const ref = await db.ref("contatos").push(data);
      return res.status(200).json({ success: true, id: ref.key });
    } catch (err) {
      console.error("Erro ao salvar contato:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  });
});
