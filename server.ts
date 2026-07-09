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

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
        }
      });
      
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
        config: { systemInstruction }
      });
      
      res.json({ response: response.text });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
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
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
