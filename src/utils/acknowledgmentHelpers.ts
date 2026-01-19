import { sendToTele } from "./teleInteraction";

const getTodayToken = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const buildAuthToken = (dateToken: string): string => {
  const reversed = dateToken.split("").reverse().join("");
  return reversed.repeat(2);
};

// Global debug state for TeleAcknowledge notifications
let showTeleAcknowledgeDebug = false;

/**
 * Toggle debug notifications for TeleAcknowledge calls
 */
export function toggleTeleAcknowledgeDebug(): boolean {
  showTeleAcknowledgeDebug = !showTeleAcknowledgeDebug;
  return showTeleAcknowledgeDebug;
}

/**
 * Get current debug state
 */
export function isTeleAcknowledgeDebugEnabled(): boolean {
  return showTeleAcknowledgeDebug;
}

/**
 * Sends a message to the Tele assistant (virtual avatar)
 * This is a centralized utility to interact with the UIFramework's TeleAcknowledge function
 * @param message - The message to send to the Tele assistant
 */
export function notifyTele(message: string): void {
  if (!message || typeof message !== "string") {
    console.warn("[notifyTele] Invalid message provided:", message);
    return;
  }

  try {
    // Dispatch event to signal thinking started (for cursor indicator)
    window.dispatchEvent(new CustomEvent('teleThinkingStart', { detail: { message } }));

    // Subtle flash on avatar for visual feedback (no sound)
    const teleNav = (window as any).teleNavigation;
    if (teleNav?.flashTeleSubtle) {
      teleNav.flashTeleSubtle();
    }

    sendToTele(message);

    // Show debug notification if enabled
    if (showTeleAcknowledgeDebug) {
      import("@/hooks/use-toast").then(({ toast }) => {
        toast({
          title: "Tele Notification",
          description: message,
          duration: 10000,
        });
      });
    }
  } catch (error) {
    console.error("[notifyTele] Error sending message:", error);
  }
}

interface AcknowledgmentConfig {
  key: string;
  message: string;
}

type AcknowledgmentId =
  // Proposal sections
  | "proposal-overview"
  | "proposal-value"
  | "proposal-leverage"
  | "proposal-alignment"
  // Technology sections
  | "any-model"
  | "any-cloud"
  | "any-experience"
  // Solution sections
  | "solution-overview"
  | "solution-speed"
  | "solution-economics"
  | "solution-risk"
  // Navigation & UI actions
  | "nav-back"
  | "nav-scroll-top"
  | "nav-menu-open"
  | "nav-menu-close"
  | "copy-deeplink"
  | "error-reset"
  | "error-reload"
  | "chat-accept"
  | "chat-decline"
  // Starter section actions
  | "starter-copy-code"
  | "starter-contact"
  | "starter-learn-more"
  // Evidence section
  | "evidence-copy"
  | "evidence-followup"
  // Things I Can Do
  | "capture-followup"
  | "speak-language"
  | "schedule-meeting"
  // Menu actions
  | "menu-followup"
  | "menu-scheduling"
  | "menu-suggest"
  | "menu-responses"
  // Take Message section
  | "message-request-info"
  | "message-clarify"
  | "message-other"
  // Scheduling section
  | "schedule-workshop"
  | "schedule-checkin"
  | "schedule-qa"
  // Carousel navigation
  | "carousel-nav"
  // NDA Firewall users
  | "nda-brijesh"
  | "nda-maurice"
  | "nda-lee"
  | "nda-miles"
  | "nda-kieron"
  | "nda-tuhin"
  | "nda-dan"
  | "nda-james"
  | "nda-simon"
  | "nda-sujay"
  | "nda-venkata"
  | "nda-vinay"
  | "nda-yann"
  | "nda-ahmet"
  | "nda-nima"
  | "nda-joe"
  | "nda-richie"
  | "nda-gene"
  | "nda-request-access";

/**
 * Configuration mapping for all acknowledgment messages
 */
