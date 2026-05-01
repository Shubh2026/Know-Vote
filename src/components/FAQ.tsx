import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { faqItems } from '../data/electionData';

const CATEGORIES = ['All', 'Registration', 'Voting', 'General', 'Candidates', 'Process'];
const CATEGORIES_HI: Record<string, string> = {
  All: 'सभी',
  Registration: 'पंजीकरण',
  Voting: 'मतदान',
  General: 'सामान्य',
  Candidates: 'उम्मीदवार',
  Process: 'प्रक्रिया',
};

export default function FAQ() {
  const { t, language, isDark, setActiveSection } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('faq'); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  const filteredFAQs = faqItems.filter(item => {
    const catMatch = activeCategory === 'All' || item.category === activeCategory;
    if (!catMatch) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.questionEn.toLowerCase().includes(q) ||
      item.questionHi.toLowerCase().includes(q) ||
      item.answerEn.toLowerCase().includes(q) ||
      item.answerHi.toLowerCase().includes(q)
    );
  });

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <section
      id="faq"
      ref={sectionRef}
      className={`py-20 ${isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'}`}
      aria-labelledby="faq-title"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark ? 'bg-teal-900/30 text-teal-400' : 'bg-teal-100 text-teal-700'
          }`}>
            <span aria-hidden="true">❓</span> FAQ
          </div>
          <h2 id="faq-title" className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.faqTitle}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.faqSubtitle}
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none" aria-hidden="true">
            <svg className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'प्रश्न खोजें...' : 'Search questions...'}
            className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              isDark
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm'
            }`}
            aria-label={language === 'hi' ? 'प्रश्न खोजें' : 'Search FAQ questions'}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter FAQ by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow'
                  : isDark
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {language === 'hi' ? CATEGORIES_HI[cat] : cat}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-3" role="list" aria-label="Frequently asked questions">
          {filteredFAQs.length === 0 ? (
            <div className={`text-center py-12 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-100'}`}>
              <span className="text-4xl mb-3 block" aria-hidden="true">🔍</span>
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {language === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}
              </p>
            </div>
          ) : (
            filteredFAQs.map(item => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? isDark
                        ? 'border-2 border-teal-500/50 bg-teal-900/10'
                        : 'border-2 border-teal-300 bg-teal-50/50'
                      : isDark
                        ? 'border border-gray-700 bg-gray-800 hover:border-teal-800'
                        : 'border border-gray-100 bg-white shadow hover:shadow-md hover:border-teal-200'
                  }`}
                  role="listitem"
                >
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start gap-4 p-5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 mt-0.5 transition-all ${
                      isOpen
                        ? 'bg-teal-500 text-white'
                        : isDark
                          ? 'bg-gray-700 text-gray-400'
                          : 'bg-gray-100 text-gray-500'
                    }`} aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isDark ? 'bg-gray-700 text-teal-400' : 'bg-teal-100 text-teal-700'
                        }`}>
                          {language === 'hi' ? CATEGORIES_HI[item.category] : item.category}
                        </span>
                      </div>
                      <p className={`font-semibold text-sm sm:text-base leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'hi' ? item.questionHi : item.questionEn}
                      </p>
                    </div>
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      } ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${item.id}`}
                      className={`px-5 pb-5 pl-16`}
                    >
                      <div className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {(language === 'hi' ? item.answerHi : item.answerEn).split('. ').filter(Boolean).map((sentence, i, arr) => (
                          <p key={i} className={i < arr.length - 1 ? 'mb-2' : ''}>
                            {sentence}{i < arr.length - 1 ? '.' : ''}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Help Banner */}
        <div className={`mt-10 p-6 rounded-2xl text-center ${
          isDark ? 'bg-teal-900/20 border border-teal-800' : 'bg-teal-50 border border-teal-200'
        }`}>
          <p className={`font-medium ${isDark ? 'text-teal-300' : 'text-teal-800'}`}>
            {language === 'hi'
              ? '🤝 अभी भी प्रश्न हैं? हमारे AI सहायक से पूछें या 1950 पर कॉल करें।'
              : '🤝 Still have questions? Ask our AI Assistant or call the Voter Helpline at 1950.'}
          </p>
        </div>
      </div>
    </section>
  );
}
