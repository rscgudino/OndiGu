import React, { useState, useEffect, Suspense } from 'react';
import { ArrowUp } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProposition } from './components/ValueProposition';
import { Services } from './components/Services';
import { Methodology } from './components/Methodology';
import { Portfolio } from './components/Portfolio';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { SocialNetworksBar } from './components/SocialNetworksBar';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FloatingAssist } from './components/FloatingAssist';
import { FloatingExpressAd } from './components/FloatingExpressAd';
import { LiveRadarMetrics } from './components/LiveRadarMetrics';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProjectConfigurator } from './components/ProjectConfigurator';
import { AiSimulatorPlayground } from './components/AiSimulatorPlayground';
import { RoiCalculator } from './components/RoiCalculator';
import { DigitalAuditScanner } from './components/DigitalAuditScanner';

// Lazy load secondary modals for maximum initial load performance
const AuthModal = React.lazy(() =>
  import('./components/AuthModal').then((m) => ({ default: m.AuthModal }))
);
const UserProfileModal = React.lazy(() =>
  import('./components/UserProfileModal').then((m) => ({ default: m.UserProfileModal }))
);
const ClientSpecialPortalModal = React.lazy(() =>
  import('./components/ClientSpecialPortalModal').then((m) => ({ default: m.ClientSpecialPortalModal }))
);
const AdminPanelModal = React.lazy(() =>
  import('./components/AdminPanelModal').then((m) => ({ default: m.AdminPanelModal }))
);

function MainApp() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [clientPortalOpen, setClientPortalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Always start at the very top of the landing page on refresh or initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  // Track scroll position to show floating back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAccountOrAuth = (view: 'login' | 'register' = 'login') => {
    if (user) {
      setClientPortalOpen(true);
    } else {
      setAuthView(view);
      setAuthModalOpen(true);
    }
  };

  const handleSelectServiceFromList = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('contacto');
  };

  const handleSelectExpressLanding = () => {
    setPreselectedService('Landing Page Express 24hs');
    scrollToSection('contacto');
  };

  return (
    <div className="min-h-screen bg-[#F1EFEA] text-[#181B22] dark:bg-[#0c0e12] dark:text-[#F3F4F6] flex flex-col selection:bg-[#FF4500] selection:text-white relative transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar
        onOpenPortal={() => handleOpenAccountOrAuth('login')}
        onOpenClientMenu={() => setClientPortalOpen(true)}
        onOpenAdminPanel={() => setAdminPanelOpen(true)}
        onNavigateContact={() => scrollToSection('contacto')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onQuoteClick={() => scrollToSection('contacto')}
          onPortfolioClick={() => scrollToSection('portfolio')}
        />

        {/* Live Radar Infrastructure & Uptime Metrics */}
        <LiveRadarMetrics />

        {/* 2. Value Proposition (4 Differentiators) */}
        <ValueProposition />

        {/* 3. Interactive Before/After Split Slider */}
        <BeforeAfterSlider onQuoteClick={() => scrollToSection('contacto')} />

        {/* 4. Services (6 Core Services with clear business resolutions) */}
        <Services onServiceSelect={handleSelectServiceFromList} />

        {/* 5. Visual Project Configurator ("Armá tu Solución") */}
        <ProjectConfigurator
          onQuoteSubmit={(summary) => {
            setPreselectedService(summary);
            scrollToSection('contacto');
          }}
        />

        {/* 6. Live AI Assistant Simulator by Industry */}
        <AiSimulatorPlayground
          onSelectService={(serviceName) => {
            setPreselectedService(serviceName);
            scrollToSection('contacto');
          }}
        />

        {/* 7. ROI & Lost Sales Calculator */}
        <RoiCalculator
          onQuoteClick={(calcSummary) => {
            setPreselectedService(calcSummary);
            scrollToSection('contacto');
          }}
        />

        {/* 8. Digital Presence Audit Scanner */}
        <DigitalAuditScanner
          onScheduleCall={(auditNote) => {
            setPreselectedService(auditNote);
            scrollToSection('contacto');
          }}
        />

        {/* 9. Methodology (3 Stages) */}
        <Methodology />

        {/* 10. Portfolio (4 Business Cases with Results) */}
        <Portfolio />

        {/* 6. Auto-playing Testimonials / Reference Cards Carousel */}
        <TestimonialsCarousel onSelectExpress={handleSelectExpressLanding} />

        {/* 7. Social Media Channels & Google Location in Lanús */}
        <SocialNetworksBar />

        {/* 8. Contact Form (Tailored Quote Request) */}
        <ContactForm initialService={preselectedService} />
      </main>

      {/* Footer with Brand Signature, Social Links and Google Lanús */}
      <Footer
        onOpenPortal={() => handleOpenAccountOrAuth('login')}
        onNavigateContact={() => scrollToSection('contacto')}
      />

      {/* Automated Floating Ad: "Tu Landing Page en 24hs. Express" */}
      <FloatingExpressAd onSelectExpress={handleSelectExpressLanding} />

      {/* Smart Predefined Bot Dock */}
      <FloatingAssist />

      {/* Lazy Loaded On-Demand Modals */}
      <Suspense fallback={null}>
        {authModalOpen && (
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            initialView={authView}
          />
        )}

        {profileModalOpen && (
          <UserProfileModal
            isOpen={profileModalOpen}
            onClose={() => setProfileModalOpen(false)}
          />
        )}

        {clientPortalOpen && (
          <ClientSpecialPortalModal
            isOpen={clientPortalOpen}
            onClose={() => setClientPortalOpen(false)}
            onOpenCallScheduler={(motivo) => {
              if (motivo) setPreselectedService(motivo);
              scrollToSection('contacto');
            }}
            onOpenAdminPanel={() => setAdminPanelOpen(true)}
          />
        )}

        {adminPanelOpen && (
          <AdminPanelModal
            isOpen={adminPanelOpen}
            onClose={() => setAdminPanelOpen(false)}
          />
        )}

        {/* Floating Transparent Back-to-Top Arrow */}
        {showScrollTop && (
          <button
            id="floating-back-to-top-arrow-btn"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Ir al principio de la página"
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full border border-slate-300/80 dark:border-white/20 bg-white/30 dark:bg-black/40 hover:bg-white/60 dark:hover:bg-black/60 text-slate-800 dark:text-slate-100 hover:text-[#FF4500] dark:hover:text-[#FF8C00] backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer group"
            title="Ir al principio de la página"
          >
            <ArrowUp className="w-5 h-5 text-[#FF4500] dark:text-[#FF8C00] transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        )}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