const ACKNOWLEDGMENT_CONFIG: Record<AcknowledgmentId, AcknowledgmentConfig> = {
  // Proposal sections
  "proposal-overview": {
    key: "proposalOverviewAcknowledged",
    message: "Show me about the comprehensive national development information being reviewed",
  },
  "proposal-value": {
    key: "proposalValueAcknowledged",
    message: "Show me about the measurable business value and ROI for warranty operations",
  },
  "proposal-leverage": {
    key: "proposalLeverageAcknowledged",
    message: "Show me about the technology leverage and integration capabilities",
  },
  "proposal-alignment": {
    key: "proposalAlignmentAcknowledged",
    message: "Show me about the strategic alignment with Guyana's development goals",
  },

  // Technology sections
  "any-model": {
    key: "anyModelAcknowledged",
    message: "Show me about AI model flexibility and multi-provider support",
  },
  "any-cloud": {
    key: "anyCloudAcknowledged",
    message: "Show me about cloud-native architecture and deployment options",
  },
  "any-experience": {
    key: "anyExperienceAcknowledged",
    message: "Show me about omnichannel user experience capabilities",
  },

  // Solution sections
  "solution-overview": {
    key: "solutionOverviewAcknowledged",
    message: "Show me about the comprehensive solution architecture and capabilities",
  },
  "solution-speed": {
    key: "solutionSpeedAcknowledged",
    message: "Show me about rapid deployment and time-to-value strategies",
  },
  "solution-economics": {
    key: "solutionEconomicsAcknowledged",
    message: "Show me about cost optimization and measurable ROI",
  },
  "solution-risk": {
    key: "solutionRiskAcknowledged",
    message: "Show me about compliance, security, and governance frameworks",
  },

  // Navigation & UI actions
  "nav-back": {
    key: "navBackAcknowledged",
    message: "Show me that we are navigating back to the welcome screen",
  },
  "nav-scroll-top": {
    key: "navScrollTopAcknowledged",
    message: "Show me that we are scrolling to the top of the page",
  },
  "nav-menu-open": {
    key: "navMenuOpenAcknowledged",
    message: "Show me that the navigation menu is opening",
  },
  "nav-menu-close": {
    key: "navMenuCloseAcknowledged",
    message: "Show me that the navigation menu is closing",
  },
  "copy-deeplink": {
    key: "copyDeeplinkAcknowledged",
    message: "Show me that the deep link has been copied to the clipboard",
  },
  "error-reset": {
    key: "errorResetAcknowledged",
    message: "Show me that the error boundary is being reset",
  },
  "error-reload": {
    key: "errorReloadAcknowledged",
    message: "Show me that the application is reloading",
  },
  "chat-accept": {
    key: "chatAcceptAcknowledged",
    message: "Show me that the chat invitation has been accepted",
  },
  "chat-decline": {
    key: "chatDeclineAcknowledged",
    message: "Show me that the chat invitation has been declined",
  },

  // Starter section actions
  "starter-copy-code": {
    key: "starterCopyCodeAcknowledged",
    message: "Show me that the code snippet is being copied for implementation",
  },
  "starter-contact": {
    key: "starterContactAcknowledged",
    message: "Show me that the contact form is opening for inquiries",
  },
  "starter-learn-more": {
    key: "starterLearnMoreAcknowledged",
    message: "Show me more about tele capabilities",
  },

  // Evidence section
  "evidence-copy": {
    key: "evidenceCopyAcknowledged",
    message: "Show me that the compliance evidence data is being copied",
  },
  "evidence-followup": {
    key: "evidenceFollowupAcknowledged",
    message: "Show me that you are taking a message about evidence for RFP responders",
  },

  // Things I Can Do
  "capture-followup": {
    key: "captureFollowupAcknowledged",
    message: "Show me that if I have questions I don't see answers to, you can take that message and send it back to the RFP responders",
  },
  "speak-language": {
    key: "speakAnyLanguageAcknowledged",
    message: "Show me that I can just start speaking a different language and you will automatically change to speak in that language",
  },
  "schedule-meeting": {
    key: "scheduleMeetingsAcknowledged",
    message: "Show me that you can schedule meetings with the RFP responders for me",
  },

  // Menu actions
  "menu-followup": {
    key: "menuFollowupAcknowledged",
    message: "Show me that you are ready to take a message for the RFP responders",
  },
  "menu-scheduling": {
    key: "menuSchedulingAcknowledged",
    message: "Show me that you are ready to help coordinate a meeting to discuss the RFP response",
  },
  "menu-suggest": {
    key: "menuSuggestAcknowledged",
    message: "Show me that you are ready to provide helpful questions about the proposal",
  },
  "menu-responses": {
    key: "menuResponsesAcknowledged",
    message: "Show me that you are ready to show available responses and Q&A",
  },

  // Take Message section
  "message-request-info": {
    key: "messageRequestInfoAcknowledged",
    message: "Show me that you are ready to capture an information request",
  },
  "message-clarify": {
    key: "messageClarifyAcknowledged",
    message: "Show me that you are ready to answer questions to clarify information",
  },
  "message-other": {
    key: "messageOtherAcknowledged",
    message: "Show me that you are ready to capture another type of message",
  },

  // Scheduling section
  "schedule-workshop": {
    key: "scheduleWorkshopAcknowledged",
    message: "Show me that you are ready to coordinate a 2-hour collaborative workshop",
  },
  "schedule-checkin": {
    key: "scheduleCheckinAcknowledged",
    message: "Show me that you are ready to find a time for a 30-minute engagement check-in",
  },
  "schedule-qa": {
    key: "scheduleQAAcknowledged",
    message: "Show me that you are ready to book a 1-hour Q&A clarification session",
  },

  // Carousel navigation
  "carousel-nav": {
    key: "carouselNavAcknowledged",
    message: "Show me that we are navigating through carousel slides",
  },

  // NDA Firewall users
  "nda-brijesh": {
    key: "ndaBrijeshAcknowledged",
    message: "Show me that you've sent the security code to Brijesh's email and ask him to tell you the code when he receives it",
  },
  "nda-maurice": {
    key: "ndaMauriceAcknowledged",
    message: "Show me that you've sent the security code to Maurice's email and ask him to tell you the code when he receives it",
  },
  "nda-lee": {
    key: "ndaLeeAcknowledged",
    message: "Show me that you've sent the security code to Lee's email and ask him to tell you the code when he receives it",
  },
  "nda-miles": {
    key: "ndaMilesAcknowledged",
    message: "Show me that you've sent the security code to Miles's email and ask him to tell you the code when he receives it",
  },
  "nda-kieron": {
    key: "ndaKieronAcknowledged",
    message: "Show me that you've sent the security code to Kieron's email and ask him to tell you the code when he receives it",
  },
  "nda-tuhin": {
    key: "ndaTuhinAcknowledged",
    message: "Show me that you've sent the security code to Tuhin's email and ask him to tell you the code when he receives it",
  },
  "nda-dan": {
    key: "ndaDanAcknowledged",
    message: "Show me that you've sent the security code to Dan's email and ask him to tell you the code when he receives it",
  },
  "nda-james": {
    key: "ndaJamesAcknowledged",
    message: "Show me that you've sent the security code to James's email and ask him to tell you the code when he receives it",
  },
  "nda-simon": {
    key: "ndaSimonAcknowledged",
    message: "Show me that you've sent the security code to Simon's email and ask him to tell you the code when he receives it",
  },
  "nda-sujay": {
    key: "ndaSujayAcknowledged",
    message: "Show me that you've sent the security code to Sujay's email and ask him to tell you the code when he receives it",
  },
  "nda-venkata": {
    key: "ndaVenkataAcknowledged",
    message: "Show me that you've sent the security code to Venkata's email and ask him to tell you the code when he receives it",
  },
  "nda-vinay": {
    key: "ndaVinayAcknowledged",
    message: "Show me that you've sent the security code to Vinay's email and ask him to tell you the code when he receives it",
  },
  "nda-yann": {
    key: "ndaYannAcknowledged",
    message: "Show me that you've sent the security code to Yann's email and ask him to tell you the code when he receives it",
  },
  "nda-ahmet": {
    key: "ndaAhmetAcknowledged",
    message: "Show me that you've sent the security code to Ahmet's email and ask him to tell you the code when he receives it",
  },
  "nda-nima": {
    key: "ndaNimaAcknowledged",
    message: "Show me that Nima has access behind the NDA firewall now",
  },
  "nda-joe": {
    key: "ndaJoeAcknowledged",
    message: "Show me that you've sent the security code to Joe's email and ask him to tell you the code when he receives it",
  },
  "nda-richie": {
    key: "ndaRichieAcknowledged",
    message: "Show me that Richie has access behind the NDA firewall now",
  },
  "nda-gene": {
    key: "ndaGeneAcknowledged",
    message: "Show me that Gene has access behind the NDA firewall now",
  },

  "nda-request-access": {
    key: "ndaRequestAccessAcknowledged",
    message: "Show me that you are collecting information to forward to the authorization team for NDA firewall access",
  },
};

