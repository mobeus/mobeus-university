import { createRoot } from 'react-dom/client';

const EMOTION_EMOJIS = {
  gratitude: ['🙏', '💚', '✨'],
  happy: ['😊', '🎉', '⭐'],
  agree: ['✓', '👍', '✅'],
  calm: ['🧘', '🕊️', '💙']
};

interface EmotionEffectProps {
  emotion: keyof typeof EMOTION_EMOJIS;
}

const EmotionEffect = ({ emotion }: EmotionEffectProps) => {
  const emojis = EMOTION_EMOJIS[emotion] || EMOTION_EMOJIS.happy;
  const emojiElements = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Medical blue stage light at top */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 animate-fade-in"
        style={{
          background: 'linear-gradient(180deg, rgba(65, 150, 217, 0.3) 0%, transparent 100%)',
          animation: 'fade-in 0.3s ease-out, fade-out 0.3s ease-out 2.7s forwards'
        }}
      />
      
      {/* Raining emojis */}
      {emojiElements.map((item) => (
        <div
          key={item.id}
          className="absolute text-4xl"
          style={{
            left: `${item.left}%`,
            top: '-50px',
            color: 'white',
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
            animation: `rain ${item.duration}s linear ${item.delay}s forwards`,
            opacity: 0.9
          }}
        >
          {item.emoji}
        </div>
      ))}
      
      <style>{`
        @keyframes rain {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const showEmotion = (emotion: keyof typeof EMOTION_EMOJIS) => {
  if (!EMOTION_EMOJIS[emotion]) {
    console.warn(`Invalid emotion: ${emotion}. Valid options: gratitude, happy, agree, calm`);
    return;
  }

  const container = document.createElement('div');
  document.body.appendChild(container);
  
  const root = createRoot(container);
  root.render(<EmotionEffect emotion={emotion} />);
  
  // Cleanup after animation
  setTimeout(() => {
    root.unmount();
    document.body.removeChild(container);
  }, 6000);
};
