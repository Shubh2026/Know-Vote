import { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// Rate limiting: max 5 requests per minute
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

// Input sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML
    .trim()
    .slice(0, 500); // Max length
}

// Simulated AI responses for demo (since we can't call Gemini without a key)
const ELECTION_KNOWLEDGE_BASE: Record<string, string> = {
  register: `To register as a voter in India:
1. Visit **voters.eci.gov.in** or download the "Voter Helpline" app
2. Fill **Form 6** for new registration
3. Upload your photo, Aadhaar, and address proof
4. Submit and note your acknowledgment number
5. A Booth Level Officer (BLO) will verify your details
6. Your Voter ID (EPIC card) will be dispatched within 30-45 days

Call **1950** (Voter Helpline) for assistance! 📞`,
  vote: `**How to cast your vote on Election Day:**
1. Carry your **Voter ID** or any of the 12 approved IDs (Aadhaar, PAN, Passport, etc.)
2. Go to your designated **polling booth** (check voters.eci.gov.in)
3. Join the queue — show your ID to the first polling official
4. Get your **left index finger** marked with indelible ink
5. Receive a slip and proceed to the **EVM**
6. Press the button next to your chosen candidate
7. Wait for the **beep** — your vote is registered! ✅
8. Check the **VVPAT slip** for 7 seconds to confirm

Remember: **NOTA** is also an option if you reject all candidates.`,
  evm: `**Electronic Voting Machine (EVM)** is used in Indian elections since 2004.
- **Balloting Unit**: Has candidate names with blue buttons
- **Control Unit**: Operated by the polling officer
- **VVPAT**: Voter Verified Paper Audit Trail — shows your vote for 7 seconds

EVMs are **not connected to the internet**, are battery-powered, and were developed by Bharat Electronics Ltd (BEL) and ECIL.

After voting, EVMs are sealed and stored in secure **strong rooms** until counting day. 🔒`,
  mcc: `The **Model Code of Conduct (MCC)** is activated immediately when elections are announced.

**Key rules:**
• Government cannot announce new welfare schemes or policies
• Political parties must follow guidelines for rallies and speeches
• Hate speech and paid news are strictly prohibited
• Spending limits: **₹95 lakh** per Lok Sabha candidate

MCC violations can be reported via:
• **cVIGIL app** — report with geotagged photos/videos (resolved in 100 minutes)
• **1950** helpline
• Nearest Returning Officer`,
  nota: `**NOTA (None Of The Above)** was introduced in India in **2013** following a Supreme Court order.

- It's the **last button** on the EVM
- Allows voters to reject ALL candidates on the ballot
- Important: NOTA votes are **counted separately** and don't affect the winner
- Even if NOTA gets the most votes, the candidate with the highest valid votes **still wins**

NOTA upholds the principle that voters should have the right to express dissatisfaction with all available candidates. 🗳️`,
  eci: `The **Election Commission of India (ECI)** is an autonomous constitutional authority.

- Established: **January 25, 1950** (now celebrated as National Voters' Day)
- Composition: Chief Election Commissioner + 2 Election Commissioners
- Powers: Can postpone elections, disqualify candidates, derecognize parties

**Key functions:**
• Voter registration management
• Election schedule announcement
• Model Code of Conduct enforcement
• Observer deployment
• Electronic Voting Machine oversight

Website: **eci.gov.in** | Helpline: **1950** 📢`,
  age: `**Voting eligibility in India:**

To vote, you must be:
✅ An Indian citizen
✅ At least **18 years old** on January 1 of the qualifying year
✅ A resident of the constituency where you're registered
✅ Of sound mind
✅ Not disqualified under any law

The minimum voting age was reduced from **21 to 18 years** by the 61st Constitutional Amendment Act, 1988.

To **stand as a candidate** for Lok Sabha, you must be at least **25 years old**. 🏛️`,
};

