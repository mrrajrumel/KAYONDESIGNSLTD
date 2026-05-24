import { MapPin, Linkedin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-lg">
          <div className="md:col-span-2">
            <div className="flex flex-col leading-none mb-4">
              <span className="font-bold text-2xl tracking-tight text-primary">kayon</span>
              <span className="text-[9px] font-semibold tracking-[0.2em] text-on-surface-variant uppercase">
                designs ltd
              </span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs mb-4">
              London-based construction logistics and planning consultancy. We deliver buildable, compliant, and efficient solutions for developers and contractors across the UK.
            </p>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm">
              <MapPin size={14} className="text-primary flex-shrink-0" />
              <span>London, United Kingdom</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-primary uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2">
              {['CLPs', 'Swept Paths', 'Access Plans', 'Traffic Management', 'Tender Support'].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    onClick={scrollToTop}
                    className="text-on-surface-variant text-sm hover:text-primary transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-primary uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', page: '/about' },
                { label: 'Planning', page: '/planning' },
                { label: 'Contact', page: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.page}
                    onClick={scrollToTop}
                    className="text-on-surface-variant text-sm hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-on-surface-variant text-sm hover:text-primary transition-colors flex items-center gap-1">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
            </ul>

            <h4 className="font-semibold text-sm text-primary uppercase tracking-widest mt-6 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-on-surface-variant text-sm">
                <Phone size={13} className="text-primary flex-shrink-0" />
                <a href="tel:+44" className="hover:text-primary transition-colors">Call Us</a>
              </li>
              <li className="flex items-center gap-2 text-on-surface-variant text-sm">
                <Mail size={13} className="text-primary flex-shrink-0" />
                <Link to="/contact" onClick={scrollToTop} className="hover:text-primary transition-colors">Email Us</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-outline-variant pt-md flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-on-surface-variant text-xs">
            &copy; {new Date().getFullYear()} Kayon Designs Ltd. Construction Logistics &amp; Planning Consultancy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" onClick={scrollToTop} className="text-on-surface-variant text-xs hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" onClick={scrollToTop} className="text-on-surface-variant text-xs hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
