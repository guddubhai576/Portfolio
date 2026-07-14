import re

with open("src/components/AIAssistant.tsx", "r") as f:
    content = f.read()

replacement = """      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.audio) {
          playAudioChunk(outputAudioCtx, msg.audio);
        }
        if (msg.interrupted) {
          nextStartTimeRef.current = 0;
        }
        if (msg.command === "navigate" && msg.section) {
          const sectionEl = document.getElementById(msg.section.toLowerCase());
          if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      };"""

content = re.sub(
    r'ws\.onmessage = \(event\) => \{[\s\S]*?if \(msg\.interrupted\) \{\s*nextStartTimeRef\.current = 0;\s*\}\s*\};',
    replacement,
    content
)

with open("src/components/AIAssistant.tsx", "w") as f:
    f.write(content)
