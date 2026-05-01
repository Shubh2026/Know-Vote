import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function BackToTop() {
  const { isDark, language } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-400 ${
        isDark
          ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 shadow-black/30'
          : 'bg-white border border-gray-200 text-gray-600 hover:bg-orange-50 shadow-gray-200'
      }`}
      aria-label={language === 'hi' ? 'शीर्ष पर वापस जाएँ' : 'Back to top'}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
