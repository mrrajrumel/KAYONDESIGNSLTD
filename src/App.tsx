import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Planning from './pages/Planning';
import About from './pages/About';
import Contact from './pages/Contact';

type Page = 'home' | 'services' | 'planning' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'services':
        return <Services onNavigate={navigate} />;
      case 'planning':
        return <Planning onNavigate={navigate} />;
      case 'about':
        return <About onNavigate={navigate} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <div className="flex-1">{renderPage()}</div>
      <Footer onNavigate={navigate} />
    </div>
  );
}
