import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory inquiries store for demo and persistence across interactions
const inquiries: Array<{
  id: string;
  name: string;
  businessType: string;
  needs: string[];
  contact: string;
  details?: string;
  createdAt: string;
}> = [];

// Lazy load GoogleGenAI
let aiClient: any = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const { GoogleGenAI } = require("@google/genai");
        aiClient = new GoogleGenAI({ apiKey });
      } catch (err) {
        console.warn("Could not load @google/genai:", err);
      }
    }
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", brand: "OndiGu", version: "1.0.0" });
});

// Contact / Budget request endpoint
app.post("/api/contact", (req, res) => {
  try {
    const { name, businessType, needs, contact, details } = req.body;
    if (!name || !businessType || !contact) {
      return res.status(400).json({ error: "Faltan campos obligatorios (nombre, rubro y contacto)." });
    }

    const newInquiry = {
      id: "OND-" + Math.floor(100000 + Math.random() * 900000),
      name: String(name).trim(),
      businessType: String(businessType).trim(),
      needs: Array.isArray(needs) ? needs : [String(needs)],
      contact: String(contact).trim(),
      details: details ? String(details).trim() : "",
      createdAt: new Date().toISOString(),
    };

    inquiries.unshift(newInquiry);

    return res.status(200).json({
      success: true,
      inquiry: newInquiry,
      message: `¡Recibido! Nos pondremos en contacto contigo a la brevedad con una propuesta personalizada sin vueltas.`,
    });
  } catch (error: any) {
    return res.status(500).json({ error: "Error procesando tu solicitud. Por favor intenta por WhatsApp." });
  }
});

// Assistant Chat endpoint (Predefined quick responses fallback + Gemini AI)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Mensaje requerido." });
    }

    const lower = message.toLowerCase().trim();

    // Direct match for standard queries
    if (lower.includes("precio") || lower.includes("cuánto cuesta") || lower.includes("cuanto cuesta") || lower.includes("costo") || lower.includes("presupuesto")) {
      return res.json({
        reply: "En OndiGu cada proyecto se cotiza a medida según lo que realmente necesita tu negocio: desde una landing ágil hasta un sistema completo con e-commerce y automatización con IA. No cobramos extras sorpresa ni paquetes inflados. Podés pedir tu presupuesto en el formulario o escribirnos directamente por WhatsApp.",
      });
    }

    if (lower.includes("tiempo") || lower.includes("cuánto tarda") || lower.includes("demora") || lower.includes("plazo")) {
      return res.json({
        reply: "Trabajamos con una metodología ágil en 3 etapas. La primera versión (Landing Page) suele estar lista en 5 a 10 días hábiles. Las integraciones de funcionalidades, pasarelas de pago y automatización se habilitan paso a paso sin frenar tu negocio.",
      });
    }

    if (lower.includes("ia") || lower.includes("inteligencia artificial") || lower.includes("automatiza") || lower.includes("bot")) {
      return res.json({
        reply: "Integramos IA real y práctica: atención automática 24/7 para tus clientes, captura de pedidos, respuestas automáticas a preguntas frecuentes y conexión con tus herramientas cotidianas (WhatsApp, planillas, CRM). Cero humo, 100% utilidad para vender más y ahorrar tiempo.",
      });
    }

    if (lower.includes("quiénes son") || lower.includes("quienes son") || lower.includes("ondigu") || lower.includes("gudiño") || lower.includes("onda")) {
      return res.json({
        reply: "OndiGu es 'Tecnología con onda'. La señal de Gudiño. No somos 'alguien que hace páginas', somos una empresa integral de Desarrollo Web, IA, Automatización, E-commerce, Integraciones e Infraestructura orientada a pymes y emprendedores.",
      });
    }

    // Try Gemini API if available
    const ai = getAIClient();
    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `Sos el asistente inteligente de OndiGu (Tecnología con onda. La señal de Gudiño).
OndiGu desarrolla sitios web inteligentes, e-commerce, automatizaciones e integraciones con Inteligencia Artificial para pymes, comercios y emprendedores.
Propuesta de valor: "Todo en uno. Simple. Personalizado. Sin vueltas."
Posicionamiento: OndiGu no es "una persona que hace páginas", es una empresa de Desarrollo Web + IA + Automatización + E-commerce + Integraciones + Tecnología.
Metodología en 3 etapas:
1. Landing Page (visibilidad y mensaje claro)
2. Usuarios y funcionalidades (interacción, catálogos, cuentas)
3. Pagos, despliegue y entrega (cobros, automatización de pedidos y puesta en marcha)

Reglas de respuesta:
- Hablá en español directo, profesional, cálido y conciso (máximo 2 párrafos breves).
- Hablá en términos que entienda un dueño de comercio o pyme, NADA de jerga técnica complicada.
- Mencioná siempre que pueden pedir presupuesto en la web o coordinar directamente por WhatsApp y Telegram.
- Respetá estrictamente el nombre "OndiGu" (nunca ONDIGU ni Ondigu).`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemInstruction}\n\nPregunta del usuario: ${message}` }],
            },
          ],
        });

        const reply = response.text || "Conectamos tu negocio con tecnología inteligente. Podés dejarnos tu consulta en el formulario o escribirnos por WhatsApp para cotizar tu proyecto.";
        return res.json({ reply });
      } catch (geminiError) {
        console.warn("Gemini chat fallback:", geminiError);
      }
    }

    // Default friendly response
    return res.json({
      reply: "¡Hola! En OndiGu creamos soluciones digitales a medida (sitios web, automatizaciones e IA aplicada) para que tu negocio crezca sin complicaciones. Podés pedir tu presupuesto en el formulario abajo o escribirnos directo por WhatsApp o Telegram.",
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Error en el asistente. Por favor contáctanos por WhatsApp." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OndiGu server running on port ${PORT}`);
  });
}

startServer();
