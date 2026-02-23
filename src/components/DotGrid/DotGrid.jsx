import { useRef, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DotGrid = ({
    dotSize = 3,
    gap = 20,
    baseColor = "#282424",
    activeColor = "#ff00a2",
    proximity = 100,
    shockRadius = 150,
    shockStrength = 1,
    returnDuration = 1,
    resistance = 0.9,
    className = "",
    style = {}
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const dots = useRef([]);
    const mouse = useRef({ x: -1000, y: -1000 });

    const getDots = useCallback((width, height) => {
        const cols = Math.floor(width / gap);
        const rows = Math.floor(height / gap);
        const result = [];

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                result.push({
                    x: i * gap + gap / 2,
                    y: j * gap + gap / 2,
                    originX: i * gap + gap / 2,
                    originY: j * gap + gap / 2,
                    vx: 0,
                    vy: 0,
                });
            }
        }
        return result;
    }, [gap]);

    useGSAP(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrame;

        const resize = () => {
            const parent = containerRef.current;
            if (!parent) return;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            dots.current = getDots(canvas.width, canvas.height);
        };

        resize();
        window.addEventListener('resize', resize);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dots.current.forEach(dot => {
                const dx = mouse.current.x - dot.x;
                const dy = mouse.current.y - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < proximity) {
                    const force = (proximity - dist) / proximity;
                    const angle = Math.atan2(dy, dx);
                    const tx = dot.originX - Math.cos(angle) * force * 10;
                    const ty = dot.originY - Math.sin(angle) * force * 10;

                    dot.vx += (tx - dot.x) * 0.15;
                    dot.vy += (ty - dot.y) * 0.15;
                } else {
                    dot.vx += (dot.originX - dot.x) * 0.05;
                    dot.vy += (dot.originY - dot.y) * 0.05;
                }

                dot.vx *= resistance;
                dot.vy *= resistance;
                dot.x += dot.vx;
                dot.y += dot.vy;

                // Color based on distance
                const isActive = dist < proximity;
                ctx.fillStyle = isActive ? activeColor : baseColor;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
        };
    }, { scope: containerRef });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleClick = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;

            dots.current.forEach(dot => {
                const dx = cx - dot.x;
                const dy = cy - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < shockRadius) {
                    const force = (shockRadius - dist) / shockRadius;
                    const angle = Math.atan2(dy, dx);
                    dot.vx -= Math.cos(angle) * force * 20 * shockStrength;
                    dot.vy -= Math.sin(angle) * force * 20 * shockStrength;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [shockRadius, shockStrength]);

    return (
        <div
            ref={containerRef}
            className={`dot-grid-container ${className}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
                ...style
            }}
        >
            <canvas
                ref={canvasRef}
                style={{ display: 'block' }}
            />
        </div>
    );
};

export default DotGrid;
