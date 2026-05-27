import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';


export default function ContactSection({ data }: { data?: any }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Sending message...', { id: 'contact-toast' });
    try {
      const response = await api.post('/contact', formData);
      toast.success(response.data.message, { id: 'contact-toast' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).flat();
        toast.error(errors.join('\n') || 'Please check your input.', { id: 'contact-toast' });
      } else {
        toast.error('An unknown error occurred.', { id: 'contact-toast' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-surface relative" id="contact">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#707971" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cgrid)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-5 gap-lg relative z-10">
          {/* Info */}
          <div className="md:col-span-2 space-y-md">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">Get in Touch</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Whether you have a specific project in mind or just want to understand how we can help, our team is ready to talk.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Office Location</h4>
                  <p className="text-on-surface-variant text-sm">London, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Email Us</h4>
                  <a href="mailto:info@kayondesigns.co.uk" className="text-primary text-sm hover:underline">
                    info@kayondesigns.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface text-sm">Call Us</h4>
                  <a href="tel:+44" className="text-primary text-sm hover:underline">
                    Available on request
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-outline-variant p-md bg-surface-container-low">
              <h4 className="font-semibold text-primary mb-3">What to expect:</h4>
              <ul className="space-y-2">
                {[
                  'We respond within 1 business day',
                  'Free initial consultation',
                  'Clear, jargon-free advice',
                  'Tailored proposal for your project',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-outline-variant overflow-hidden h-48">
              <img
                src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="London construction site aerial view"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-xl border border-outline-variant bg-surface-container-low min-h-[400px]">
                <div className="w-16 h-16 flex items-center justify-center bg-secondary-container text-secondary mb-4">
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Message Received!</h3>
                <p className="text-on-surface-variant max-w-md">
                  Thank you for getting in touch. A member of our team will review your enquiry and come back to you within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                <div className="text-right">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 justify-center px-8 py-3 rounded text-sm font-bold text-on-primary bg-primary hover:opacity-90 focus:outline-none transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'} <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      </div>
    </section>
  );
}
