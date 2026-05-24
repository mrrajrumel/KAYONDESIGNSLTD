import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { id: '/', label: 'Home' },
  { id: '/services', label: 'Services' },
  { id: '/planning', label: 'Planning' },
  { id: '/about', label: 'About' },
  { id: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/95 shadow-sm' : 'bg-surface/90'
      } backdrop-blur-md border-b border-outline-variant/30`}
    >
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <Link
          to="/"
          onClick={handleNav}
          className="flex items-center gap-2 group"
          aria-label="Kayon Designs Ltd Home"
        >
          <div className="flex flex-col leading-none">
            <span className="font-bold text-xl tracking-tight text-primary">
              kayon
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
              designs ltd
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              onClick={handleNav}
              className={`text-sm font-medium transition-colors pb-1 ${
                currentPage === link.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            onClick={handleNav}
            className="hidden md:block bg-primary text-on-primary px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </Link>
          <button
            className="md:hidden text-on-surface p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-surface shadow-md transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 border-b border-outline-variant/30' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              onClick={handleNav}
              className={`text-base font-medium py-2 ${
                currentPage === link.id ? 'text-primary' : 'text-on-surface'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={handleNav}
            className="mt-2 bg-primary text-on-primary px-5 py-3 text-center font-semibold text-sm hover:opacity-90"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
