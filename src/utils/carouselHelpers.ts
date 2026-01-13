// ============= CAROUSEL BUTTON CLICK TRACKING =============
// Track which carousel buttons have sent greetings (per avatar session)
const GREETING_STORAGE_KEY = "carousel-button-greetings";
const NAVIGATION_DATA_KEY = "carousel-navigation-data";

const getSessionScopedKey = (base: string): string => {
  const sessionId = sessionStorage.getItem("avatar-session-id") || "preconnect";
  return `${base}:${sessionId}`;
};

export const hasButtonSentGreeting = (buttonKey: string): boolean => {
  try {
    const key = getSessionScopedKey(GREETING_STORAGE_KEY);
    const sent = sessionStorage.getItem(key);
    const sentButtons = sent ? JSON.parse(sent) : {};
    return !!sentButtons[buttonKey];
  } catch {
    return false;
  }
};

export const markButtonGreetingSent = (buttonKey: string): void => {
  try {
    const key = getSessionScopedKey(GREETING_STORAGE_KEY);
    const sent = sessionStorage.getItem(key);
    const sentButtons = sent ? JSON.parse(sent) : {};
    sentButtons[buttonKey] = true;
    sessionStorage.setItem(key, JSON.stringify(sentButtons));
  } catch {
    // Silent failure
  }
};

export const getStoredNavigationData = (buttonKey: string): any => {
  try {
    const key = getSessionScopedKey(NAVIGATION_DATA_KEY);
    const stored = sessionStorage.getItem(key);
    const navigationData = stored ? JSON.parse(stored) : {};
    return navigationData[buttonKey] || null;
  } catch {
    return null;
  }
};

export const storeNavigationData = (buttonKey: string, data: any): void => {
  try {
    const key = getSessionScopedKey(NAVIGATION_DATA_KEY);
    const stored = sessionStorage.getItem(key);
    const navigationData = stored ? JSON.parse(stored) : {};
    navigationData[buttonKey] = data;
    sessionStorage.setItem(key, JSON.stringify(navigationData));
  } catch {
    // Silent failure
  }
};

