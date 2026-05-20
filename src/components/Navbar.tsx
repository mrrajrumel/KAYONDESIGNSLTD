import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'planning', label: 'Planning' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (page: string) => {
    onNavigate(page);
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
        <button
          onClick={() => handleNav('home')}
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
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`text-sm font-medium transition-colors pb-1 ${
                currentPage === link.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('contact')}
            className="hidden md:block bg-primary text-on-primary px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </button>
          <button
            className="md:hidden text-on-surface p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant px-margin-mobile py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`text-left py-3 px-2 text-sm font-medium border-b border-outline-variant/30 last:border-0 transition-colors ${
                currentPage === link.id ? 'text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('contact')}
            className="mt-3 bg-primary text-on-primary py-3 text-sm font-semibold"
          >
            Get a Quote
          </button>
        </div>
      )}
    </header>
  );
}
