import React, { useState, Suspense } from 'react';
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

