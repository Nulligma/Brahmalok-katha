
import React, { useState } from 'react';
import { ViewState, River, Language } from './types';
import { getRivers, LANGUAGES, TRANSLATIONS } from './constants';
import { RiverCard } from './components/RiverCard';
import { StoryInterface } from './components/StoryInterface';
import { Button } from './components/Button';
import { Sparkle } from './components/Sparkle';
import { ArrowLeft } from 'lucide-react';
import { Analytics } from './services/analytics';
import { LanguageSelector } from './components/LanguageSelector';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.LANDING);
  const [selectedRiver, setSelectedRiver] = useState<River | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  const t = TRANSLATIONS[selectedLanguage];
  const rivers = getRivers(selectedLanguage);

  const handleStartJourney = () => {
    Analytics.logBeginJourney();
    setViewState(ViewState.RIVER_SELECTION);
  };

  const handleSelectRiver = (river: River) => {
    Analytics.logRiverSelect(river.id, river.name);
    setSelectedRiver(river);
    setViewState(ViewState.STORY_TELLING);
  };

  const handleBackToRivers = () => {
    setSelectedRiver(null);
    setViewState(ViewState.RIVER_SELECTION);
  };

  const handleLanguageChange = (langCode: Language) => {
    Analytics.logLanguageChange(langCode);
    setSelectedLanguage(langCode);
  };

  return (
    <div className="min-h-screen w-full cosmic-bg text-white flex flex-col relative overflow-hidden">
      {/* Background Stars Layer */}
      <div className="fixed inset-0 stars opacity-50 pointer-events-none" />
      
      {/* Ornamental Overlay */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

      {/* Navigation/Header - Only visible in Story Telling */}
      {viewState === ViewState.STORY_TELLING && (
        <nav className="w-full p-4 md:p-6 z-50 flex items-center justify-center relative animate-fade-in">
            <button 
                onClick={handleBackToRivers}
                className="absolute left-4 md:left-8 flex items-center gap-2 text-amber-200 hover:text-white transition-colors bg-black/20 p-2 md:px-4 md:py-2 rounded-full backdrop-blur-md border border-white/10 z-50"
                title={t.backBtn}
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline font-divine">{t.backBtn}</span>
            </button>

            <div 
                className="flex items-center gap-2 cursor-pointer select-none transition-all duration-300 bg-slate-900/60 backdrop-blur-xl px-6 py-2 rounded-full border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 group"
                onClick={() => setViewState(ViewState.LANDING)}
            >
                <Sparkle className="text-amber-400 w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
                <h1 className="text-2xl md:text-4xl font-divine text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 tracking-wider">
                {t.appName}
                </h1>
                <Sparkle className="text-amber-400 w-6 h-6 md:w-8 md:h-8 group-hover:-rotate-12 transition-transform" />
            </div>
        </nav>
      )}

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col relative z-20 container mx-auto px-4 pb-2 md:pb-6 h-full overflow-hidden">
        
        {/* LANDING VIEW */}
        {viewState === ViewState.LANDING && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in overflow-y-auto py-8">
            
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />

            <div className="relative group mt-8">
                <div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-amber-500/30 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm overflow-hidden">
                    {/* Placeholder for Brahma/Sarasvati concept - using a lotus icon or abstract symbol */}
                    <svg className="w-32 h-32 text-amber-400/80" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2C9,7 4,9 4,14C4,18.42 7.58,22 12,22C16.42,22 20,18.42 20,14C20,9 15,7 12,2M12,20C8.69,20 6,17.31 6,14C6,10 12,4 12,4C12,4 18,10 18,14C18,17.31 15.31,20 12,20Z" />
                    </svg>
                </div>
            </div>
            
            <div className="max-w-2xl space-y-4">
              <h2 className="text-5xl md:text-7xl font-divine text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Brahmalok
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 font-light tracking-wide italic">
                "{t.tagline}"
              </p>
              <p className="text-md md:text-lg text-slate-400 leading-relaxed px-4">
                {t.welcome}
              </p>
            </div>

            <div className="pt-8">
              <Button onClick={handleStartJourney} className="text-lg px-8 py-4">
                {t.beginBtn}
              </Button>
            </div>
          </div>
        )}

        {/* RIVER SELECTION VIEW */}
        {viewState === ViewState.RIVER_SELECTION && (
          <div className="flex-1 flex flex-col items-center w-full space-y-6 animate-fade-in overflow-y-auto py-4">
            
            <div className="w-full flex justify-center mb-2">
                <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
            </div>

            <div className="text-center mb-2">
              <h2 className="text-3xl font-divine text-amber-100">{t.chooseRiverTitle}</h2>
              <p className="text-slate-400 mt-2">{t.chooseRiverSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl pb-8 px-4">
              {rivers.map((river) => (
                <RiverCard 
                  key={river.id} 
                  river={river} 
                  onSelect={handleSelectRiver} 
                />
              ))}
            </div>
            <div className="pt-4">
              <a href="https://chat.whatsapp.com/GWWZngBJzYsDZ8AGzF6Xt4" target="_blank" rel="noopener noreferrer">
                <Button className="text-sm px-6 py-3">
                  {t.joinWhatsapp}
                </Button>
              </a>
            </div>
          </div>
        )}

        {/* STORY TELLING VIEW */}
        {viewState === ViewState.STORY_TELLING && selectedRiver && (
          <div className="flex-1 w-full h-full animate-fade-in flex flex-col min-h-0">
             <StoryInterface 
                river={selectedRiver} 
                language={selectedLanguage}
                translations={t}
                onBack={handleBackToRivers} 
             />
          </div>
        )}

      </main>

      {/* Footer - Hide in Story mode to give max space */}
      {viewState !== ViewState.STORY_TELLING && (
          <footer className="py-4 text-center text-slate-600 text-sm relative z-20">
            <p>{t.footerText}</p>
          </footer>
      )}
    </div>
  );
};

export default App;
