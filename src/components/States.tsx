import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { statesData, StateInfo } from '../data/electionData';

function StatCard({ label, value, icon, isDark }: { label: string; value: string | number; icon: string; isDark: boolean }) {
  return (
    <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-gray-900/50' : 'bg-white/80'}`}>
      <div className="text-2xl mb-1" aria-hidden="true">{icon}</div>
      <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</div>
      <div className={`text-xs font-medium mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{label}</div>
    </div>
  );
}

export default function States() {
  const { t, language, isDark, setActiveSection } = useApp();
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('states'); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section
      id="states"
      ref={sectionRef}
      className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
      aria-labelledby="states-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
          }`}>
            <span aria-hidden="true">🗺️</span> {t.navStates}
          </div>
          <h2 id="states-title" className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.statesTitle}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.statesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* State Grid */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3" role="list" aria-label="Select a state">
              {statesData.map(state => {
                const isSelected = selectedState?.code === state.code;
                return (
                  <button
                    key={state.code}
                    onClick={() => setSelectedState(isSelected ? null : state)}
                    className={`relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-200 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isSelected
                        ? 'ring-2 ring-white shadow-2xl scale-[1.03]'
                        : isDark
                          ? 'bg-gray-800 border border-gray-700 hover:border-indigo-500/50'
                          : 'bg-white border border-gray-100 shadow hover:shadow-lg'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Select ${language === 'hi' ? state.nameHi : state.name}`}
                    role="listitem"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${state.colorGradient} opacity-${isSelected ? '20' : '10'} transition-opacity`} aria-hidden="true" />
                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${state.colorGradient} text-white text-sm font-bold mb-3 shadow-md`} aria-hidden="true">
                        {state.code}
                      </div>
                      <div className={`font-bold text-sm leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'hi' ? state.nameHi : state.name}
                      </div>
                      <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {state.lokSabhaSeats} {language === 'hi' ? 'LS सीटें' : 'LS Seats'}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center" aria-hidden="true">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* State Detail */}
          <div>
            {selectedState ? (
              <div className={`rounded-3xl overflow-hidden shadow-xl h-full ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`} role="region" aria-label={`Details for ${language === 'hi' ? selectedState.nameHi : selectedState.name}`}>
                {/* Header */}
                <div className={`p-6 bg-gradient-to-br ${selectedState.colorGradient}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-4xl font-black text-white mb-1">
                        {language === 'hi' ? selectedState.nameHi : selectedState.name}
                      </div>
                      <div className="text-white/80 text-sm">
                        🏛️ {language === 'hi' ? selectedState.capitalHi : selectedState.capital}
                      </div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-white font-black text-lg">
                      {selectedState.code}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                      {selectedState.rulingParty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                      {language === 'hi' ? selectedState.currentCMHi : selectedState.currentCM}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <StatCard
                      label={t.statesSeats}
                      value={selectedState.lokSabhaSeats}
                      icon="🏛️"
                      isDark={isDark}
                    />
                    <StatCard
                      label={t.statesConstituencies}
                      value={selectedState.assemblySeats}
                      icon="🗳️"
                      isDark={isDark}
                    />
                    <StatCard
                      label={t.statesPhases}
                      value={selectedState.phases}
                      icon="📅"
                      isDark={isDark}
                    />
                    <StatCard
                      label={t.statesVoters}
                      value={selectedState.registeredVoters}
                      icon="👥"
                      isDark={isDark}
                    />
                  </div>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {language === 'hi' ? selectedState.descriptionHi : selectedState.descriptionEn}
                  </p>

                  {/* Special Facts */}
                  <div>
                    <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {language === 'hi' ? '✨ विशेष तथ्य' : '✨ Key Facts'}
                    </h4>
                    <ul className="space-y-2">
                      {(language === 'hi' ? selectedState.specialFacts.hi : selectedState.specialFacts.en).map((fact, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className="text-indigo-500 mt-0.5 flex-shrink-0" aria-hidden="true">◆</span>
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`mt-4 pt-4 border-t text-xs ${isDark ? 'border-gray-700 text-gray-500' : 'border-gray-100 text-gray-400'}`}>
                    {t.statesDate}: {selectedState.lastElectionDate}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`rounded-3xl p-10 text-center h-full flex flex-col items-center justify-center min-h-64 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border-2 border-dashed border-gray-200'
              }`}>
                <div className="text-5xl mb-4" aria-hidden="true">🗺️</div>
                <p className={`text-lg font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                  {t.statesSelect}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {language === 'hi' ? 'विस्तृत चुनाव जानकारी देखने के लिए ऊपर से एक राज्य चुनें' : 'Choose a state from the left to see detailed election information'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
