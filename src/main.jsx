import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const features = [
  ['Experienced Instructors', 'Certified ITF coaches with years of experience, teaching with patience and care.'],
  ['Safe, Structured Training', 'Every class is progressive and guided by clear standards for safety and respect.'],
  ['Family and Community-Focused', 'Parents and kids train together in a welcoming, inclusive environment.'],
];

const locations = [
  { area: 'Northside', name: 'Northside Dojang', address: '18 Training Way, Northside', time: 'Mon–Thu, 4:00–8:30pm' },
  { area: 'Central', name: 'Central Dojang', address: '42 Community Avenue, Central', time: 'Mon–Sat, 8:30am–8:30pm' },
  { area: 'Westside', name: 'Westside Dojang', address: '7 Victory Road, Westside', time: 'Tue–Sat, 3:30–7:30pm' },
];

const instructors = [
  ['Master David Kim', 'Chief Instructor · 5th Dan', 'Over 25 years of martial arts experience, specialising in technique, discipline and confident leadership.'],
  ['Instructor Sarah Lee', 'Children’s Instructor · 3rd Dan', 'Creates energetic, structured classes that help young students feel safe, included and capable.'],
  ['Instructor Jason Park', 'Adult & Sparring Coach · 3rd Dan', 'Focuses on practical self-defence, controlled sparring and steady personal development.'],
];

const routeName = () => window.location.hash.replace('#', '') || 'home';

function Logo() {
  return (
    <a className="logo" href="#home" aria-label="Impact Taekwondo home">
      <span className="logo-ring"><span className="logo-mark">ITF</span><span className="logo-star">★</span></span>
      <span className="logo-name">IMPACT TAEKWON-DO</span>
    </a>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div>
    </section>
  );
}

