import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Clock3,
  Menu,
  Send,
  Sparkles,
  Utensils,
  X
} from "lucide-react";
import { motion } from "framer-motion";

const A = "/assets/";

const asset = (name) => `${A}${name}`;

const sections = [
  ["home", "HOME"],
  ["tea-blend", "Tea Blend"],
  ["parathzzaa", "Parathzzaa"],
  ["franchise", "Franchise"],
  ["models", "Models"],
  ["contact", "Contact"]
];

function ScrollLink({ id, children, onClick, active, className = "" }) {
  return (
    <button
      className={`nav-btn ${active ? "active" : ""} ${className}`.trim()}
      onClick={() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}

function InstagramColorfulLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <defs>
        <radialGradient id="footer-ig-grad" cx="20%" cy="105%" r="130%" fx="20%" fy="105%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <circle cx="17" cy="17" r="17" fill="url(#footer-ig-grad)" />
      <rect x="9" y="9" width="16" height="16" rx="4.8" stroke="#FFFFFF" strokeWidth="1.9" fill="none" />
      <circle cx="17" cy="17" r="3.9" stroke="#FFFFFF" strokeWidth="1.9" fill="none" />
      <circle cx="21.5" cy="12.5" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

function YouTubeColorfulLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="17" r="17" fill="#FF0000" />
      <path
        d="M25 13.6c-.2-.8-.8-1.4-1.5-1.6C22.2 11.6 17 11.6 17 11.6s-5.2 0-6.5.4c-.7.2-1.3.8-1.5 1.6-.4 1.4-.4 4.4-.4 4.4s0 3 .4 4.4c.2.8.8 1.4 1.5 1.6 1.3.4 6.5.4 6.5.4s5.2 0 6.5-.4c.7-.2 1.3-.8 1.5-1.6.4-1.4.4-4.4.4-4.4s0-3-.4-4.4z"
        fill="#FFFFFF"
      />
      <polygon points="15.4,19.6 20.2,17 15.4,14.4" fill="#FF0000" />
    </svg>
  );
}

function FacebookColorfulLogo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="17" r="17" fill="#1877F2" />
      <path
        d="M21.5 17.5l.6-4.1h-4V10.7c0-1.2.6-2.3 2.4-2.3h1.8V4.9s-1.6-.3-3.2-.3c-3.2 0-5.3 1.9-5.3 5.5v3.1H10v4.1h3.8v10c.8.1 1.6.2 2.4.2.8 0 1.6-.1 2.4-.2v-10h2.9z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

const menuPages = [
  { id: 1, file: "menu-page-1.jpg", alt: "IPC Menu - Appetizers & Stuffed Parathas (Page 1/5)" },
  { id: 2, file: "menu-page-2.jpg", alt: "IPC Menu - Rolls, Combos, Sides & Rice (Page 2/5)" },
  { id: 3, file: "menu-page-3.jpg", alt: "IPC Menu - Parathzzza & Hot Blends (Page 3/5)" },
  { id: 4, file: "menu-page-4.jpg", alt: "IPC Menu - Chai, Tea & Cold Blends (Page 4/5)" },
  { id: 5, file: "menu-page-5.jpg", alt: "IPC Menu - Milkshakes & Desserts (Page 5/5)" },
];

function MenuModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="menu-overlay" onClick={onClose}>
      <motion.div
        className="menu-modal pdf-view"
        initial={{ opacity: 0, scale: 0.96, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 25 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Clean title and close button only */}
        <div className="menu-header">
          <div>
            <div className="menu-eyebrow">INDIAN PARATHA COMPANY</div>
            <h2 className="menu-title">Chai Paratha <em>&amp; Comfort Food</em></h2>
          </div>
          <button className="menu-close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Mobile-Optimized Sequential Page Scroll */}
        <div className="menu-image-scroll">
          <div className="menu-pages-list">
            {menuPages.map((p) => (
              <img
                key={p.id}
                src={asset(p.file)}
                alt={p.alt}
                className="menu-page-img"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div className="menu-footer">
          <Utensils size={14} /> Good Food ❤️ Good Mood · Freshly Prepared · Vegetarian
        </div>
      </motion.div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: "-20% 0px -55% 0px" }
    );

    ["home", ...sections.map(([id]) => id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      {showMenuModal && <MenuModal onClose={() => setShowMenuModal(false)} />}
      <header className="navbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>
            <img src={asset("p1_img1.png")} alt="Indian Paratha Company logo" />
            <span>
              <strong>INDIAN PARATHA</strong>
              <small>CHAI PARATHA & MORE</small>
            </span>
          </button>

          <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
            {sections.map(([id, label]) => (
              <ScrollLink key={id} id={id} active={active === id} onClick={() => setMenuOpen(false)}>
                {label}
              </ScrollLink>
            ))}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={16} /></a>
          </nav>

          <button className="mobile-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <Hero onMenuOpen={() => setShowMenuModal(true)} />
        <Manifesto />
        <Story />
        <Visionaries />
        <Innovation />
        <RetailProduct />
        <Parathzzaa />
        <Franchise />
        <Models />
        <Contact />
      </main>

      <footer className="footer">
        <div className="footer-top">
          <img src={asset("p11_img1.png")} alt="Indian Paratha Company" className="footer-logo" />
          <div>
            <div className="footer-title">A journey of flavour.<br />A promise of flavour.</div>
            <p>CHAI PARATHA & MORE</p>
          </div>
          <div className="footer-right">
            <div className="footer-links">
              <ScrollLink id="story">Story</ScrollLink>
              <ScrollLink id="franchise">Franchise</ScrollLink>
              <ScrollLink id="contact">Contact</ScrollLink>
              <a href="https://www.google.com/maps/place/Indian+Paratha+Company-Chai+Paratha+%26+More/@13.2623363,77.7163226,17z/data=!4m7!3m6!1s0x3bb1e293f78e5707:0x8a5f952b5fe6a4b!8m2!3d13.2623363!4d77.7163226!10e9!16s%2Fg%2F11b6nr8ktr!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="footer-map-link">Google Maps</a>
            </div>
            <div className="footer-socials">
              <a href="https://www.instagram.com/indianparathacompany?stkn=cDhoY3V4cWJiNGNu" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">
                <InstagramColorfulLogo />
              </a>
              <a href="https://youtube.com/@indianparathacompany6661?si=gIL1jMVrxGIStcip" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-link">
                <YouTubeColorfulLogo />
              </a>
              <a href="https://www.facebook.com/share/1BkF6H7jeR/" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-link">
                <FacebookColorfulLogo />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Indian Paratha Company. All rights reserved.</span>
          <span>Built around fresh food, Indian roots & modern QSR thinking.</span>
        </div>
      </footer>

      {showTop && (
        <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <ArrowUp />
        </button>
      )}
    </div>
  );
}

function Hero({ onMenuOpen }) {
  return (
    <section id="home" className="hero navy-section">
      <div className="hero-content">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="eyebrow">CHAI PARATHA & MORE</div>
          <h1>A JOURNEY<br />OF <em>FLAVOUR</em>,<br />A PROMISE<br />OF <em>FLAVOUR</em></h1>
          <p className="hero-sub">A brand born in India, inspired by its land — serving warmth, freshness and familiar flavours with a modern QSR spirit.</p>
          <div className="hero-actions">
            <a href="#franchise" className="btn btn-gold">Explore Franchise <ArrowUpRight size={18} /></a>
            <button className="btn btn-outline" onClick={onMenuOpen}>Explore Menu <Utensils size={18} /></button>
            <a href="#story" className="btn btn-outline">Discover IPC <ArrowDown size={18} /></a>
          </div>
        </motion.div>
        <motion.div className="hero-logo-card" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: .15 }}>
          <img src={asset("p1_img1.png")} alt="IPC logo" />
        </motion.div>
      </div>
      <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} /></div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto navy-section">
      <div className="manifesto-grid">
        <div className="vertical-label">THE SOUL OF IPC</div>
        <div className="manifesto-copy">
          <div className="section-kicker">THE SOUL <span>OF</span> IPC</div>
          <h2>Food that feels like <em>home.</em></h2>
          <p>From the heart of India, where spices tell stories, where every meal is a melody, rich with old glories. We rise with the sun, kneading dreams with our hands.</p>
          <p>Serving warmth, love, and flavours so grand. Not just food, but a feeling we share — a bite of tradition, a moment of care.</p>
          <p className="quote">“No shortcuts. No compromise. Only fresh, wholesome meals — pure, real and wise.”</p>
        </div>
        <div className="manifesto-photo">
          <img src={asset("p2_img1.png")} alt="IPC location and team" />
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="section cream">
      <div className="section-heading">
        <div className="section-kicker">A BRAND WITH A <span>SOUL</span></div>
        <h2>From highway stop<br />to <em>food destination.</em></h2>
        <p>IPC was created to make roadside food feel reliable, hygienic, nutritious and memorable while preserving the soul of Indian flavours.</p>
      </div>
      <div className="story-layout">
        <div className="story-image tall">
          <img src={asset("p3_img1.jpeg")} alt="IPC founders" />
        </div>
        <div className="story-main">
          <div className="big-year">2014</div>
          <h3>Rooted in tradition.<br /><em>Driven by innovation.</em></h3>
          <p>In 2014, Nirmal & Gunjan Sandhu created Indian Paratha Company — a premium, modern QSR concept inspired by India’s culinary heritage and designed for today’s fast-paced lifestyle.</p>
          <p>Located along NH7 (Bangalore-Hyderabad Highway), IPC grew into a destination for travellers, families, bikers, corporates and food lovers.</p>
          <div className="pill-row">
            <span>Fresh</span><span>Vegetarian</span><span>Jain</span><span>Vegan</span>
          </div>
        </div>
        <div className="story-image second">
          <img src={asset("p2_img1.png")} alt="IPC chalet" />
        </div>
      </div>
    </section>
  );
}

