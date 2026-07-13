import re

with open("src/components/Footer.tsx", 'r') as f:
    content = f.read()

content = re.sub(
    r'<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*20\s*\}\}\s+whileInView=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+viewport=\{\{\s*once:\s*true\s*\}\}\s+transition=\{\{\s*duration:\s*0\.6\s*\}\}\s+className="flex flex-col items-center gap-6"\s*>',
    r'<ScrollReveal className="flex flex-col items-center gap-6">',
    content
)

content = content.replace('</motion.div>', '</ScrollReveal>')

with open("src/components/Footer.tsx", 'w') as f:
    f.write(content)
