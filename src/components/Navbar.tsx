import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import api from '../services/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logo, siteName } = useSettingsStore();
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Fetch dynamic menu
    api.get('/menus/header').then(res => {
      if (res.data.data) setMenuItems(res.data.data.items || []);
    }).catch(() => {
      // Fallback to static if API fails
      setMenuItems([
        { label: 'Home', url: '/' },
        { label: 'Services', url: '/services' },
        { label: 'Planning', url: '/planning' },
        { label: 'About', url: '/about' },
        { label: 'Contact', url: '/contact' },
      ]);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = () => {
    setIsOpen(false);
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
          aria-label={`${siteName} Home`}
        >
          {logo ? (
            <img src={logo} alt={siteName} className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
          ) : (
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-primary leading-none">{siteName.split(' ')[0]}</span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-secondary uppercase leading-none">{siteName.split(' ').slice(1).join(' ')}</span>
            </div>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.url}
              target={item.is_external ? "_blank" : undefined}
              className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-primary text-on-primary px-8 py-3 text-xs font-black tracking-[0.15em] uppercase hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Get Started
          </Link>
        </div>

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
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-surface shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 border-b border-outline-variant/30' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.url}
              target={item.is_external ? "_blank" : undefined}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black text-primary uppercase tracking-tighter hover:text-secondary transition-colors"
            >
              {item.label}
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
