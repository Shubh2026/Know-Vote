import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { timelineEvents } from '../data/electionData';

export default function Timeline() {
  const { t, language, isDark, setActiveSection } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('timeline'); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setVisibleItems(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach(el => itemObserver.observe(el));
    return () => itemObserver.disconnect();
  }, []);



  return (
    <section
      id="timeline"
      ref={sectionRef}
      className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      aria-labelledby="timeline-title"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700'
          }`}>
            <span aria-hidden="true">📅</span> Election Process
          </div>
          <h2
            id="timeline-title"
            className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {t.timelineTitle}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.timelineSubtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" role="list" aria-label="Election timeline">
          {/* Center Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${isDark ? '#f97316' : '#ea580c'}, ${isDark ? '#22c55e' : '#16a34a'})` }}
            aria-hidden="true"
          />

          {timelineEvents.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const isVisible = visibleItems.has(event.id);
            const isSelected = selectedEvent === event.id;

            return (
              <div
                key={event.id}
                ref={el => { if (el) itemRefs.current.set(event.id, el); }}
                data-id={event.id}
                className={`relative mb-10 md:mb-12 flex flex-col md:flex-row items-start md:items-center gap-4 transition-all duration-700 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                role="listitem"
              >
                {/* Content Card */}
                <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <button
                    onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                    className={`w-full text-left rounded-2xl p-5 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isSelected
                        ? isDark
                          ? 'bg-orange-900/30 border-2 border-orange-500/50'
                          : 'bg-orange-50 border-2 border-orange-300'
                        : isDark
                          ? 'bg-gray-800 border border-gray-700 hover:border-orange-500/30'
                          : 'bg-white border border-gray-100 shadow hover:shadow-md hover:border-orange-200'
                    }`}
                    aria-expanded={isSelected}
                    aria-label={`${language === 'hi' ? event.titleHi : event.titleEn} — click to ${isSelected ? 'collapse' : 'expand'}`}
                  >
                    <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse md:justify-end' : ''}`}>
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-md flex-shrink-0"
                        style={{ background: `${event.color}20`, border: `2px solid ${event.color}40` }}
                        aria-hidden="true"
                      >
                        {event.icon}
                      </span>
                      <div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                          Phase {event.phase} · {event.duration}
                        </span>
                      </div>
                    </div>
                    <h3 className={`text-base sm:text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'hi' ? event.titleHi : event.titleEn}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'hi' ? event.descriptionHi : event.descriptionEn}
                    </p>

                    {/* Expanded Content */}
                    {isSelected && (
                      <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h4 className={`text-sm font-bold mb-3 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                          {language === 'hi' ? 'मुख्य बिंदु' : 'Key Points'}
                        </h4>
                        <ul className="space-y-2" role="list">
                          {(language === 'hi' ? event.keyPoints.hi : event.keyPoints.en).map((point, i) => (
                            <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              <span className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </button>
                </div>

                {/* Center Node */}
                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl items-center justify-center text-2xl shadow-lg z-10 border-4 transition-all"
                  style={{
                    background: `${event.color}15`,
                    borderColor: event.color,
                  }}
                  aria-hidden="true"
                >
                  {event.icon}
                </div>

                {/* Mobile Phase Badge */}
                <div className="md:hidden flex items-center gap-2 mb-1">
                  <span
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-lg shadow"
                    style={{ background: `${event.color}20`, border: `2px solid ${event.color}40` }}
                    aria-hidden="true"
                  >
                    {event.icon}
                  </span>
                  <span className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Phase {event.phase}
                  </span>
                </div>

                {/* Spacer for right side */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
