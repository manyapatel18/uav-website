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
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const slides = [
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80"
  ];

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
    { title: "Wedding Sangeet", desc: "Electrifying sound and dazzling lighting that turn your celebration into a spectacular experience.", img: "https://i.pinimg.com/1200x/a8/1e/1f/a81e1fd8c1e93ff9488dcc5c3585280d.jpg" },
    { title: "Corporate Events", desc: "High-impact audio visual solutions designed to elevate your brand presence and audience engagement.", img: "https://i.pinimg.com/1200x/7f/7d/6a/7f7d6ae187d883e5ae18dea5d737254e.jpg" },
    { title: "LED Screen Mapping", desc: "Brilliant, high-definition LED displays that create unforgettable visual statements.", img: "https://i.pinimg.com/1200x/9d/71/04/9d7104f9cc0f9482245dd8d61d2ab894.jpg" },
    { title: "Conferences", desc: "Precision-driven AV setups ensuring seamless communication and professional excellence.", img: "https://i.pinimg.com/1200x/4f/bf/c6/4fbfc68d02738dde6feb47c1a331d77d.jpg" },
    { title: "Live Streaming", desc: "Crystal-clear live broadcasts that connect your event to audiences anywhere, anytime.", img: "https://i.pinimg.com/1200x/ad/17/52/ad1752b41ce3c70d4722e6c02e4cdd24.jpg" },
    { title: "Professional Sound Systems", desc: "Powerful, perfectly balanced audio engineered for clarity, depth, and impact.", img: "https://i.pinimg.com/1200x/01/bc/a0/01bca003dee9b13317bc635169813b1d.jpg" },
    { title: "Lighting & Truss Setup", desc: "Dynamic lighting designs and robust truss structures that transform stages into showpieces.", img: "https://i.pinimg.com/1200x/9f/68/0f/9f680f58ca534068a667312ba98f852c.jpg" },
    { title: "Visual Mapping", desc: "Immersive projection and visual mapping that redefine space with innovation and creativity.", img: "https://i.pinimg.com/1200x/c7/1e/37/c71e3716d162eb8d61ae39f58b9fce0b.jpg" },
  ];

  const testimonials = [
    { name: "Siddharth Rao", role: "CEO, TechGlobal India", text: "Utkarsh Audio Visual is our go-to partner for all corporate summits. Their technical precision is unmatched in Vadodara." },
    { name: "Ananya Desai", role: "Celebrity Wedding Planner", text: "They turned our vision into reality. The LED wall clarity and sound balance were perfect for the 2000+ guest list." },
    { name: "Vikram Singh", role: "Festival Organizer", text: "Reliability is key in live concerts, and after 23 years, the Utkarsh team still delivers the best performance every time." }
  ];

  const galleryCategories = ["All", "Wedding", "Corporate", "Concerts", "LED Walls", "Lighting"];

  const galleryImages = [
    // Wedding
    { url: "https://i.pinimg.com/1200x/cd/6e/88/cd6e885d68128227099b24474775215c.jpg", category: "Wedding" },
    { url: "https://i.pinimg.com/1200x/bc/58/e7/bc58e72c0827170817c7569f688849b3.jpg", category: "Wedding" },
    { url: "https://i.pinimg.com/1200x/31/32/79/3132798e2730a907106093322d64020a.jpg", category: "Wedding" },
    { url: "https://i.pinimg.com/1200x/41/7d/c1/417dc17b7324867184cc8d92997103f6.jpg", category: "Wedding" },
    { url: "https://i.pinimg.com/1200x/ca/95/43/ca954382e239716e254ff91605f1eb0d.jpg", category: "Wedding" },
    { url: "https://i.pinimg.com/1200x/7f/7d/6a/7f7d6ae187d883e5ae18dea5d737254e.jpg", category: "Wedding" },

    // Corporate
    { url: "https://i.pinimg.com/1200x/4f/bf/c6/4fbfc68d02738dde6feb47c1a331d77d.jpg", category: "Corporate" },
    { url: "https://i.pinimg.com/1200x/c7/1e/37/c71e3716d162eb8d61ae39f58b9fce0b.jpg", category: "Corporate" },
    { url: "https://i.pinimg.com/1200x/ad/17/52/ad1752b41ce3c70d4722e6c02e4cdd24.jpg", category: "Corporate" },
    { url: "https://i.pinimg.com/1200x/01/bc/a0/01bca003dee9b13317bc635169813b1d.jpg", category: "Corporate" },
    { url: "https://i.pinimg.com/1200x/9d/71/04/9d7104f9cc0f9482245dd8d61d2ab894.jpg", category: "Corporate" },
    { url: "https://i.pinimg.com/1200x/a8/1e/1f/a81e1fd8c1e93ff9488dcc5c3585280d.jpg", category: "Corporate" },

    // Concerts
    { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745", category: "Concerts" },
    { url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4", category: "Concerts" },
    { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", category: "Concerts" },
    { url: "https://images.unsplash.com/photo-1514525253361-bee8718a7c73", category: "Concerts" },
    { url: "https://images.unsplash.com/photo-1459749411177-042180ce673c", category: "Concerts" },
    { url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81", category: "Concerts" },

    // LED Walls
    { url: "https://i.pinimg.com/1200x/a1/b2/c3/a1b2c3d4e5f6g7h8i9j0.jpg", category: "LED Walls" },
    { url: "https://i.pinimg.com/1200x/9d/71/04/9d7104f9cc0f9482245dd8d61d2ab894.jpg", category: "LED Walls" },
    { url: "https://i.pinimg.com/1200x/7f/7d/6a/7f7d6ae187d883e5ae18dea5d737254e.jpg", category: "LED Walls" },
    { url: "https://i.pinimg.com/1200x/4f/bf/c6/4fbfc68d02738dde6feb47c1a331d77d.jpg", category: "LED Walls" },
    { url: "https://i.pinimg.com/1200x/c7/1e/37/c71e3716d162eb8d61ae39f58b9fce0b.jpg", category: "LED Walls" },
    { url: "https://i.pinimg.com/1200x/01/bc/a0/01bca003dee9b13317bc635169813b1d.jpg", category: "LED Walls" },
  ];

  const filteredGallery = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openImage = (index) => {
    setSelectedImage(index);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % filteredGallery.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    // Add your Web3Forms access key here
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

  return (
    <div className="App" ref={containerRef}>
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
              transition={{ duration: 1.2 }}
              className="slide"
              style={{ backgroundImage: `url(${slides[currentSlide]})` }}
            />
          </AnimatePresence>
        </div>
        <div className="hero-overlay" />

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
              <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80" alt="Utkarsh AV Production" />
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
              >
                <img src={service.img} alt={service.title} className="service-bg-img" />
                <div className="service-number">{index + 1 < 10 ? `0${index + 1}` : index + 1}</div>
                <div className="service-content">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} style={{ textAlign: 'center', marginTop: '4rem' }}>
            <a href="#gallery" className="btn-primary" onClick={() => setShowGallery(true)}>
              View Picture Gallery <ArrowRight size={20} style={{ marginLeft: '12px' }} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <motion.h2 {...fadeInUp} className="section-title">
            EVENT <span>GALLERY</span>
          </motion.h2>

          <div className="gallery-filter">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            <AnimatePresence mode='popLayout'>
              {filteredGallery.map((img, index) => (
                <motion.div
                  layout
                  key={img.url + index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="gallery-item"
                  onClick={() => openImage(index)}
                >
                  <img src={img.url} alt={`Gallery ${index}`} loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="category-tag">{img.category}</span>
                    <i className="fa-solid fa-expand"></i>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox"
            onClick={() => setSelectedImage(null)}
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
              src={filteredGallery[selectedImage].url}
              alt="Full view"
            />
            <button className="nav-lightbox next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              <ChevronRight size={40} />
            </button>
            <div className="lightbox-info">
              <span>{filteredGallery[selectedImage].category}</span>
              <p>{selectedImage + 1} / {filteredGallery.length}</p>
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
            <a href="#gallery">Gallery</a>
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
