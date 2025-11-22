
import { River, Language, TranslationBundle } from "./types";

export const APP_NAME = "Katha";

export const LANGUAGES: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' }
];

export const TRANSLATIONS: Record<Language, TranslationBundle> = {
  en: {
    appName: "Katha",
    tagline: "Echoes of the Sacred Waters",
    welcome: "Enter the cosmic realm where Lord Brahma and Mata Sarasvati weave the eternal tales of Bharat's sacred rivers.",
    beginBtn: "Begin Pilgrimage",
    chooseRiverTitle: "Choose a Sacred Stream",
    chooseRiverSubtitle: "Each river holds a universe of stories",
    backBtn: "Return to Brahmalok",
    inputPlaceholder: "Ask your question or choose a topic...",
    loadingText: "Consulting the cosmic archives...",
    imageLoadingText: "Weaving the canvas of reality...",
    imageRevealText: "Behold, the divine vision:",
    visualizeBtn: "Visualize this scene",
    visualizingBtn: "Painting...",
    footerText: "product of nadistui.com",
    you: "YOU",
    listenLegend: "Listen to the Legend",
    nextBtn: "Next",
    prevBtn: "Previous",
    askQuestionBtn: "Ask a Question",
    askQuestionTitle: "Seek Wisdom",
    closeBtn: "Close",
    submitQuestionBtn: "Ask",
    replayBtn: "Replay Story",
    suggestionsTitle: "Explore these mysteries:",
    listening: "Listening...",
    speakNow: "Speak now",
    voiceNotSupported: "Voice input not supported on this device",
    voiceNoSpeech: "No speech detected. Please try again.",
    listenBtn: "Listen",
    stopBtn: "Stop",
    joinWhatsapp: "Join Nadi stuti sabha"
  },
  hi: {
    appName: "कथा",
    tagline: "पवित्र जल की गूँज",
    welcome: "ब्रह्मलोक के उस दिव्य क्षेत्र में प्रवेश करें जहाँ भगवान ब्रह्मा और माता सरस्वती भारत की पवित्र नदियों की अमर कहानियाँ बुनते हैं।",
    beginBtn: "तीर्थयात्रा आरंभ करें",
    chooseRiverTitle: "एक पवित्र धारा चुनें",
    chooseRiverSubtitle: "हर नदी में कहानियों का एक ब्रह्मांड है",
    backBtn: "ब्रह्मलोक लौटें",
    inputPlaceholder: "अपना प्रश्न पूछें या कोई विषय चुनें...",
    loadingText: "लौकिक अभिलेखों से परामर्श किया जा रहा है...",
    imageLoadingText: "यथार्थ का कैनवास बुना जा रहा है...",
    imageRevealText: "देखो, दिव्य दृष्टि:",
    visualizeBtn: "दृश्य देखें",
    visualizingBtn: "चित्रण हो रहा है...",
    footerText: "nadistui.com का उत्पाद",
    you: "आप",
    listenLegend: "किंवदंती सुनें",
    nextBtn: "अगला",
    prevBtn: "पिछला",
    askQuestionBtn: "प्रश्न पूछें",
    askQuestionTitle: "ज्ञान प्राप्त करें",
    closeBtn: "बंद करें",
    submitQuestionBtn: "पूछें",
    replayBtn: "पुनः चलाएं",
    suggestionsTitle: "इन रहस्यों को जानें:",
    listening: "सुन रहा हूँ...",
    speakNow: "अब बोलें",
    voiceNotSupported: "इस डिवाइस पर वॉयस इनपुट समर्थित नहीं है",
    voiceNoSpeech: "कोई आवाज नहीं सुनाई दी। कृपया पुनः प्रयास करें।",
    listenBtn: "सुनें",
    stopBtn: "रुकें",
    joinWhatsapp: "नदी स्तुति सभा से जुड़ें"
  },
  mr: {
    appName: "कथा",
    tagline: "पवित्र जलधारांचे प्रतिध्वनी",
    welcome: "ब्रह्मलोकाच्या अशा विश्वात प्रवेश करा जिथे भगवान ब्रह्मा आणि माता सरस्वती भारताच्या पवित्र नद्यांच्या अनंत कथा विणतात.",
    beginBtn: "तीर्थयात्रा सुरू करा",
    chooseRiverTitle: "पवित्र नदी निवडा",
    chooseRiverSubtitle: "प्रत्येक नदीमध्ये कथांचे एक विश्व सामावलेले आहे",
    backBtn: "ब्रह्मलोकात परत जा",
    inputPlaceholder: "तुमचा प्रश्न विचारा किंवा विषय निवडा...",
    loadingText: "विश्व रेकॉर्ड तपासले जात आहेत...",
    imageLoadingText: "वास्तवाचा कैनवास विणला जात आहे...",
    imageRevealText: "पाहा, दिव्य दृष्टी:",
    visualizeBtn: "दृश्य पाहा",
    visualizingBtn: "चित्रण होत आहे...",
    footerText: "nadistui.com चे उत्पादन",
    you: "तुम्ही",
    listenLegend: "आख्यायिका ऐका",
    nextBtn: "पुढील",
    prevBtn: "मागील",
    askQuestionBtn: "प्रश्न विचारा",
    askQuestionTitle: "ज्ञान मिळवा",
    closeBtn: "बंद करा",
    submitQuestionBtn: "विचारा",
    replayBtn: "पुन्हा चालवा",
    suggestionsTitle: "हे रहस्य शोधा:",
    listening: "ऐकत आहे...",
    speakNow: "आता बोला",
    voiceNotSupported: "या डिव्हाइसवर व्हॉइस इनपुट समर्थित नाही",
    voiceNoSpeech: "आवाज आढळली नाही. कृपया पुन्हा प्रयत्न करा.",
    listenBtn: "ऐका",
    stopBtn: "थांबा",
    joinWhatsapp: "नदी स्तुति सभामध्ये सामील व्हा"
  },
  kn: {
    appName: "ಕಥಾ",
    tagline: "ಪವಿತ್ರ ಜಲದ ಪ್ರತಿಧ್ವನಿಗಳು",
    welcome: "ಭಾರತದ ಪವಿತ್ರ ನದಿಗಳ ಶಾಶ್ವತ ಕಥೆಗಳನ್ನು ಬ್ರಹ್ಮ ಮತ್ತು ಮಾತೆ ಸರಸ್ವತಿ ನೇಯುವ ಬ್ರಹ್ಮಲೋಕದ ಕಾಸ್ಮಿಕ್ ಕ್ಷೇತ್ರವನ್ನು ಪ್ರವೇಶಿಸಿ.",
    beginBtn: "ತೀರ್ಥಯಾತ್ರೆ ಆರಂಭಿಸಿ",
    chooseRiverTitle: "ಪವಿತ್ರ ನದಿಯನ್ನು ಆರಿಸಿ",
    chooseRiverSubtitle: "ಪ್ರತಿ ನದಿಯು ಕಥೆಗಳ ಬ್ರಹ್ಮಾಂಡವನ್ನು ಹೊಂದಿದೆ",
    backBtn: "ಬ್ರಹ್ಮಲೋಕಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    inputPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ ಅಥವಾ ವಿಷಯವನ್ನು ಆರಿಸಿ...",
    loadingText: "ಕಾಸ್ಮಿಕ್ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
    imageLoadingText: "ವಾಸ್ತವದ ಚಿತ್ರಣ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...",
    imageRevealText: "ಇಗೋ, ದಿವ್ಯ ದರ್ಶನ:",
    visualizeBtn: "ದೃಶ್ಯ ನೋಡಿ",
    visualizingBtn: "ದೃಶ್ಯೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
    footerText: "nadistui.com ನ ಉತ್ಪನ್ನ",
    you: "ನೀವು",
    listenLegend: "ಪುರಾಣವನ್ನು ಆಲಿಸಿ",
    nextBtn: "ಮುಂದೆ",
    prevBtn: "ಹಿಂದೆ",
    askQuestionBtn: "ಪ್ರಶ್ನೆ ಕೇಳಿ",
    askQuestionTitle: "ಜ್ಞಾನವನ್ನು ಪಡೆಯಿರಿ",
    closeBtn: "ಮುಚ್ಚಿ",
    submitQuestionBtn: "ಕೇಳಿ",
    replayBtn: "ಮರುಪಂದ್ಯ",
    suggestionsTitle: "ಈ ರಹಸ್ಯಗಳನ್ನು ಅನ್ವೇಷಿಸಿ:",
    listening: "ಆಲಿಸುತ್ತಿದೆ...",
    speakNow: "ಈಗ ಮಾತನಾಡಿ",
    voiceNotSupported: "ಈ ಸಾಧನದಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ",
    voiceNoSpeech: "ಯಾವುದೇ ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    listenBtn: "ಆಲಿಸಿ",
    stopBtn: "ನಿಲ್ಲಿಸಿ",
    joinWhatsapp: "ನದಿ ಸ್ತುತಿ ಸభೆಗೆ ಸೇರಿ"
  },
  ta: {
    appName: "கதா",
    tagline: "புனித நீரின் எதிரொலிகள்",
    welcome: "பாரதத்தின் புனித நதிகளின் நித்திய கதைகளை பிரம்ம தேவரும் சரஸ்வதி தேவியும் விவரிக்கும் பிரம்மலோகம் என்னும் அண்டவெளியில் நுழையுங்கள்.",
    beginBtn: "யாத்திரையைத் தொடங்குங்கள்",
    chooseRiverTitle: "புனித நதியைத் தேர்ந்தெடுக்கவும்",
    chooseRiverSubtitle: "ஒவ்வொரு நதியிலும் கதைகளின் பிரம்மாண்டம் உள்ளது",
    backBtn: "திரும்புக",
    inputPlaceholder: "கேள்வி கேட்கவும் அல்லது தலைப்பைத் தேர்ந்தெடுக்கவும்...",
    loadingText: "பிரபஞ்ச ஆவணங்கள் ஆலோசிக்கப்படுகின்றன...",
    imageLoadingText: "காட்சி உருவாகிக்கொண்டிருக்கிறது...",
    imageRevealText: "இதோ, தெய்வீக காட்சி:",
    visualizeBtn: "காட்சிப்படுத்து",
    visualizingBtn: "வரைகிறது...",
    footerText: "nadistui.com இன் தயாரிப்பு",
    you: "நீங்கள்",
    listenLegend: "புராணத்தைக் கேளுங்கள்",
    nextBtn: "அடுத்து",
    prevBtn: "முந்தைய",
    askQuestionBtn: "கேள்வி கேளுங்கள்",
    askQuestionTitle: "ஞானத்தைத் தேடுங்கள்",
    closeBtn: "மூடு",
    submitQuestionBtn: "கேளுங்கள்",
    replayBtn: "மீண்டும்",
    suggestionsTitle: "இந்த மர்மங்களை ஆராயுங்கள்:",
    listening: "கேட்கிறது...",
    speakNow: "இப்போது பேசுங்கள்",
    voiceNotSupported: "இந்தச் சாதனத்தில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை",
    voiceNoSpeech: "பேச்சு எதுவும் கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.",
    listenBtn: "கேளுங்கள்",
    stopBtn: "நிறுத்து",
    joinWhatsapp: "நதி ஸ்துதி சபாவில் சேரவும்"
  },
  ml: {
    appName: "കഥ",
    tagline: "വിശുദ്ധ ജലത്തിന്റെ പ്രതിധ്വനികൾ",
    welcome: "ഭാരതത്തിലെ പുണ്യനദികളുടെ അനശ്വര കഥകൾ ബ്രഹ്മാവും മാതാ സരസ്വതിയും നെയ്യുന്ന ബ്രഹ്മലോകത്തിന്റെ കോസ്മിക് മണ്ഡലത്തിൽ പ്രവേശിക്കുക.",
    beginBtn: "തീർത്ഥാടനം ആരംഭിക്കുക",
    chooseRiverTitle: "ഒരു പുണ്യനദി തിരഞ്ഞെടുക്കുക",
    chooseRiverSubtitle: "ഓരോ നദിയിലും കഥകളുടെ ഒരു പ്രപഞ്ചമുണ്ട്",
    backBtn: "മടങ്ങുക",
    inputPlaceholder: "ചോദ്യം ചോദിക്കുക അല്ലെങ്കിൽ വിഷയം തിരഞ്ഞെടുക്കുക...",
    loadingText: "പ്രപഞ്ച രേഖകൾ പരിശോധിക്കുന്നു...",
    imageLoadingText: "യാഥാർത്ഥ്യത്തിന്റെ ക്യാൻവാസ് നെയ്യുന്നു...",
    imageRevealText: "ഇതാ, ദിവ്യ ദർശനം:",
    visualizeBtn: "ദൃശ്യവൽക്കരിക്കുക",
    visualizingBtn: "ദൃശ്യവൽക്കരിക്കുന്നു...",
    footerText: "nadistui.com-ന്റെ ഉൽപ്പന്നം",
    you: "നിങ്ങൾ",
    listenLegend: "ഐതിഹ്യം കേൾക്കൂ",
    nextBtn: "അടുത്തത്",
    prevBtn: "മുമ്പത്തെ",
    askQuestionBtn: "ചോദ്യം ചോദിക്കുക",
    askQuestionTitle: "ജ്ഞാനം തേടുക",
    closeBtn: "അടയ്ക്കുക",
    submitQuestionBtn: "ചോദിക്കുക",
    replayBtn: "വീണ്ടും",
    suggestionsTitle: "ഈ രഹസ്യങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക:",
    listening: "ശ്രദ്ധിക്കുന്നു...",
    speakNow: "ഇപ്പോൾ സംസാരിക്കൂ",
    voiceNotSupported: "ഈ ഉപകരണത്തിൽ വോയ്‌സ് ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല",
    voiceNoSpeech: "ശബ്ദമൊന്നും കണ്ടെത്തിയില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    listenBtn: "കേൾക്കൂ",
    stopBtn: "നിർത്തുക",
    joinWhatsapp: "നദി സ്തുതി സഭയിൽ ചേരുക"
  }
};

