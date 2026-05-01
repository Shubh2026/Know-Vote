import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { wizardSteps } from '../data/electionData';

export default function Wizard() {
  const { t, language, isDark, setActiveSection } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('wizard'); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  const step = wizardSteps[currentStep];
  const totalSteps = wizardSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setIsComplete(false);
  };

  const goToStep = (idx: number) => {
    setCurrentStep(idx);
    setIsComplete(false);
  };

  return (
    <section
      id="wizard"
      ref={sectionRef}
      className={`py-20 ${isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 via-white to-orange-50'}`}
      aria-labelledby="wizard-title"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
          }`}>
            <span aria-hidden="true">🗳️</span> {t.navWizard}
          </div>
          <h2 id="wizard-title" className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.wizardTitle}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.wizardSubtitle}
          </p>
        </div>

        {!isComplete ? (
          <>
            {/* Step Indicators */}
            <div className="mb-8" role="group" aria-label="Wizard steps">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.wizardStep} {currentStep + 1} {t.wizardOf} {totalSteps}
                </span>
                <span className={`text-sm font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  {Math.round(progress)}% {language === 'hi' ? 'पूर्ण' : 'Complete'}
                </span>
              </div>
              <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                {wizardSteps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goToStep(i)}
                    className={`w-8 h-8 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      i === currentStep
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg scale-110'
                        : completedSteps.has(i)
                          ? 'bg-green-500 text-white'
                          : isDark
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to step ${i + 1}: ${language === 'hi' ? s.titleHi : s.titleEn}`}
                    aria-current={i === currentStep ? 'step' : undefined}
                  >
                    {completedSteps.has(i) && i !== currentStep ? '✓' : i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Step Card */}
            <div
              className={`rounded-3xl overflow-hidden shadow-xl transition-all duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              }`}
              role="region"
              aria-label={`Step ${currentStep + 1} content`}
            >
              {/* Step Header */}
              <div
                className="p-6 sm:p-8"
                style={{ background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0"
                    style={{ background: `${step.color}20`, border: `2px solid ${step.color}40` }}
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'hi' ? step.titleHi : step.titleEn}
                    </h3>
                    <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'hi' ? step.descriptionHi : step.descriptionEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps List */}
              <div className="p-6 sm:p-8">
                <ul className="space-y-4" role="list" aria-label={`Steps for ${language === 'hi' ? step.titleHi : step.titleEn}`}>
                  {(language === 'hi' ? step.stepsHi : step.stepsEn).map((s, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
                        style={{ background: step.color }}
                        aria-hidden="true"
                      >
                        {i + 1}
                      </div>
                      <span className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Tip */}
                {(language === 'hi' ? step.tipsHi : step.tipsEn) && (
                  <div className={`mt-6 p-4 rounded-xl border-l-4 ${
                    isDark
                      ? 'bg-yellow-900/20 border-yellow-500 text-yellow-300'
                      : 'bg-yellow-50 border-yellow-400 text-yellow-800'
                  }`} role="note">
                    <p className="text-sm font-medium">
                      {language === 'hi' ? step.tipsHi : step.tipsEn}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className={`px-6 sm:px-8 pb-6 sm:pb-8 flex flex-col sm:flex-row gap-3 justify-between border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} pt-6`}>
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-40 disabled:cursor-not-allowed ${
                    isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label={t.wizardPrev}
                >
                  ← {t.wizardPrev}
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label={currentStep === totalSteps - 1 ? t.wizardFinish : t.wizardNext}
                >
                  {currentStep === totalSteps - 1 ? t.wizardFinish : `${t.wizardNext} →`}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Completion Screen */
          <div className={`rounded-3xl p-8 sm:p-12 text-center shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`} role="region" aria-label="Wizard complete">
            <div className="text-7xl mb-6 animate-bounce" aria-hidden="true">🏆</div>
            <h3 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'hi' ? 'बधाई हो! आप तैयार हैं!' : 'Congratulations! You\'re Ready!'}
            </h3>
            <p className={`text-lg mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'hi'
                ? 'आपने सभी मतदान चरणों को सीख लिया है। अब जाएँ और अपना वोट डालें! 🇮🇳'
                : 'You\'ve learned all the voting steps. Now go out there and cast your vote! 🇮🇳'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReset}
                className={`px-6 py-3 rounded-xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {language === 'hi' ? 'फिर से शुरू करें' : 'Start Over'}
              </button>
              <button
                onClick={() => { const el = document.getElementById('quiz'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                🎯 {language === 'hi' ? 'क्विज़ दें' : 'Take the Quiz'}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
