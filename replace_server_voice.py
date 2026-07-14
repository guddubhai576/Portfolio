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
             parts: [{ text: "You are an AI assistant for Pratik Kumar Jena's portfolio. You help visitors. You can navigate them to different sections of the page using the navigate_to_section tool. The available sections are: home, about, skills, experience, education, projects, contact." }]
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

