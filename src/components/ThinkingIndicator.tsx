import React, { useEffect, useRef, useCallback } from "react";

interface ThinkingIndicatorProps {
    isActive: boolean;
}

/**
 * ThinkingIndicator - MBUX Squirl Animation
 * 
 * The iconic Mercedes-Benz flowing wave line that appears
 * when the voice assistant is listening/thinking.
 * A single elegant undulating curve that flows horizontally.
 */
export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
    isActive,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const isActiveRef = useRef(isActive);
    const fadeOpacityRef = useRef(0);
    const timeRef = useRef(0);

    useEffect(() => {
        isActiveRef.current = isActive;
    }, [isActive]);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        // Handle fade in/out
        const targetOpacity = isActiveRef.current ? 1 : 0;
        fadeOpacityRef.current += (targetOpacity - fadeOpacityRef.current) * 0.08;

        // Stop animation when fully faded out
        if (!isActiveRef.current && fadeOpacityRef.current < 0.01) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }

        // Increment time
        timeRef.current += 0.025;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Center the wave
        const centerY = height / 2;
        const waveWidth = Math.min(width * 0.4, 400); // Max 400px or 40% of screen
        const startX = (width - waveWidth) / 2;
        const endX = startX + waveWidth;

        // Draw multiple layered waves for depth (no blur for crisp look)
        const layers = [
            { amplitude: 12, frequency: 3, speed: 1, opacity: 0.15, blur: 0, width: 3 },
            { amplitude: 10, frequency: 3.5, speed: 1.2, opacity: 0.3, blur: 0, width: 2.5 },
            { amplitude: 8, frequency: 4, speed: 1.5, opacity: 0.6, blur: 0, width: 2 },
            { amplitude: 6, frequency: 4.5, speed: 1.8, opacity: 1, blur: 0, width: 1.5 },
        ];

        layers.forEach((layer) => {
            ctx.save();

            if (layer.blur > 0) {
                ctx.filter = `blur(${layer.blur}px)`;
            }

            // Create gradient for the wave - using Flamingo Purple (#9B5DE5 = hsl(270, 70%, 65%))
            const gradient = ctx.createLinearGradient(startX, 0, endX, 0);
            const alpha = layer.opacity * fadeOpacityRef.current;
            gradient.addColorStop(0, `hsla(270, 70%, 65%, 0)`);
            gradient.addColorStop(0.15, `hsla(270, 70%, 70%, ${alpha * 0.5})`);
            gradient.addColorStop(0.5, `hsla(270, 70%, 75%, ${alpha})`);
            gradient.addColorStop(0.85, `hsla(270, 70%, 70%, ${alpha * 0.5})`);
            gradient.addColorStop(1, `hsla(270, 70%, 65%, 0)`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = layer.width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Draw the flowing wave
            const segments = 100;
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const x = startX + t * waveWidth;

                // Multiple sine waves combined for organic flow
                const wave1 = Math.sin(t * Math.PI * layer.frequency + timeRef.current * layer.speed) * layer.amplitude;
                const wave2 = Math.sin(t * Math.PI * (layer.frequency * 0.5) + timeRef.current * layer.speed * 0.7) * (layer.amplitude * 0.3);
                const wave3 = Math.sin(t * Math.PI * (layer.frequency * 2) + timeRef.current * layer.speed * 1.3) * (layer.amplitude * 0.15);

                // Envelope to fade at edges
                const envelope = Math.sin(t * Math.PI);
                const y = centerY + (wave1 + wave2 + wave3) * envelope;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
            ctx.restore();
        });

        // Add subtle glow particles along the wave (very few, very subtle)
        const particleCount = 5;
        for (let i = 0; i < particleCount; i++) {
            const t = (i / particleCount + timeRef.current * 0.1) % 1;
            const x = startX + t * waveWidth;

            const wave = Math.sin(t * Math.PI * 4 + timeRef.current * 1.5) * 8;
            const envelope = Math.sin(t * Math.PI);
            const y = centerY + wave * envelope;

            const alpha = envelope * fadeOpacityRef.current * 0.6;

            // Soft particle glow - using Flamingo Purple
            const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, 6);
            particleGradient.addColorStop(0, `hsla(270, 70%, 80%, ${alpha})`);
            particleGradient.addColorStop(0.5, `hsla(270, 70%, 70%, ${alpha * 0.3})`);
            particleGradient.addColorStop(1, `hsla(270, 70%, 65%, 0)`);

            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = particleGradient;
            ctx.fill();
        }

        animationFrameRef.current = requestAnimationFrame(animate);
    }, []);

    // Handle resize
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = 80 * dpr; // 80px height for the wave area
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = "80px";

            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.scale(dpr, dpr);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Start/stop animation
    useEffect(() => {
        if (isActive) {
            if (!animationFrameRef.current) {
                timeRef.current = 0;
                animate();
            }
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [isActive, animate]);

    // Keep animation running during fade out
    useEffect(() => {
        if (!isActive && fadeOpacityRef.current > 0.01 && !animationFrameRef.current) {
            animate();
        }
    }, [isActive, animate]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed left-0 w-full pointer-events-none z-[100]"
            style={{
                top: "20px", // Closer to the top
                height: "80px",
                background: "transparent",
            }}
        />
    );
};

export default ThinkingIndicator;
