const fs = require('fs');
const path = require('path');

const analysisPath = path.resolve(__dirname, '../g4f_analysis_20250623_165622.json');
const outputPath = path.resolve(__dirname, '../src/providers/workingProviders.ts');

const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'));
const categories = ['text', 'image', 'audio', 'research'];

const header = `// Сгенерировано автоматически на основе анализа g4f_analysis_20250623_165622.json\n\nexport interface WorkingProvider {\n  provider: string;\n  model: string;\n  elapsed: number;\n  category: 'text' | 'image' | 'audio' | 'research';\n  responseSample: string;\n}\n\nexport const workingProviders: WorkingProvider[] = [\n`;

let body = '';
let count = 0;
for (const category of categories) {
  for (const item of analysis.working_providers[category]) {
    body += `  { provider: ${JSON.stringify(item.provider)}, model: ${JSON.stringify(item.model)}, elapsed: ${item.elapsed}, category: '${category}', responseSample: ${JSON.stringify(item.response_sample)} },\n`;
    count++;
  }
}

const footer = '];\n';

fs.writeFileSync(outputPath, header + body + footer, 'utf-8');
console.log('workingProviders.ts успешно сгенерирован! Всего объектов:', count); 