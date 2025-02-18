import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Twitter, Instagram as Telegram, Globe, ArrowRight, Menu, X, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { path: '/tokenomics', label: 'nav.tokenomics' },
  { path: '/roadmap', label: 'nav.roadmap' },
  { path: '/announcement', label: 'nav.launch' },
  { path: '/contact', label: 'nav.contact' },
];

const quickLinks = [
  { path: '/about', label: 'nav.about' },
  ...navLinks
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="font-space min-h-screen flex flex-col">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <Rocket className="w-6 h-6" />
              $PRIKOL
            </Link>
            <div className="hidden md:flex gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-gray-600 hover:text-primary transition-colors ${
                    location.pathname === link.path ? 'text-primary font-medium' : ''
                  }`}
                >
                  {t(link.label)}
                </Link>
              ))}
              <div className="flex gap-3 items-center">
                <LanguageSwitcher />
                <a
                  href="https://callprikol.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" /> {t('nav.website')}
                </a>
                <a
                  href="https://pump.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  {t('nav.buyNow')} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <button 
              className="md:hidden text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-gray-600 hover:text-primary transition-colors ${
                        location.pathname === link.path ? 'text-primary font-medium' : ''
                      }`}
                    >
                      {t(link.label)}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 pt-4 border-t">
                    <LanguageSwitcher />
                    <a
                      href="https://callprikol.ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" /> {t('nav.website')}
                    </a>
                    <a
                      href="https://pump.fun"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2 justify-center"
                    >
                      {t('nav.buyNow')} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xl mb-4">
                <Rocket className="w-6 h-6" />
                $PRIKOL
              </div>
              <p className="text-gray-600 mb-4">
                {t('footer.description')}
              </p>
              <div className="flex gap-4">
                <SocialLink icon={<Twitter className="w-5 h-5" />} href="https://twitter.com/prikoltoken" />
                <SocialLink icon={<Telegram className="w-5 h-5" />} href="https://t.me/prikoltoken" />
                <SocialLink icon={<Globe className="w-5 h-5" />} href="https://callprikol.ru" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-600 hover:text-primary transition-colors">
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">{t('footer.resources')}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/whitepaper" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" /> {t('footer.whitepaper')}
                  </Link>
                </li>
                <li>
                  <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    {t('footer.platform')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    {t('footer.faqs')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">{t('footer.updates')}</h3>
              <p className="text-gray-600 mb-4">{t('footer.stayUpdated')}</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {t('footer.subscribe')}
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
    >
      {icon}
    </a>
  );
}