function App() {
  const [route, setRoute] = useState(routeName());
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setRoute(routeName());
      setMenuOpen(false);
      setLocationsOpen(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const baseRoute = route.split('/')[0];
  const isHome = baseRoute === 'home';

  const Header = () => (
    <header className={isHome ? 'topbar' : 'topbar topbar-solid'}>
      <Logo />
      <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
        <a className={baseRoute === 'home' ? 'active' : ''} href="#home" onClick={closeMenu}>Home</a>
        <div className="nav-dropdown">
          <button className={baseRoute === 'locations' ? 'dropdown-toggle active' : 'dropdown-toggle'} type="button" aria-expanded={locationsOpen} onClick={() => setLocationsOpen(!locationsOpen)}>
            Locations <span className="chevron">⌄</span>
          </button>
          <div className={locationsOpen ? 'dropdown-menu dropdown-open' : 'dropdown-menu'}>
            <a href="#locations" onClick={closeMenu}>All Locations</a>
            {locations.map((item) => <a key={item.area} href={`#locations/${item.area.toLowerCase()}`} onClick={closeMenu}>{item.area} Dojang</a>)}
          </div>
        </div>
        <a className={baseRoute === 'instructors' ? 'active' : ''} href="#instructors" onClick={closeMenu}>Instructors</a>
        <a className={baseRoute === 'schedule' ? 'active' : ''} href="#schedule" onClick={closeMenu}>Schedule</a>
        <a className={baseRoute === 'contact' ? 'active' : ''} href="#contact" onClick={closeMenu}>Contact</a>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Enquire Now</a>
      </nav>
    </header>
  );

  const Home = () => (
    <main>
      <section className="hero">
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Welcome to Impact Taekwon-Do Australia</p>
          <h1>Strong Minds. Strong Bodies.<br />One Community.</h1>
          <p className="hero-copy">Authentic ITF Taekwon-Do in a friendly, family-focused environment. Build confidence, fitness and discipline through lessons guided by respect, perseverance and community spirit.</p>
          <a className="button" href="#contact">Enquire Now</a>
        </div>
      </section>
      <section className="purpose">
        <div className="purpose-overlay" />
        <div className="purpose-content">
          <p className="eyebrow">Why Train with Us</p>
          <h2>Train with Purpose.<br />Grow with Confidence.</h2>
          <p className="purpose-copy">We focus on more than techniques. Our classes build strength, focus and confidence in a safe, family-friendly space.</p>
          <div className="feature-list">
            {features.map(([title, text]) => (
              <article className="feature" key={title}>
                <div className="feature-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="9" r="5" fill="none" stroke="currentColor" strokeWidth="2.2"/><path d="M7 25v-2c0-4.2 3.8-7 9-7s9 2.8 9 7v2H7Z" fill="none" stroke="currentColor" strokeWidth="2.2"/></svg></div>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="trial">
        <div className="trial-shade" />
        <div className="trial-content"><h2>Join Impact Taekwon-Do.<br />Start Your Free Trial Today!</h2><p>Take the first step toward confidence, focus and strength. Experience a class with our welcoming instructors and see how training can transform your mindset and energy.</p><a className="button" href="#contact">Get Started</a></div>
      </section>
    </main>
  );

  const Locations = () => {
    const selected = route.split('/')[1];
    const visible = selected ? locations.filter((item) => item.area.toLowerCase() === selected) : locations;
    return (
      <main className="inner-main">
        <PageHero eyebrow="Find Your Dojang" title="Our Locations" text="Choose a welcoming training community near you." />
        <section className="location-grid">
          {visible.map((item) => (
            <article className="location-card" key={item.area}>
              <div className="location-card-top"><span>{item.area}</span><b>{item.area[0]}D</b></div>
              <h2>{item.name}</h2>
              <p><strong>Address</strong>{item.address}</p>
              <p><strong>Training</strong>{item.time}</p>
              <a className="text-link" href="#contact">Enquire about this location →</a>
            </article>
          ))}
        </section>
        <section className="info-strip"><div><strong>Free introductory class</strong><span>No pressure, no uniform required</span></div><div><strong>Flexible family training</strong><span>Options for adults and children</span></div><div><strong>Beginner friendly</strong><span>Start at your own pace</span></div></section>
      </main>
    );
  };

  const Instructors = () => (
    <main className="inner-main">
      <PageHero eyebrow="Meet the Team" title="Expert, Caring Instruction" text="Dedicated coaches who guide every student with patience, clarity and respect." />
      <section className="instructor-grid">
        {instructors.map(([name, role, text], index) => (
          <article className="instructor-card" key={name}>
            <div className={`instructor-photo instructor-photo-${index + 1}`}><span>ITF</span></div>
            <h2>{name}</h2><p className="role">{role}</p><p>{text}</p>
            <a className="text-link" href="#contact">Train with {name.split(' ').at(-1)} →</a>
          </article>
        ))}
      </section>
      <section className="values-row"><div><b>01</b><h3>Respect</h3><p>We build an environment where every person is valued.</p></div><div><b>02</b><h3>Perseverance</h3><p>Progress comes through patient, consistent effort.</p></div><div><b>03</b><h3>Integrity</h3><p>Training develops character beyond the dojang.</p></div></section>
    </main>
  );

  const Schedule = () => (
    <main className="inner-main">
      <PageHero eyebrow="Training Times" title="Find a Class" text="Beginner-friendly sessions for children, teens and adults." />
      <section className="schedule-section">
        <div className="schedule-table">
          <div className="schedule-head"><span>Class</span><span>Age</span><span>Time</span><span>Location</span></div>
          {[
            ['Junior Beginners', '5–8 years', 'Mon / Wed · 4:00pm', 'Northside'],
            ['Junior Development', '9–12 years', 'Tue / Thu · 5:00pm', 'Central'],
            ['Teen & Adult Basics', '13+ years', 'Mon / Wed · 6:30pm', 'Central'],
            ['Advanced Training', 'All belts', 'Tue / Thu · 7:30pm', 'Westside'],
            ['Saturday Family Class', 'Families', 'Sat · 9:30am', 'All locations'],
          ].map((row) => <div className="schedule-row" key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}
        </div>
        <aside className="schedule-note"><p className="eyebrow">New Student</p><h2>Not sure which class fits?</h2><p>Tell us about your goals and experience. We’ll recommend the best starting class.</p><a className="button" href="#contact">Ask a Coach</a></aside>
      </section>
    </main>
  );

  const Contact = () => {
    const [sent, setSent] = useState(false);
    return (
      <main className="inner-main">
        <PageHero eyebrow="Start Today" title="Contact Us" text="Ask a question or book your free introductory class." />
        <section className="contact-section">
          <div className="contact-details"><h2>Let’s get you started</h2><p>Complete the form and our team will help you find the right class and location.</p><div className="contact-item"><span>Call</span><a href="tel:+61000000000">+61 000 000 000</a></div><div className="contact-item"><span>Email</span><a href="mailto:hello@impact-taekwondo.com">hello@impact-taekwondo.com</a></div><div className="contact-item"><span>Hours</span><p>Monday–Saturday<br />8:30am–8:30pm</p></div></div>
          <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            {sent ? <div className="form-success"><span>✓</span><h2>Thank you!</h2><p>Your enquiry has been received. We’ll be in touch soon.</p></div> : <>
              <div className="form-row"><label>First name<input required name="firstName" placeholder="Your first name" /></label><label>Last name<input required name="lastName" placeholder="Your last name" /></label></div>
              <label>Email address<input required type="email" name="email" placeholder="you@example.com" /></label>
              <label>Phone number<input type="tel" name="phone" placeholder="+61" /></label>
              <label>Preferred location<select name="location" defaultValue=""><option value="" disabled>Select a location</option>{locations.map((item) => <option key={item.area}>{item.name}</option>)}</select></label>
              <label>How can we help?<textarea name="message" rows="4" placeholder="Tell us the age and experience of the student..." /></label>
              <button className="button form-button" type="submit">Send Enquiry</button>
            </>}
          </form>
        </section>
      </main>
    );
  };

  const pages = { home: <Home />, locations: <Locations />, instructors: <Instructors />, schedule: <Schedule />, contact: <Contact /> };

  return (
    <>
      <Header />
      {pages[baseRoute] || <Home />}
      <footer><Logo /><p>© {new Date().getFullYear()} Impact Taekwon-Do</p></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
