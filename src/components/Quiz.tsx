import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { quizQuestions } from '../data/electionData';

type QuizState = 'idle' | 'active' | 'answered' | 'complete';

export default function Quiz() {
  const { t, language, isDark, setActiveSection } = useApp();
  const [state, setState] = useState<QuizState>('idle');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('quiz'); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const question = quizQuestions[currentQ];
  const total = quizQuestions.length;

  const startQuiz = () => {
    setState('active');
    setCurrentQ(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  const handleAnswer = (idx: number) => {
    if (state === 'answered') return;
    setSelectedAnswer(idx);
    setState('answered');

    const isCorrect = idx === question.correctIndex;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, idx]);
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedAnswer(null);
      setState('active');
    } else {
      setState('complete');
    }
  };

  const getScoreMessage = () => {
    const pct = (score / total) * 100;
    if (pct >= 80) return { msg: t.quizExcellent, emoji: '🏆', color: 'text-yellow-500' };
    if (pct >= 50) return { msg: t.quizGood, emoji: '📚', color: 'text-blue-500' };
    return { msg: t.quizKeepLearning, emoji: '💪', color: 'text-orange-500' };
  };

  const getOptionStyle = (idx: number) => {
    if (state !== 'answered') {
      return isDark
        ? 'bg-gray-700 border border-gray-600 text-gray-200 hover:border-orange-500 hover:bg-orange-900/20 cursor-pointer'
        : 'bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-orange-50 cursor-pointer';
    }
    if (idx === question.correctIndex) {
      return 'bg-green-500/20 border-2 border-green-500 text-green-700 dark:text-green-300';
    }
    if (idx === selectedAnswer && idx !== question.correctIndex) {
      return 'bg-red-500/20 border-2 border-red-500 text-red-700 dark:text-red-300';
    }
    return isDark
      ? 'bg-gray-800 border border-gray-700 text-gray-500 opacity-60'
      : 'bg-gray-50 border border-gray-200 text-gray-400 opacity-60';
  };

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'}`}
      aria-labelledby="quiz-title"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
          }`}>
            <span aria-hidden="true">🎯</span> {t.navQuiz}
          </div>
          <h2 id="quiz-title" className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.quizTitle}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.quizSubtitle}
          </p>
        </div>

        {/* Quiz Idle */}
        {state === 'idle' && (
          <div className={`rounded-3xl p-8 sm:p-12 text-center shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`}>
            <div className="text-7xl mb-6" aria-hidden="true">🧠</div>
            <h3 className={`text-2xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'hi' ? 'क्या आप तैयार हैं?' : 'Ready to Test Your Knowledge?'}
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'hi'
                ? `${total} प्रश्नों का क्विज़। प्रत्येक सही उत्तर के लिए 1 अंक।`
                : `${total} questions about Indian elections. 1 point for each correct answer.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['📅 Election Process', '🗳️ Voting Rights', '🏛️ Constitution', '📋 Registration'].map(tag => (
                <span
                  key={tag}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={startQuiz}
              className="px-10 py-4 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg shadow-purple-500/30 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-purple-400"
              aria-label={t.quizStart}
            >
              🚀 {t.quizStart}
            </button>
          </div>
        )}

        {/* Active Quiz */}
        {(state === 'active' || state === 'answered') && (
          <div className={`rounded-3xl overflow-hidden shadow-xl ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
          }`} role="region" aria-label={`Question ${currentQ + 1} of ${total}`}>
            {/* Progress */}
            <div className={`p-4 sm:p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {language === 'hi' ? 'प्रश्न' : 'Question'} {currentQ + 1}/{total}
                </span>
                <span className={`text-sm font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {language === 'hi' ? 'स्कोर' : 'Score'}: {score}/{currentQ + (state === 'answered' ? 1 : 0)}
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${((currentQ + (state === 'answered' ? 1 : 0)) / total) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="p-6 sm:p-8">
              <h3 className={`text-lg sm:text-xl font-bold mb-6 leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'hi' ? question.questionHi : question.questionEn}
              </h3>

              {/* Options */}
              <div className="space-y-3" role="radiogroup" aria-label="Answer options">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={state === 'answered'}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left focus:outline-none focus:ring-2 focus:ring-purple-500 ${getOptionStyle(idx)}`}
                    role="radio"
                    aria-checked={selectedAnswer === idx}
                    aria-label={language === 'hi' ? opt.hi : opt.en}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      state === 'answered' && idx === question.correctIndex
                        ? 'border-green-500 bg-green-500 text-white'
                        : state === 'answered' && idx === selectedAnswer
                          ? 'border-red-500 bg-red-500 text-white'
                          : isDark ? 'border-gray-500 text-gray-400' : 'border-gray-300 text-gray-500'
                    }`} aria-hidden="true">
                      {state === 'answered' && idx === question.correctIndex ? '✓' :
                       state === 'answered' && idx === selectedAnswer ? '✗' :
                       String.fromCharCode(65 + idx)}
                    </div>
                    <span className="font-medium text-sm sm:text-base">
                      {language === 'hi' ? opt.hi : opt.en}
                    </span>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {state === 'answered' && (
                <div className={`mt-6 p-5 rounded-2xl ${
                  selectedAnswer === question.correctIndex
                    ? isDark ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200'
                    : isDark ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200'
                }`} role="alert">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {selectedAnswer === question.correctIndex ? '🎉' : '📖'}
                    </span>
                    <div>
                      <p className={`font-bold mb-1 ${
                        selectedAnswer === question.correctIndex
                          ? isDark ? 'text-green-400' : 'text-green-700'
                          : isDark ? 'text-red-400' : 'text-red-700'
                      }`}>
                        {selectedAnswer === question.correctIndex ? t.quizCorrect : t.quizWrong}
                      </p>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'hi' ? question.explanationHi : question.explanationEn}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Next */}
            {state === 'answered' && (
              <div className={`px-6 sm:px-8 pb-6 sm:pb-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'} pt-4`}>
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-400"
                  aria-label={currentQ < total - 1 ? t.quizNext : language === 'hi' ? 'परिणाम देखें' : 'See Results'}
                >
                  {currentQ < total - 1 ? `${t.quizNext} →` : (language === 'hi' ? '🏁 परिणाम देखें' : '🏁 See Results')}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {state === 'complete' && (() => {
          const { msg, emoji, color } = getScoreMessage();
          return (
            <div className={`rounded-3xl p-8 sm:p-12 shadow-xl ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
            }`} role="region" aria-label="Quiz results">
              <div className="text-center mb-8">
                <div className="text-7xl mb-4" aria-hidden="true">{emoji}</div>
                <h3 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t.quizScore}: {score}/{total}
                </h3>
                <p className={`text-xl font-bold mb-4 ${color}`}>{msg}</p>
                <div className={`inline-block px-6 py-2 rounded-full text-2xl font-black ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                } ${color}`}>
                  {Math.round((score / total) * 100)}%
                </div>
              </div>

              {/* Answer Review */}
              <div className="space-y-3 mb-8">
                <h4 className={`font-bold text-sm uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'hi' ? 'उत्तर समीक्षा' : 'Answer Review'}
                </h4>
                {quizQuestions.map((q, i) => {
                  const userAns = answers[i];
                  const correct = userAns === q.correctIndex;
                  return (
                    <div key={q.id} className={`flex items-center gap-3 p-3 rounded-xl ${
                      correct
                        ? isDark ? 'bg-green-900/20' : 'bg-green-50'
                        : isDark ? 'bg-red-900/20' : 'bg-red-50'
                    }`}>
                      <span className={`text-lg flex-shrink-0 ${correct ? 'text-green-500' : 'text-red-500'}`} aria-hidden="true">
                        {correct ? '✅' : '❌'}
                      </span>
                      <span className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'hi' ? q.questionHi : q.questionEn}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={startQuiz}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  🔄 {t.quizRetry}
                </button>
                <button
                  onClick={() => { const el = document.getElementById('faq'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  ❓ {language === 'hi' ? 'FAQ पढ़ें' : 'Read FAQ'}
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
