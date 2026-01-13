import { notifyTele } from "./acknowledgmentHelpers";

/**
 * Context data structure for each section
 */
interface SectionContext {
  sectionId: string;
  sectionName: string;
  keyFacts: string[];
  numbers: { label: string; value: string }[];
  dates: { label: string; value: string }[];
  names: string[];
  locations: string[];
  alphanumeric: { label: string; value: string }[];
}

/**
 * Section context registry - stores factual data for each section
 */
const sectionContextRegistry: Record<string, SectionContext> = {
  "guyana-overview": {
    sectionId: "guyana-overview",
    sectionName: "Guyana Overview",
    keyFacts: [
      "Co-operative Republic located on South America's northern coast",
      "Only English-speaking country in South America",
      "Rich cultural diversity and natural resources"
    ],
    numbers: [
      { label: "Population", value: "800,000+" },
      { label: "Area", value: "215,000 sq km" },
      { label: "Regions", value: "10 administrative regions" },
      { label: "Independence Year", value: "1966" }
    ],
    dates: [
      { label: "Independence Day", value: "May 26, 1966" },
      { label: "Republic Day", value: "February 23, 1970" }
    ],
    names: ["Georgetown"],
    locations: ["Georgetown", "Demerara-Mahaica", "Essequibo Islands-West Demerara"],
    alphanumeric: []
  },
  "natural-resources": {
    sectionId: "natural-resources",
    sectionName: "Natural Resources & Environment",
    keyFacts: [
      "One of the world's most forest-rich countries",
      "Vast mineral resources including gold, diamonds, and bauxite",
      "Significant offshore oil and gas discoveries"
    ],
    numbers: [
      { label: "Forest Coverage", value: "85%" },
      { label: "Protected Areas", value: "8.5 million acres" },
      { label: "Oil Production (est. 2025)", value: "500,000+ barrels/day" }
    ],
    dates: [],
    names: ["Kaieteur Falls", "Iwokrama Rainforest", "Stabroek Block"],
    locations: ["Essequibo Basin", "Rupununi", "Potaro-Siparuni"],
    alphanumeric: []
  },
  "economic-development": {
    sectionId: "economic-development",
    sectionName: "Economic Development",
    keyFacts: [
      "Fastest-growing economy in the world driven by oil sector",
      "Growing investment in infrastructure and services",
      "Focus on diversification and sustainable development"
    ],
    numbers: [
      { label: "GDP Growth (2024)", value: "33%" },
      { label: "Natural Resources Fund", value: "$2.5+ billion" },
      { label: "Infrastructure Investment", value: "$1+ billion annually" }
    ],
    dates: [],
    names: [],
    locations: [],
    alphanumeric: []
  },
  "scheduling": {
    sectionId: "scheduling",
    sectionName: "Schedule Follow-Up",
    keyFacts: [
      "Available for meetings and follow-up discussions",
      "Flexible scheduling across multiple time zones"
    ],
    numbers: [],
    dates: [],
    names: [],
    locations: [],
    alphanumeric: []
  },
  "cultural-heritage": {
    sectionId: "cultural-heritage",
    sectionName: "Cultural Heritage",
    keyFacts: [
      "Six major ethnic groups contributing to national identity",
      "Rich traditions in music, art, and cuisine",
      "Vibrant festivals celebrating diverse heritage"
    ],
    numbers: [
      { label: "Major Ethnic Groups", value: "6" },
      { label: "Indigenous Communities", value: "9 tribes" },
      { label: "Official Languages", value: "1 (English)" }
    ],
    dates: [
      { label: "Mashramani (Republic Day)", value: "February 23" },
      { label: "Phagwah (Holi)", value: "March (varies)" },
      { label: "Emancipation Day", value: "August 1" }
    ],
    names: ["Indo-Guyanese", "Afro-Guyanese", "Amerindian", "Chinese", "Portuguese", "Mixed"],
    locations: ["Georgetown", "Berbice", "Essequibo"],
    alphanumeric: []
  },
  "education-system": {
    sectionId: "education-system",
    sectionName: "Education System",
    keyFacts: [
      "Free education from nursery through university",
      "Growing investment in skills training and vocational education",
      "Partnerships with international institutions"
    ],
    numbers: [
      { label: "Literacy Rate", value: "88%" },
      { label: "Primary Schools", value: "400+" },
      { label: "Secondary Schools", value: "100+" }
    ],
    dates: [],
    names: ["University of Guyana", "Guyana Technical Institute"],
    locations: ["Georgetown", "New Amsterdam", "Linden"],
    alphanumeric: []
  },
  "healthcare-services": {
    sectionId: "healthcare-services",
    sectionName: "Healthcare Services",
    keyFacts: [
      "Universal healthcare system serving all citizens",
      "Expanding access to quality medical services",
      "Investment in modern facilities and equipment"
    ],
    numbers: [
      { label: "Regional Hospitals", value: "10" },
      { label: "Health Centers", value: "200+" },
      { label: "Healthcare Investment (2024)", value: "$100+ million" }
    ],
    dates: [],
    names: ["Georgetown Public Hospital", "New Amsterdam Hospital"],
    locations: ["Georgetown", "New Amsterdam", "Linden", "Bartica"],
    alphanumeric: []
  },
  "infrastructure-development": {
    sectionId: "infrastructure-development",
    sectionName: "Infrastructure Development",
    keyFacts: [
      "Major investments in roads, bridges, and transportation",
      "Expanding digital connectivity nationwide",
      "Modern ports and aviation facilities"
    ],
    numbers: [
      { label: "New Demerara Bridge Investment", value: "$260 million" },
      { label: "Road Development (2024)", value: "$500+ million" },
      { label: "Internet Penetration", value: "75%" }
    ],
    dates: [],
    names: [],
    locations: ["Demerara River", "Berbice", "East Coast Demerara"],
    alphanumeric: []
  },
  "tourism-attractions": {
    sectionId: "tourism-attractions",
    sectionName: "Tourism & Attractions",
    keyFacts: [
      "Eco-tourism destination with pristine rainforests",
      "World-famous waterfalls and wildlife",
      "Growing hospitality and tourism sector"
    ],
    numbers: [
      { label: "Annual Visitors (2024)", value: "300,000+" },
      { label: "Hotel Capacity Growth", value: "25% annually" },
      { label: "Kaieteur Falls Height", value: "741 feet" }
    ],
    dates: [],
    names: ["Kaieteur Falls", "Orinduik Falls", "Shell Beach", "Rupununi Savannahs"],
    locations: ["Potaro-Siparuni", "Barima-Waini", "Rupununi"],
    alphanumeric: []
  }
};

