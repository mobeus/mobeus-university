/**
 * Tele Interaction Utilities
 * Send prompts to Tele voice agent
 */

// Send prompt to Tele
export const sendToTele = (prompt: string, showPrompt = true): void => {
  (async () => {
    try {
      if (typeof window === "undefined") return;

      const ui: any = (window as any).UIFramework;
      const handleConnect = (window as any).handleConnectAvatar;
      const wasConnected = ui?.isConnected?.();

      // Connect avatar if needed
      if (handleConnect && !wasConnected) {
        await handleConnect();
        await new Promise(r => setTimeout(r, 1000));
      }

      // Wait for UIFramework
      let attempts = 0;
      while (!(window as any).UIFramework?.TellTele && attempts < 50) {
        await new Promise(r => setTimeout(r, 400));
        attempts++;
      }

      // Send to Tele
      const framework: any = (window as any).UIFramework;
      framework?.TellTele?.(prompt);
    } catch (e) {
      console.error("[Tele] Error:", e);
    }
  })();
};

// Prompt generators
export const generateCardPrompt = (title: string, context = "Guyana's development"): string =>
  `Show me ${title} in ${context}`;

export const generatePercentagePrompt = (value: string, title: string, trend?: string): string =>
  trend ? `Show me the ${value} achievement in ${title} with ${trend} progress` : `Show me the ${value} achievement in ${title}`;

export const generateProgressPrompt = (progress: string, title: string): string =>
  `Show me the ${progress}% progress in ${title}`;