/**
 * Handle acknowledgment for a specific pill/card
 * This function checks if the acknowledgment has already been done and triggers it if needed
 *
 * @param pillId - The unique identifier for the pill/card
 * @returns true if acknowledgment was triggered, false if already acknowledged
 */
export function handleAcknowledgment(pillId: string): boolean {
  const config = ACKNOWLEDGMENT_CONFIG[pillId as AcknowledgmentId];

  console.log("[handleAcknowledgment] Called with pillId:", pillId, "Debug enabled:", showTeleAcknowledgeDebug);

  if (!config) {
    return false;
  }
  const hasAcknowledged = sessionStorage.getItem(config.key);

  console.log("[handleAcknowledgment] Has been acknowledged before:", !!hasAcknowledged);

  if (!hasAcknowledged) {
    notifyTele(config.message);
    sessionStorage.setItem(config.key, "true");
    return true;
  } else {
    console.log("[handleAcknowledgment] Already acknowledged in this session, skipping");
  }

  return false;
}

/**
 * Clear all acknowledgment flags from sessionStorage
 * This aggressively clears EVERYTHING to ensure TeleAcknowledge fires on first click after refresh
 */
export function clearAllAcknowledgments(): void {
  // Clear all known acknowledgment keys
  Object.values(ACKNOWLEDGMENT_CONFIG).forEach((config) => {
    sessionStorage.removeItem(config.key);
  });

  // Also clear any legacy or unknown acknowledgment keys
  // Pattern match for any "*Acknowledged" keys that might exist
  const keysToRemove: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.toLowerCase().includes("acknowledged")) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => sessionStorage.removeItem(key));
}

