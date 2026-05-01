export type Language = 'en' | 'hi';

export interface Translation {
  // Nav
  navHome: string;
  navTimeline: string;
  navWizard: string;
  navQuiz: string;
  navFAQ: string;
  navStates: string;
  navAI: string;

  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroCTA: string;
  heroSecondary: string;
  heroStat1: string;
  heroStat1Label: string;
  heroStat2: string;
  heroStat2Label: string;
  heroStat3: string;
  heroStat3Label: string;

  // Timeline
  timelineTitle: string;
  timelineSubtitle: string;

  // Wizard
  wizardTitle: string;
  wizardSubtitle: string;
  wizardNext: string;
  wizardPrev: string;
  wizardFinish: string;
  wizardStep: string;
  wizardOf: string;

  // Quiz
  quizTitle: string;
  quizSubtitle: string;
  quizStart: string;
  quizNext: string;
  quizSubmit: string;
  quizScore: string;
  quizRetry: string;
  quizCorrect: string;
  quizWrong: string;
  quizExcellent: string;
  quizGood: string;
  quizKeepLearning: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;

  // States
  statesTitle: string;
  statesSubtitle: string;
  statesSelect: string;
  statesPhases: string;
  statesSeats: string;
  statesVoters: string;
  statesDate: string;
  statesConstituencies: string;

  // AI Section
  aiTitle: string;
  aiSubtitle: string;
  aiPlaceholder: string;
  aiSend: string;
  aiDisclaimer: string;
  aiThinking: string;

  // Footer
  footerTagline: string;
  footerRights: string;
  footerECI: string;

  // Theme
  lightMode: string;
  darkMode: string;

  // Common
  learnMore: string;
  close: string;
  loading: string;
}

const en: Translation = {
  navHome: 'Home',
  navTimeline: 'Timeline',
  navWizard: 'How to Vote',
  navQuiz: 'Quiz',
  navFAQ: 'FAQ',
  navStates: 'States',
  navAI: 'Ask AI',

  heroTitle: 'BharatVote Guide',
  heroSubtitle: 'Your Complete Guide to Indian Elections',
  heroTagline: 'Empowering every citizen to understand, participate, and shape India\'s democracy — step by step.',
  heroCTA: 'Start Learning',
  heroSecondary: 'Take the Quiz',
  heroStat1: '960M+',
  heroStat1Label: 'Registered Voters',
  heroStat2: '543',
  heroStat2Label: 'Lok Sabha Seats',
  heroStat3: '28+',
  heroStat3Label: 'States & UTs',

  timelineTitle: 'Election Process Timeline',
  timelineSubtitle: 'From announcement to results — understand every step of India\'s democratic journey.',

  wizardTitle: 'Step-by-Step Voting Guide',
  wizardSubtitle: 'Follow these steps to exercise your democratic right.',
  wizardNext: 'Next Step',
  wizardPrev: 'Previous',
  wizardFinish: 'Complete! 🎉',
  wizardStep: 'Step',
  wizardOf: 'of',

  quizTitle: 'Test Your Knowledge',
  quizSubtitle: 'How well do you know the Indian Election Process?',
  quizStart: 'Start Quiz',
  quizNext: 'Next Question',
  quizSubmit: 'Submit Answer',
  quizScore: 'Your Score',
  quizRetry: 'Try Again',
  quizCorrect: 'Correct! 🎉',
  quizWrong: 'Not quite right.',
  quizExcellent: 'Excellent! You\'re a democracy expert! 🏆',
  quizGood: 'Good job! Keep learning! 📚',
  quizKeepLearning: 'Keep practicing — democracy needs informed citizens! 💪',

  faqTitle: 'Frequently Asked Questions',
  faqSubtitle: 'Clear answers to your most important election questions.',

  statesTitle: 'State-wise Election Info',
  statesSubtitle: 'Select your state to view specific election details.',
  statesSelect: 'Select a State',
  statesPhases: 'Polling Phases',
  statesSeats: 'Lok Sabha Seats',
  statesVoters: 'Registered Voters',
  statesDate: 'Last Election Date',
  statesConstituencies: 'Assembly Constituencies',

  aiTitle: 'Ask Our AI Assistant',
  aiSubtitle: 'Have questions about elections? Our AI is here to help you 24/7.',
  aiPlaceholder: 'e.g. How do I register to vote in India?',
  aiSend: 'Send',
  aiDisclaimer: 'AI responses are for educational purposes. For official information, visit eci.gov.in',
  aiThinking: 'Thinking...',

  footerTagline: 'Educating India\'s voters, one step at a time.',
  footerRights: 'All rights reserved. Made with ❤️ for Indian Democracy.',
  footerECI: 'Official ECI Website',

  lightMode: 'Light Mode',
  darkMode: 'Dark Mode',
  learnMore: 'Learn More',
  close: 'Close',
  loading: 'Loading...',
};

