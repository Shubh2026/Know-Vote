export interface TimelineEvent {
  id: string;
  phase: number;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  icon: string;
  color: string;
  duration: string;
  keyPoints: { en: string[]; hi: string[] };
}

export interface WizardStep {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  icon: string;
  color: string;
  stepsEn: string[];
  stepsHi: string[];
  tipsEn?: string;
  tipsHi?: string;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionHi: string;
  options: { en: string; hi: string }[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  category: string;
}

export interface StateInfo {
  name: string;
  nameHi: string;
  code: string;
  capital: string;
  capitalHi: string;
  lokSabhaSeats: number;
  assemblySeats: number;
  registeredVoters: string;
  phases: number;
  lastElectionDate: string;
  currentCM: string;
  currentCMHi: string;
  rulingParty: string;
  colorGradient: string;
  descriptionEn: string;
  descriptionHi: string;
  specialFacts: { en: string[]; hi: string[] };
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'announcement',
    phase: 1,
    titleEn: 'Election Announcement',
    titleHi: 'चुनाव की घोषणा',
    descriptionEn: 'The Election Commission of India (ECI) announces the election schedule after consulting with stakeholders. The Model Code of Conduct comes into immediate effect.',
    descriptionHi: 'भारत निर्वाचन आयोग (ECI) हितधारकों से परामर्श के बाद चुनाव कार्यक्रम की घोषणा करता है। आदर्श आचार संहिता तत्काल प्रभाव से लागू हो जाती है।',
    icon: '📢',
    color: '#FF6B35',
    duration: 'Day 1',
    keyPoints: {
      en: [
        'ECI announces poll dates via press conference',
        'Model Code of Conduct (MCC) activated immediately',
        'Government cannot announce new schemes post-MCC',
        'Schedule includes dates for all phases',
        'Media briefing and official gazette notification'
      ],
      hi: [
        'ECI प्रेस कॉन्फ्रेंस के जरिए मतदान तिथियों की घोषणा करता है',
        'आदर्श आचार संहिता (MCC) तत्काल सक्रिय',
        'MCC के बाद सरकार नई योजनाओं की घोषणा नहीं कर सकती',
        'सभी चरणों की तिथियाँ अनुसूची में शामिल',
        'मीडिया ब्रीफिंग और आधिकारिक राजपत्र अधिसूचना'
      ]
    }
  },
  {
    id: 'voter-registration',
    phase: 2,
    titleEn: 'Voter Registration & Roll Update',
    titleHi: 'मतदाता पंजीकरण और सूची अद्यतन',
    descriptionEn: 'Citizens aged 18+ can register to vote. The electoral roll is updated, verified and published. Citizens check their names and report corrections.',
    descriptionHi: '18+ आयु के नागरिक मतदाता के रूप में पंजीकरण कर सकते हैं। मतदाता सूची को अद्यतन, सत्यापित और प्रकाशित किया जाता है।',
    icon: '📋',
    color: '#4ECDC4',
    duration: 'Weeks 1-4',
    keyPoints: {
      en: [
        'Fill Form 6 at your local Electoral Registration Office',
        'Online registration via voters.eci.gov.in',
        'Required documents: Aadhaar, address proof, photo',
        'Voter ID card (EPIC) issued after verification',
        'Corrections possible via Form 8'
      ],
      hi: [
        'स्थानीय निर्वाचन पंजीकरण कार्यालय में फॉर्म 6 भरें',
        'voters.eci.gov.in पर ऑनलाइन पंजीकरण',
        'आवश्यक दस्तावेज: आधार, पता प्रमाण, फोटो',
        'सत्यापन के बाद मतदाता पहचान पत्र (EPIC) जारी',
        'फॉर्म 8 के माध्यम से सुधार संभव'
      ]
    }
  },
  {
    id: 'nomination',
    phase: 3,
    titleEn: 'Candidate Nomination',
    titleHi: 'उम्मीदवार नामांकन',
    descriptionEn: 'Political parties and independent candidates file their nominations. Each candidate submits Form 2B with required documents and security deposit.',
    descriptionHi: 'राजनीतिक दल और निर्दलीय उम्मीदवार अपने नामांकन दाखिल करते हैं। प्रत्येक उम्मीदवार आवश्यक दस्तावेजों और जमानत राशि के साथ फॉर्म 2B जमा करता है।',
    icon: '✍️',
    color: '#45B7D1',
    duration: 'Days 5-14',
    keyPoints: {
      en: [
        'Nomination filed with Returning Officer (RO)',
        'Security deposit: ₹25,000 (General), ₹12,500 (SC/ST)',
        'Must submit affidavit declaring assets & criminal record',
        'Nominations scrutinized by Returning Officer',
        'Withdrawal deadline is 2 days after scrutiny'
      ],
      hi: [
        'रिटर्निंग ऑफिसर (RO) के पास नामांकन दाखिल करें',
        'जमानत राशि: ₹25,000 (सामान्य), ₹12,500 (SC/ST)',
        'संपत्ति और आपराधिक रिकॉर्ड घोषित करने वाला शपथपत्र जमा करना होगा',
        'रिटर्निंग ऑफिसर द्वारा नामांकन की जाँच',
        'जांच के 2 दिन बाद नामांकन वापसी की अंतिम तिथि'
      ]
    }
  },
  {
    id: 'campaign',
    phase: 4,
    titleEn: 'Election Campaign Period',
    titleHi: 'चुनाव प्रचार काल',
    descriptionEn: 'Candidates and parties campaign across constituencies. Rallies, speeches, door-to-door canvassing, and media campaigns are organized under the Model Code of Conduct.',
    descriptionHi: 'उम्मीदवार और दल क्षेत्रों में प्रचार करते हैं। आदर्श आचार संहिता के तहत रैलियाँ, भाषण, घर-घर प्रचार और मीडिया अभियान चलाए जाते हैं।',
    icon: '🎙️',
    color: '#96CEB4',
    duration: 'Weeks 2-6',
    keyPoints: {
      en: [
        'Campaigning stops 48 hours before polling (Silent Period)',
        'Spending limit: ₹95 lakh per candidate (Lok Sabha)',
        'Exit polls banned during voting phases',
        'ECI monitors violations via Flying Squads',
        'Paid news and hate speech strictly prohibited'
      ],
      hi: [
        'मतदान से 48 घंटे पहले प्रचार बंद (मौन काल)',
        'खर्च सीमा: प्रति उम्मीदवार ₹95 लाख (लोकसभा)',
        'मतदान चरणों के दौरान एग्जिट पोल प्रतिबंधित',
        'ECI फ्लाइंग स्क्वाड के माध्यम से उल्लंघनों की निगरानी',
        'पेड न्यूज और घृणास्पद भाषण सख्त प्रतिबंधित'
      ]
    }
  },
  {
    id: 'polling',
    phase: 5,
    titleEn: 'Polling Day / Voting',
    titleHi: 'मतदान दिवस',
    descriptionEn: 'Citizens cast their votes at designated polling booths using Electronic Voting Machines (EVMs). VVPAT provides a paper trail for transparency.',
    descriptionHi: 'नागरिक इलेक्ट्रॉनिक वोटिंग मशीन (EVM) का उपयोग करके नामित मतदान केंद्रों पर अपना वोट डालते हैं। VVPAT पारदर्शिता के लिए पेपर ट्रेल प्रदान करता है।',
    icon: '🗳️',
    color: '#FF6B6B',
    duration: '1 Day per Phase',
    keyPoints: {
      en: [
        'Polling hours: 7:00 AM to 6:00 PM (varies by state)',
        'Carry Voter ID or any of 12 approved ID proofs',
        'Indelible ink marked on left index finger',
        'Press EVM button → hear beep → check VVPAT slip (7 sec)',
        'NOTA option available if no candidate is preferred'
      ],
      hi: [
        'मतदान समय: सुबह 7:00 बजे से शाम 6:00 बजे (राज्यानुसार अलग)',
        'मतदाता पहचान पत्र या 12 स्वीकृत ID में से कोई एक लाएँ',
        'बाएं तर्जनी पर अमिट स्याही लगाई जाती है',
        'EVM बटन दबाएँ → बीप सुनें → VVPAT पर्ची जाँचें (7 सेकंड)',
        'यदि कोई उम्मीदवार पसंद नहीं, NOTA विकल्प उपलब्ध'
      ]
    }
  },
  {
    id: 'counting',
    phase: 6,
    titleEn: 'Vote Counting',
    titleHi: 'मतगणना',
    descriptionEn: 'On counting day, postal ballots are counted first, then EVM votes. VVPAT slips are verified in a random sample. Results are announced round by round.',
    descriptionHi: 'मतगणना दिवस पर पहले डाक मतपत्र गिने जाते हैं, फिर EVM वोट। VVPAT पर्चियों को यादृच्छिक नमूने में सत्यापित किया जाता है।',
    icon: '🔢',
    color: '#A8DADC',
    duration: '1-2 Days',
    keyPoints: {
      en: [
        'Counting starts at 8:00 AM at designated centers',
        'Postal ballots counted first (30 min before EVM)',
        'Each hall can have up to 14 counting tables',
        'VVPAT verification done after all EVM rounds',
        'Results declared by Returning Officer round by round'
      ],
      hi: [
        'मतगणना सुबह 8:00 बजे नामित केंद्रों पर शुरू',
        'पहले डाक मतपत्र गिने जाते हैं (EVM से 30 मिनट पहले)',
        'प्रत्येक हॉल में 14 मतगणना तालिकाएँ हो सकती हैं',
        'सभी EVM राउंड के बाद VVPAT सत्यापन',
        'रिटर्निंग ऑफिसर द्वारा दौर-दर-दौर परिणाम घोषित'
      ]
    }
  },
  {
    id: 'results',
    phase: 7,
    titleEn: 'Results & Government Formation',
    titleHi: 'परिणाम और सरकार गठन',
    descriptionEn: 'The winning candidates are declared. The party/alliance with majority forms the government. President invites the leader to form the government and takes oath.',
    descriptionHi: 'विजयी उम्मीदवारों की घोषणा की जाती है। बहुमत प्राप्त दल/गठबंधन सरकार बनाता है। राष्ट्रपति नेता को सरकार बनाने और शपथ लेने के लिए आमंत्रित करते हैं।',
    icon: '🏛️',
    color: '#FF9F43',
    duration: '2-4 Weeks',
    keyPoints: {
      en: [
        'Party with 272+ seats forms majority government in Lok Sabha',
        'President invites majority party leader to form government',
        'Coalition negotiations if no clear majority',
        'Prime Minister and Cabinet Ministers take oath',
        'New Parliament session begins within 6 months'
      ],
      hi: [
        '272+ सीटों वाला दल लोकसभा में बहुमत सरकार बनाता है',
        'राष्ट्रपति बहुमत दल के नेता को सरकार बनाने के लिए आमंत्रित करते हैं',
        'स्पष्ट बहुमत न होने पर गठबंधन वार्ता',
        'प्रधानमंत्री और मंत्रिमंडल के सदस्य शपथ लेते हैं',
        '6 महीने के भीतर नई संसद का सत्र शुरू'
      ]
    }
  }
];

