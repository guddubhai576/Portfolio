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
        if (msg.command === "download_resume") {
          const a = document.createElement("a");
          a.href = "/resume.pdf";
          a.download = "Pratik_Kumar_Jena_Resume.pdf";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        if (msg.command === "toggle_theme") {
          document.documentElement.classList.toggle('dark');
        }
      };"""

content = re.sub(
    r'ws\.onmessage = \(event\) => \{[\s\S]*?if \(msg\.command === "navigate" && msg\.section\) \{[\s\S]*?\}\s*\}\s*\};',
    replacement,
    content
)

with open("src/components/AIAssistant.tsx", "w") as f:
    f.write(content)
