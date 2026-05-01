import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const stats = [
  { keyCount: 'heroStat1', keyLabel: 'heroStat1Label', icon: '👥', color: 'from-orange-500 to-orange-600' },
  { keyCount: 'heroStat2', keyLabel: 'heroStat2Label', icon: '🏛️', color: 'from-green-500 to-green-600' },
  { keyCount: 'heroStat3', keyLabel: 'heroStat3Label', icon: '🗺️', color: 'from-blue-500 to-blue-600' },
];

export default function Hero() {
  const { t, isDark, setActiveSection } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('home'); },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-orange-50 via-white to-green-50'
      }`}
      aria-labelledby="hero-title"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-orange-500' : 'bg-orange-300'}`} />
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-green-500' : 'bg-green-300'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5 ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`} />

        {/* Floating Particles */}
        {['🗳️', '🇮🇳', '✅', '🏛️', '📋', '⚖️'].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-10 animate-float"
            style={{
              top: `${10 + (i * 15) % 80}%`,
              left: `${5 + (i * 17) % 90}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
            aria-hidden="true"
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-semibold mb-6 border border-orange-200 dark:border-orange-800">
          <span aria-hidden="true">🇮🇳</span>
          <span>Official Election Education Platform</span>
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
        </div>

        {/* Title */}
        <h1
          id="hero-title"
          className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 bg-clip-text text-transparent">
            {t.heroTitle}
          </span>
        </h1>

        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          {t.heroSubtitle}
        </h2>

        <p className={`text-base sm:text-lg max-w-3xl mx-auto mb-10 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t.heroTagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => scrollTo('timeline')}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-400"
            aria-label={t.heroCTA}
          >
            <span aria-hidden="true">🚀</span>
            {t.heroCTA}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo('quiz')}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 ${
              isDark
                ? 'border-green-500 text-green-400 hover:bg-green-500/10'
                : 'border-green-600 text-green-700 hover:bg-green-50'
            }`}
            aria-label={t.heroSecondary}
          >
            <span aria-hidden="true">🎯</span>
            {t.heroSecondary}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto" role="list" aria-label="Election statistics">
          {stats.map(stat => (
            <div
              key={stat.keyCount}
              className={`group rounded-2xl p-4 sm:p-6 transition-all duration-200 hover:scale-105 ${
                isDark
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-orange-500/50'
                  : 'bg-white/80 border border-gray-100 shadow hover:shadow-lg hover:border-orange-200'
              }`}
              role="listitem"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 shadow-md group-hover:scale-110 transition-transform`}
                aria-hidden="true"
              >
                {stat.icon}
              </div>
              <div className={`text-xl sm:text-2xl lg:text-3xl font-black mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t[stat.keyCount as keyof typeof t]}
              </div>
              <div className={`text-xs sm:text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t[stat.keyLabel as keyof typeof t]}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center gap-2" aria-hidden="true">
          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1 opacity-50">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