function Visionaries() {
  return (
    <section id="visionaries" className="section peach">
      <div className="split-heading">
        <div>
          <div className="section-kicker">MEET THE</div>
          <h2>Visionaries<br /><em>Behind IPC</em></h2>
        </div>
        <p>Nirmal & Gunjan Sandhu are passionate food entrepreneurs committed to fresh, premium-quality Indian food. Their next generation, Sumreen & Naman, bring global expertise in patisserie and hotel management.</p>
      </div>
      <div className="vision-grid">
        <div className="vision-card">
          <span>01</span>
          <h3>Nirmal & Gunjan</h3>
          <p>Founders who built the brand around wholesome food, consistency and a premium experience for travellers and urban consumers.</p>
        </div>
        <div className="vision-card dark-card">
          <span>02</span>
          <h3>Sumreen & Naman</h3>
          <p>The next generation, strengthening IPC with global hospitality, patisserie and modern food-business expertise.</p>
        </div>
      </div>
    </section>
  );
}

function Innovation() {
  return (
    <section id="innovation" className="section cream innovation">
      <div className="innovation-copy">
        <div className="section-kicker">A BRAND ROOTED IN TRADITION, DRIVEN BY</div>
        <h2>Innovation</h2>
        <p className="lead">Bringing healthy, authentic Indian flavours to the modern world.</p>
        <p>The Indian food industry is booming, yet quality dining options on highways remain scarce. IPC changed that with freshly prepared, wholesome offerings and a contemporary European-style setting.</p>
        <div className="innovation-list">
          <div><Check /> Fresh ingredients</div>
          <div><Check /> No artificial additives</div>
          <div><Check /> No deep-freezing</div>
          <div><Check /> Regional Indian flavours</div>
        </div>
      </div>
      <div className="innovation-visual">
        <img className="innovation-product" src={asset("p5_img1.png")} alt="IPC food product" />
        <img className="innovation-location" src={asset("p5_img2.png")} alt="IPC location" />
      </div>
    </section>
  );
}