function getAIResponse(query: string, language: 'en' | 'hi'): string {
  const q = query.toLowerCase();
  
  let response = '';
  
  if (q.includes('register') || q.includes('पंजीकरण') || q.includes('voter id') || q.includes('मतदाता')) {
    response = ELECTION_KNOWLEDGE_BASE.register;
  } else if (q.includes('vote') || q.includes('मतदान') || q.includes('cast') || q.includes('polling')) {
    response = ELECTION_KNOWLEDGE_BASE.vote;
  } else if (q.includes('evm') || q.includes('machine') || q.includes('मशीन')) {
    response = ELECTION_KNOWLEDGE_BASE.evm;
  } else if (q.includes('mcc') || q.includes('code of conduct') || q.includes('आचार संहिता') || q.includes('model code')) {
    response = ELECTION_KNOWLEDGE_BASE.mcc;
  } else if (q.includes('nota') || q.includes('none of the above') || q.includes('उपरोक्त')) {
    response = ELECTION_KNOWLEDGE_BASE.nota;
  } else if (q.includes('eci') || q.includes('election commission') || q.includes('निर्वाचन आयोग')) {
    response = ELECTION_KNOWLEDGE_BASE.eci;
  } else if (q.includes('age') || q.includes('आयु') || q.includes('18') || q.includes('eligib') || q.includes('योग्यता')) {
    response = ELECTION_KNOWLEDGE_BASE.age;
  } else {
    response = language === 'hi'
      ? `मैं भारतीय चुनाव प्रक्रिया के बारे में मदद कर सकता हूँ! 

मुझसे इन विषयों पर पूछें:
• **मतदाता पंजीकरण** — कैसे पंजीकरण करें
• **मतदान प्रक्रिया** — मतदान दिवस पर क्या करें
• **EVM और VVPAT** — वोटिंग मशीनें कैसे काम करती हैं
• **आदर्श आचार संहिता** — चुनावी नियम
• **NOTA** — किसी को वोट न देने का विकल्प
• **ECI** — भारत निर्वाचन आयोग के बारे में
• **पात्रता** — मतदान के लिए आयु और योग्यता

आधिकारिक जानकारी के लिए **eci.gov.in** पर जाएँ या **1950** पर कॉल करें। 🇮🇳`
      : `I can help you with Indian election processes! 🇮🇳

Try asking me about:
• **Voter registration** — How to register to vote
• **Voting process** — What to do on election day
• **EVM & VVPAT** — How voting machines work
• **Model Code of Conduct** — Election rules
• **NOTA** — The "none of the above" option
• **ECI** — About the Election Commission of India
• **Eligibility** — Age and qualifications to vote

For official information, visit **eci.gov.in** or call **1950**.`;
  }

  return response;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^• /gm, '&bull; ')
    .replace(/\n/g, '<br/>');
}

const SUGGESTED_QUESTIONS = {
  en: [
    'How do I register to vote?',
    'What documents do I need to vote?',
    'What is NOTA?',
    'How does EVM work?',
    'What is the Model Code of Conduct?',
  ],
  hi: [
    'मतदाता के रूप में कैसे पंजीकरण करें?',
    'वोट देने के लिए कौन से दस्तावेज चाहिए?',
    'NOTA क्या है?',
    'EVM कैसे काम करती है?',
    'आदर्श आचार संहिता क्या है?',
  ],
};