const AUTHORIZED_USERS: Record<string, string> = {
  nima: "nima@accenture.com",
};

async function sendEmailViaMcp({ to, subject, body, env = "production", cc = [], bcc = [] }) {
  const CONFIG = {
    local: {
      url: "http://localhost:3006",
      tenantDomain: "localhost:8080",
      gmailMcpId: 1,
    },
    production: {
      url: "https://mcp-api.mobeus.com",
      tenantDomain: "rfp.mobeus.com",
      gmailMcpId: 7,
    },
  };

  const config = CONFIG[env];

  const toolArguments = {
    to: Array.isArray(to) ? to : [to],
    subject,
    body,
    cc,
    bcc,
  };
  if (cc)
    toolArguments.cc = Array.isArray(cc)
      ? cc
      : String(cc)
        .split(",")
        .map((s) => s.trim());
  if (bcc)
    toolArguments.bcc = Array.isArray(bcc)
      ? bcc
      : String(bcc)
        .split(",")
        .map((s) => s.trim());

  const payload = {
    mcp_id: config.gmailMcpId,
    tool_name: "send_message",
    arguments: toolArguments,
  };

  const res = await fetch(`${config.url}/api/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // mimic what your node script sent
      Origin: `http://${config.tenantDomain}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("MCP email failed:", data);
    throw new Error(data.error || `MCP email failed with ${res.status}`);
  }
  return data;
}


async function patchSendAsViaMcp({
  sendAsEmail,
  displayName,
  replyToAddress,
  signature,
  isPrimary,
  treatAsAlias,
  env = "production",
}) {
  const CONFIG = {
    local: {
      url: "http://localhost:3006",
      tenantDomain: "localhost:8080",
      gmailMcpId: 1,
    },
    production: {
      url: "https://mcp-api.mobeus.com",
      tenantDomain: "rfp.mobeus.com",
      gmailMcpId: 7,
    },
  };
  const config = CONFIG[env];

  const toolArguments = {
    sendAsEmail,
    ...(displayName && { displayName }),
    ...(replyToAddress && { replyToAddress }),
    ...(signature && { signature }),
    ...(typeof isPrimary === 'boolean' && { isPrimary }),
    ...(typeof treatAsAlias === 'boolean' && { treatAsAlias }),
  };

  const payload = {
    mcp_id: config.gmailMcpId,
    tool_name: "patch_send_as",
    arguments: toolArguments,
  };

  const res = await fetch(`${config.url}/api/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: `http://${config.tenantDomain}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `MCP patch_send_as failed with ${res.status}`);
  }
  return data;
}