function RetailProduct() {
  const [packs, setPacks] = useState(1);

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi IPC, I would like to order ${packs} pack(s) of IPC Premium Tea Blend (100% Upper Assam Granules). Please share the pricing, payment and delivery details!`
    );
    return `https://wa.me/919880883061?text=${text}`;
  };

  return (
    <section id="tea-blend" className="section retail-section">
      <div className="retail-layout">
        <div className="retail-visual">
          <div className="retail-badge">RETAIL SPECIAL</div>
          <img
            src={asset("tea-blend.png")}
            alt="IPC Premium Tea Blend - 100% Upper Assam Granules"
            className="retail-product-img"
          />
        </div>

        <div className="retail-content">
          <div className="section-kicker">OUR SIGNATURE RETAIL PRODUCT</div>
          <h2>IPC Premium<br /><em>Tea Blend</em></h2>
          <div className="script-title">A perfect cup, a brighter you.</div>

          <p className="retail-desc">
            Sourced directly from the lush tea gardens of Upper Assam, IPC Premium Tea Blend delivers the bold, full-bodied flavour and rich aroma that Indian tea lovers cherish. Tradition, freshness, and warmth in every single sip.
          </p>

          <div className="retail-highlights">
            <div className="highlight-pill">
              <strong>100%</strong>
              <span>Upper Assam Granules</span>
            </div>
            <div className="highlight-pill">
              <strong>STRONG</strong>
              <span>Rich &amp; Refreshing</span>
            </div>
            <div className="highlight-pill">
              <strong>PREMIUM</strong>
              <span>Finest Quality Leaves</span>
            </div>
            <div className="highlight-pill">
              <strong>AROMA</strong>
              <span>Deep Golden Colour</span>
            </div>
          </div>

          <div className="retail-order-card">
            <div className="order-card-header">
              <div>
                <strong>Order Directly via WhatsApp</strong>
                <p>Fresh stock delivered straight to your doorstep</p>
              </div>
              <div className="pack-counter">
                <label>Quantity:</label>
                <div className="counter-controls">
                  <button
                    type="button"
                    onClick={() => setPacks((p) => Math.max(1, p - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{packs}</span>
                  <button
                    type="button"
                    onClick={() => setPacks((p) => p + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-order-btn"
            >
              <WhatsAppLogo size={22} className="btn-wa-icon" />
              <span>Order via WhatsApp ({packs} {packs === 1 ? "Pack" : "Packs"})</span>
              <ArrowUpRight size={18} />
            </a>

            <div className="order-note">
              ⚡ Instant response &amp; door delivery available across India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Parathzzaa() {
  return (
    <section id="parathzzaa" className="section navy-section parathzzaa">
      <div className="parathzzaa-text">
        <div className="section-kicker">INTRODUCING</div>
        <h2>PARATHZZAA</h2>
        <div className="script-title">A game-changer<br />in the QSR industry.</div>
        <p>A one-of-a-kind fusion of traditional Indian Paratha and globally loved Pizza. Regional flavours meet an international format in a quick-serve product built for modern customers.</p>
        <div className="feature-grid">
          <span><Sparkles /> One-of-a-kind product</span>
          <span><Clock3 /> Quick, fresh meals</span>
          <span><Utensils /> Regional flavours</span>
        </div>
      </div>
      <div className="parathzzaa-art">
        <img src={asset("p6_img2.png")} alt="Parathzzaa" />
      </div>
    </section>
  );
}

function Franchise() {
  return (
    <section id="franchise" className="section navy-section franchise">
      <div className="franchise-intro">
        <div className="section-kicker">OWN A SLICE OF</div>
        <h2>SUCCESS WITH<br /><em>INDIAN PARATHA</em><br />COMPANY</h2>
        <p>Looking to invest in a food business? Explore IPC’s franchise opportunity, multiple models, training and operational support.</p>
        <a className="btn btn-gold" href="https://www.franchiseready.in/ipc" target="_blank" rel="noreferrer">Franchise Form <ArrowUpRight /></a>
      </div>
      <div className="franchise-photo">
        <img src={asset("p7_img1.png")} alt="IPC Parathzzaa product" />
      </div>
      <div className="franchise-side">
        <div className="mini-seal">IPC</div>
        <h3>WHY<br /><em>Franchise</em><br />WITH IPC?</h3>
        <p>A structured model combining brand support, operating systems, marketing and fresh-food practices.</p>
      </div>
    </section>
  );
}

function Models() {
  const [selected, setSelected] = useState("chalet");
  const data = {
    chalet: {
      title: "CHALET MODEL",
      area: "3,000 – 5,000 sqft",
      setup: "Starting at ₹75,00,000",
      fee: "₹10,00,000 + GST",
      roi: "24 – 30 months",
      image: "p9_img2.jpeg"
    },
    cafe: {
      title: "CAFE MODEL",
      area: "Minimum 1,200 sqft",
      setup: "Starting at ₹50,00,000",
      fee: "₹8,00,000 + GST",
      roi: "18 – 24 months",
      image: "p9_img2.jpeg"
    }
  };
  const m = data[selected];

  return (
    <section id="models" className="section cream models">
      <div className="section-heading center">
        <div className="section-kicker">TWO FRANCHISE MODELS</div>
        <h2>Choose the format<br />that fits your <em>business goals.</em></h2>
      </div>

      <div className="model-switch">
        <button className={selected === "chalet" ? "selected" : ""} onClick={() => setSelected("chalet")}>Highway Chalet</button>
        <button className={selected === "cafe" ? "selected" : ""} onClick={() => setSelected("cafe")}>Urban Café</button>
      </div>

      <motion.div className="model-card" key={selected} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <div className="model-image">
          <img src={asset(m.image)} alt={m.title} />
        </div>
        <div className="model-content">
          <div className="model-number">0{selected === "chalet" ? "1" : "2"}</div>
          <h3>{m.title}</h3>
          <div className="model-stats">
            <div><small>MINIMUM AREA</small><strong>{m.area}</strong></div>
            <div><small>SETUP COST</small><strong>{m.setup}</strong></div>
            <div><small>FRANCHISE FEE</small><strong>{m.fee}</strong></div>
            <div><small>AVERAGE ROI</small><strong>{m.roi}</strong></div>
          </div>
          <div className="included">
            <h4>WHAT’S INCLUDED?</h4>
            <ul>
              <li>End-to-end restaurant setup & branding</li>
              <li>Comprehensive staff training</li>
              <li>Marketing, advertising & customer engagement support</li>
              <li>Operational manuals & SOPs</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <div className="model-note">
        <strong>PROVEN BUSINESS. STRONG RETURNS. COMPLETE SUPPORT.</strong>
        <span>Franchise details are presented from the supplied client material and should be confirmed with IPC before publication or investment decisions.</span>
      </div>
    </section>
  );
}

function EmailLogo() {
  return (
    <span className="contact-logo" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#EA4335" />
        <rect x="7" y="10" width="18" height="12" rx="2" fill="#FFFFFF" />
        <path d="M7.5 10.5L16 16.5L24.5 10.5" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function PhoneLogo() {
  return (
    <span className="contact-logo" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#00C853" />
        <path
          d="M21.5 19.3c-1-.7-2-1.2-2.7-.4l-.8.9c-.3-.2-1.6-1-2.6-2-.9-1-1.7-2.2-2-2.6l.9-.8c.7-.7.3-1.8-.4-2.7l-1.5-1.9c-.6-.7-1.7-.8-2.3-.1l-1.1 1.1c-.8.8-1 2.2.1 4.1 1.4 2.5 3.5 5.2 6.4 7.2 2.4 1.6 4.3 1.7 5.2 1 .5-.4 1.1-1 1.5-1.6.5-.7.3-1.7-.5-2.2z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  );
}

function WhatsAppLogo({ size = 28, className = "contact-logo" }) {
  return (
    <span className={className} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#25D366" />
        <path
          d="M16 6.8c-5.1 0-9.2 4.1-9.2 9.2 0 1.6.4 3.2 1.2 4.6L6.8 25.2l4.8-1.3c1.3.7 2.8 1.1 4.4 1.1 5.1 0 9.2-4.1 9.2-9.2s-4.1-9-9.2-9zm5.4 13c-.2.6-1.3 1.1-1.8 1.2-.5.1-1.1.2-3.3-.7-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5.2.5.8 2 .9 2.2.1.2.1.3 0 .5s-.2.3-.4.5c-.2.2-.4.4-.5.6-.2.2-.4.4-.2.7.2.4.9 1.6 2 2.6 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.4-.3.7-.2.3.1 1.9.9 2.2 1.1.3.2.5.3.6.4.1.2.1 1.1-.1 1.7z"
          fill="#FFFFFF"
        />
      </svg>
    </span>
  );
}

function MapsLogo() {
  return (
    <span className="contact-logo" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#4285F4" />
        <path d="M16 7c-3.6 0-6.5 2.9-6.5 6.5 0 4.8 6.5 12.5 6.5 12.5s6.5-7.7 6.5-12.5c0-3.6-2.9-6.5-6.5-6.5zm0 8.8c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3z" fill="#FFFFFF" />
      </svg>
    </span>
  );
}

function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to send");
      setStatus("Thank you. Your enquiry has been received.");
      e.currentTarget.reset();
    } catch (err) {
      setStatus(err.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="section peach contact">
      <div className="contact-copy">
        <div className="section-kicker">JOIN THE</div>
        <h2>IPC Success<br /><em>Story Today!</em></h2>
        <p>Be part of a brand that blends India’s rich food heritage with a modern, scalable business model. Contact us to explore franchise opportunities.</p>
        <div className="contact-details">
          <a href="mailto:info@franchise-ready.in">
            <EmailLogo />
            <span>info@franchise-ready.in</span>
          </a>
          <a href="tel:+919920234431">
            <PhoneLogo />
            <span>+91 9920234431</span>
          </a>
          <a href="https://wa.me/919880883061" target="_blank" rel="noreferrer">
            <WhatsAppLogo />
            <span>+91 98808 83061</span>
          </a>
          <a href="https://www.google.com/maps/place/Indian+Paratha+Company-Chai+Paratha+%26+More/@13.2623363,77.7163226,17z/data=!4m7!3m6!1s0x3bb1e293f78e5707:0x8a5f952b5fe6a4b!8m2!3d13.2623363!4d77.7163226!10e9!16s%2Fg%2F11b6nr8ktr!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer">
            <MapsLogo />
            <span>NH7, Bangalore-Hyderabad Highway (Google Maps)</span>
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={submit}>
        <div className="form-title">START A CONVERSATION</div>
        <div className="field-row">
          <label>Full name<input required name="name" placeholder="Your name" /></label>
          <label>Phone<input required name="phone" placeholder="+91..." /></label>
        </div>
        <div className="field-row">
          <label>Email<input type="email" name="email" placeholder="you@example.com" /></label>
          <label>Preferred model
            <select name="model" defaultValue="Highway Chalet">
              <option>Highway Chalet</option>
              <option>Urban Café</option>
              <option>Not sure yet</option>
            </select>
          </label>
        </div>
        <label>Message<textarea required name="message" rows="5" placeholder="Tell us about your location, business goals or questions..." /></label>
        <button className="btn btn-dark" disabled={loading}>{loading ? "Sending..." : "Send enquiry"} <Send size={17} /></button>
        {status && <div className="form-status">{status}</div>}
      </form>
    </section>
  );
}

export default App;