export const wizardSteps: WizardStep[] = [
  {
    id: 'check-eligibility',
    titleEn: '1. Check Your Eligibility',
    titleHi: '1. अपनी पात्रता जाँचें',
    descriptionEn: 'Before registering, ensure you meet all eligibility requirements to vote in India.',
    descriptionHi: 'पंजीकरण से पहले, सुनिश्चित करें कि आप भारत में मतदान के लिए सभी पात्रता आवश्यकताओं को पूरा करते हैं।',
    icon: '✅',
    color: '#10B981',
    stepsEn: [
      'Must be a citizen of India',
      'Must be at least 18 years old on the qualifying date (January 1)',
      'Must be a resident of the constituency where you want to vote',
      'Must be of sound mind (not declared mentally unsound by a court)',
      'Must not be disqualified under any law (no conviction for certain offenses)'
    ],
    stepsHi: [
      'भारत का नागरिक होना आवश्यक',
      'अर्हता तिथि (1 जनवरी) को कम से कम 18 वर्ष का होना आवश्यक',
      'जिस निर्वाचन क्षेत्र में मतदान करना है वहाँ निवासी होना आवश्यक',
      'मानसिक रूप से स्वस्थ होना आवश्यक (किसी न्यायालय द्वारा मानसिक रूप से अस्वस्थ घोषित न हो)',
      'किसी भी कानून के तहत अयोग्य नहीं होना चाहिए'
    ],
    tipsEn: '💡 Tip: Even if you moved to a new city, you can vote in your registered constituency.',
    tipsHi: '💡 सुझाव: भले ही आप नए शहर में चले गए हों, आप अपने पंजीकृत निर्वाचन क्षेत्र में मतदान कर सकते हैं।'
  },
  {
    id: 'register',
    titleEn: '2. Register as a Voter',
    titleHi: '2. मतदाता के रूप में पंजीकरण करें',
    descriptionEn: 'Register online or offline to get your Voter ID card (EPIC - Electors Photo Identity Card).',
    descriptionHi: 'अपना मतदाता पहचान पत्र (EPIC - इलेक्टर्स फोटो आइडेंटिटी कार्ड) प्राप्त करने के लिए ऑनलाइन या ऑफलाइन पंजीकरण करें।',
    icon: '📝',
    color: '#3B82F6',
    stepsEn: [
      'Visit voters.eci.gov.in or Voter Helpline App',
      'Click on "New Voter Registration" and fill Form 6',
      'Upload your photo, Aadhaar card and address proof',
      'Submit the form — you\'ll get an acknowledgment number',
      'Booth Level Officer (BLO) will verify your details',
      'Voter ID card dispatched within 30-45 days'
    ],
    stepsHi: [
      'voters.eci.gov.in या वोटर हेल्पलाइन ऐप पर जाएँ',
      '"नया मतदाता पंजीकरण" पर क्लिक करें और फॉर्म 6 भरें',
      'अपनी फोटो, आधार कार्ड और पता प्रमाण अपलोड करें',
      'फॉर्म जमा करें — आपको एक पावती संख्या मिलेगी',
      'बूथ स्तर अधिकारी (BLO) आपके विवरण की जाँच करेगा',
      '30-45 दिनों के भीतर मतदाता पहचान पत्र भेजा जाएगा'
    ],
    tipsEn: '💡 Tip: Call 1950 (Voter Helpline) for any registration assistance.',
    tipsHi: '💡 सुझाव: किसी भी पंजीकरण सहायता के लिए 1950 (वोटर हेल्पलाइन) पर कॉल करें।'
  },
  {
    id: 'verify-name',
    titleEn: '3. Verify Your Name on Voter List',
    titleHi: '3. मतदाता सूची में अपना नाम सत्यापित करें',
    descriptionEn: 'Before election day, always verify your name and details on the official electoral roll.',
    descriptionHi: 'चुनाव दिवस से पहले, हमेशा आधिकारिक मतदाता सूची पर अपना नाम और विवरण सत्यापित करें।',
    icon: '🔍',
    color: '#8B5CF6',
    stepsEn: [
      'Go to electoralsearch.eci.gov.in',
      'Search by your name, EPIC number, or mobile number',
      'Confirm your polling booth address and serial number',
      'Download or note your Voter ID (EPIC) number',
      'If name is missing, file Form 6 for fresh registration',
      'If details are wrong, file Form 8 for correction'
    ],
    stepsHi: [
      'electoralsearch.eci.gov.in पर जाएँ',
      'अपने नाम, EPIC नंबर, या मोबाइल नंबर से खोजें',
      'अपना मतदान केंद्र पता और क्रम संख्या की पुष्टि करें',
      'अपना मतदाता पहचान पत्र (EPIC) नंबर नोट करें',
      'नाम गायब है तो नए पंजीकरण के लिए फॉर्म 6 दाखिल करें',
      'विवरण गलत है तो सुधार के लिए फॉर्म 8 दाखिल करें'
    ],
    tipsEn: '💡 Tip: Check your voter list entry 2-3 weeks before polling day to allow time for corrections.',
    tipsHi: '💡 सुझाव: सुधार के लिए समय देने के लिए मतदान दिवस से 2-3 सप्ताह पहले अपनी मतदाता सूची प्रविष्टि जाँचें।'
  },
  {
    id: 'prepare',
    titleEn: '4. Prepare for Polling Day',
    titleHi: '4. मतदान दिवस की तैयारी करें',
    descriptionEn: 'Get ready with required documents and know your polling booth location in advance.',
    descriptionHi: 'आवश्यक दस्तावेजों के साथ तैयार हों और अपने मतदान केंद्र का स्थान पहले से जान लें।',
    icon: '📅',
    color: '#F59E0B',
    stepsEn: [
      'Note polling date and time from ECI website or SMS',
      'Find your polling booth using voters.eci.gov.in',
      'Keep your Voter ID card (EPIC) or valid alternative ID ready',
      '12 valid alternatives: Aadhaar, PAN, Passport, Driving License, etc.',
      'Plan your travel to the booth, especially if mobility-challenged',
      'Know the 48-hour silent period — no campaigning near booths'
    ],
    stepsHi: [
      'ECI वेबसाइट या SMS से मतदान तिथि और समय नोट करें',
      'voters.eci.gov.in का उपयोग करके अपना मतदान केंद्र खोजें',
      'अपना मतदाता पहचान पत्र (EPIC) या वैध वैकल्पिक ID तैयार रखें',
      '12 वैध विकल्प: आधार, PAN, पासपोर्ट, ड्राइविंग लाइसेंस, आदि।',
      'बूथ तक यात्रा की योजना बनाएँ, विशेषकर यदि गतिशीलता में चुनौती है',
      '48 घंटे के मौन काल को जानें — बूथ के पास कोई प्रचार नहीं'
    ],
    tipsEn: '💡 Tip: Senior citizens and specially-abled persons get priority at polling booths.',
    tipsHi: '💡 सुझाव: वरिष्ठ नागरिकों और विशेष रूप से सक्षम व्यक्तियों को मतदान केंद्रों पर प्राथमिकता मिलती है।'
  },
  {
    id: 'vote',
    titleEn: '5. Cast Your Vote',
    titleHi: '5. अपना वोट डालें',
    descriptionEn: 'Exercise your fundamental right on polling day. Every vote counts in shaping India\'s future.',
    descriptionHi: 'मतदान दिवस पर अपने मौलिक अधिकार का प्रयोग करें। भारत के भविष्य को आकार देने में हर वोट की गिनती होती है।',
    icon: '🗳️',
    color: '#EF4444',
    stepsEn: [
      'Arrive at your designated polling booth',
      'Join the queue — show your Voter ID to the polling official',
      'First official checks your name on the voter list',
      'Second official marks your left index finger with indelible ink',
      'Third official gives you a slip to proceed to the EVM',
      'Press the button next to your chosen candidate on the EVM',
      'Wait for the beep sound — your vote is registered!',
      'Check the VVPAT slip (visible for 7 seconds) to confirm'
    ],
    stepsHi: [
      'अपने निर्धारित मतदान केंद्र पर पहुँचें',
      'कतार में लगें — मतदान अधिकारी को अपना मतदाता ID दिखाएँ',
      'पहला अधिकारी मतदाता सूची में आपका नाम जाँचता है',
      'दूसरा अधिकारी आपकी बाईं तर्जनी पर अमिट स्याही लगाता है',
      'तीसरा अधिकारी आपको EVM तक जाने के लिए पर्ची देता है',
      'EVM पर अपने चुने हुए उम्मीदवार के बगल का बटन दबाएँ',
      'बीप की आवाज की प्रतीक्षा करें — आपका वोट दर्ज हो गया!',
      'पुष्टि के लिए VVPAT पर्ची (7 सेकंड के लिए दिखाई देती है) जाँचें'
    ],
    tipsEn: '💡 Tip: If you don\'t like any candidate, press NOTA (None of The Above) — the last button on the EVM.',
    tipsHi: '💡 सुझाव: यदि आप किसी उम्मीदवार को पसंद नहीं करते, NOTA (उपरोक्त में से कोई नहीं) दबाएँ — EVM पर अंतिम बटन।'
  },
  {
    id: 'post-vote',
    titleEn: '6. After Voting & Stay Informed',
    titleHi: '6. मतदान के बाद और जानकारी रखें',
    descriptionEn: 'Your civic duty doesn\'t end at the ballot box. Stay engaged with the democratic process.',
    descriptionHi: 'आपका नागरिक कर्तव्य मतपेटी पर समाप्त नहीं होता। लोकतांत्रिक प्रक्रिया में संलग्न रहें।',
    icon: '🌟',
    color: '#10B981',
    stepsEn: [
      'Your inked finger is your badge of democracy — wear it with pride!',
      'Watch counting day results on ECI\'s official website',
      'Know your elected representative\'s name and contact',
      'Track your MP/MLA\'s work via sansad.in or legislative assembly websites',
      'Report voter suppression or electoral fraud to 1950',
      'Encourage friends and family to register and vote'
    ],
    stepsHi: [
      'आपकी स्याही लगी उँगली लोकतंत्र का बैज है — इसे गर्व के साथ पहनें!',
      'ECI की आधिकारिक वेबसाइट पर मतगणना दिवस के परिणाम देखें',
      'अपने निर्वाचित प्रतिनिधि का नाम और संपर्क जानें',
      'sansad.in या विधानसभा वेबसाइटों के माध्यम से अपने सांसद/विधायक के काम को ट्रैक करें',
      'मतदाता दमन या चुनावी धोखाधड़ी की रिपोर्ट 1950 पर करें',
      'मित्रों और परिवार को पंजीकरण और मतदान के लिए प्रोत्साहित करें'
    ],
    tipsEn: '💡 Tip: Use the cVIGIL app to report MCC violations with geotagged photos instantly.',
    tipsHi: '💡 सुझाव: जियोटैग्ड फोटो के साथ तुरंत MCC उल्लंघनों की रिपोर्ट करने के लिए cVIGIL ऐप का उपयोग करें।'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    questionEn: 'What is the minimum age to vote in Indian elections?',
    questionHi: 'भारतीय चुनावों में मतदान करने की न्यूनतम आयु क्या है?',
    options: [
      { en: '16 years', hi: '16 वर्ष' },
      { en: '18 years', hi: '18 वर्ष' },
      { en: '21 years', hi: '21 वर्ष' },
      { en: '25 years', hi: '25 वर्ष' }
    ],
    correctIndex: 1,
    explanationEn: 'The minimum voting age in India is 18 years. The 61st Constitutional Amendment Act, 1988 reduced the voting age from 21 to 18 years.',
    explanationHi: 'भारत में मतदान की न्यूनतम आयु 18 वर्ष है। 61वें संवैधानिक संशोधन अधिनियम, 1988 ने मतदान आयु 21 वर्ष से घटाकर 18 वर्ष कर दी।'
  },
  {
    id: 'q2',
    questionEn: 'What does EVM stand for?',
    questionHi: 'EVM का पूरा नाम क्या है?',
    options: [
      { en: 'Electronic Voting Machine', hi: 'इलेक्ट्रॉनिक वोटिंग मशीन' },
      { en: 'Electoral Verification Module', hi: 'इलेक्टोरल वेरिफिकेशन मॉड्यूल' },
      { en: 'Election Validation Method', hi: 'इलेक्शन वैलिडेशन मेथड' },
      { en: 'Electronic Vote Monitor', hi: 'इलेक्ट्रॉनिक वोट मॉनिटर' }
    ],
    correctIndex: 0,
    explanationEn: 'EVM stands for Electronic Voting Machine. India has been using EVMs since 2004 for all national and state elections, replacing paper ballots.',
    explanationHi: 'EVM का अर्थ है इलेक्ट्रॉनिक वोटिंग मशीन। भारत 2004 से सभी राष्ट्रीय और राज्य चुनावों में EVM का उपयोग कर रहा है, जिसने कागजी मतपत्रों की जगह ली है।'
  },
  {
    id: 'q3',
    questionEn: 'How many seats are there in the Lok Sabha?',
    questionHi: 'लोकसभा में कितनी सीटें हैं?',
    options: [
      { en: '250', hi: '250' },
      { en: '543', hi: '543' },
      { en: '545', hi: '545' },
      { en: '552', hi: '552' }
    ],
    correctIndex: 1,
    explanationEn: 'There are 543 elected seats in the Lok Sabha (House of the People). A party needs at least 272 seats to form a majority government.',
    explanationHi: 'लोकसभा (जनता के सदन) में 543 निर्वाचित सीटें हैं। बहुमत सरकार बनाने के लिए एक दल को कम से कम 272 सीटों की आवश्यकता होती है।'
  },
  {
    id: 'q4',
    questionEn: 'What is NOTA in the context of Indian elections?',
    questionHi: 'भारतीय चुनावों के संदर्भ में NOTA क्या है?',
    options: [
      { en: 'National Official Tally Authority', hi: 'नेशनल ऑफिशियल टैली अथॉरिटी' },
      { en: 'None Of The Above', hi: 'उपरोक्त में से कोई नहीं' },
      { en: 'New Order of Transparent Audit', hi: 'न्यू ऑर्डर ऑफ ट्रांसपेरेंट ऑडिट' },
      { en: 'National Option for Transparent Alliance', hi: 'नेशनल ऑप्शन फॉर ट्रांसपेरेंट अलायंस' }
    ],
    correctIndex: 1,
    explanationEn: 'NOTA stands for "None Of The Above". Introduced in 2013 after a Supreme Court order, it allows voters to reject all candidates on the ballot.',
    explanationHi: 'NOTA का अर्थ है "उपरोक्त में से कोई नहीं"। सर्वोच्च न्यायालय के आदेश के बाद 2013 में शुरू किया गया, यह मतदाताओं को मतपत्र पर सभी उम्मीदवारों को अस्वीकार करने की अनुमति देता है।'
  },
  {
    id: 'q5',
    questionEn: 'What is the Model Code of Conduct (MCC)?',
    questionHi: 'आदर्श आचार संहिता (MCC) क्या है?',
    options: [
      { en: 'A law passed by Parliament to regulate elections', hi: 'चुनावों को विनियमित करने के लिए संसद द्वारा पारित एक कानून' },
      { en: 'Guidelines issued by ECI for political parties and candidates during elections', hi: 'चुनावों के दौरान राजनीतिक दलों और उम्मीदवारों के लिए ECI द्वारा जारी दिशानिर्देश' },
      { en: 'A constitutional amendment about elections', hi: 'चुनावों के बारे में एक संवैधानिक संशोधन' },
      { en: 'Rules for media coverage of elections', hi: 'चुनावों की मीडिया कवरेज के लिए नियम' }
    ],
    correctIndex: 1,
    explanationEn: 'The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for political parties and candidates. It comes into effect once elections are announced and governs campaigning, government conduct, and voter behavior.',
    explanationHi: 'आदर्श आचार संहिता (MCC) राजनीतिक दलों और उम्मीदवारों के लिए ECI द्वारा जारी दिशानिर्देशों का एक सेट है। यह चुनावों की घोषणा होने के बाद लागू होती है और प्रचार, सरकारी आचरण और मतदाता व्यवहार को नियंत्रित करती है।'
  },
  {
    id: 'q6',
    questionEn: 'What is VVPAT?',
    questionHi: 'VVPAT क्या है?',
    options: [
      { en: 'Voter Verified Paper Audit Trail', hi: 'मतदाता सत्यापित कागज लेखापरीक्षा पगडंडी' },
      { en: 'Vote Validation and Processing Administrative Tool', hi: 'वोट वैलिडेशन एंड प्रोसेसिंग एडमिनिस्ट्रेटिव टूल' },
      { en: 'Verified Voting Protocol and Tally', hi: 'वेरिफाइड वोटिंग प्रोटोकॉल एंड टैली' },
      { en: 'Virtual Voting Paper Audit Technology', hi: 'वर्चुअल वोटिंग पेपर ऑडिट टेक्नोलॉजी' }
    ],
    correctIndex: 0,
    explanationEn: 'VVPAT stands for Voter Verified Paper Audit Trail. It is an independent verification system attached to EVMs that allows voters to verify their vote by showing a paper slip for 7 seconds before it drops into a sealed box.',
    explanationHi: 'VVPAT का अर्थ है मतदाता सत्यापित कागज लेखापरीक्षा पगडंडी। यह EVM से जुड़ी एक स्वतंत्र सत्यापन प्रणाली है जो मतदाताओं को सील बॉक्स में गिरने से पहले 7 सेकंड के लिए कागज की पर्ची दिखाकर अपने वोट की पुष्टि करने की अनुमति देती है।'
  },
  {
    id: 'q7',
    questionEn: 'How long does campaigning have to stop before polling begins?',
    questionHi: 'मतदान शुरू होने से कितने घंटे पहले प्रचार बंद करना होता है?',
    options: [
      { en: '24 hours', hi: '24 घंटे' },
      { en: '36 hours', hi: '36 घंटे' },
      { en: '48 hours', hi: '48 घंटे' },
      { en: '72 hours', hi: '72 घंटे' }
    ],
    correctIndex: 2,
    explanationEn: 'Campaigning must stop 48 hours before polling begins. This period is called the "Silent Period" or "Campaigning Free Period". No public meetings, rallies, or processions are allowed during this time.',
    explanationHi: 'मतदान शुरू होने से 48 घंटे पहले प्रचार बंद करना होता है। इस अवधि को "मौन काल" या "प्रचार-मुक्त अवधि" कहा जाता है। इस दौरान कोई सार्वजनिक बैठक, रैली या जुलूस की अनुमति नहीं है।'
  },
  {
    id: 'q8',
    questionEn: 'Which finger is marked with indelible ink after voting?',
    questionHi: 'मतदान के बाद किस उँगली पर अमिट स्याही लगाई जाती है?',
    options: [
      { en: 'Right thumb', hi: 'दाएँ हाथ का अंगूठा' },
      { en: 'Left thumb', hi: 'बाएँ हाथ का अंगूठा' },
      { en: 'Left index finger', hi: 'बाएँ हाथ की तर्जनी' },
      { en: 'Right index finger', hi: 'दाएँ हाथ की तर्जनी' }
    ],
    correctIndex: 2,
    explanationEn: 'The left index finger is marked with indelible (permanent) ink after voting to prevent a person from voting twice. The ink is manufactured by the Mysore Paints and Varnish Limited.',
    explanationHi: 'किसी व्यक्ति को दो बार मतदान करने से रोकने के लिए मतदान के बाद बाईं तर्जनी पर अमिट (स्थायी) स्याही लगाई जाती है। स्याही का निर्माण मैसूर पेंट्स एंड वार्निश लिमिटेड द्वारा किया जाता है।'
  },
  {
    id: 'q9',
    questionEn: 'What is the security deposit for a Lok Sabha candidate from the General category?',
    questionHi: 'सामान्य श्रेणी के लोकसभा उम्मीदवार के लिए जमानत राशि क्या है?',
    options: [
      { en: '₹10,000', hi: '₹10,000' },
      { en: '₹25,000', hi: '₹25,000' },
      { en: '₹50,000', hi: '₹50,000' },
      { en: '₹1,00,000', hi: '₹1,00,000' }
    ],
    correctIndex: 1,
    explanationEn: 'The security deposit for a Lok Sabha candidate from the General category is ₹25,000. For SC/ST candidates, it is ₹12,500. The deposit is forfeited if the candidate fails to secure more than 1/6th of the total valid votes polled.',
    explanationHi: 'सामान्य श्रेणी के लोकसभा उम्मीदवार के लिए जमानत राशि ₹25,000 है। SC/ST उम्मीदवारों के लिए यह ₹12,500 है। यदि उम्मीदवार कुल वैध मतों के 1/6 से अधिक सुरक्षित करने में विफल रहता है तो जमानत जब्त हो जाती है।'
  },
  {
    id: 'q10',
    questionEn: 'When was the Election Commission of India established?',
    questionHi: 'भारत निर्वाचन आयोग की स्थापना कब हुई?',
    options: [
      { en: '1947', hi: '1947' },
      { en: '1948', hi: '1948' },
      { en: '1950', hi: '1950' },
      { en: '1952', hi: '1952' }
    ],
    correctIndex: 2,
    explanationEn: 'The Election Commission of India was established on January 25, 1950, one day before India became a Republic on January 26, 1950. January 25 is now celebrated as National Voters\' Day.',
    explanationHi: 'भारत निर्वाचन आयोग की स्थापना 25 जनवरी, 1950 को हुई, भारत के 26 जनवरी, 1950 को गणराज्य बनने से एक दिन पहले। 25 जनवरी को अब राष्ट्रीय मतदाता दिवस के रूप में मनाया जाता है।'
  }
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq1',
    questionEn: 'How do I know if my name is on the voter list?',
    questionHi: 'मुझे कैसे पता चलेगा कि मेरा नाम मतदाता सूची में है?',
    answerEn: 'You can check your name on the voter list in three ways: (1) Visit electoralsearch.eci.gov.in and search by name, EPIC number, or mobile number. (2) Download the "Voter Helpline" app and use the search feature. (3) Call the toll-free number 1950 for assistance.',
    answerHi: 'आप तीन तरीकों से मतदाता सूची में अपना नाम जाँच सकते हैं: (1) electoralsearch.eci.gov.in पर जाएँ और नाम, EPIC नंबर, या मोबाइल नंबर से खोजें। (2) "वोटर हेल्पलाइन" ऐप डाउनलोड करें और खोज सुविधा का उपयोग करें। (3) सहायता के लिए टोल-फ्री नंबर 1950 पर कॉल करें।',
    category: 'Registration'
  },
  {
    id: 'faq2',
    questionEn: 'What documents do I need to carry on voting day?',
    questionHi: 'मतदान दिवस पर मुझे कौन से दस्तावेज ले जाने होंगे?',
    answerEn: 'You need to carry one of these 12 approved photo identity documents: (1) Voter ID Card (EPIC), (2) Aadhaar Card, (3) PAN Card, (4) Passport, (5) Driving License, (6) Service ID cards issued by Central/State Govt., (7) Passbooks with photo issued by Bank/Post Office, (8) Health Insurance Smart Card, (9) MNREGA Job Card, (10) Smart Card by RGI under NPR, (11) Pension Document with photo, (12) Official identity documents issued by MPs/MLAs.',
    answerHi: 'आपको इन 12 स्वीकृत फोटो पहचान दस्तावेजों में से एक ले जाना होगा: (1) मतदाता पहचान पत्र (EPIC), (2) आधार कार्ड, (3) PAN कार्ड, (4) पासपोर्ट, (5) ड्राइविंग लाइसेंस, (6) केंद्र/राज्य सरकार द्वारा जारी सेवा पहचान पत्र, (7) बैंक/डाकघर द्वारा फोटो के साथ जारी पासबुक, (8) स्वास्थ्य बीमा स्मार्ट कार्ड, (9) MNREGA जॉब कार्ड, (10) NPR के तहत RGI द्वारा स्मार्ट कार्ड, (11) फोटो के साथ पेंशन दस्तावेज, (12) सांसदों/विधायकों द्वारा जारी आधिकारिक पहचान दस्तावेज।',
    category: 'Voting'
  },
  {
    id: 'faq3',
    questionEn: 'Can I vote if I am currently living outside my registered constituency?',
    questionHi: 'क्या मैं मतदान कर सकता हूँ यदि मैं वर्तमान में अपने पंजीकृत निर्वाचन क्षेत्र से बाहर रह रहा हूँ?',
    answerEn: 'Yes, but you will need to go back to your registered constituency to vote. Alternatively, you can transfer your voter registration to your new address using Form 8A. Indian citizens working abroad cannot vote unless they are Non-Resident Indian (NRI) voters registered under Section 20A of the Representation of the People Act.',
    answerHi: 'हाँ, लेकिन आपको मतदान के लिए अपने पंजीकृत निर्वाचन क्षेत्र में वापस जाना होगा। वैकल्पिक रूप से, आप फॉर्म 8A का उपयोग करके अपनी मतदाता पंजीकरण अपने नए पते पर स्थानांतरित कर सकते हैं। विदेश में काम करने वाले भारतीय नागरिक मतदान नहीं कर सकते जब तक वे जनप्रतिनिधित्व अधिनियम की धारा 20A के तहत पंजीकृत अनिवासी भारतीय (NRI) मतदाता न हों।',
    category: 'Voting'
  },
  {
    id: 'faq4',
    questionEn: 'What is the difference between Lok Sabha and Rajya Sabha elections?',
    questionHi: 'लोकसभा और राज्यसभा चुनावों में क्या अंतर है?',
    answerEn: 'Lok Sabha (Lower House): Directly elected by citizens through universal adult suffrage. 543 seats, members serve 5-year terms, and citizens vote directly for candidates. Rajya Sabha (Upper House): Indirectly elected — members are elected by elected members of the State Legislative Assemblies (MLAs). 245 total seats, members serve 6-year staggered terms. About 1/3rd retire every 2 years. 12 members are nominated by the President.',
    answerHi: 'लोकसभा (निचला सदन): सार्वभौमिक वयस्क मताधिकार के माध्यम से नागरिकों द्वारा सीधे निर्वाचित। 543 सीटें, सदस्य 5 साल के कार्यकाल के लिए कार्य करते हैं, और नागरिक सीधे उम्मीदवारों के लिए मतदान करते हैं। राज्यसभा (उच्च सदन): अप्रत्यक्ष रूप से निर्वाचित — सदस्य राज्य विधान सभाओं के निर्वाचित सदस्यों (विधायकों) द्वारा चुने जाते हैं। कुल 245 सीटें, सदस्य 6 साल के विभाजित कार्यकाल के लिए काम करते हैं। लगभग 1/3 हर 2 साल में सेवानिवृत्त होते हैं। 12 सदस्य राष्ट्रपति द्वारा नामित होते हैं।',
    category: 'General'
  },
  {
    id: 'faq5',
    questionEn: 'How can I report electoral fraud or violations?',
    questionHi: 'मैं चुनावी धोखाधड़ी या उल्लंघन की रिपोर्ट कैसे कर सकता हूँ?',
    answerEn: 'You can report electoral violations through multiple channels: (1) Call 1950 (National Voter Helpline) — available 24/7. (2) Download the "cVIGIL" app by ECI — instantly report MCC violations with geotagged photos/videos. Reports are addressed within 100 minutes. (3) Email the returning officer of your constituency. (4) File a written complaint at the nearest police station.',
    answerHi: 'आप कई चैनलों के माध्यम से चुनावी उल्लंघनों की रिपोर्ट कर सकते हैं: (1) 1950 पर कॉल करें (राष्ट्रीय मतदाता हेल्पलाइन) — 24/7 उपलब्ध। (2) ECI द्वारा "cVIGIL" ऐप डाउनलोड करें — जियोटैग्ड फोटो/वीडियो के साथ MCC उल्लंघनों की तुरंत रिपोर्ट करें। रिपोर्ट 100 मिनट के भीतर संबोधित की जाती है। (3) अपने निर्वाचन क्षेत्र के रिटर्निंग ऑफिसर को ईमेल करें। (4) नजदीकी पुलिस थाने में लिखित शिकायत दर्ज करें।',
    category: 'General'
  },
  {
    id: 'faq6',
    questionEn: 'What are the qualifications to stand as a candidate in Lok Sabha elections?',
    questionHi: 'लोकसभा चुनावों में उम्मीदवार के रूप में खड़े होने की योग्यताएँ क्या हैं?',
    answerEn: 'To stand as a Lok Sabha candidate, you must: (1) Be a citizen of India. (2) Be at least 25 years of age. (3) Be registered as a voter in any parliamentary constituency. (4) Not hold any office of profit under the Government of India or any State Government. (5) Not be of unsound mind. (6) Not be an undischarged insolvent. (7) Not be disqualified under the Representation of the People Act or the Constitution.',
    answerHi: 'लोकसभा उम्मीदवार के रूप में खड़े होने के लिए, आपको: (1) भारत का नागरिक होना चाहिए। (2) कम से कम 25 वर्ष की आयु होनी चाहिए। (3) किसी भी संसदीय निर्वाचन क्षेत्र में मतदाता के रूप में पंजीकृत होना चाहिए। (4) भारत सरकार या किसी राज्य सरकार के तहत कोई लाभ का पद नहीं धारण करना चाहिए। (5) मानसिक रूप से अस्वस्थ नहीं होना चाहिए। (6) अनुन्मोचित दिवालिया नहीं होना चाहिए। (7) जनप्रतिनिधित्व अधिनियम या संविधान के तहत अयोग्य नहीं होना चाहिए।',
    category: 'Candidates'
  },
  {
    id: 'faq7',
    questionEn: 'What is Postal Ballot voting?',
    questionHi: 'डाक मतपत्र मतदान क्या है?',
    answerEn: 'Postal Ballot voting allows certain categories of voters to cast their votes by post without physically visiting the polling booth. Eligible voters include: (1) Service voters (Armed Forces, Central Police Organizations). (2) Voters on election duty. (3) Preventive detainees. (4) Persons with disabilities (PwD) above 40% disability. (5) Senior citizens above 85 years. (6) COVID-affected persons. They receive a ballot paper by post, mark their choice, and return it sealed before counting day.',
    answerHi: 'डाक मतपत्र मतदान कुछ श्रेणियों के मतदाताओं को मतदान केंद्र पर भौतिक रूप से जाए बिना डाक द्वारा अपना वोट डालने की अनुमति देता है। पात्र मतदाताओं में शामिल हैं: (1) सेवा मतदाता (सशस्त्र बल, केंद्रीय पुलिस संगठन)। (2) चुनाव ड्यूटी पर मतदाता। (3) निवारक निरोधाधीन। (4) 40% से अधिक विकलांगता वाले विकलांग व्यक्ति (PwD)। (5) 85 वर्ष से अधिक वरिष्ठ नागरिक। (6) COVID-प्रभावित व्यक्ति। उन्हें डाक द्वारा एक मतपत्र प्राप्त होता है, अपनी पसंद चिह्नित करते हैं, और मतगणना दिवस से पहले सीलबंद वापस करते हैं।',
    category: 'Voting'
  },
  {
    id: 'faq8',
    questionEn: 'How is the election schedule decided for multi-phase elections?',
    questionHi: 'बहु-चरण चुनावों के लिए चुनाव कार्यक्रम कैसे तय किया जाता है?',
    answerEn: 'The Election Commission of India decides the election schedule after consultations with: (1) State governments and Chief Ministers. (2) Chief Electoral Officers of each state. (3) Home Ministry and security agencies to assess law & order situation. (4) Religious and festive calendar to avoid major holidays. Multi-phase elections are held when a state is too large, has security concerns, or requires additional time for free and fair polling. Phases are staggered to allow security forces to move between constituencies.',
    answerHi: 'भारत निर्वाचन आयोग परामर्श के बाद चुनाव कार्यक्रम तय करता है: (1) राज्य सरकारें और मुख्यमंत्री। (2) प्रत्येक राज्य के मुख्य निर्वाचन अधिकारी। (3) कानून व व्यवस्था की स्थिति का आकलन करने के लिए गृह मंत्रालय और सुरक्षा एजेंसियाँ। (4) प्रमुख छुट्टियों से बचने के लिए धार्मिक और उत्सव कैलेंडर। बहु-चरण चुनाव तब होते हैं जब कोई राज्य बहुत बड़ा हो, सुरक्षा चिंताएँ हों, या स्वतंत्र और निष्पक्ष मतदान के लिए अतिरिक्त समय की आवश्यकता हो।',
    category: 'Process'
  }
];

