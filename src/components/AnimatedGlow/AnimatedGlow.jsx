import React from 'react';

const AnimatedGlow = () => {
    return (
        <div className="blobs-container">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
            <style>{`
                .blobs-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: -2;
                    overflow: hidden;
                    pointer-events: none;
                    opacity: 0.6;
                }
                .blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(140px);
                    animation: move 25s infinite alternate ease-in-out;
                }
                .blob-1 {
                    width: 600px;
                    height: 600px;
                    background: rgba(255, 0, 136, 0.15);
                    top: -10%;
                    left: -10%;
                }
                .blob-2 {
                    width: 500px;
                    height: 500px;
                    background: rgba(255, 0, 136, 0.1);
                    bottom: -10%;
                    right: -10%;
                    animation-duration: 30s;
                }
                .blob-3 {
                    width: 400px;
                    height: 400px;
                    background: rgba(255, 0, 136, 0.08);
                    top: 40%;
                    left: 40%;
                    animation-duration: 20s;
                }
                @keyframes move {
                    from { transform: translate(0, 0) scale(1.1); }
                    to { transform: translate(15%, 15%) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default AnimatedGlow;
