import { useCallback, useRef } from 'react';
import { playUISound } from '@/utils/soundGenerator';
import { playGlassSound } from '@/utils/glassSound';
import { useVolume } from '@/contexts/VolumeContext';

/**
 * UNIFIED GLASS SOUND HOOK
 * All sounds use the elegant Teleglass UI architecture
 */
export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const { volume } = useVolume();

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Glass sound for showTelly interactions (special rich sound)
  const playGlassClick = useCallback(async () => {
    if (volume === 0) return;
    try {
      const ctx = initAudioContext();
      await playGlassSound(ctx, volume / 100);
    } catch (error) {
      // Silent error handling
    }
  }, [initAudioContext, volume]);

  // Navigation sound - deep spatial (avatar tone)
  const playSectionSound = useCallback(async () => {
    if (volume === 0) return;
    try {
      playUISound('on', 'avatar', volume / 100);
    } catch (error) {
      // Silent error handling
    }
  }, [volume]);

  // Use case clicks - bright crystalline (mic tone)
  const playUseCaseSound = useCallback(async () => {
    if (volume === 0) return;
    try {
      playUISound('on', 'mic', volume / 100);
    } catch (error) {
      // Silent error handling
    }
  }, [volume]);

  // Chat interactions - soft conversational (chat tone)
  const playChatSound = useCallback(async () => {
    if (volume === 0) return;
    try {
      playUISound('on', 'chat', volume / 100);
    } catch (error) {
      // Silent error handling
    }
  }, [volume]);

  // Generic interactions - default to chat tone
  const playUniversalSound = useCallback(async () => {
    if (volume === 0) return;
    try {
      playUISound('on', 'chat', volume / 100);
    } catch (error) {
      // Silent error handling
    }
  }, [volume]);

  // Generic click - ensures audio context is active
  const playClick = useCallback(() => {
    // Resume audio context on user interaction (browser autoplay policy)
    const ctx = initAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    void playUniversalSound();
  }, [initAudioContext, playUniversalSound]);

  // Teleglass specific
  const playTeleglassSound = useCallback(() => {
    void playUniversalSound();
  }, [playUniversalSound]);

  return {
    playUniversalSound,
    playGlassClick,
    playClick,
    playSectionSound,
    playUseCaseSound,
    playChatSound,
    playTeleglassSound,
  };
};