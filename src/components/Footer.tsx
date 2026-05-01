import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t, language, isDark } = useApp();

  const links = [
    { label: language === 'hi' ? 'ECI आधिकारिक' : 'ECI Official', href: 'https://eci.gov.in', icon: '🏛️' },
    { label: language === 'hi' ? 'मतदाता पोर्टल' : 'Voter Portal', href: 'https://voters.eci.gov.in', icon: '📋' },
    { label: language === 'hi' ? 'मतदाता खोज' : 'Voter Search', href: 'https://electoralsearch.eci.gov.in', icon: '🔍' },
    { label: language === 'hi' ? 'cVIGIL ऐप' : 'cVIGIL App', href: 'https://cvigil.eci.gov.in', icon: '📱' },
  ];

  const sections = [
    {
      title: language === 'hi' ? 'त्वरित लिंक' : 'Quick Links',
      items: [
        { label: language === 'hi' ? 'होम' : 'Home', href: '#home' },
        { label: language === 'hi' ? 'टाइमलाइन' : 'Timeline', href: '#timeline' },
        { label: language === 'hi' ? 'वोटिंग गाइड' : 'Voting Guide', href: '#wizard' },
        { label: language === 'hi' ? 'क्विज़' : 'Quiz', href: '#quiz' },
      ],
    },
    {
      title: language === 'hi' ? 'और जानें' : 'Learn More',
      items: [
        { label: language === 'hi' ? 'FAQ' : 'FAQ', href: '#faq' },
        { label: language === 'hi' ? 'राज्यवार जानकारी' : 'State Info', href: '#states' },
        { label: language === 'hi' ? 'AI सहायक' : 'AI Assistant', href: '#ai' },
        { label: language === 'hi' ? 'मतदाता हेल्पलाइन' : 'Voter Helpline', href: 'tel:1950' },
      ],
    },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className={`${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-100'}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-green-600 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">🇮🇳</div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
            {language === 'hi' ? 'अपना वोट डालें। अपना भविष्य चुनें।' : 'Cast Your Vote. Choose Your Future.'}
          </h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            {language === 'hi'
              ? 'प्रत्येक वोट मायने रखता है। आज ही पंजीकरण करें और लोकतंत्र को मजबूत बनाएँ।'
              : 'Every vote matters. Register today and strengthen India\'s democracy.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white text-orange-600 font-bold hover:bg-orange-50 transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              📋 {language === 'hi' ? 'अभी पंजीकरण करें' : 'Register Now'}
            </a>
            <a
              href="tel:1950"
              className="px-6 py-3 rounded-xl bg-white/20 text-white border border-white/30 font-bold hover:bg-white/30 transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              📞 {language === 'hi' ? '1950 पर कॉल करें' : 'Call 1950'}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-green-600 flex items-center justify-center text-2xl shadow" aria-hidden="true">
                🇮🇳
              </div>
              <div>
                <div className={`font-black text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>BharatVote Guide</div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>भारत निर्वाचन मार्गदर्शिका</div>
              </div>
            </div>
            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.footerTagline} {language === 'hi' ? 'आधिकारिक ECI संसाधनों पर आधारित।' : 'Based on official ECI resources.'}
            </p>

            {/* Official Links */}
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portals'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-600 hover:bg-orange-50 border border-gray-100 shadow-sm'
                    }`}
                    aria-label={`${link.label} (opens in new tab)`}
                  >
                    <span aria-hidden="true">{link.icon}</span>
                    {link.label}
                    <svg className="w-3 h-3 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {sections.map(section => (
            <div key={section.title}>
              <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {section.title}
              </h4>
              <ul className="space-y-2.5" role="list">
                {section.items.map(item => (
                  <li key={item.label}>
                    {item.href.startsWith('#') ? (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded ${
                          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className={`text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 rounded ${
                          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`mt-10 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={`text-xs text-center sm:text-left ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            © 2024 BharatVote Guide. {t.footerRights}
          </p>
          <div className="flex items-center gap-4">
            <span className={`text-xs flex items-center gap-1.5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              <span aria-hidden="true">⚡</span>
              Built with React + Vite
            </span>
            <span className={`text-xs px-2 py-1 rounded-md ${isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
