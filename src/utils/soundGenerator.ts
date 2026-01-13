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