// ============= CAROUSEL BUTTON GREETINGS =============
// These messages use people-benefit anchoring to guide AI responses toward human impact
export const CAROUSEL_BUTTON_GREETINGS: Record<string, string> = {
  // Diaspora Connect Card
  "Diaspora Connect - Latest Updates": "Show me the latest diaspora updates - specifically how these community connections are strengthening ties for Guyanese families living abroad",
  "Diaspora Connect - Upcoming Events": "What diaspora events are coming up - and how they're helping overseas Guyanese stay connected to their homeland and culture",
  "Diaspora Connect - Resources": "What resources are available for the diaspora - particularly those helping families maintain connections and contribute to Guyana's development",

  // Economic Growth Card
  "Economic Growth - Key Indicators": "Show me Guyana's key economic indicators - especially how this growth is creating opportunities for local families and communities",
  "Economic Growth - Growth Sectors": "Which sectors are driving economic growth - and how they're generating jobs and prosperity for Guyanese workers",
  "Economic Growth - Future Forecasts": "What are the economic forecasts for Guyana - particularly how this growth will improve living standards for ordinary citizens",

  // Resource Fund Card
  "Resource Fund - Fund Management": "How is the Resource Fund being managed - specifically how it's protecting wealth for future generations of Guyanese",
  "Resource Fund - Investments": "Where is the Resource Fund investing - and how these investments are building long-term prosperity for all Guyanese families",
  "Resource Fund - Transparency": "Show me the Resource Fund transparency measures - particularly how citizens can see their national wealth being responsibly managed",

  // Infrastructure Card
  "Infrastructure - Major Projects": "What are the major infrastructure projects - especially how they're improving daily life and connectivity for communities across Guyana",
  "Infrastructure - Timeline": "Show me the infrastructure development timeline - and when families can expect better roads, bridges, and services in their areas",
  "Infrastructure - Impact": "What's the impact of infrastructure development - specifically how it's reducing travel times and improving access for rural communities",

  // Tech & Innovation Card
  "Tech & Innovation - Innovation Hubs": "Tell me about Guyana's innovation hubs - particularly how they're creating tech opportunities for young Guyanese entrepreneurs",
  "Tech & Innovation - ICT Development": "What's happening with ICT development - and how improved connectivity is helping families access education and opportunities",
  "Tech & Innovation - Digital Gov": "Show me digital government initiatives - especially how they're making services faster and easier for everyday citizens",

  // Workforce Growth Card
  "Workforce Growth - Development": "What workforce development programs exist - specifically how they're helping Guyanese workers gain skills for better-paying careers",
  "Workforce Growth - Skills Training": "Tell me about skills training opportunities - and how they're preparing local workers for jobs in growing industries",
  "Workforce Growth - Programs": "What workforce programs are available - particularly those helping young people and families access quality employment",

  // Trade & Exports Card
  "Trade & Exports - Export Sectors": "Which sectors are leading exports - and how this trade is creating jobs and income for Guyanese producers and workers",
  "Trade & Exports - Trade Partners": "Show me Guyana's trade partnerships - specifically how they're opening markets and opportunities for local businesses",
  "Trade & Exports - Diversification": "How is trade being diversified - particularly how it's creating stable income sources for families beyond traditional sectors",

  // Environmental Strategy Card
  "Environmental Strategy - Climate Action": "What climate actions is Guyana taking - and how they're protecting communities from environmental risks while preserving livelihoods",
  "Environmental Strategy - Biodiversity": "Show me biodiversity protection efforts - especially how they're safeguarding natural resources that communities depend on",
  "Environmental Strategy - Sustainability": "Tell me about sustainability initiatives - particularly how they're balancing development with protecting the environment for future generations",

  // Tourism Growth Card
  "Tourism Growth - Attractions": "What are Guyana's main tourism attractions - and how developing them is creating jobs and income for local communities",
  "Tourism Growth - Infrastructure": "Show me tourism infrastructure development - specifically how it's improving facilities and services that benefit both visitors and residents",
  "Tourism Growth - Growth Data": "What's the tourism growth data showing - particularly how increased visitors are bringing economic benefits to local families and businesses",

  // Education Card
  "Education - Access": "Show me education access improvements - especially how more children across all regions are getting quality learning opportunities",
  "Education - Quality": "What's being done to improve education quality - and how better teaching and resources are preparing students for successful futures",
  "Education - Investment": "Tell me about education investments - particularly how funding is creating better schools and opportunities for Guyanese children",

  // Healthcare Card
  "Healthcare - Access": "How is healthcare access improving - specifically how families in remote areas are getting better medical services and care",
  "Healthcare - Infrastructure": "Show me healthcare infrastructure developments - and how new facilities and equipment are improving care for all Guyanese",
  "Healthcare - Outcomes": "What are the healthcare outcomes showing - particularly how improved services are helping families live healthier, longer lives",

  // Culture & Heritage Card
  "Culture & Heritage - Traditions": "Tell me about Guyanese cultural traditions - especially how preserving them strengthens community identity and pride",
  "Culture & Heritage - Preservation": "What heritage preservation efforts are underway - and how they're protecting the cultural legacy for future generations of Guyanese",
  "Culture & Heritage - Business Startup": "Show me business startup opportunities - particularly how new entrepreneurs can contribute to Guyana's economic growth while supporting their families",

  // Geography & Nature Card
  "Geography & Nature - Mountains & Ranges": "Tell me about Guyana's mountains and ranges - particularly how these natural features support ecotourism and create income opportunities for local communities",
  "Geography & Nature - Rivers & Waterways": "Show me Guyana's rivers and waterways - especially how they connect remote communities and support livelihoods through fishing and transportation",
  "Geography & Nature - Waterfalls & Cascades": "What are Guyana's major waterfalls - and how developing these natural attractions is bringing tourism revenue and jobs to surrounding areas",

  // Cities & Towns Card
  "Cities & Towns - Georgetown Capital": "Tell me about Georgetown - specifically how the capital's development is creating opportunities and improving services for residents and businesses",
  "Cities & Towns - Major Towns": "Show me Guyana's major towns - and how they're growing as regional economic hubs that support local families and enterprises",
  "Cities & Towns - Regional Centers": "What's happening in regional centers - particularly how development is bringing services, jobs, and opportunities to interior communities",

  // Historical Events Card
  "Historical Events - Precolonial Era": "Tell me about Guyana's precolonial history - especially how preserving indigenous heritage honors ancestral knowledge and strengthens cultural identity",
  "Historical Events - Colonial Period": "Show me the colonial period history - and how understanding this past helps address present inequalities and build a fairer future",
  "Historical Events - Independence Journey": "What was Guyana's path to independence - particularly how this journey shaped national identity and continues inspiring progress today",

  // Landmarks & Monuments Card
  "Landmarks & Monuments - Natural Landmarks": "Show me Guyana's natural landmarks - especially how protecting and promoting these sites creates sustainable tourism jobs for communities",
  "Landmarks & Monuments - Historic Sites": "Tell me about historic sites - and how preserving them celebrates heritage while attracting visitors who support local economies",
  "Landmarks & Monuments - Cultural Monuments": "What cultural monuments exist in Guyana - particularly how they strengthen national pride and educate future generations about their heritage",

  // Infrastructure & Transport Card
  "Infrastructure & Transport - Roads & Highways": "Show me road and highway development - specifically how better roads reduce travel times and open economic opportunities for rural families",
  "Infrastructure & Transport - Water & Ports": "Tell me about ports and water transport - and how improved maritime infrastructure facilitates trade and creates jobs for coastal communities",
  "Infrastructure & Transport - Air & Aviation": "What's happening with airports and aviation - particularly how better air connectivity helps remote communities access services and opportunities",

  // International Relations Card
  "International Relations - Regional Integration": "Show me Guyana's regional integration efforts - especially how CARICOM partnerships create trade opportunities and benefits for local businesses",
  "International Relations - Diplomacy & Ties": "Tell me about Guyana's diplomatic relationships - and how these international connections attract investment and create opportunities for citizens",
  "International Relations - Border Relations": "What's the status of border relations - particularly how resolving territorial issues and cooperation secure prosperity and peace for border communities",
};
