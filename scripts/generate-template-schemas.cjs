/**
 * generate-template-schemas.cjs
 * 
 * Parses TypeScript interfaces from template components and generates
 * the ---TEMPLATE-LIBRARY--- section for glass-prompt.md
 * 
 * Usage: node scripts/generate-template-schemas.cjs
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'src', 'components', 'templates');
const GLASS_PROMPT_PATH = path.join(__dirname, '..', 'public', 'prompts', 'glass-prompt.md');

// Markers for injection
const START_MARKER = '<!-- TEMPLATE-SCHEMAS-START -->';
const END_MARKER = '<!-- TEMPLATE-SCHEMAS-END -->';

/**
 * Parse a TypeScript interface from file content using proper brace matching
 */
function parseInterface(content, interfaceName) {
  // Find the start of the interface
  const startPattern = new RegExp(`interface\\s+${interfaceName}\\s*\\{`);
  const startMatch = content.match(startPattern);
  if (!startMatch) return null;

  const startIndex = startMatch.index + startMatch[0].length;

  // Find matching closing brace using counter
  let braceCount = 1;
  let endIndex = startIndex;

  while (braceCount > 0 && endIndex < content.length) {
    const char = content[endIndex];
    if (char === '{') braceCount++;
    if (char === '}') braceCount--;
    endIndex++;
  }

  const interfaceBody = content.slice(startIndex, endIndex - 1);
  const props = [];

  // Parse properties by handling nested braces
  let currentProp = '';
  let depth = 0;

  for (const char of interfaceBody) {
    if (char === '{' || char === '[' || char === '(') depth++;
    if (char === '}' || char === ']' || char === ')') depth--;

    if ((char === ';' || char === '\n') && depth === 0) {
      const propLine = currentProp.trim();
      if (propLine && !propLine.startsWith('//')) {
        const propMatch = propLine.match(/^(\w+)(\?)?:\s*(.+)$/s);
        if (propMatch) {
          const [, name, optional, type] = propMatch;
          props.push({
            name,
            optional: !!optional,
            type: type.trim().replace(/;$/, '')
          });
        }
      }
      currentProp = '';
    } else {
      currentProp += char;
    }
  }

  // Handle last property if no trailing semicolon
  const propLine = currentProp.trim();
  if (propLine && !propLine.startsWith('//')) {
    const propMatch = propLine.match(/^(\w+)(\?)?:\s*(.+)$/s);
    if (propMatch) {
      const [, name, optional, type] = propMatch;
      props.push({
        name,
        optional: !!optional,
        type: type.trim().replace(/;$/, '')
      });
    }
  }

  return props;
}

/**
 * Parse ALL interfaces in a file and return a map of name -> props
 */
function parseAllInterfaces(content) {
  const interfaces = {};
  const interfaceRegex = /interface\s+(\w+)\s*\{/g;
  let match;

  while ((match = interfaceRegex.exec(content)) !== null) {
    const name = match[1];
    const props = parseInterface(content, name);
    if (props) {
      interfaces[name] = props;
    }
  }

  return interfaces;
}

/**
 * Convert an interface's props to an example object
 */
function interfaceToExample(props, allInterfaces, depth = 0) {
  if (depth > 2) return { _props: [] }; // Return props metadata for formatting

  const result = { _props: [] };
  for (const prop of props) {
    result._props.push({ name: prop.name, optional: prop.optional });
    result[prop.name] = typeToExample(prop.type, allInterfaces, depth);
  }
  return result;
}

/**
 * Convert a type string to an example value, resolving references
 */
function typeToExample(typeStr, allInterfaces, depth = 0) {
  if (depth > 2) return 'string';

  const type = typeStr.toLowerCase();

  // Check for array of custom type: e.g., "FeaturePoint[]"
  const arrayMatch = typeStr.match(/^(\w+)\[\]$/);
  if (arrayMatch) {
    const itemType = arrayMatch[1];
    // Check if this is a known interface
    if (allInterfaces[itemType]) {
      const itemExample = interfaceToExample(allInterfaces[itemType], allInterfaces, depth + 1);
      return [itemExample];
    }
    // Primitive array
    if (itemType.toLowerCase() === 'string') return ['string'];
    if (itemType.toLowerCase() === 'number') return [0];
    return [];
  }

  // Check for inline object array: { icon?: string; text: string }[]
  if (typeStr.includes('{') && typeStr.includes('}') && typeStr.includes('[]')) {
    // Parse inline object type
    const inlineMatch = typeStr.match(/\{([^}]+)\}\[\]/);
    if (inlineMatch) {
      const inlineProps = [];
      const parts = inlineMatch[1].split(';');
      for (const part of parts) {
        const propMatch = part.trim().match(/^(\w+)(\?)?:\s*(.+)$/);
        if (propMatch) {
          inlineProps.push({
            name: propMatch[1],
            optional: !!propMatch[2],
            type: propMatch[3].trim()
          });
        }
      }
      if (inlineProps.length > 0) {
        const itemExample = interfaceToExample(inlineProps, allInterfaces, depth + 1);
        return [itemExample];
      }
    }
    return [];
  }

  // Simple array
  if (type.includes('[]')) return [];

  // Check for direct interface reference
  if (allInterfaces[typeStr]) {
    return interfaceToExample(allInterfaces[typeStr], allInterfaces, depth + 1);
  }

  // Primitives
  if (type.includes('string')) return 'string';
  if (type.includes('number')) return 0;
  if (type.includes('boolean')) return false;

  return {};
}

