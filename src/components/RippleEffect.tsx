import React, { useEffect } from 'react';

const RippleEffect: React.FC = () => {
    useEffect(() => {
        const createRipple = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Check if the clicked element or its parents are clickable
            // We look for:
            // 1. button tag
            // 2. a tag
            // 3. role="button"
            // 4. class "cursor-pointer"
            // 5. class "interactive-indicator"
            const clickable = target.closest('button, a, [role="button"], .cursor-pointer, .interactive-indicator');

            if (clickable) {
                const rippleContainer = document.createElement('div');
                rippleContainer.className = 'ripple-container';

                const ripple = document.createElement('div');
                ripple.className = 'ripple';

                // Position the ripple at the click coordinates
                const x = event.clientX;
                const y = event.clientY;

                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;

                rippleContainer.appendChild(ripple);
                document.body.appendChild(rippleContainer);

                // Remove the ripple after animation completes
                setTimeout(() => {
                    document.body.removeChild(rippleContainer);
                }, 600);
            }
        };

        window.addEventListener('click', createRipple);

        return () => {
            window.removeEventListener('click', createRipple);
        };
    }, []);

    return null;
};

export default RippleEffect;
