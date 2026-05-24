const fs = require('fs');
const path = require('path');

const files = ['Home.tsx', 'Services.tsx', 'Planning.tsx', 'About.tsx'];
for (const file of files) {
  const filePath = path.join(__dirname, 'src', 'pages', file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace props interface
  content = content.replace(/interface [a-zA-Z]*Props {\n\s*onNavigate: \(page: string\) => void;\n}\n\n/g, '');
  
  // Replace function signature
  const funcNameMatch = content.match(/export default function ([a-zA-Z]*)\(\{ onNavigate \}: [a-zA-Z]*Props\) {/);
  if (funcNameMatch) {
    const funcName = funcNameMatch[1];
    
    // Add import if not present
    if (!content.includes('react-router-dom')) {
      content = "import { useNavigate } from 'react-router-dom';\n" + content;
    }
    
    content = content.replace(
      /export default function [a-zA-Z]*\(\{ onNavigate \}: [a-zA-Z]*Props\) {/,
      `export default function ${funcName}() {\n  const navigate = useNavigate();`
    );
    
    // Replace onNavigate calls
    content = content.replace(/onNavigate\('([^']+)'\)/g, "navigate('/$1')");
    // Handle root ('home')
    content = content.replace(/navigate\('\/home'\)/g, "navigate('/')");
    
    fs.writeFileSync(filePath, content);
    console.log('Refactored', file);
  }
}
