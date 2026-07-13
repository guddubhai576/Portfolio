import re
import sys

files = [
    "src/components/Projects.tsx",
    "src/components/Skills.tsx",
    "src/components/Education.tsx",
    "src/components/Certificates.tsx",
    "src/components/Contact.tsx",
    "src/components/Footer.tsx"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    if "import { ScrollReveal }" not in content:
        content = "import { ScrollReveal } from './ScrollReveal';\n" + content
    
    # Replace the container motion.div
    pattern = r'<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*20\s*\}\}\s+whileInView=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+viewport=\{\{\s*once:\s*true\s*\}\}\s+transition=\{\{\s*duration:\s*0\.6\s*\}\}\s*>'
    
    match = re.search(pattern, content)
    if match:
        content = content[:match.start()] + '<ScrollReveal>' + content[match.end():]
        # Now replace the LAST </motion.div> that corresponds to this.
        # Actually it's easier to replace </motion.div> right before </div>\n    </section>
        
        content = content.replace('        </motion.div>\n      </div>\n    </section>', '        </ScrollReveal>\n      </div>\n    </section>')
        content = content.replace('        </motion.div>\n      </div>\n    </footer>', '        </ScrollReveal>\n      </div>\n    </footer>')
        
    with open(file, 'w') as f:
        f.write(content)

print("Done")
