import { useRef, useEffect } from 'react';

/**
 * Particles Component from ReactBits
 * Customizable particle background using HTML5 Canvas
 */
const Particles = ({
    particleCount = 100,
    particleSpread = 10,
    speed = 0.5,
    particleColors = ['#ff0088'],
    moveParticlesOnHover = false,
    particleHoverFactor = 1,
    alphaParticles = true,
    particleBaseSize = 100,
    sizeVariation = 3,
    className = "",
    fullScreen = false
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        let mouse = { x: 0, y: 0 };

        const resizeCanvas = () => {
            if (fullScreen) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                const parent = canvas.parentElement;
                if (parent) {
                    canvas.width = parent.offsetWidth;
                    canvas.height = parent.offsetHeight;
                }
            }
        };

        const handleMouseMove = (e) => {
            if (fullScreen) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            } else {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            }
        };

        window.addEventListener('resize', resizeCanvas);
        if (moveParticlesOnHover) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        resizeCanvas();

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
                this.radius = Math.random() * sizeVariation + 1;
                this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
                this.alpha = alphaParticles ? Math.random() * 0.4 + 0.1 : 1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.alpha;
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (moveParticlesOnHover) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        this.x -= dx * force * 0.02 * particleHoverFactor;
                        this.y -= dy * force * 0.02 * particleHoverFactor;
                    }
                }

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw lines between particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = particleColors[0];
                        ctx.globalAlpha = (150 - distance) / 1000; // Very subtle lines
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particleColors, alphaParticles, speed, particleCount, sizeVariation, moveParticlesOnHover, particleHoverFactor, fullScreen]);

    return (
        <canvas
            ref={canvasRef}
            className={`particles-canvas ${className}`}
            style={{
                display: 'block',
                width: fullScreen ? '100vw' : '100%',
                height: fullScreen ? '100vh' : '100%',
                pointerEvents: 'none',
                position: fullScreen ? 'fixed' : 'absolute',
                top: 0,
                left: 0,
                zIndex: fullScreen ? -1 : 0
            }}
        />
    );
};

export default Particles;