/**
 * Formats context data into a structured message for Tele
 */
const formatContextForTele = (context: SectionContext): string => {
  const parts: string[] = [
    `Section Context: ${context.sectionName}`,
    ""
  ];

  if (context.keyFacts.length > 0) {
    parts.push("Key Facts:");
    context.keyFacts.forEach(fact => parts.push(`- ${fact}`));
    parts.push("");
  }

  if (context.numbers.length > 0) {
    parts.push("Numbers:");
    context.numbers.forEach(num => parts.push(`- ${num.label}: ${num.value}`));
    parts.push("");
  }

  if (context.dates.length > 0) {
    parts.push("Important Dates:");
    context.dates.forEach(date => parts.push(`- ${date.label}: ${date.value}`));
    parts.push("");
  }

  if (context.names.length > 0) {
    parts.push("Names/Standards: " + context.names.join(", "));
    parts.push("");
  }

  if (context.locations.length > 0) {
    parts.push("Locations: " + context.locations.join(", "));
    parts.push("");
  }

  if (context.alphanumeric.length > 0) {
    parts.push("Technical Details:");
    context.alphanumeric.forEach(item => parts.push(`- ${item.label}: ${item.value}`));
    parts.push("");
  }

  parts.push("Use this context to understand user questions about this section and provide accurate, specific answers with these exact numbers and facts.");

  return parts.join("\n");
};

/**
 * Sends enriched context to Tele when a section is viewed
 * DISABLED: TeleAcknowledge calls removed from non-Teleglass contexts
 */
export const sendSectionContextToTele = (sectionId: string): void => {
  const context = sectionContextRegistry[sectionId];
  
  if (context) {
    // const message = formatContextForTele(context);
    // notifyTele(message);
    console.log(`[Context Enrichment] Context disabled for section: ${sectionId}`);
  } else {
    console.log(`[Context Enrichment] No context registered for section: ${sectionId}`);
  }
};

/**
 * Registers or updates context for a section
 */
export const registerSectionContext = (context: SectionContext): void => {
  sectionContextRegistry[context.sectionId] = context;
  console.log(`[Context Enrichment] Registered context for: ${context.sectionId}`);
};

/**
 * Gets context for a specific section
 */
export const getSectionContext = (sectionId: string): SectionContext | undefined => {
  return sectionContextRegistry[sectionId];
};

/**
 * Helper to extract and send custom context dynamically
 * DISABLED: TeleAcknowledge calls removed from non-Teleglass contexts
 */
export const sendCustomContext = (
  sectionName: string,
  data: {
    facts?: string[];
    numbers?: { label: string; value: string }[];
    dates?: { label: string; value: string }[];
    names?: string[];
    locations?: string[];
    alphanumeric?: { label: string; value: string }[];
  }
): void => {
  const context: SectionContext = {
    sectionId: sectionName.toLowerCase().replace(/\s+/g, "-"),
    sectionName,
    keyFacts: data.facts || [],
    numbers: data.numbers || [],
    dates: data.dates || [],
    names: data.names || [],
    locations: data.locations || [],
    alphanumeric: data.alphanumeric || []
  };

  // const message = formatContextForTele(context);
  // notifyTele(message);
  console.log(`[Context Enrichment] Custom context disabled for: ${sectionName}`);
};
