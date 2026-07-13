import re
import sys

with open("src/components/Contact.tsx", 'r') as f:
    content = f.read()

if "import { ScrollReveal }" not in content:
    content = "import { ScrollReveal } from './ScrollReveal';\n" + content

# First container (Header)
content = re.sub(
    r'<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*20\s*\}\}\s+whileInView=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+viewport=\{\{\s*once:\s*true\s*\}\}\s+transition=\{\{\s*duration:\s*0\.6\s*\}\}\s+className="text-center mb-16"\s*>',
    r'<ScrollReveal className="text-center mb-16">',
    content
)

# Second container (Left side info)
content = re.sub(
    r'<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*x:\s*-20\s*\}\}\s+whileInView=\{\{\s*opacity:\s*1,\s*x:\s*0\s*\}\}\s+viewport=\{\{\s*once:\s*true\s*\}\}\s+transition=\{\{\s*duration:\s*0\.5,\s*delay:\s*0\.2\s*\}\}\s+className="md:col-span-2 space-y-8"\s*>',
    r'<ScrollReveal direction="left" delay={0.2} className="md:col-span-2 space-y-8">',
    content
)

# Third container (Right side form)
content = re.sub(
    r'<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*x:\s*20\s*\}\}\s+whileInView=\{\{\s*opacity:\s*1,\s*x:\s*0\s*\}\}\s+viewport=\{\{\s*once:\s*true\s*\}\}\s+transition=\{\{\s*duration:\s*0\.5,\s*delay:\s*0\.4\s*\}\}\s+className="md:col-span-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm dark:shadow-none"\s*>',
    r'<ScrollReveal direction="right" delay={0.4} className="md:col-span-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm dark:shadow-none">',
    content
)

# Now we need to replace the closing tags.
# There are 3 </motion.div> tags. We replace them with </ScrollReveal>.
content = content.replace('</motion.div>', '</ScrollReveal>')

with open("src/components/Contact.tsx", 'w') as f:
    f.write(content)

print("Done")
