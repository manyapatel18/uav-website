import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                // Direct DOM update is MUCH faster than triggering a React re-render on every mouse move
                glowRef.current.style.background = `radial-gradient(circle 400px at ${e.clientX}px ${e.clientY}px, rgba(255, 0, 136, 0.12), transparent 80%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={glowRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9999,
                background: `radial-gradient(circle 400px at 50% 50%, rgba(255, 0, 136, 0.08), transparent 80%)`,
                transition: 'background 0.05s ease-out', // Smoother motion
            }}
        />
    );
};

export default CursorGlow;