/**
 * Parse a JavaScript value and convert to JSON-compatible format
 */
function parseJsValue(rawValue) {
  let value = rawValue.trim();
  value = value.replace(/,\s*$/, '');

  if (/^["'].*["']$/.test(value)) {
    return value.slice(1, -1);
  }

  if (value.startsWith('[') || value.startsWith('{')) {
    try {
      let jsonValue = value
        .replace(/(\{|\,)\s*(\w+)\s*:/g, '$1 "$2":')
        .replace(/'/g, '"')
        .replace(/,\s*([\]\}])/g, '$1');
      return JSON.parse(jsonValue);
    } catch (e) {
      return value;
    }
  }

  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(Number(value))) return Number(value);

  return value;
}

/**
 * Extract default values from component destructuring
 */
function extractDefaults(content) {
  const defaults = {};

  const functionMatch = content.match(/React\.FC<\w+>\s*=\s*\(\{([\s\S]*?)\}\)\s*=>/);
  if (!functionMatch) return defaults;

  const destructuring = functionMatch[1];
  const lines = destructuring.split('\n');
  let currentProp = null;
  let currentValue = '';
  let depth = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;

    // Check for prop = value pattern
    const propMatch = trimmed.match(/^(\w+)\s*=\s*(.*)$/);

    // Check if this is just a prop name without default (e.g., "ctaLabel,")
    const propOnlyMatch = trimmed.match(/^(\w+),?\s*$/);

    if (propMatch && depth === 0) {
      // Save previous prop if exists
      if (currentProp && currentValue) {
        defaults[currentProp] = currentValue.trim().replace(/,\s*$/, '');
      }
      currentProp = propMatch[1];
      currentValue = propMatch[2];

      // Update depth for this line
      for (const char of currentValue) {
        if (char === '{' || char === '[') depth++;
        if (char === '}' || char === ']') depth--;
      }
    } else if (propOnlyMatch && depth === 0) {
      // This is a prop without default - save current and reset
      if (currentProp && currentValue) {
        defaults[currentProp] = currentValue.trim().replace(/,\s*$/, '');
      }
      currentProp = null;
      currentValue = '';
    } else if (currentProp && depth > 0) {
      // Only append if inside a nested structure
      currentValue += ' ' + trimmed;

      for (const char of trimmed) {
        if (char === '{' || char === '[') depth++;
        if (char === '}' || char === ']') depth--;
      }
    } else if (currentProp && depth === 0) {
      // End current value if we're at depth 0 and this doesn't look like continuation
      if (currentValue) {
        defaults[currentProp] = currentValue.trim().replace(/,\s*$/, '');
      }
      currentProp = null;
      currentValue = '';
    }
  }

  if (currentProp && currentValue) {
    defaults[currentProp] = currentValue.trim().replace(/,\s*$/, '');
  }

  return defaults;
}

/**
 * Extract description from file comment
 */
function extractDescription(content) {
  const commentMatch = content.match(/\/\*\*\s*\n\s*\*\s*(\w+)\s*-\s*([^\n]+)/);
  if (commentMatch) {
    return commentMatch[2].trim();
  }
  return '';
}

/**
 * Process a single template file
 */
function processTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.tsx');

  // Parse all interfaces in the file
  const allInterfaces = parseAllInterfaces(content);

  const propsInterfaceName = `${fileName}Props`;
  const props = allInterfaces[propsInterfaceName];

  if (!props || props.length === 0) {
    console.log(`  ⚠ No props found for ${fileName}`);
    return null;
  }

  const defaults = extractDefaults(content);
  const description = extractDescription(content);

  const exampleProps = { _props: [] };
  for (const prop of props) {
    exampleProps._props.push({ name: prop.name, optional: prop.optional });
    if (defaults[prop.name]) {
      exampleProps[prop.name] = parseJsValue(defaults[prop.name]);
    } else {
      // Use typeToExample to resolve referenced interfaces
      exampleProps[prop.name] = typeToExample(prop.type, allInterfaces, 0);
    }
  }

  return {
    name: fileName,
    description,
    props,
    defaults,
    example: exampleProps
  };
}

/**
 * Generate markdown for a template
 */
function generateTemplateMarkdown(template) {
  const lines = [];
  lines.push(`### ${template.name}`);
  if (template.description) {
    lines.push(template.description);
  }
  lines.push('```json');
  lines.push(formatSchemaObject(template.example));
  lines.push('```');
  lines.push('');
  return lines.join('\n');
}

/**
 * Format an object with TypeScript-style optional notation
 */
function formatSchemaObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return '[' + obj.map(item => formatSchemaObject(item)).join(', ') + ']';
  }

  const propsInfo = obj._props || [];
  const optionalMap = {};
  for (const p of propsInfo) {
    optionalMap[p.name] = p.optional;
  }

  const pairs = [];
  for (const key of Object.keys(obj)) {
    if (key === '_props') continue;
    const isOptional = optionalMap[key];
    const formattedKey = `"${key}"${isOptional ? '?' : ''}`;
    const formattedValue = formatSchemaObject(obj[key]);
    pairs.push(`${formattedKey}: ${formattedValue}`);
  }

  return '{' + pairs.join(', ') + '}';
}

/**
 * Main function
 */
async function main() {
  console.log('🔧 Generating template schemas...\n');

  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('.tsx'))
    .sort();

  console.log(`📂 Found ${files.length} template files\n`);

  const templates = [];
  for (const file of files) {
    const filePath = path.join(TEMPLATES_DIR, file);
    console.log(`  Processing ${file}...`);
    const template = processTemplate(filePath);
    if (template) {
      templates.push(template);
      console.log(`    ✓ ${template.props.length} props`);
    }
  }

  console.log(`\n✅ Parsed ${templates.length} templates\n`);

  const schemaMarkdown = [
    START_MARKER,
    '',
    `## ---TEMPLATES--- (${templates.length})`,
    '',
  ];

  for (const template of templates) {
    schemaMarkdown.push(generateTemplateMarkdown(template));
  }

  schemaMarkdown.push(END_MARKER);

  const schemaContent = schemaMarkdown.join('\n');

  let glassPrompt = fs.readFileSync(GLASS_PROMPT_PATH, 'utf-8');

  if (glassPrompt.includes(START_MARKER) && glassPrompt.includes(END_MARKER)) {
    const startIdx = glassPrompt.indexOf(START_MARKER);
    const endIdx = glassPrompt.indexOf(END_MARKER) + END_MARKER.length;
    glassPrompt = glassPrompt.substring(0, startIdx) + schemaContent + glassPrompt.substring(endIdx);
    console.log('📝 Replaced existing template schemas section');
  } else {
    const manualSectionStart = glassPrompt.indexOf('## ---TEMPLATE-LIBRARY---');
    const manualSectionEnd = glassPrompt.indexOf('## ---SHOT-PROMPTS---');

    if (manualSectionStart !== -1 && manualSectionEnd !== -1) {
      glassPrompt =
        glassPrompt.substring(0, manualSectionStart) +
        schemaContent +
        '\n---\n\n' +
        glassPrompt.substring(manualSectionEnd);
      console.log('📝 Replaced manual template library section');
    } else {
      console.error('❌ Could not find insertion point in glass-prompt.md');
      process.exit(1);
    }
  }

  fs.writeFileSync(GLASS_PROMPT_PATH, glassPrompt, 'utf-8');
  console.log('\n✅ Updated glass-prompt.md');
  console.log(`   ${templates.length} templates documented`);
}

main().catch(console.error);
