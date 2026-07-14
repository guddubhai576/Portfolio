import re

with open("server.ts", "r") as f:
    content = f.read()

replacement = """
  wss.on("connection", async (clientWs) => {
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onmessage: (message) => {
            const parts = message.serverContent?.modelTurn?.parts;
            if (parts) {
              for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                  clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
                }
                if (part.functionCall) {
                  const { name, args, id } = part.functionCall;
                  if (name === 'navigate_to_section') {
                    const section = args?.section;
                    clientWs.send(JSON.stringify({ command: "navigate", section }));
                    session.sendRealtimeInput([{
                      functionResponse: {
                        id,
                        name,
                        response: { status: "navigated successfully to " + section }
                      }
                    }]);
                  }
                  if (name === 'download_resume') {
                    clientWs.send(JSON.stringify({ command: "download_resume" }));
                    session.sendRealtimeInput([{
                      functionResponse: {
                        id,
                        name,
                        response: { status: "Initiated resume download" }
                      }
                    }]);
                  }
                  if (name === 'toggle_theme') {
                    clientWs.send(JSON.stringify({ command: "toggle_theme" }));
                    session.sendRealtimeInput([{
                      functionResponse: {
                        id,
                        name,
                        response: { status: "Toggled theme" }
                      }
                    }]);
                  }
                }
              }
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
             parts: [{ text: "You are an AI assistant for Pratik Kumar Jena's portfolio. You help visitors. You can navigate them to different sections (home, about, skills, experience, education, projects, contact), download his resume, or toggle the website theme (dark/light mode) using the provided tools." }]
          },
          tools: [{
            functionDeclarations: [
              {
                name: "navigate_to_section",
                description: "Navigate the user to a specific section of the portfolio.",
                parameters: {
                  type: "OBJECT",
                  properties: {
                    section: {
                      type: "STRING",
                      description: "The section ID to navigate to (e.g., 'home', 'about', 'skills', 'experience', 'education', 'projects', 'contact')."
                    }
                  },
                  required: ["section"]
                }
              },
              {
                name: "download_resume",
                description: "Trigger the download of Pratik's resume.",
              },
              {
                name: "toggle_theme",
                description: "Toggle the website's dark/light theme mode.",
              }
            ]
          }]
        },
      });

      clientWs.on("message", (data) => {
"""

content = re.sub(
    r'wss\.on\("connection", async \(clientWs\) => \{[\s\S]*?clientWs\.on\("message", \(data\) => \{',
    replacement.strip() + '\n',
    content
)

with open("server.ts", "w") as f:
    f.write(content)
