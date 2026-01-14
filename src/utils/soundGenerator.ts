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

let thinkingOscillators: OscillatorNode[] = [];
let thinkingGainNodes: GainNode[] = [];
let thinkingLFO: OscillatorNode | null = null;
let isThinkingSoundPlaying = false;
let thinkingSoundPlayCount = 0;
const MAX_THINKING_SOUND_PLAYS = 3;

/**
 * Starts a subtle pulsing ambient sound for the "thinking" state
 * Creates an ethereal, minimal pulse that won't compete with voice
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

    const startGain = 0.0075; // Reduced by 50%
    const minGain = startGain * 0.5; // Never go below 50%

    // Create main oscillators - soft harmonic tones
    const frequencies = [261.63, 392.00]; // C4 and G4 - perfect fifth

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Very quiet - almost subliminal
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(startGain, ctx.currentTime + 0.5); // Fade in

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);

      thinkingOscillators.push(osc);
      thinkingGainNodes.push(gain);
    });

    // Create LFO for pulsing effect
    thinkingLFO = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    thinkingLFO.type = 'sine';
    thinkingLFO.frequency.setValueAtTime(0.8, ctx.currentTime); // ~1Hz pulse
    lfoGain.gain.setValueAtTime(0.008, ctx.currentTime); // Subtle modulation depth

    thinkingLFO.connect(lfoGain);

    // Connect LFO to modulate the gain of main oscillators
    thinkingGainNodes.forEach(gain => {
      lfoGain.connect(gain.gain);
    });

    thinkingLFO.start(ctx.currentTime);

    // Gradually reduce volume over time, but never below 50%
    let currentGain = startGain;
    const fadeInterval = setInterval(() => {
      if (!isThinkingSoundPlaying) {
        clearInterval(fadeInterval);
        return;
      }

      // Reduce by 10% every 2 seconds
      currentGain = Math.max(minGain, currentGain * 0.9);

      thinkingGainNodes.forEach(gain => {
        try {
          gain.gain.linearRampToValueAtTime(currentGain, ctx.currentTime + 0.3);
        } catch (_) { }
      });
    }, 2000);

    // Store interval reference for cleanup
    (window as any).__thinkingFadeInterval = fadeInterval;

  } catch (error) {
    console.warn("Thinking sound failed to start", error);
    isThinkingSoundPlaying = false;
  }
};

/**
 * Stops the thinking sound with a smooth fade out
 * Resets the play counter for the next thinking session
 */
export const stopThinkingSound = (): void => {
  if (!isThinkingSoundPlaying) return;

  try {
    const ctx = getUIAudioContext();
    if (!ctx) return;

    // Clear the fade interval
    if ((window as any).__thinkingFadeInterval) {
      clearInterval((window as any).__thinkingFadeInterval);
      delete (window as any).__thinkingFadeInterval;
    }

    const fadeOutTime = 0.3;

    // Fade out all gain nodes
    thinkingGainNodes.forEach(gain => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeOutTime);
    });

    // Stop oscillators after fade
    setTimeout(() => {
      thinkingOscillators.forEach(osc => {
        try { osc.stop(); } catch (_) { }
      });
      if (thinkingLFO) {
        try { thinkingLFO.stop(); } catch (_) { }
      }

      thinkingOscillators = [];
      thinkingGainNodes = [];
      thinkingLFO = null;
      isThinkingSoundPlaying = false;
      thinkingSoundPlayCount = 0; // Reset counter for next session
    }, fadeOutTime * 1000 + 50);

  } catch (error) {
    console.warn("Thinking sound failed to stop", error);
    // Force cleanup
    if ((window as any).__thinkingFadeInterval) {
      clearInterval((window as any).__thinkingFadeInterval);
      delete (window as any).__thinkingFadeInterval;
    }
    thinkingOscillators = [];
    thinkingGainNodes = [];
    thinkingLFO = null;
    isThinkingSoundPlaying = false;
    thinkingSoundPlayCount = 0; // Reset counter for next session
  }
};