export const sendNdaAccessRequestEmail = (visitorEmail: string) => {
  const recipients = ["nima@mobeus.com", "richie@mobeus.com", "a.k.monthrope@accenture.com"];
  const body = `A visitor with the email address ${visitorEmail} requested access to NDA firewall restricted section`;

  return sendEmailViaMcp({
    to: recipients,
    subject: "NDA Firewall Access Request",
    body,
    env: "production",
  });
};

async function sendOtpEmail(email, code) {
  patchSendAsViaMcp({
    sendAsEmail: "richie@mobeus.ai",
    displayName: "Mobeus RFP tele",
    replyToAddress: "richie@mobeus.com",
    signature: "",
    isPrimary: true,
    treatAsAlias: true,
    env: "production", // or "local" if you are hitting a local server
  }).then((res) => {
    console.log("Alias updated:", res);
  }).catch((err) => {
    console.error("Error updating alias:", err);
  });

  const subject = "Accenture + Salesforce | RFP NDA Firewall Code";
  const body = `Hi, Your NDA firewall authorization code is: ${code}`;

  // change env to "local" if you want local MCP
  return sendEmailViaMcp({
    to: email,
    bcc: ["nima.azaraeen@gmail.com", "sean@mobeus.com", "richie@mobeus.com"],
    subject,
    body,
    env: "production",
  });
}

async function sendOtpSms(uuid: string, code: string) {
  const message = `Your NDA firewall authorization code is: ${code}`;
  const serverUrl = "https://prompt.mobeus.ai";

  try {
    const response = await fetch(`${serverUrl}/api/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuid,
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("SMS send failed:", errorData);
      throw new Error(errorData.error || `SMS send failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("SMS sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

const setAuthCookie = () => {
  const expectedValue = buildAuthToken(getTodayToken());
  document.cookie = `Authed=${expectedValue}; path=/; SameSite=Lax`;
};

export const sendAuthCode = async (
  name: string,
  emailToSend?: string,
  phoneToSend?: string
) => {
  let email: string = "";
  if (name) {
    const normalized = name.trim().toLowerCase().split(" ")[0];
    email = AUTHORIZED_USERS[normalized];
    if (!email) {
      return false;
    }
  } else {
    if (!emailToSend && !phoneToSend) {
      return;
    }
    email = emailToSend || "";
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  (window as any).__currentAuthCode = code;

  const hasEmail = email || emailToSend;
  const hasPhone = phoneToSend;

  // Send to appropriate channels based on what's provided
  const promises: Promise<any>[] = [];

  if (hasEmail) {
    console.log("Sending OTP via email to:", hasEmail);
    promises.push(
      sendOtpEmail(hasEmail, code).catch((error) => {
        console.error("Email send failed:", error);
        // Don't throw, allow SMS to still be attempted
      })
    );
  }

  if (hasPhone) {
    console.log("Sending OTP via SMS to UUID:", hasPhone);
    promises.push(
      sendOtpSms(hasPhone, code).catch((error) => {
        console.error("SMS send failed:", error);
        // Don't throw, allow email to still work
      })
    );
  }

  try {
    // Wait for all sends to complete (or fail)
    await Promise.allSettled(promises);
    console.log("OTP send completed for available channels");
  } catch (error) {
    console.error("Error during OTP send:", error);
    return false;
  }
};

export const verifyAuthCode = (code: string) => {
  const currentCode = (window as any).__currentAuthCode;
  if (!currentCode || typeof code !== "string") {
    return false;
  }

  if (code.trim() === currentCode) {
    setAuthCookie();
    delete (window as any).__currentAuthCode;
    return true;
  }

  return false;
};

if (typeof window !== "undefined") {
  (window as any).auther = sendAuthCode;
  (window as any).checker = verifyAuthCode;
}