export const RIVER_DATA_LOCALIZED: Record<Language, Partial<River>[]> = {
  en: [
    { name: "Ganga", shortDesc: "The celestial river that descended from the locks of Shiva." },
    { name: "Yamuna", shortDesc: "The beloved of Krishna, daughter of the Sun God Surya." },
    { name: "Saraswati", shortDesc: "The lost river of wisdom, flowing deep within the earth." },
    { name: "Narmada", shortDesc: "Born from the sweat of Shiva, the giver of peace." },
    { name: "Godavari", shortDesc: "The Ganges of the South, sanctifying the Deccan plateau." },
    { name: "Kaveri", shortDesc: "The beautiful garland of the south, manifested by Sage Agastya." }
  ],
  hi: [
    { name: "गंगा", shortDesc: "स्वर्गीय नदी जो शिव की जटाओं से अवतरित हुई।" },
    { name: "यमुना", shortDesc: "कृष्ण की प्रिय, सूर्य देव की पुत्री।" },
    { name: "सरस्वती", shortDesc: "ज्ञान की लुप्त नदी, जो पृथ्वी के भीतर बहती है।" },
    { name: "नर्मदा", shortDesc: "शिव के पसीने से जन्मी, शांति दायिनी।" },
    { name: "गोदावरी", shortDesc: "दक्षिण की गंगा, दक्कन के पठार को पवित्र करती है।" },
    { name: "कावेरी", shortDesc: "दक्षिण की सुंदर माला, ऋषि अगस्त्य द्वारा प्रकट।" }
  ],
  mr: [
    { name: "गंगा", shortDesc: "शिवाच्या जटांमधून अवतरलेली स्वर्गीय नदी." },
    { name: "यमुना", shortDesc: "कृष्णाची प्रिय सखी, सूर्यदेवाची कन्या." },
    { name: "सरस्वती", shortDesc: "ज्ञानाची लुप्त नदी, जी पृथ्वीच्या पोटातून वाहते." },
    { name: "नर्मदा", shortDesc: "शिवाच्या घामातून जन्मलेली, शांती देणारी." },
    { name: "गोदावरी", shortDesc: "दक्षिणेची गंगा, दख्खनचे पठार पवित्र करणारी." },
    { name: "कावेरी", shortDesc: "दक्षिणेची सुंदर माळ, ऋषी अगस्त्यांनी प्रकट केलेली." }
  ],
  kn: [
    { name: "ಗಂಗಾ", shortDesc: "ಶಿವನ ಜಡೆಗಳಿಂದ ಇಳಿದು ಬಂದ ಸ್ವರ್ಗೀಯ ನದಿ." },
    { name: "ಯಮುನಾ", shortDesc: "ಕೃಷ್ಣನ ಪ್ರಿಯತಮೆ, ಸೂರ್ಯ ದೇವರ ಮಗಳು." },
    { name: "ಸರಸ್ವತಿ", shortDesc: "ಜ್ಞಾನದ ಗುಪ್ತ ನದಿ, ಭೂಮಿಯ ಆಳದಲ್ಲಿ ಹರಿಯುತ್ತದೆ." },
    { name: "ನರ್ಮದಾ", shortDesc: "ಶಿವನ ಬೆವರಿನಿಂದ ಜನಿಸಿದವಳು, ಶಾಂತಿಯನ್ನು ನೀಡುವವಳು." },
    { name: "ಗೋದಾವರಿ", shortDesc: "ದಕ್ಷಿಣದ ಗಂಗೆ, ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿಯನ್ನು ಪವಿತ್ರಗೊಳಿಸುತ್ತದೆ." },
    { name: "ಕಾವೇರಿ", shortDesc: "ದಕ್ಷಿಣದ ಸುಂದರ ಹಾರ, ಅಗಸ್ತ್ಯ ಮುನಿಗಳಿಂದ ಪ್ರಕಟಗೊಂಡವಳು." }
  ],
  ta: [
    { name: "கங்கை", shortDesc: "சிவனின் ஜடாமுடியிலிருந்து இறங்கிய தெய்வீக நதி." },
    { name: "யமுனை", shortDesc: "கிருஷ்ணரின் அன்புக்குரியவள், சூரிய பகவானின் மகள்." },
    { name: "சரஸ்வதி", shortDesc: "பூமிக்குள் ஆழமாக பாயும் ஞானத்தின் மறைந்த நதி." },
    { name: "நர்மதா", shortDesc: "சிவனின் வியர்வையிலிருந்து பிறந்தவள், அமைதியைத் தருபவள்." },
    { name: "கோதாவரி", shortDesc: "தெற்கின் கங்கை, தக்காண பீடபூமியை புனிதப்படுத்துகிறது." },
    { name: "காவேரி", shortDesc: "தெற்கின் அழகான மாலை, அகஸ்திய முனிவரால் வெளிப்பட்டது." }
  ],
  ml: [
    { name: "ഗംഗ", shortDesc: "ശിവന്റെ ജടയിൽ നിന്ന് ഇറങ്ങിവന്ന സ്വർഗ്ഗീയ നദി." },
    { name: "യമുന", shortDesc: "കൃഷ്ണന്റെ പ്രിയപ്പെട്ടവൾ, സൂര്യദേവന്റെ മകൾ." },
    { name: "സരസ്വതി", shortDesc: "ഭൂമിക്കുള്ളിലൂടെ ഒഴുകുന്ന വിജ്ഞാനത്തിന്റെ ലുപ്ത നദി." },
    { name: "നർമ്മദ", shortDesc: "ശിവന്റെ വിയർപ്പിൽ നിന്ന് ജനിച്ചവൾ, സമാധാനം നൽകുന്നവൾ." },
    { name: "ഗോദാവരി", shortDesc: "ദക്ഷിണ ഗംഗ, ഡെക്കാൺ പീഠഭൂമിയെ വിശുദ്ധമാക്കുന്നു." },
    { name: "കാവേരി", shortDesc: "അഗസ്ത്യ മുനിയാൽ പ്രകടമായ തെന്നിന്ത്യയുടെ സുന്ദരമാല്യം." }
  ]
};

