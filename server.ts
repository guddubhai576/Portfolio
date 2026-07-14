import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { requireAuth, AuthRequest } from './src/middleware/auth.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  
  app.get("/api/user", requireAuth, (req: AuthRequest, res) => {
    res.json({ user: req.user });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      // Basic portfolio info to ground the model
      const systemInstruction = `You are an AI assistant for Pratik Kumar Jena's portfolio website. 
You help recruiters and visitors learn about Pratik. 
Keep your answers concise, friendly, and professional. 
Do not hallucinate information not present in the prompt.
Here is some context about Pratik:
- Pratik is a Data Analyst and Frontend Developer.
- He is pursuing a B.Tech in Computer Science and Engineering (AI & Machine Learning) at Trident Academy of Technology, Bhubaneswar (Expected 2026).
- He has skills in Python, JavaScript, TypeScript, React, SQL, HTML, CSS, Tailwind CSS, Data Analysis, Machine Learning.
- He is seeking internships, full-time Data Analyst / Frontend Developer roles.`;

      // Replay history
      if (Array.isArray(history) && history.length > 0) {
        for (const msg of history) {
          // Simplistic history replay (gemini API chats require alternating user/model roles normally, but for a simple stateless chat endpoint we can just send the latest message or stringify history)
          // For simplicity, we just pass the new message with context or we could pass the history as part of the prompt.
        }
      }

      // To properly handle history in the @google/genai SDK, we'd need to format it according to its requirements or simply pass the whole conversation as context.
      // Let's do a simple approach: include history in the message if it exists.
      const fullMessage = history && history.length > 0 
        ? `Previous conversation:\n${history.map((m: any) => `${m.role}: ${m.content}`).join('\n')}\n\nUser: ${message}`
        : message;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: fullMessage,
        config: { 
          systemInstruction
        }
      });
      
      res.json({ response: response.text });
    } catch (error: any) {
      console.error('Chat error:', error);
      if (error?.status === 429 || (error?.message && error.message.includes('429')) || (error?.message && error.message.includes('quota'))) {
        res.status(429).json({ error: "API Quota Exceeded for this model. Please try again later or upgrade your plan." });
      } else if (error?.status === 503 || (error?.message && error.message.includes('503'))) {
        res.status(503).json({ error: "The AI model is currently experiencing high demand. Please try again later." });
      } else {
        res.status(500).json({ error: 'Failed to process chat message. Please try again later.' });
      }
    }
  });

  app.post("/api/gemini/maps", async (req, res) => {
    try {
      const { prompt, lat, lng } = req.body;
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const config: any = {
        tools: [{ googleMaps: {} }]
      };
      
      if (lat && lng) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng)
            }
          }
        };
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt || "What is in Bhubaneswar?",
        config
      });
      
      // Extract links if any
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const places = chunks
        .filter((c: any) => c.web?.uri || c.maps?.uri)
        .map((c: any) => ({
          title: c.web?.title || c.maps?.title || 'Location',
          uri: c.web?.uri || c.maps?.uri
        }));

      res.json({ response: response.text, places });
    } catch (error: any) {
      console.error('Maps AI error:', error);
      if (error?.status === 429 || (error?.message && error.message.includes('429')) || (error?.message && error.message.includes('quota'))) {
        res.status(429).json({ error: "API Quota Exceeded for this model. Please try again later or upgrade your plan." });
      } else if (error?.status === 503 || (error?.message && error.message.includes('503'))) {
        res.status(503).json({ error: "The AI model is currently experiencing high demand. Please try again later." });
      } else {
        res.status(500).json({ error: 'Failed to process maps query. Please try again later.' });
      }
    }
  });

  app.get("/api/github/stats", async (req, res) => {
    try {
      const userResponse = await fetch("https://api.github.com/users/pratik04032", {
        headers: { "User-Agent": "Portfolio-App" }
      });
      if (!userResponse.ok) {
        throw new Error("Failed to fetch from GitHub API");
      }
      const userData = await userResponse.json();
      res.json(userData);
    } catch (error) {
      console.error("GitHub API error:", error);
      res.status(500).json({ error: "Failed to fetch GitHub stats" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  const { WebSocketServer } = await import("ws");
  const wss = new WebSocketServer({ server, path: "/live" });

  wss.on("connection", async (clientWs) => {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onmessage: (message) => {
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio) {
              clientWs.send(JSON.stringify({ audio }));
            }
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
        },
        config: {
          responseModalities: ["AUDIO" as any],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: {
             parts: [{ text: "You are an AI assistant for Pratik Kumar Jena's portfolio. You help visitors. Pratik is a Data Analyst and Frontend Developer." }]
          },
        },
      });

      clientWs.on("message", (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" }
            });
          }
        } catch(e) {}
      });
      
      clientWs.on("close", () => {
        // cleanup if needed
      });
    } catch(err) {
      console.error(err);
      clientWs.close();
    }
  });
}

startServer();
