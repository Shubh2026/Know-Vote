import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { key: 'home', labelKey: 'navHome', icon: '🏠' },
  { key: 'timeline', labelKey: 'navTimeline', icon: '📅' },
  { key: 'wizard', labelKey: 'navWizard', icon: '🗳️' },
  { key: 'quiz', labelKey: 'navQuiz', icon: '🎯' },
  { key: 'faq', labelKey: 'navFAQ', icon: '❓' },
  { key: 'states', labelKey: 'navStates', icon: '🗺️' },
  { key: 'ai', labelKey: 'navAI', icon: '🤖' },
];

export default function Navbar() {
  const { t, language, setLanguage, isDark, toggleTheme, activeSection, setActiveSection } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(section);
    }
    setIsMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-gray-900/95 shadow-xl shadow-black/20 backdrop-blur-md'
            : 'bg-white/95 shadow-xl shadow-orange-100/50 backdrop-blur-md'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
            aria-label="BharatVote Guide - Go to home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-green-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl" aria-hidden="true">🇮🇳</span>
            </div>
            <div className="hidden sm:block">
              <div className={`font-extrabold text-sm leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                BharatVote
              </div>
              <div className={`text-xs font-medium ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                Guide
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const label = t[item.labelKey as keyof typeof t] as string;
              const isActive = activeSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => scrollTo(item.key)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isActive
                      ? isDark
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-orange-100 text-orange-700'
                      : isDark
                        ? 'text-gray-300 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="mr-1.5" aria-hidden="true">{item.icon}</span>
                  {label}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className={`flex rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`} role="group" aria-label="Language selector">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 ${
                  language === 'hi'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
                aria-pressed={language === 'hi'}
                aria-label="Switch to Hindi"
              >
                हिं
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark
                  ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={isDark ? t.lightMode : t.darkMode}
            >
              <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div
            id="mobile-menu"
            className={`lg:hidden pb-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
            role="menu"
          >
            <div className="pt-3 grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map(item => {
                const label = t[item.labelKey as keyof typeof t] as string;
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => scrollTo(item.key)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow'
                        : isDark
                          ? 'text-gray-300 hover:bg-white/10'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