export const BASE_RIVERS: Omit<River, 'name' | 'shortDesc'>[] = [
  {
    id: "ganga",
    sanskritName: "गंगा",
    color: "from-blue-400 to-cyan-300",
    imagePrompt: "The majestic River Ganga flowing from the Himalayas, celestial and pure, glowing with divine light in a moonlit night."
  },
  {
    id: "yamuna",
    sanskritName: "यमुना",
    color: "from-indigo-400 to-purple-400",
    imagePrompt: "The dark blue waters of Yamuna flowing past ancient temples in Vrindavan, soft twilight, peacocks nearby."
  },
  {
    id: "saraswati",
    sanskritName: "सरस्वती",
    color: "from-amber-200 to-yellow-100",
    imagePrompt: "A mystical, invisible river glowing with golden knowledge, flowing through a vedic landscape, ethereal and ancient."
  },
  {
    id: "narmada",
    sanskritName: "नर्मदा",
    color: "from-emerald-400 to-teal-300",
    imagePrompt: "The rocky gorges of the Narmada river, marble rocks reflecting moonlight, a statue of Shiva in the distance."
  },
  {
    id: "godavari",
    sanskritName: "गोदावरी",
    color: "from-orange-300 to-red-300",
    imagePrompt: "The wide expanse of the Godavari river at sunset, ancient stone steps (ghats) leading to the water, lamps floating."
  },
  {
    id: "kaveri",
    sanskritName: "कावेरी",
    color: "from-green-300 to-lime-300",
    imagePrompt: "Lush green banks of the Kaveri river flowing through paddy fields and temples of Tamil Nadu."
  }
];

