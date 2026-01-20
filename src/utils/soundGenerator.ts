/**
 * UNIFIED GLASS SOUND SYSTEM
 * All sounds use the elegant Teleglass UI sound architecture
 * 
 * Three sound personalities:
 * - 'chat' (C5): Soft, conversational - for generic interactions
 * - 'mic' (E5): Bright, clear - for use case selections
 * - 'avatar' (G5): Deep, spatial - for navigation
 */

// Singleton AudioContext for UI sounds
let uiAudioContext: AudioContext | null = null;

const getUIAudioContext = (): AudioContext | null => {
  if (!uiAudioContext) {
    try {
      uiAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      if (uiAudioContext.state === 'suspended') {
        uiAudioContext.resume();
      }
    } catch (error) {
      return null;
    }
  }
  return uiAudioContext;
};

/**
 * Plays a UI sound effect for all interface interactions
 * @param type - 'on' for activation sound, 'off' for deactivation sound
 * @param buttonType - 'chat', 'mic', or 'avatar' determines the frequency
 * @param volumeMultiplier - Volume multiplier from 0 to 1 (default 1)
 */
export const playUISound = (type: 'on' | 'off', buttonType: 'chat' | 'mic' | 'avatar', volumeMultiplier: number = 1) => {
  try {
    const ctx = getUIAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const frequencies = {
      chat: 523.25,   // C5 - Soft, conversational
      mic: 659.25,    // E5 - Bright, clear
      avatar: 783.99  // G5 - Deep, spatial
    };

    const baseFreq = frequencies[buttonType];

    const oscillators = [];
    const gainNodes = [];

    for (let i = 0; i < 2; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      oscillators.push(osc);
      gainNodes.push(gain);
    }

    const clampedVolume = Math.max(0, Math.min(1, volumeMultiplier));

    if (type === 'on') {
      oscillators[0].frequency.setValueAtTime(baseFreq, ctx.currentTime);
      oscillators[1].frequency.setValueAtTime(baseFreq * 1.25, ctx.currentTime);

      oscillators.forEach((osc, i) => {
        osc.type = 'sine';
        gainNodes[i].gain.setValueAtTime(0, ctx.currentTime);
        gainNodes[i].gain.exponentialRampToValueAtTime(0.03 * clampedVolume, ctx.currentTime + 0.02);
        gainNodes[i].gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      });
    } else {
      oscillators[0].frequency.setValueAtTime(baseFreq * 1.25, ctx.currentTime);
      oscillators[1].frequency.setValueAtTime(baseFreq, ctx.currentTime);

      oscillators.forEach((osc, i) => {
        osc.type = 'sine';
        gainNodes[i].gain.setValueAtTime(0, ctx.currentTime);
        gainNodes[i].gain.exponentialRampToValueAtTime(0.02 * clampedVolume, ctx.currentTime + 0.01);
        gainNodes[i].gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      });
    }
  } catch (error) {
    console.warn("Sound playback failed", error);
  }
};

// ============================================================
// THINKING SOUND SYSTEM
// A subtle, pulsing ambient tone that plays while Tele is thinking
// Limited to MAX 3 plays per thinking session
// ============================================================

const thinkingOscillators: OscillatorNode[] = [];
const thinkingGainNodes: GainNode[] = [];
const thinkingLFO: OscillatorNode | null = null;
let isThinkingSoundPlaying = false;
let thinkingSoundPlayCount = 0;
const MAX_THINKING_SOUND_PLAYS = 3;

/**
 * Starts a light, warm chime sound for the "thinking" state
 * Creates a gentle, short bell-like tone that repeats softly
 * Limited to MAX 3 plays per thinking session
 */
export const playThinkingSound = (): void => {
  // Skip if already playing or if we've hit the max plays limit
  if (isThinkingSoundPlaying) return;
  if (thinkingSoundPlayCount >= MAX_THINKING_SOUND_PLAYS) return;

  try {
    const ctx = getUIAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Increment play counter
    thinkingSoundPlayCount++;
    isThinkingSoundPlaying = true;

    // Play the initial chime
    playWarmChime(ctx);

    // Repeat the chime every 2.5 seconds while thinking
    const chimeInterval = setInterval(() => {
      if (!isThinkingSoundPlaying) {
        clearInterval(chimeInterval);
        return;
      }
      playWarmChime(ctx);
    }, 2500);

    // Store interval reference for cleanup
    (window as any).__thinkingChimeInterval = chimeInterval;

  } catch (error) {
    console.warn("Thinking sound failed to start", error);
    isThinkingSoundPlaying = false;
  }
};

/**
 * Plays a single warm, light chime - short and pleasant
 */
const playWarmChime = (ctx: AudioContext): void => {
  // Warm major triad - E5, G#5, B5 (higher = lighter, major = warmer)
  const frequencies = [659.25, 830.61, 987.77];
  const duration = 0.6; // Short duration
  const maxGain = 0.008; // Very quiet

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Triangle wave is softer/warmer than sine
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Quick fade in, then decay (like a soft bell)
    const attackTime = 0.02;
    const decayTime = duration - attackTime;
    const staggerDelay = i * 0.03; // Slight arpeggio effect

    gain.gain.setValueAtTime(0, ctx.currentTime + staggerDelay);
    gain.gain.linearRampToValueAtTime(maxGain * (1 - i * 0.2), ctx.currentTime + staggerDelay + attackTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + staggerDelay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + staggerDelay);
    osc.stop(ctx.currentTime + staggerDelay + duration + 0.1);
  });
};

/**
 * Stops the thinking sound
 * Resets the play counter for the next thinking session
 */
export const stopThinkingSound = (): void => {
  if (!isThinkingSoundPlaying) return;

  try {
    // Clear the chime interval
    if ((window as any).__thinkingChimeInterval) {
      clearInterval((window as any).__thinkingChimeInterval);
      delete (window as any).__thinkingChimeInterval;
    }

    // Reset state immediately (chimes are self-stopping)
    isThinkingSoundPlaying = false;
    thinkingSoundPlayCount = 0; // Reset counter for next session

  } catch (error) {
    console.warn("Thinking sound failed to stop", error);
    // Force cleanup
    if ((window as any).__thinkingChimeInterval) {
      clearInterval((window as any).__thinkingChimeInterval);
      delete (window as any).__thinkingChimeInterval;
    }
    isThinkingSoundPlaying = false;
    thinkingSoundPlayCount = 0;
  }
};