const hi: Translation = {
  navHome: 'होम',
  navTimeline: 'टाइमलाइन',
  navWizard: 'कैसे वोट करें',
  navQuiz: 'क्विज़',
  navFAQ: 'प्रश्नोत्तर',
  navStates: 'राज्य',
  navAI: 'AI से पूछें',

  heroTitle: 'भारत वोट गाइड',
  heroSubtitle: 'भारतीय चुनावों की संपूर्ण मार्गदर्शिका',
  heroTagline: 'हर नागरिक को भारत के लोकतंत्र को समझने, भाग लेने और आकार देने के लिए सशक्त बनाना — कदम दर कदम।',
  heroCTA: 'सीखना शुरू करें',
  heroSecondary: 'क्विज़ दें',
  heroStat1: '96 करोड़+',
  heroStat1Label: 'पंजीकृत मतदाता',
  heroStat2: '543',
  heroStat2Label: 'लोकसभा सीटें',
  heroStat3: '28+',
  heroStat3Label: 'राज्य और केंद्र शासित प्रदेश',

  timelineTitle: 'चुनाव प्रक्रिया टाइमलाइन',
  timelineSubtitle: 'घोषणा से परिणाम तक — भारत की लोकतांत्रिक यात्रा के हर कदम को समझें।',

  wizardTitle: 'चरण-दर-चरण मतदान मार्गदर्शिका',
  wizardSubtitle: 'अपने लोकतांत्रिक अधिकार का प्रयोग करने के लिए इन चरणों का पालन करें।',
  wizardNext: 'अगला कदम',
  wizardPrev: 'पिछला',
  wizardFinish: 'पूर्ण! 🎉',
  wizardStep: 'चरण',
  wizardOf: 'का',

  quizTitle: 'अपना ज्ञान परखें',
  quizSubtitle: 'आप भारतीय चुनाव प्रक्रिया के बारे में कितना जानते हैं?',
  quizStart: 'क्विज़ शुरू करें',
  quizNext: 'अगला प्रश्न',
  quizSubmit: 'उत्तर जमा करें',
  quizScore: 'आपका स्कोर',
  quizRetry: 'फिर से कोशिश करें',
  quizCorrect: 'सही! 🎉',
  quizWrong: 'बिल्कुल सही नहीं।',
  quizExcellent: 'शानदार! आप लोकतंत्र के विशेषज्ञ हैं! 🏆',
  quizGood: 'अच्छा काम! सीखते रहें! 📚',
  quizKeepLearning: 'अभ्यास जारी रखें — लोकतंत्र को सूचित नागरिकों की जरूरत है! 💪',

  faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
  faqSubtitle: 'आपके सबसे महत्वपूर्ण चुनाव प्रश्नों के स्पष्ट उत्तर।',

  statesTitle: 'राज्यवार चुनाव जानकारी',
  statesSubtitle: 'विशिष्ट चुनाव विवरण देखने के लिए अपना राज्य चुनें।',
  statesSelect: 'एक राज्य चुनें',
  statesPhases: 'मतदान चरण',
  statesSeats: 'लोकसभा सीटें',
  statesVoters: 'पंजीकृत मतदाता',
  statesDate: 'अंतिम चुनाव तिथि',
  statesConstituencies: 'विधानसभा क्षेत्र',

  aiTitle: 'हमारे AI सहायक से पूछें',
  aiSubtitle: 'चुनावों के बारे में प्रश्न हैं? हमारा AI 24/7 आपकी मदद के लिए यहाँ है।',
  aiPlaceholder: 'उदा. भारत में वोट के लिए पंजीकरण कैसे करें?',
  aiSend: 'भेजें',
  aiDisclaimer: 'AI उत्तर शैक्षिक उद्देश्यों के लिए हैं। आधिकारिक जानकारी के लिए eci.gov.in पर जाएँ।',
  aiThinking: 'सोच रहा हूँ...',

  footerTagline: 'भारत के मतदाताओं को एक-एक कदम शिक्षित करना।',
  footerRights: 'सर्वाधिकार सुरक्षित। भारतीय लोकतंत्र के लिए ❤️ के साथ बनाया गया।',
  footerECI: 'आधिकारिक ECI वेबसाइट',

  lightMode: 'लाइट मोड',
  darkMode: 'डार्क मोड',
  learnMore: 'और जानें',
  close: 'बंद करें',
  loading: 'लोड हो रहा है...',
};

export const translations: Record<Language, Translation> = { en, hi };