export const statesData: StateInfo[] = [
  {
    name: 'Uttar Pradesh',
    nameHi: 'उत्तर प्रदेश',
    code: 'UP',
    capital: 'Lucknow',
    capitalHi: 'लखनऊ',
    lokSabhaSeats: 80,
    assemblySeats: 403,
    registeredVoters: '15.1 Crore',
    phases: 7,
    lastElectionDate: 'Apr-May 2024',
    currentCM: 'Yogi Adityanath',
    currentCMHi: 'योगी आदित्यनाथ',
    rulingParty: 'BJP',
    colorGradient: 'from-orange-500 to-orange-600',
    descriptionEn: 'India\'s most populous state and the biggest prize in any national election. UP sends 80 MPs to Lok Sabha — the most of any state.',
    descriptionHi: 'भारत का सबसे अधिक जनसंख्या वाला राज्य और किसी भी राष्ट्रीय चुनाव में सबसे बड़ा पुरस्कार। UP लोकसभा में 80 सांसद भेजता है — किसी भी राज्य से सर्वाधिक।',
    specialFacts: {
      en: ['Most Lok Sabha seats (80) of any state', 'Polling conducted in 7 phases', '15+ crore registered voters', 'Home to Ayodhya and Varanasi constituencies'],
      hi: ['किसी भी राज्य की सर्वाधिक लोकसभा सीटें (80)', 'मतदान 7 चरणों में आयोजित', '15 करोड़ से अधिक पंजीकृत मतदाता', 'अयोध्या और वाराणसी निर्वाचन क्षेत्रों का घर']
    }
  },
  {
    name: 'Maharashtra',
    nameHi: 'महाराष्ट्र',
    code: 'MH',
    capital: 'Mumbai',
    capitalHi: 'मुंबई',
    lokSabhaSeats: 48,
    assemblySeats: 288,
    registeredVoters: '9.7 Crore',
    phases: 5,
    lastElectionDate: 'Apr-May 2024',
    currentCM: 'Devendra Fadnavis',
    currentCMHi: 'देवेंद्र फडणवीस',
    rulingParty: 'BJP-led Mahayuti',
    colorGradient: 'from-blue-500 to-blue-600',
    descriptionEn: 'India\'s financial capital and second-largest state by Lok Sabha seats. Maharashtra is known for its vibrant political landscape and economic powerhouse.',
    descriptionHi: 'भारत की वित्तीय राजधानी और लोकसभा सीटों के हिसाब से दूसरा सबसे बड़ा राज्य। महाराष्ट्र अपने जीवंत राजनीतिक परिदृश्य और आर्थिक शक्ति के लिए जाना जाता है।',
    specialFacts: {
      en: ['48 Lok Sabha seats — 2nd highest', 'Financial capital Mumbai hosts major campaigns', 'Strong presence of regional parties (Shiv Sena, NCP)', 'First state to implement e-voting pilot'],
      hi: ['48 लोकसभा सीटें — दूसरी सर्वाधिक', 'वित्तीय राजधानी मुंबई में प्रमुख अभियान', 'क्षेत्रीय दलों की मजबूत उपस्थिति (शिव सेना, NCP)', 'ई-वोटिंग पायलट लागू करने वाला पहला राज्य']
    }
  },
  {
    name: 'West Bengal',
    nameHi: 'पश्चिम बंगाल',
    code: 'WB',
    capital: 'Kolkata',
    capitalHi: 'कोलकाता',
    lokSabhaSeats: 42,
    assemblySeats: 294,
    registeredVoters: '7.7 Crore',
    phases: 7,
    lastElectionDate: 'Apr-May 2024',
    currentCM: 'Mamata Banerjee',
    currentCMHi: 'ममता बनर्जी',
    rulingParty: 'TMC',
    colorGradient: 'from-green-500 to-green-600',
    descriptionEn: 'Known for its passionate political culture and high voter turnout. West Bengal consistently records above 80% voter participation in elections.',
    descriptionHi: 'अपनी जुनूनी राजनीतिक संस्कृति और उच्च मतदाता भागीदारी के लिए जाना जाता है। पश्चिम बंगाल लगातार चुनावों में 80% से अधिक मतदाता भागीदारी दर्ज करता है।',
    specialFacts: {
      en: ['Consistently high voter turnout (80%+)', '42 Lok Sabha seats with intense competition', 'Known for political rallies drawing millions', 'Divided into 7 polling phases for security'],
      hi: ['लगातार उच्च मतदाता भागीदारी (80%+)', 'तीव्र प्रतिस्पर्धा के साथ 42 लोकसभा सीटें', 'लाखों लोगों को आकर्षित करने वाली राजनीतिक रैलियों के लिए जाना जाता है', 'सुरक्षा के लिए 7 मतदान चरणों में विभाजित']
    }
  },
  {
    name: 'Tamil Nadu',
    nameHi: 'तमिलनाडु',
    code: 'TN',
    capital: 'Chennai',
    capitalHi: 'चेन्नई',
    lokSabhaSeats: 39,
    assemblySeats: 234,
    registeredVoters: '6.2 Crore',
    phases: 1,
    lastElectionDate: 'Apr 19, 2024',
    currentCM: 'M.K. Stalin',
    currentCMHi: 'एम.के. स्टालिन',
    rulingParty: 'DMK',
    colorGradient: 'from-red-500 to-red-600',
    descriptionEn: 'Tamil Nadu typically votes in a single phase, reflecting strong administrative efficiency. Known for Dravidian party politics and high political awareness.',
    descriptionHi: 'तमिलनाडु आमतौर पर एक ही चरण में मतदान करता है, जो मजबूत प्रशासनिक दक्षता को दर्शाता है। द्रविड़ दल की राजनीति और उच्च राजनीतिक जागरूकता के लिए जाना जाता है।',
    specialFacts: {
      en: ['Entire state votes in a single phase', '39 Lok Sabha seats', 'Stronghold of Dravidian parties (DMK, AIADMK)', 'Among highest per-seat voter counts in South India'],
      hi: ['पूरा राज्य एक ही चरण में मतदान करता है', '39 लोकसभा सीटें', 'द्रविड़ दलों का गढ़ (DMK, AIADMK)', 'दक्षिण भारत में प्रति सीट सर्वाधिक मतदाता संख्या में से एक']
    }
  },
  {
    name: 'Punjab',
    nameHi: 'पंजाब',
    code: 'PB',
    capital: 'Chandigarh',
    capitalHi: 'चंडीगढ़',
    lokSabhaSeats: 13,
    assemblySeats: 117,
    registeredVoters: '2.14 Crore',
    phases: 1,
    lastElectionDate: 'Jun 1, 2024',
    currentCM: 'Bhagwant Mann',
    currentCMHi: 'भगवंत मान',
    rulingParty: 'AAP',
    colorGradient: 'from-yellow-500 to-yellow-600',
    descriptionEn: 'The land of five rivers has a vibrant political landscape. Punjab plays a significant role in national politics and is known for the historically competitive contests.',
    descriptionHi: 'पाँच नदियों की भूमि में एक जीवंत राजनीतिक परिदृश्य है। पंजाब राष्ट्रीय राजनीति में महत्वपूर्ण भूमिका निभाता है और ऐतिहासिक रूप से प्रतिस्पर्धी चुनावों के लिए जाना जाता है।',
    specialFacts: {
      en: ['13 Lok Sabha seats with close contests', 'Significant Sikh community representation', 'AAP swept 2022 Assembly elections with 92/117 seats', 'Historically tripartite contest: Congress, BJP, AAP'],
      hi: ['करीबी मुकाबले के साथ 13 लोकसभा सीटें', 'महत्वपूर्ण सिख समुदाय प्रतिनिधित्व', 'AAP ने 2022 के विधानसभा चुनाव में 92/117 सीटें जीतीं', 'ऐतिहासिक रूप से त्रिकोणीय मुकाबला: कांग्रेस, BJP, AAP']
    }
  },
  {
    name: 'Rajasthan',
    nameHi: 'राजस्थान',
    code: 'RJ',
    capital: 'Jaipur',
    capitalHi: 'जयपुर',
    lokSabhaSeats: 25,
    assemblySeats: 200,
    registeredVoters: '5.3 Crore',
    phases: 2,
    lastElectionDate: 'Apr-May 2024',
    currentCM: 'Bhajan Lal Sharma',
    currentCMHi: 'भजनलाल शर्मा',
    rulingParty: 'BJP',
    colorGradient: 'from-amber-500 to-amber-600',
    descriptionEn: 'Known for its anti-incumbency trend where parties alternate power every election. Rajasthan has a unique political pattern worth studying.',
    descriptionHi: 'अपनी सत्ता-विरोधी प्रवृत्ति के लिए जाना जाता है जहाँ दल हर चुनाव में सत्ता बदलते हैं। राजस्थान में एक अनूठा राजनीतिक पैटर्न है जो अध्ययन के योग्य है।',
    specialFacts: {
      en: ['Famous anti-incumbency pattern — ruling party rarely returns', '25 Lok Sabha seats across desert and plains', 'Polling in 2 phases due to vast area', 'Known for high voting in Scheduled Tribe constituencies'],
      hi: ['प्रसिद्ध सत्ता-विरोधी पैटर्न — सत्तारूढ़ दल शायद ही कभी वापस आता है', 'रेगिस्तान और मैदानों में 25 लोकसभा सीटें', 'विशाल क्षेत्र के कारण 2 चरणों में मतदान', 'अनुसूचित जनजाति निर्वाचन क्षेत्रों में उच्च मतदान के लिए जाना जाता है']
    }
  },
  {
    name: 'Bihar',
    nameHi: 'बिहार',
    code: 'BR',
    capital: 'Patna',
    capitalHi: 'पटना',
    lokSabhaSeats: 40,
    assemblySeats: 243,
    registeredVoters: '7.6 Crore',
    phases: 7,
    lastElectionDate: 'Apr-May 2024',
    currentCM: 'Nitish Kumar',
    currentCMHi: 'नीतीश कुमार',
    rulingParty: 'JD(U)-BJP Alliance',
    colorGradient: 'from-purple-500 to-purple-600',
    descriptionEn: 'Bihar holds immense political importance with 40 Lok Sabha seats and a history of caste-based electoral politics that often determines national outcomes.',
    descriptionHi: 'बिहार 40 लोकसभा सीटों और जाति-आधारित चुनावी राजनीति के इतिहास के साथ अत्यंत राजनीतिक महत्व रखता है जो अक्सर राष्ट्रीय परिणाम निर्धारित करता है।',
    specialFacts: {
      en: ['40 Lok Sabha seats — 4th highest in India', 'Polling across 7 phases due to law & order concerns', 'Strong caste-based political dynamics', 'Historically significant in national coalition formation'],
      hi: ['40 लोकसभा सीटें — भारत में चौथी सर्वाधिक', 'कानून और व्यवस्था की चिंताओं के कारण 7 चरणों में मतदान', 'मजबूत जाति-आधारित राजनीतिक गतिशीलता', 'राष्ट्रीय गठबंधन निर्माण में ऐतिहासिक रूप से महत्वपूर्ण']
    }
  },
  {
    name: 'Gujarat',
    nameHi: 'गुजरात',
    code: 'GJ',
    capital: 'Gandhinagar',
    capitalHi: 'गांधीनगर',
    lokSabhaSeats: 26,
    assemblySeats: 182,
    registeredVoters: '4.9 Crore',
    phases: 3,
    lastElectionDate: 'Apr-May 2024',
    currentCM: 'Bhupendra Patel',
    currentCMHi: 'भूपेंद्र पटेल',
    rulingParty: 'BJP',
    colorGradient: 'from-indigo-500 to-indigo-600',
    descriptionEn: 'Gujarat is considered a BJP stronghold and birthplace of PM Narendra Modi. It has significant economic weight due to its thriving business and industrial sectors.',
    descriptionHi: 'गुजरात को BJP का गढ़ और PM नरेंद्र मोदी का जन्मस्थान माना जाता है। अपने संपन्न व्यापार और औद्योगिक क्षेत्रों के कारण इसका महत्वपूर्ण आर्थिक महत्व है।',
    specialFacts: {
      en: ['BJP stronghold since 1995', '26 Lok Sabha seats', 'Home of PM Narendra Modi (Vadodara, Gandhinagar)', 'Highest GDP per capita among large states'],
      hi: ['1995 से BJP का गढ़', '26 लोकसभा सीटें', 'PM नरेंद्र मोदी का घर (वडोदरा, गांधीनगर)', 'बड़े राज्यों में सर्वाधिक प्रति व्यक्ति GDP']
    }
  }
];
