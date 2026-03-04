import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Phone as WhatsApp,
  Mail,
  MapPin,
  Phone,
  CheckCircle2,
  ArrowRight,
  Star,
  Quote,
  Clock
} from 'lucide-react';
import Navbar from './components/Navbar/Navbar';
import CursorGlow from './components/CursorGlow/CursorGlow';
import Particles from './components/Particles/Particles';
import AnimatedGlow from './components/AnimatedGlow/AnimatedGlow';
import EventHighlights from './components/EventHighlights/EventHighlights';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const slides = [
  "/hero/hero-1.webp",
  "/hero/hero-2.webp",
  "/hero/hero-3.webp",
  "/hero/hero-4.webp",
  "/hero/hero-5.webp",
  "/hero/hero-6.webp"
];

// Preload critical hero images
if (typeof window !== 'undefined') {
  slides.slice(0, 2).forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    // Disable Right-Click
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable Copy & Cut
    const handleCopy = (e) => {
      e.preventDefault();
      alert("Content protection is enabled. Copying is disabled.");
    };

    // Disable Image Dragging
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // DevTools Protection / Discouragement
    const handleKeyDown = (e) => {
      // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && e.keyCode === 85)
      ) {
        e.preventDefault();
        alert("Developer tools are disabled for security.");
      }
    };

    console.log("%cSTOP!", "color: red; font-size: 50px; font-weight: bold; -webkit-text-stroke: 1px black;");
    console.log("%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature, it is a scam.", "font-size: 20px;");

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(timer);
    };
  }, []);

  const services = [
    {
      title: "Corporate Affairs",
      desc: "We manage conferences, seminars, product launches, annual meetings, award ceremonies, and corporate retreats with precision and professionalism.",
      detailedDesc: "Our team ensures seamless execution that enhances brand value and delivers impactful business experiences.",
      img: "/services/corporate/main.webp",
      gallery: [
        "/services/corporate/1.webp",
        "/services/corporate/2.webp",
        "/services/corporate/3.webp",
        "/services/corporate/4.webp",
        "/services/corporate/5.webp",
        "/services/corporate/6.webp",
        "/services/corporate/7.webp",
        "/services/corporate/8.webp",
        "/services/corporate/9.webp"
      ]
    },
    {
      title: "Wedding Experiences",
      desc: "We specialize in Sangeet, Engagement, and Reception celebrations, delivering beautifully planned and flawlessly executed wedding functions.",
      detailedDesc: "With advanced technical setups and stunning visual effects, we create a grand and immersive experience that makes your special moments unforgettable.",
      img: "/services/wedding/main.webp",
      gallery: [
        "/services/wedding/1.webp",
        "/services/wedding/2.webp",
        "/services/wedding/3.webp",
        "/services/wedding/4.webp",
        "/services/wedding/5.webp",
        "/services/wedding/7.webp"
      ]
    },
    {
      title: "Government Event Solutions",
      desc: "We organize official ceremonies, public programs, inaugurations, awareness campaigns, and cultural festivals with structured planning and full compliance.",
      detailedDesc: "We provide end-to-end audio visual solutions including professional sound systems, LED screens, projectors, lighting setups, and live streaming services.",
      img: "/services/government/main.webp",
      gallery: [
        "/services/government/5.webp",
        "/services/government/1.webp",
        "/services/government/3.webp",
        "/services/government/2.webp",
        "/services/government/6.webp",
        "/services/government/4.webp"
      ]
    },
    {
      title: "Sports Event Excellence",
      desc: "We organize tournaments, marathons, leagues, school and college sports meets, and corporate sports events with professional planning and execution.",
      detailedDesc: "From stage setup and sound systems to LED screens, branding, and complete ground management, we deliver high-energy and well-coordinated sporting experiences.",
      img: "/services/sports/main.webp",
      gallery: [
        "/services/sports/1.webp",
        "/services/sports/2.webp",
        "/services/sports/3.webp",
        "/services/sports/4.webp",
        "/services/sports/5.webp",
        "/services/sports/6.webp",
        "/services/sports/7.webp",
        "/services/sports/8.webp",
        "/services/sports/9.webp"
      ]
    },
    {
      title: "Social & Cultural Event Solutions",
      desc: "We organize Garba nights, temple events, Katha programs, school and university events, marathons, and other community celebrations with structured planning and creative execution.",
      detailedDesc: "From stage setup and décor to sound systems, LED screens, lighting, and complete event coordination, we ensure a smooth, energetic, and memorable experience for every occasion.",
      img: "/services/social/main.webp",
      gallery: [
        "/services/social/1.webp",
        "/services/social/2.webp",
        "/services/social/3.webp",
        "/services/social/4.webp",
        "/services/social/5.webp",
        "/services/social/6.webp"
      ]
    },
    {
      title: "Sales & Services",
      desc: "We provide sales and rental of LED screens, professional sound systems, video equipment, and advanced audio-visual technology for all types of events.",
      detailedDesc: "With customized solutions tailored to your requirements, we ensure high-quality performance, technical support, and complete client satisfaction.",
      img: "/services/sales/main.webp",
      gallery: [
        "/services/sales/1.webp",
        "/services/sales/2.webp",
        "/services/sales/3.webp",
        "/services/sales/4.webp",
        "/services/sales/5.webp",
        "/services/sales/6.webp",
        "/services/sales/7.webp",
        "/services/sales/8.webp",
        "/services/sales/9.webp"
      ]
    }
  ];

  const testimonials = [
    { name: "Chintan Mehta", role: "Owner, White Lily Events", text: "Utkarsh Services delivered our corporate conference with absolute perfection. The LED setup, sound quality, and overall execution reflected true professionalism and class." },
    { name: "Dhruv Patel", role: "Dhruv Communication", text: "The team transformed our social function into a vibrant and well-organized celebration. Everything was handled with care and perfection" },
    { name: "Minesh Suthar", role: "Smit Electronics", text: "From stage setup to sound and branding, Utkarsh Services ensured our sports event ran smoothly and energetically. A truly reliable team." },
    { name: "Ashwin Parekh", role: "Director", text: "Utkarsh Services managed our NGO event with exceptional professionalism and dedication. Their audio-visual setup and coordination ensured our social initiative reached the audience effectively." }
  ];

  // Preload critical hero images
  if (typeof window !== 'undefined') {
    slides.slice(0, 2).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "bba94ff0-a2c5-45ae-8ea6-9c62c3456059");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormSubmitted(true);
        e.target.reset();
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        console.error("Error", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const nextImage = () => {
    if (selectedService !== null) {
      const len = services[selectedService].gallery.length;
      if (selectedImage === -1) {
        setSelectedImage(0);
      } else if (selectedImage === len - 1) {
        setSelectedImage(-1);
      } else {
        setSelectedImage(selectedImage + 1);
      }
    }
  };

  const prevImage = () => {
    if (selectedService !== null) {
      const len = services[selectedService].gallery.length;
      if (selectedImage === -1) {
        setSelectedImage(len - 1);
      } else if (selectedImage === 0) {
        setSelectedImage(-1);
      } else {
        setSelectedImage(selectedImage - 1);
      }
    }
  };

  return (
    <div className="App" ref={containerRef}>
      <AnimatedGlow />
      <Particles
        fullScreen={true}
        particleColors={['#ff0088']}
        moveParticlesOnHover={false}
        alphaParticles={true}
        particleCount={60}
      />
      <CursorGlow />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-slideshow">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="slide"
              style={{ backgroundImage: `url(${slides[currentSlide]})` }}
            />
          </AnimatePresence>
        </div>
        <div className="hero-overlay" />

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              title={`View slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge-container">
              <span className="experience-badge">Since 2002</span>
              <span className="years-highlight">23+ YEARS OF EXCELLENCE</span>
            </div>
            <h1>
              GUJARAT'S <span className="text-stroke">TRUSTED</span><br />
              <span className="text-gradient">AV SOLUTIONS</span>
            </h1>
            <p>
              Precision in Audio. Excellence in Visuals.
              Powering Events with Professional AV Technology
            </p>
            <div className="hero-btns">
              <a href="#contact" className="btn-primary">
                Contact Us <ArrowRight size={20} style={{ marginLeft: '12px' }} />
              </a>
              <a href="#services" className="btn-outline">Browse Services</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <motion.div {...fadeInUp} className="about-text">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                ABOUT <span>US</span>
              </h2>
              <h3>A Legacy of Technical Excellence in Event Production.</h3>
              <p>For over two decades, Utkarsh Services has been Gujarat's trusted leader in professional event technology. We deliver complete end-to-end audio visual solutions designed to make every event seamless, impactful, and unforgettable.</p>
              <p>Our team of experienced engineers, combined with cutting-edge equipment, ensures your message is heard with clarity and seen with precision.</p>

              <div className="stats-grid">
                <div className="stat-item">
                  <h4>7500+</h4>
                  <p>Successful Events</p>
                </div>
                <div className="stat-item">
                  <h4 style={{ color: 'var(--accent)' }}>23+</h4>
                  <p>Years Experience</p>
                </div>
                <div className="stat-item">
                  <h4>100%</h4>
                  <p>Client Satisfaction</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="about-image">
              <img src="/about/about-main.webp" alt="Utkarsh AV Production" loading="lazy" />
              <div className="image-accent-border"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="dark-bg">
        <div className="container">
          <motion.h2 {...fadeInUp} className="section-title">
            OUR <span>SERVICES</span>
          </motion.h2>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="service-card"
                onClick={() => setSelectedService(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="service-image-wrapper">
                  <img src={service.img} alt={service.title} className="service-card-img" loading="lazy" />
                  <div className="service-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                </div>
                <div className="service-content">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                  <button className="view-details-btn">
                    <span>Explore More</span>
                    <ArrowRight size={20} className="btn-icon" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              className="service-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >

              <div className="minimalist-portfolio-view">
                <div className="portfolio-container">
                  {/* Minimalist Header */}
                  <div className="portfolio-content-header">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="clean-title"
                    >
                      {services[selectedService].title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="clean-description"
                    >
                      {services[selectedService].desc}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="header-btn-wrap"
                    >
                      <a href="#contact" onClick={() => setSelectedService(null)} className="btn-primary" style={{ borderRadius: '50px' }}>
                        Get a Custom Quote
                      </a>
                    </motion.div>
                  </div>

                  {/* High Clarity Image Grid */}
                  <div className="high-clarity-grid">
                    {services[selectedService].gallery.map((img, i) => (
                      <motion.div
                        key={i}
                        className="clarity-item"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedImage(i)}
                      >
                        <img src={img} alt={`${services[selectedService].title} gallery ${i + 1}`} loading="lazy" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="portfolio-footer-simple">
                    <button className="back-link" onClick={() => setSelectedService(null)}>
                      <ChevronLeft size={20} /> Back to Services
                    </button>
                  </div>
                </div>

                <button className="fixed-close-btn" onClick={() => setSelectedService(null)}>
                  <X size={40} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for Service Gallery */}
      <AnimatePresence>
        {selectedImage !== null && selectedService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setSelectedImage(null)}
            style={{ zIndex: 2000 }}
          >
            <button className="close-lightbox" onClick={() => setSelectedImage(null)}>
              <X size={40} />
            </button>
            <button className="nav-lightbox prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              <ChevronLeft size={40} />
            </button>
            <motion.img
              key={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage === -1 ? services[selectedService].img : services[selectedService].gallery[selectedImage]}
              alt="Full view"
            />
            <button className="nav-lightbox next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <ChevronRight size={40} />
            </button>
            <div className="lightbox-info">
              <span>{services[selectedService].title}</span>
              <p>{selectedImage === -1 ? "Main Presentation" : `${selectedImage + 1} / ${services[selectedService].gallery.length}`}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event Highlights Horizontal Moving Photo Gallery */}
      <EventHighlights />

      {/* Testimonials */}
      <section id="testimonials">
        <div className="container">
          <motion.h2 {...fadeInUp} className="section-title">
            HAPPY <span>CLIENTS</span>
          </motion.h2>

          <div className="testimonials-grid">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                className="testimonial-card"
              >
                <Quote className="quote-icon" size={50} />
                <p className="testimonial-content">"{t.text}"</p>
                <div className="testimonial-footer">
                  <div className="author-info">
                    <h5>{t.name}</h5>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Showcase Section */}
      <section className="brand-showcase">
        <div className="container">
          <motion.div
            className="showcase-glow-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="showcase-content">
              <motion.img
                src="/logo/logo.webp?v=1"
                alt="Utkarsh Brand"
                className="showcase-logo"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="showcase-text"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="experience-pill">SINCE 2002</div>
                <h3>CREATING UNFORGETTABLE <span>EXPERIENCES</span></h3>
                <p>Leading the AV industry in Gujarat with 23+ years of technical excellence.</p>
              </motion.div>
            </div>

            {/* Background elements for the glow box */}
            <div className="glow-circle gc-1"></div>
            <div className="glow-circle gc-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-dark">
        <div className="container">
          <div className="contact-wrapper">
            <motion.div {...fadeInUp} className="contact-info-col">
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                CONTACT <span>US</span>
              </h2>
              <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Ready to discuss your next grand event? Our technical experts are here to help you plan the perfect AV setup.</p>

              <ul className="contact-links">
                <li><MapPin color="var(--accent)" /> Vadodara, Gujarat</li>
                <li><Phone color="var(--accent)" /> +91 98980 46666</li>
                <li><Mail color="var(--accent)" /> utkarshav1@yahoo.com</li>
              </ul>

              <div className="footer-socials">
                <a href="https://www.instagram.com/utkarshaudiovisual8?igsh=MWp0ZjNkNDExd3VzeA==" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram" title="Instagram">
                  <i className="fa-brands fa-instagram" style={{ fontSize: '24px' }}></i>
                </a>
                <a href="https://www.facebook.com/share/1GLspcJ1t3/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-icon-btn facebook" title="Facebook">
                  <i className="fa-brands fa-facebook-f" style={{ fontSize: '22px' }}></i>
                </a>
                <a href="https://wa.me/919898046666" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp" title="WhatsApp">
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '26px' }}></i>
                </a>
                <a href="tel:+919898046666" className="social-icon-btn phone" title="Call Us">
                  <i className="fa-solid fa-phone" style={{ fontSize: '20px' }}></i>
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="contact-form-col">
              {formSubmitted ? (
                <div className="success-message">
                  <CheckCircle2 size={60} color="var(--accent)" />
                  <h3>Sent Successfully!</h3>
                  <p>We've received your inquiry and will call you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <input type="hidden" name="subject" value="New Inquiry from Utkarsh Services Website" />
                  <input type="hidden" name="from_name" value="Utkarsh Services Inquiry" />
                  <div className="input-row">
                    <div className="input-field">
                      <input type="text" name="name" placeholder="Your Name" required />
                    </div>
                    <div className="input-field">
                      <input type="email" name="email" placeholder="Email Address" required />
                    </div>
                  </div>
                  <div className="input-field">
                    <input type="tel" name="phone" placeholder="Mobile Number" required />
                  </div>

                  <div className="input-field">
                    <textarea name="message" placeholder="Brief about your event requirements..." required></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
                    {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="luxury-footer">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="footer-nav-minimal">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Utkarsh Services - 23+ Years of Event Excellence.</p>
          </div>
        </div>
      </footer>

      {/* Floating Contact Bar */}
      <div className="floating-contact-bar">
        <a href="https://wa.me/919898046666" target="_blank" rel="noopener noreferrer" className="floating-btn wa" title="Chat on WhatsApp">
          <i className="fa-brands fa-whatsapp" style={{ fontSize: '30px' }}></i>
        </a>
        <a href="tel:+919898046666" className="floating-btn call" title="Call Now">
          <i className="fa-solid fa-phone" style={{ fontSize: '24px' }}></i>
        </a>
      </div>
    </div>
  );
};

export default App;
