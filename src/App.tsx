import React, { useState } from 'react';
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
import { ClientPortalModal } from './components/ClientPortalModal';

export default function App() {
  const [portalOpen, setPortalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#0c0e12] text-[#F3F4F6] flex flex-col selection:bg-[#FF4500] selection:text-white relative">
      {/* Top Navigation */}
      <Navbar
        onOpenPortal={() => setPortalOpen(true)}
        onNavigateContact={() => scrollToSection('contacto')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onQuoteClick={() => scrollToSection('contacto')}
          onPortfolioClick={() => scrollToSection('portfolio')}
        />

        {/* 2. Value Proposition (4 Differentiators) */}
        <ValueProposition />

        {/* 3. Services (6 Core Services with clear business resolutions) */}
        <Services onServiceSelect={handleSelectServiceFromList} />

        {/* 4. Methodology (3 Stages) */}
        <Methodology />

        {/* 5. Portfolio (4 Business Cases with Results) */}
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
        onOpenPortal={() => setPortalOpen(true)}
        onNavigateContact={() => scrollToSection('contacto')}
      />

      {/* Automated Floating Ad: "Tu Landing Page en 24hs. Express" */}
      <FloatingExpressAd onSelectExpress={handleSelectExpressLanding} />

      {/* Smart Predefined Bot Dock */}
      <FloatingAssist />

      {/* Future Client Portal Modal */}
      <ClientPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
      />
    </div>
  );
}
