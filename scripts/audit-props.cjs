const fs = require('fs');
const path = require('path');

const templatesDir = 'src/components/templates';
const glassPrompt = fs.readFileSync('public/prompts/glass-prompt.md', 'utf8');

const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx'));
const issues = [];
let totalProps = 0;

for (const file of files) {
    const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
    const name = file.replace('.tsx', '');

    // Extract all interface props from source (handle multi-line, nested interfaces)
    const interfaceMatch = content.match(/interface\s+\w+Props\s*\{([^}]+)\}/s);
    if (!interfaceMatch) {
        issues.push({ name, severity: 'warn', msg: 'No Props interface found' });
        continue;
    }

    const propLines = interfaceMatch[1].split('\n').filter(l => l.trim() && !l.trim().startsWith('//') && !l.trim().startsWith('*'));
    const sourceProps = [];
    for (const line of propLines) {
        const m = line.match(/^\s*(\w+)\??\s*:/);
        if (m) sourceProps.push(m[1]);
    }

    totalProps += sourceProps.length;

    // Check if template section exists in glass-prompt
    if (!glassPrompt.includes('### ' + name)) {
        issues.push({ name, severity: 'error', msg: 'NOT FOUND in glass-prompt.md schemas' });
        continue;
    }

    // Check for missing props in the prompt
    const missingInPrompt = sourceProps.filter(p => !glassPrompt.includes(p));

    if (missingInPrompt.length > 0) {
        issues.push({ name, severity: 'warn', msg: sourceProps.length + ' props, missing in prompt: ' + missingInPrompt.join(', ') });
    } else {
        console.log('  ✅ ' + name + ' — ' + sourceProps.length + ' props all documented');
    }
}

console.log('');
if (issues.length > 0) {
    console.log('══════════ ISSUES ══════════');
    for (const i of issues) {
        const icon = i.severity === 'error' ? '❌' : '⚠️ ';
        console.log('  ' + icon + ' ' + i.name + ': ' + i.msg);
    }
}

console.log('');
console.log('══════════ SUMMARY ══════════');
console.log('  Templates checked: ' + files.length);
console.log('  Total props across all templates: ' + totalProps);
console.log('  Issues found: ' + issues.length);
console.log('  Errors: ' + issues.filter(i => i.severity === 'error').length);
console.log('  Warnings: ' + issues.filter(i => i.severity === 'warn').length);
