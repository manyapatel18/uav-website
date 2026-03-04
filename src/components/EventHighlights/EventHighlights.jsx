import React from 'react';
import { motion } from 'framer-motion';
import './EventHighlights.css';

const galleryImages = [
    "/gallery/1.webp",
    "/gallery/2.webp",
    "/gallery/3.webp",
    "/gallery/4.webp",
    "/gallery/5.webp",
    "/gallery/6.webp",
    "/gallery/7.webp",
    "/gallery/8.webp",
    "/gallery/9.webp",
    "/gallery/10.webp",
    "/gallery/11.webp",
    "/gallery/12.webp",
    "/gallery/13.webp",
    "/gallery/14.webp",
    "/gallery/15.webp",
    "/gallery/16.webp",
];

const EventHighlights = () => {
    const fadeInUp = {
        initial: { opacity: 0, scale: 0.98 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    return (
        <section id="highlights" className="highlights-section">
            <div className="container">
                <motion.div {...fadeInUp} className="section-header">
                    <h2 className="section-title">
                        EVENT <span>HIGHLIGHTS</span>
                    </h2>
                </motion.div>
            </div>

            <div className="modern-gallery-container">
                <div className="scrolling-ribbon">
                    {[...galleryImages, ...galleryImages].map((img, i) => (
                        <div className="ribbon-item" key={i}>
                            <div className="image-frame">
                                <img src={img} alt={`Highlight ${i}`} loading="lazy" />
                                <div className="frame-shine"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventHighlights;