export const getRivers = (lang: Language): River[] => {
  const localized = RIVER_DATA_LOCALIZED[lang] || RIVER_DATA_LOCALIZED['en'];
  return BASE_RIVERS.map((base, index) => ({
    ...base,
    name: localized[index].name || base.id,
    shortDesc: localized[index].shortDesc || ""
  }));
};

export const getQuestionSuggestions = (riverName: string, lang: Language): string[] => {
  switch (lang) {
    case 'hi':
      return [
        `${riverName} से जुड़ी कोई और कहानी सुनाएं`,
        `${riverName} के किनारे स्थित प्रमुख तीर्थ स्थल कौन से हैं?`,
        `${riverName} का उद्गम कहाँ से हुआ?`,
        `${riverName} की जैव विविधता के बारे में बताएं`,
        `${riverName} पर कौन से प्रमुख त्यौहार मनाए जाते हैं?`
      ];
    case 'mr':
        return [
          `${riverName} शी संबंधित दुसरी कथा सांगा`,
          `${riverName} च्या काठावरील प्रमुख तीर्थक्षेत्रे कोणती?`,
          `${riverName} चा उगम कोठून झाला?`,
          `${riverName} मधील जैवविविधतेबद्दल सांगा`,
          `${riverName} वर कोणते सण साजरे केले जातात?`
        ];
    case 'kn':
        return [
          `${riverName} ನದಿಗೆ ಸಂಬಂಧಿಸಿದ ಮತ್ತೊಂದು ಕಥೆಯನ್ನು ಹೇಳಿ`,
          `${riverName} ನದಿಯ ದಡದಲ್ಲಿರುವ ಪ್ರಮುಖ ದೇವಾಲಯಗಳು ಯಾವುವು?`,
          `${riverName} ನದಿಯ ಉಗಮ ಸ್ಥಾನ ಯಾವುದು?`,
          `${riverName} ನದಿಯ ಜೈವಿಕ ವೈವಿಧ್ಯತೆಯ ಬಗ್ಗೆ ತಿಳಿಸಿ`,
          `${riverName} ನದಿಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಮುಖ ಹಬ್ಬಗಳು ಯಾವುವು?`
        ];
    case 'ta':
        return [
          `${riverName} நதி பற்றிய மற்றொரு கதையைச் சொல்லுங்கள்`,
          `${riverName} நதிக்கரையில் உள்ள முக்கியமான கோயில்கள் எவை?`,
          `${riverName} நதி எங்கே உற்பத்தியாகிறது?`,
          `${riverName} நதியின் பல்லுயிர் வளம் பற்றி கூறுங்கள்`,
          `${riverName} நதிக்கரையில் கொண்டாடப்படும் முக்கிய விழாக்கள் எவை?`
        ];
    case 'ml':
        return [
          `${riverName} നദിയെക്കുറിച്ചുള്ള മറ്റൊരു കഥ പറയൂ`,
          `${riverName} നദീതീരത്തുള്ള പ്രധാന ക്ഷേത്രങ്ങൾ ഏവ?`,
          `${riverName} നദിയുടെ ഉത്ഭവം എവിടെയാണ്?`,
          `${riverName} നദിയുടെ ജൈവവൈവിധ്യത്തെക്കുറിച്ച് പറയൂ`,
          `${riverName} നദിയുമായി ബന്ധപ്പെട്ട പ്രധാന ഉത്സവങ്ങൾ ഏവ?`
        ];
    default: // en
      return [
        `Tell me another legend about ${riverName}`,
        `What are the famous spiritual sites along ${riverName}?`,
        `How was ${riverName} born? Tell the origin story`,
        `Describe the biodiversity and nature of ${riverName}`,
        `What festivals are celebrated at ${riverName}?`
      ];
  }
};

