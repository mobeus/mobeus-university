/**
 * showTelly: Out-of-Picture Conversational Interactions
 * Click UI → Send prompt to Tele → Navigate to content
 */

import { playGlassSound } from './glassSound';

// Core function: sends prompt to Tele
export const showTelly = async (label: string, context?: string) => {
  const prompt = context ? `Show me ${label} in the ${context} context` : `Show me ${label}`;

  // Connect avatar if needed
  const wasConnected = (window as any).isAvatarConnected?.() || false;
  const handleConnect = (window as any).handleConnectAvatar;

  if (handleConnect && !wasConnected) {
    await handleConnect();
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Wait for UIFramework
  let attempts = 0;
  while (!window.UIFramework?.TellTele && attempts < 50) {
    await new Promise(resolve => setTimeout(resolve, 400));
    attempts++;
  }

  // Send to Tele
  window.UIFramework?.TellTele?.(prompt);
};

// Create click handler for use case cards
export const createUseCaseClickHandler = (
  id: string,
  title: string,
  description: string,
  playSound?: () => void
) => async (e: React.MouseEvent<HTMLDivElement>) => {
  // Sound
  if (playSound) {
    playSound();
  } else {
    await playGlassSound().catch(() => { });
  }

  // Ripple effect
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  ripple.className = "absolute rounded-full bg-white/10 pointer-events-none animate-glass-ripple";

  card.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1200);

  await showTelly(`${id}: ${title} - ${description}`, "use case");
};

// Create click handler for pathway/matrix cards
export const createPathwayClickHandler = (
  pathway: string,
  title: string,
  playSound?: () => void
) => async (e: React.MouseEvent<HTMLDivElement>) => {
  // Sound
  if (playSound) {
    playSound();
  } else {
    await playGlassSound().catch(() => { });
  }

  // Ripple effect
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
  ripple.className = "absolute rounded-full bg-white/10 pointer-events-none animate-glass-ripple";

  card.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1200);

  await showTelly(title, pathway);
};

// Generic button click handler
export const createButtonClickHandler = (
  label: string,
  context?: string,
  playSound?: () => void
) => async () => {
  if (playSound) {
    playSound();
  } else {
    await playGlassSound().catch(() => { });
  }
  await showTelly(label, context);
};
