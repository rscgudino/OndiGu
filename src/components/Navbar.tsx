import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { useAuth } from '../context/AuthContext';
import { User, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  onNavigateContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortal, onNavigateContact }) => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Propuesta', href: '#propuesta' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Referencias', href: '#referencias' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Lanús & Redes', href: '#comunidad-redes' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0c0e12]/92 backdrop-blur-md border-b border-[#202430] py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500] rounded">
          <BrandLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#c0c0c0]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#FFFFFF] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FF4500] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Login / Portal + CTA) */}
        <div className="hidden md:flex items-center gap-3.5">
          {user ? (
            <button
              id="nav-user-account-btn"
              onClick={onOpenPortal}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#171922] hover:bg-[#202430] border border-[#FF8C00]/50 rounded-lg transition-colors shadow-sm"
              title="Ver mi perfil y cuenta"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-semibold text-white">Mi cuenta</span>
              <span className="text-[11px] text-[#a5abbd] max-w-[100px] truncate">
                {user.name ? user.name.split(' ')[0] : 'Perfil'}
              </span>
            </button>
          ) : (
            <button
              id="nav-client-portal-btn"
              onClick={onOpenPortal}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#d0d0d0] hover:text-white bg-[#181a22] hover:bg-[#20232e] border border-[#2a2e3b] rounded-lg transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Ingresar</span>
            </button>
          )}

          <button
            id="nav-quote-cta-btn"
            onClick={onNavigateContact}
            type="button"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] rounded-lg shadow-[0_0_15px_rgba(255,69,0,0.3)] transition-colors"
          >
            Pedí tu presupuesto
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-portal-btn"
            onClick={onOpenPortal}
            type="button"
            aria-label={user ? "Mi cuenta" : "Ingresar"}
            className="p-2 text-[#a0a0a0] hover:text-white bg-[#181a22] border border-[#2a2e3b] rounded-lg relative"
          >
            {user ? (
              <>
                <User className="w-4 h-4 text-[#FF8C00]" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
              </>
            ) : (
              <User className="w-4 h-4 text-[#FF8C00]" />
            )}
          </button>
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="p-2 text-white bg-[#181a22] border border-[#2a2e3b] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#13151c] border-b border-[#252834] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#d0d0d0] hover:text-white py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#20232e] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-white bg-[#1a1d26] border border-[#2e3240] rounded-lg"
            >
              <User className="w-3.5 h-3.5 text-[#FF8C00]" />
              {user ? `Mi cuenta (${user.name || user.email})` : 'Ingresar / Crear cuenta'}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateContact();
              }}
              type="button"
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#FF4500] hover:bg-[#e03d00] rounded-lg"
            >
              Pedí tu presupuesto
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