export default function AIAssistant() {
  const { t, language, isDark, setActiveSection } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [requestTimestamps, setRequestTimestamps] = useState<number[]>([]);
  const [rateLimitMsg, setRateLimitMsg] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection('ai'); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const recentRequests = requestTimestamps.filter(ts => now - ts < RATE_WINDOW);
    if (recentRequests.length >= RATE_LIMIT) {
      const oldestAllowed = recentRequests[0] + RATE_WINDOW;
      const waitSeconds = Math.ceil((oldestAllowed - now) / 1000);
      setRateLimitMsg(
        language === 'hi'
          ? `कृपया ${waitSeconds} सेकंड प्रतीक्षा करें।`
          : `Please wait ${waitSeconds} seconds before asking again.`
      );
      return false;
    }
    setRateLimitMsg('');
    return true;
  }, [requestTimestamps, language]);

  const sendMessage = useCallback(async (query?: string) => {
    const rawInput = query || input;
    if (!rawInput.trim() || isThinking) return;

    if (!checkRateLimit()) return;

    const sanitized = sanitizeInput(rawInput);
    if (!sanitized) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: sanitized,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    setRequestTimestamps(prev => [...prev, Date.now()]);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const responseText = getAIResponse(sanitized, language);
    const assistantMsg: Message = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: responseText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsThinking(false);
  }, [input, isThinking, checkRateLimit, language]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section
      id="ai"
      ref={sectionRef}
      className={`py-20 ${isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-violet-50 via-white to-blue-50'}`}
      aria-labelledby="ai-title"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDark ? 'bg-violet-900/30 text-violet-400' : 'bg-violet-100 text-violet-700'
          }`}>
            <span aria-hidden="true">🤖</span> AI Assistant
          </div>
          <h2 id="ai-title" className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.aiTitle}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.aiSubtitle}
          </p>
        </div>

        {/* Chat Container */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
        }`} role="region" aria-label="AI Chat">
          {/* Chat Header */}
          <div className={`flex items-center gap-3 p-4 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-xl shadow-md" aria-hidden="true">
              🤖
            </div>
            <div>
              <div className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'hi' ? 'भारत वोट AI सहायक' : 'BharatVote AI Assistant'}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {language === 'hi' ? 'ऑनलाइन' : 'Online'}
                </span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
              }`}>
                {RATE_LIMIT - requestTimestamps.filter(ts => Date.now() - ts < RATE_WINDOW).length}/{RATE_LIMIT}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div
            className={`h-96 overflow-y-auto p-4 sm:p-6 space-y-4 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {/* Welcome Message */}
            {messages.length === 0 && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-sm flex-shrink-0 shadow" aria-hidden="true">
                  🤖
                </div>
                <div className={`flex-1 rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed ${
                  isDark ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700 shadow-sm border border-gray-100'
                }`}>
                  {language === 'hi'
                    ? '🙏 नमस्ते! मैं भारत वोट AI सहायक हूँ। भारतीय चुनाव प्रक्रिया, मतदाता पंजीकरण, EVM, आदर्श आचार संहिता, और बहुत कुछ के बारे में मुझसे पूछें!'
                    : '🙏 Namaste! I\'m the BharatVote AI Assistant. Ask me anything about the Indian election process, voter registration, EVMs, Model Code of Conduct, and more!'}
                </div>
              </div>
            )}

            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                      : 'bg-gradient-to-br from-violet-500 to-violet-600'
                  }`}
                  aria-hidden="true"
                >
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div
                  className={`flex-1 max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-tr-sm bg-gradient-to-br from-orange-500 to-orange-600 text-white ml-auto'
                      : isDark
                        ? 'rounded-tl-sm bg-gray-700 text-gray-200'
                        : 'rounded-tl-sm bg-white text-gray-700 shadow-sm border border-gray-100'
                  }`}
                  dangerouslySetInnerHTML={msg.role === 'assistant' ? { __html: renderMarkdown(msg.content) } : undefined}
                >
                  {msg.role === 'user' ? msg.content : undefined}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-3" role="status" aria-label={t.aiThinking}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-sm shadow" aria-hidden="true">
                  🤖
                </div>
                <div className={`rounded-2xl rounded-tl-sm p-4 ${isDark ? 'bg-gray-700' : 'bg-white shadow-sm border border-gray-100'}`}>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className={`text-xs ml-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.aiThinking}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className={`px-4 py-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'hi' ? '💡 सुझाए गए प्रश्न:' : '💡 Suggested questions:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS[language].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className={`text-xs px-3 py-1.5 rounded-xl transition-all hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      isDark
                        ? 'bg-gray-700 text-violet-300 hover:bg-violet-900/30 border border-gray-600'
                        : 'bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200'
                    }`}
                    aria-label={`Ask: ${q}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rate Limit Warning */}
          {rateLimitMsg && (
            <div className={`px-4 py-2 text-xs text-center ${isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'}`} role="alert">
              ⏳ {rateLimitMsg}
            </div>
          )}

          {/* Input */}
          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="flex gap-3">
              <label htmlFor="ai-input" className="sr-only">
                {language === 'hi' ? 'अपना प्रश्न टाइप करें' : 'Type your question'}
              </label>
              <input
                id="ai-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder={t.aiPlaceholder}
                maxLength={500}
                className={`flex-1 px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
                }`}
                aria-label={t.aiPlaceholder}
                disabled={isThinking}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isThinking}
                className="px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-violet-700 shadow-md hover:shadow-violet-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label={t.aiSend}
              >
                {isThinking ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            <p className={`mt-2 text-xs text-center ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              {t.aiDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
