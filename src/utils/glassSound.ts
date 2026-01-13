/**
 * Glass-like sound configuration for showTelly interactions
 * Creates a gentle, floating chime that feels like glass moving through depth
 */

export interface GlassSoundConfig {
  // Primary tone (bell-like)
  primaryFreq: number;
  primaryGain: number;
  primaryAttack: number;
  primaryDecay: number;
  
  // Harmonic (adds richness)
  harmonicFreq: number;
  harmonicGain: number;
  
  // Sub tone (adds depth)
  subFreq: number;
  subGain: number;
  
  // Envelope
  duration: number;
}

export const GLASS_CLICK_SOUND: GlassSoundConfig = {
  primaryFreq: 1200, // Clear, bright tone
  primaryGain: 0.15,
  primaryAttack: 0.01,
  primaryDecay: 0.4,
  
  harmonicFreq: 2400, // Octave harmonic
  harmonicGain: 0.08,
  
  subFreq: 600, // Adds warmth
  subGain: 0.1,
  
  duration: 0.6,
};

export const playGlassSound = async (audioContext?: AudioContext, volumeMultiplier: number = 1) => {
  const ctx = audioContext || new AudioContext();
  const now = ctx.currentTime;
  const config = GLASS_CLICK_SOUND;
  const clampedVolume = Math.max(0, Math.min(1, volumeMultiplier));
  
  // Primary tone
  const primaryOsc = ctx.createOscillator();
  const primaryGain = ctx.createGain();
  primaryOsc.type = 'sine';
  primaryOsc.frequency.setValueAtTime(config.primaryFreq, now);
  primaryGain.gain.setValueAtTime(0, now);
  primaryGain.gain.linearRampToValueAtTime(config.primaryGain * clampedVolume, now + config.primaryAttack);
  primaryGain.gain.exponentialRampToValueAtTime(0.01, now + config.duration);
  primaryOsc.connect(primaryGain);
  primaryGain.connect(ctx.destination);
  primaryOsc.start(now);
  primaryOsc.stop(now + config.duration);
  
  // Harmonic
  const harmonicOsc = ctx.createOscillator();
  const harmonicGain = ctx.createGain();
  harmonicOsc.type = 'sine';
  harmonicOsc.frequency.setValueAtTime(config.harmonicFreq, now);
  harmonicGain.gain.setValueAtTime(0, now);
  harmonicGain.gain.linearRampToValueAtTime(config.harmonicGain * clampedVolume, now + config.primaryAttack);
  harmonicGain.gain.exponentialRampToValueAtTime(0.01, now + config.duration * 0.7);
  harmonicOsc.connect(harmonicGain);
  harmonicGain.connect(ctx.destination);
  harmonicOsc.start(now);
  harmonicOsc.stop(now + config.duration);
  
  // Sub tone
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(config.subFreq, now);
  subGain.gain.setValueAtTime(0, now);
  subGain.gain.linearRampToValueAtTime(config.subGain * clampedVolume, now + config.primaryAttack * 2);
  subGain.gain.exponentialRampToValueAtTime(0.01, now + config.duration);
  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(now);
  subOsc.stop(now + config.duration);
};
