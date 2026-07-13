#!/bin/bash
for file in src/components/Projects.tsx src/components/Skills.tsx src/components/Education.tsx src/components/Certificates.tsx src/components/Contact.tsx src/components/Footer.tsx; do
  # Add import if missing
  if ! grep -q "import { ScrollReveal }" "$file"; then
    sed -i "1i import { ScrollReveal } from './ScrollReveal';" "$file"
  fi
  
  # Replace the <motion.div container opening
  sed -i '/<motion.div/,/>/ {
    /<motion.div/ {
      N;N;N;N;
      /<motion.div\n *initial={{ opacity: 0, y: 20 }}\n *whileInView={{ opacity: 1, y: 0 }}\n *viewport={{ once: true }}\n *transition={{ duration: 0.6 }}\n *>/ {
        s/<motion.div\n *initial={{ opacity: 0, y: 20 }}\n *whileInView={{ opacity: 1, y: 0 }}\n *viewport={{ once: true }}\n *transition={{ duration: 0.6 }}\n *>/<ScrollReveal>/
      }
    }
  }' "$file"
  
  # I'll just manually close the </ScrollReveal> or do it correctly via script.
  # Actually, since I only replaced the exact opening tag, I'll need to replace the corresponding closing tag. 
  # This might be tricky with sed. I'll just use a python script.
done
