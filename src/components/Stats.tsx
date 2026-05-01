import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

const stats = [
  {
    value: 960,
    suffix: 'M+',
    labelEn: 'Registered Voters',
    labelHi: 'पंजीकृत मतदाता',
    icon: '👥',
    color: 'from-orange-500 to-orange-600',
    desc: { en: 'Largest electorate in the world', hi: 'दुनिया का सबसे बड़ा निर्वाचक मंडल' },
  },
  {
    value: 543,
    suffix: '',
    labelEn: 'Lok Sabha Seats',
    labelHi: 'लोकसभा सीटें',
    icon: '🏛️',
    color: 'from-green-500 to-green-600',
    desc: { en: '272 needed for majority', hi: 'बहुमत के लिए 272 आवश्यक' },
  },
  {
    value: 1,
    suffix: 'M+',
    labelEn: 'Polling Stations',
    labelHi: 'मतदान केंद्र',
    icon: '🗳️',
    color: 'from-blue-500 to-blue-600',
    desc: { en: 'Across all constituencies', hi: 'सभी निर्वाचन क्षेत्रों में' },
  },
  {
    value: 75,
    suffix: '+',
    labelEn: 'Years of Democracy',
    labelHi: 'लोकतंत्र के वर्ष',
    icon: '🇮🇳',
    color: 'from-purple-500 to-purple-600',
    desc: { en: 'India\'s democratic journey since 1950', hi: '1950 से भारत की लोकतांत्रिक यात्रा' },
  },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 50;
          const increment = target / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            setCurrent(Math.min(Math.round(increment * step), target));
            if (step >= steps) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{current}{suffix}</span>;
}

export default function Stats() {
  const { language, isDark } = useApp();

  return (
    <section
      className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
      aria-label="Election statistics"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
          {stats.map(stat => (
            <div
              key={stat.labelEn}
              className={`rounded-2xl p-5 sm:p-6 transition-all hover:scale-[1.03] ${
                isDark
                  ? 'bg-gray-900 border border-gray-700 hover:border-orange-500/30'
                  : 'bg-white border border-gray-100 shadow hover:shadow-lg'
              }`}
              role="listitem"
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-md mb-4`}
                aria-hidden="true"
              >
                {stat.icon}
              </div>
              <div className={`text-3xl sm:text-4xl font-black mb-1 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'hi' ? stat.labelHi : stat.labelEn}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'hi' ? stat.desc.hi : stat.desc.en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
