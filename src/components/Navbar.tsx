import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import api from '../services/api';
import { MenuItem } from '../types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logo, siteName } = useSettingsStore();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    // Fetch dynamic menu
    api.get('/menus/header').then(res => {
      if (res.data.data) setMenuItems(res.data.data.items || []);
    }).catch(() => {
      // Fallback to static if API fails
      setMenuItems([
        { label: 'Home', url: '/', is_external: false },
        { label: 'Services', url: '/services', is_external: false },
        { label: 'Planning', url: '/planning', is_external: false },
        { label: 'About', url: '/about', is_external: false },
        { label: 'Contact', url: '/contact', is_external: false },
      ]);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled || isOpen ? 'bg-surface shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2 group" onClick={() => window.scrollTo(0, 0)}>
            <img src={logo || "/logo.png"} alt={siteName} className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-primary leading-none">{siteName.split(' ')[0]}</span>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-secondary uppercase leading-none">{siteName.split(' ').slice(1).join(' ')}</span>
            </div>
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-on-surface"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-20 left-0 right-0 bottom-0 bg-surface transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6 p-margin-mobile">
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
            onClick={() => setIsOpen(false)}
            className="mt-6 bg-primary text-on-primary px-8 py-4 text-center text-sm font-black tracking-[0.15em] uppercase hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
