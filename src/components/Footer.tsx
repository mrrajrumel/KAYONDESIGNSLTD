import { Mail, Phone, MapPin } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import api from '../services/api';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { siteName, siteDescription, logo, contact_email, phone, address } = useSettingsStore() as any;
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    api.get('/menus/footer').then(res => {
      if (res.data.data) setMenuItems(res.data.data.items || []);
    }).catch(() => {
      setMenuItems([
        { label: 'About Us', url: '/about' },
        { label: 'Our Services', url: '/services' },
        { label: 'Planning', url: '/planning' },
        { label: 'Contact', url: '/contact' },
        { label: 'Privacy Policy', url: '/privacy-policy' },
        { label: 'Terms of Service', url: '/terms-of-service' },
      ]);
    });
  }, []);

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <img src={logo || "/logo.png"} alt={siteName} className="h-10 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-primary leading-none">{siteName.split(' ')[0]}</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-secondary uppercase leading-none">{siteName.split(' ').slice(1).join(' ')}</span>
              </div>
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              {siteDescription || "Professional construction logistics planning and strategic support for developers across London and the UK."}
            </p>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <MapPin size={14} className="text-primary flex-shrink-0" />
              <span>London, United Kingdom</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-black text-sm uppercase tracking-[0.2em] mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {menuItems.map((item: any) => (
                <li key={item.label}>
                  <Link to={item.url} className="text-on-surface-variant hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-primary font-black text-sm uppercase tracking-[0.2em] mb-8">Get In Touch</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-primary shrink-0 border border-outline-variant">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Call Us</span>
                  <a href={`tel:${phone}`} className="text-sm font-black text-primary hover:text-secondary transition-colors">{phone || '+44 (0) 20 1234 5678'}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-primary shrink-0 border border-outline-variant">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Email Us</span>
                  <a href={`mailto:${contact_email}`} className="text-sm font-black text-primary hover:text-secondary transition-colors">{contact_email || 'info@kayondesigns.com'}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-primary shrink-0 border border-outline-variant">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Visit Us</span>
                  <span className="text-sm font-black text-primary leading-tight">{address || 'London, United Kingdom'}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-outline-variant pt-md flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">&copy; {new Date().getFullYear()} {siteName}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="text-on-surface-variant text-xs hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" onClick={() => window.scrollTo(0, 0)} className="text-on-surface-variant text-xs hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
