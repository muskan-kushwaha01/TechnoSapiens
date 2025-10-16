import React, { useState, useEffect, useRef } from 'react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Events', href: '#events' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Judges', href: '#judges' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'FAQs', href: '#faqs' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Cache section refs once on mount
    sectionRefs.current = navLinks
      .filter(link => link.href.startsWith('#') && link.href.length > 1)
      .map(link => document.querySelector(link.href));

    // --- Scroll Throttling ---
    let throttleTimeout = null;
    const throttle = (callback, time) => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        callback();
        throttleTimeout = null;
      }, time);
    };

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleActiveLink = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sectionRefs.current) {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          if (activeSection !== section.id) {
            setActiveSection(section.id); // Update state only if it changes
          }
          return;
        }
      }
      if (activeSection) {
        setActiveSection(''); // Clear if no section is active
      }
    };

    const handleScroll = () => {
      throttle(() => {
        controlNavbar();
        handleActiveLink();
      }, 100); // Run at most every 100ms
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]); // Dependency array is kept to re-evaluate activeSection inside the closure

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto mt-4 px-4">
        <div className="relative flex items-center justify-between h-16 px-6 bg-gray-900/70 backdrop-blur-md border border-red-500/20 rounded-full shadow-lg shadow-red-500/10">
          {/* Logo and Site Name */}
          <div className="flex items-center space-x-4">
            {/* Placeholder for a logo image */}
            <div className="w-8 h-8 bg-bright-red rounded-full flex items-center justify-center text-black font-bold text-lg">
              T
            </div>
            <a href="#" className="font-display text-xl tracking-widest text-bright-red uppercase">
              TECHNO<span className="text-gray-200">SAPIENS</span>
            </a>
          </div>

          {/* Desktop Nav Links (Centered) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative group px-4 py-2 rounded-full uppercase text-sm font-semibold transition-all duration-300 font-condensed ${
                  activeSection === link.href.substring(1)
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform transition-transform duration-300 ${
                  activeSection === link.href.substring(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </a>
            ))}
          </div>

          {/* Register Button and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="#register"
              onClick={(e) => handleSmoothScroll(e, '#register')}
              className="hidden md:block px-5 py-2 text-sm font-bold uppercase font-condensed text-gray-100 bg-bright-red rounded-full hover:bg-dark-red transition-colors duration-300"
            >
              Register
            </a>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200 hover:text-bright-red focus:outline-none"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-gray-900/90 backdrop-blur-md rounded-2xl border border-red-500/20">
            <div className="flex flex-col items-center space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`w-full text-center py-2 rounded-full uppercase text-sm font-semibold transition-all duration-300 font-condensed ${
                    activeSection === link.href.substring(1)
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#register"
                onClick={(e) => handleSmoothScroll(e, '#register')}
                className="w-full text-center px-5 py-3 text-sm font-bold uppercase font-condensed text-gray-100 bg-bright-red rounded-full hover:bg-dark-red transition-colors duration-300"
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
        