export const getBrahmaInstruction = (language: Language, languageName: string) => `
You are Lord Brahma, the Creator of the Universe. You are narrating a story or answering a seeker's inquiry with Mata Sarasvati, the Goddess of Wisdom.
**Output Format**: You must output a **JSON Array** of objects. Do NOT output markdown. 
**Language**: Everything must be in **${languageName}**.

Structure:
[
  { 
    "speaker": "Brahma" | "Sarasvati", 
    "text": "Dialogue text here...",
    "visualDescription": "A concise English description of the scene described in this dialogue for image generation."
  }
]

Guidelines:
- Brahma is the main narrator, wise and ancient.
- Sarasvati adds artistic details, cultural significance, or corrects gently.
- Keep the story flow natural between the two.
- Total 6-10 dialogue segments.
- If answering a specific question, structure the answer as a dialogue between Brahma and Sarasvati explaining the answer to the devotee.
`;

export const getQuestionInstruction = (language: Language, languageName: string) => `
You are Lord Brahma. A seeker has asked you a question about a sacred river.
Answer wisely, briefly (max 100 words), and in a divine tone in **${languageName}**.
`;

export const LOADING_MESSAGES = [
  "Sarasvati is dipping her quill in the liquid moonlight...",
  "The colors of the cosmos are coalescing...",
  "Weaving the threads of time into a vision...",
  "Manifesting the divine thought into form...",
  "Summoning the memories of the ancient waters...",
];
