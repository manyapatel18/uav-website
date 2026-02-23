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
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const slides = [
  "/hero/hero-1.png",
  "/hero/hero-2.png",
  "/hero/hero-3.png",
  "/hero/hero-4.png",
  "/hero/hero-5.png",
  "/hero/hero-6.png"
];

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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      title: "Wedding Sangeet",
      desc: "Electrifying sound and dazzling lighting that turn your celebration into a spectacular experience.",
      detailedDesc: "From grand entrances to high-energy dance performances, we provide end-to-end AV solutions for Wedding Sangeets.",
      img: "/services/wedding/main.jpg",
      gallery: [
        "/services/wedding/1.jpg",
        "/services/wedding/2.jpg",
        "/services/wedding/3.jpg",
        "/services/wedding/4.jpg",
        "/services/wedding/5.jpg",
        "/services/wedding/6.jpg"
      ]
    },
    {
      title: "Corporate Events",
      desc: "High-impact audio visual solutions designed to elevate your brand presence and audience engagement.",
      detailedDesc: "Our corporate AV services are tailored for product launches, award ceremonies, and annual meets.",
      img: "/services/corporate/main.jpg",
      gallery: [
        "/services/corporate/1.jpg",
        "/services/corporate/2.jpg",
        "/services/corporate/3.jpg",
        "/services/corporate/4.jpg",
        "/services/corporate/5.jpg",
        "/services/corporate/6.jpg"
      ]
    },
    {
      title: "LED Screen Mapping",
      desc: "Brilliant, high-definition LED displays that create unforgettable visual statements.",
      detailedDesc: "We offer P2, P3, and P4 high-definition LED walls for both indoor and outdoor events.",
      img: "/services/led/main.jpg",
      gallery: [
        "/services/led/1.jpg",
        "/services/led/2.jpg",
        "/services/led/3.jpg",
        "/services/led/4.jpg",
        "/services/led/5.jpg",
        "/services/led/6.jpg"
      ]
    },
    {
      title: "Conferences",
      desc: "Precision-driven AV setups ensuring seamless communication and professional excellence.",
      detailedDesc: "From small board meetings to international summits, we provide specialized conferencing equipment.",
      img: "/services/conferences/main.jpg",
      gallery: [
        "/services/conferences/1.jpg",
        "/services/conferences/2.jpg",
        "/services/conferences/3.jpg",
        "/services/conferences/4.jpg",
        "/services/conferences/5.jpg",
        "/services/conferences/6.jpg"
      ]
    },
    {
      title: "Live Streaming",
      desc: "Crystal-clear live broadcasts that connect your event to audiences anywhere, anytime.",
      detailedDesc: "Expand your event's reach globally with our professional live streaming services.",
      img: "/services/streaming/main.jpg",
      gallery: [
        "/services/streaming/1.jpg",
        "/services/streaming/2.jpg",
        "/services/streaming/3.jpg",
        "/services/streaming/4.jpg",
        "/services/streaming/5.jpg",
        "/services/streaming/6.jpg"
      ]
    },
    {
      title: "Professional Sound Systems",
      desc: "Powerful, perfectly balanced audio engineered for clarity, depth, and impact.",
      detailedDesc: "Experience premium sound with our world-class audio equipment specialized in PA systems.",
      img: "/services/sound/main.jpg",
      gallery: [
        "/services/sound/1.jpg",
        "/services/sound/2.jpg",
        "/services/sound/3.jpg",
        "/services/sound/4.jpg",
        "/services/sound/5.jpg",
        "/services/sound/6.jpg"
      ]
    }
  ];

  const testimonials = [
    { name: "Siddharth Rao", role: "CEO, TechGlobal India", text: "Utkarsh Audio Visual is our go-to partner for all corporate summits. Their technical precision is unmatched in Vadodara." },
    { name: "Ananya Desai", role: "Celebrity Wedding Planner", text: "They turned our vision into reality. The LED wall clarity and sound balance were perfect for the 2000+ guest list." },
    { name: "Vikram Singh", role: "Festival Organizer", text: "Reliability is key in live concerts, and after 23 years, the Utkarsh team still delivers the best performance every time." }
  ];

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
      setSelectedImage((prev) => (prev + 1) % services[selectedService].gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedService !== null) {
      const len = services[selectedService].gallery.length;
      setSelectedImage((prev) => (prev - 1 + len) % len);
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
        particleCount={120}
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
              VADODARA'S <span className="text-stroke">TRUSTED</span><br />
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
              <p>For over two decades, Utkarsh Audio Visual has been Vadodara’s trusted leader in professional event technology. We deliver complete end-to-end audio visual solutions designed to make every event seamless, impactful, and unforgettable.</p>
              <p>Our team of experienced engineers, combined with cutting-edge equipment, ensures your message is heard with clarity and seen with precision.</p>

              <div className="stats-grid">
                <div className="stat-item">
                  <h4>5000+</h4>
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
              <img src="/about/about-main.png?v=2" alt="Utkarsh AV Production" />
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
                <img src={service.img} alt={service.title} className="service-bg-img" />
                <div className="service-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                <div className="service-content">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                  <button className="view-details-btn">
                    See Photos & Details <ArrowRight size={16} style={{ marginLeft: '8px' }} />
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
              <button className="modal-close" onClick={() => setSelectedService(null)}>
                <X size={32} />
              </button>

              <div className="modal-inner">
                <div className="modal-top-bar">
                  <div className="modal-title-area">
                    <span className="modal-index">Service {selectedService + 1}</span>
                    <h2>{services[selectedService].title}</h2>
                    <p className="modal-short-desc">{services[selectedService].desc}</p>
                  </div>
                </div>

                <div className="modal-gallery-wrapper">
                  <div className="main-gallery-grid">
                    {services[selectedService].gallery.map((img, i) => (
                      <motion.div
                        key={i}
                        className="gallery-card"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedImage(i)}
                      >
                        <img src={img} alt={`${services[selectedService].title} ${i}`} />
                        <div className="card-hover-overlay">
                          <i className="fa-solid fa-expand"></i>
                          <span>View Full Size</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer-info">
                  <p>{services[selectedService].detailedDesc.substring(0, 100)}...</p>
                </div>
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
              src={services[selectedService].gallery[selectedImage]}
              alt="Full view"
            />
            <button className="nav-lightbox next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <ChevronRight size={40} />
            </button>
            <div className="lightbox-info">
              <span>{services[selectedService].title}</span>
              <p>{selectedImage + 1} / {services[selectedService].gallery.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <input type="hidden" name="subject" value="New Inquiry from Utkarsh Audio Visual Website" />
                  <input type="hidden" name="from_name" value="Utkarsh AV Inquiry" />
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
            <p>&copy; {new Date().getFullYear()} Utkarsh Audio Visual. 23+ Years of Event Excellence.</p>
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
