
import React, { useState, useEffect, useRef } from 'react';
import { River, Language, TranslationBundle, StorySegment } from '../types';
import { generateStoryScript, generateDivineIllustration, generateSpeech } from '../services/geminiService';
import { ArrowLeft, ChevronRight, ChevronLeft, Send, X, Sparkles, Image as ImageIcon, RefreshCw, Mic, MicOff, Volume2, Loader2, StopCircle, VolumeX } from 'lucide-react';
import { LOADING_MESSAGES, getQuestionSuggestions } from '../constants';
import { Button } from './Button';

interface StoryInterfaceProps {
  river: River;
  language: Language;
  translations: TranslationBundle;
  onBack: () => void;
}

const SPEECH_LANG_MAP: Record<Language, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    mr: 'mr-IN',
    kn: 'kn-IN',
    ta: 'ta-IN',
    ml: 'ml-IN'
};

// Helper functions for Audio Decoding
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Stylized Avatar Component
const Avatar: React.FC<{ type: 'Brahma' | 'Sarasvati'; isActive: boolean }> = ({ type, isActive }) => {
    const isBrahma = type === 'Brahma';
    
    return (
        <div className={`relative transition-all duration-700 ${isActive ? 'scale-110 z-10 opacity-100' : 'scale-90 opacity-60 grayscale-[0.5]'}`}>
            {/* Glow Effect */}
            {isActive && (
                <div className={`absolute inset-0 rounded-full blur-xl md:blur-2xl ${isBrahma ? 'bg-amber-500/40' : 'bg-cyan-500/40'} animate-pulse`} />
            )}
            
            {/* Avatar Container */}
            <div className={`relative w-16 h-16 md:w-48 md:h-48 rounded-full border-2 md:border-4 flex items-center justify-center overflow-hidden shadow-2xl
                ${isBrahma ? 'border-amber-500 bg-gradient-to-br from-amber-900 to-orange-950' : 'border-cyan-300 bg-gradient-to-br from-slate-900 to-cyan-950'}
            `}>
                {isBrahma ? (
                   // Abstract Representation of Brahma (Golden, multiple faces implied by geometry)
                   <div className="relative w-full h-full flex items-center justify-center">
                       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 to-transparent" />
                       <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-32 md:h-32 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">
                            <path d="M50 10 C60 10 70 20 70 35 C70 50 60 60 50 60 C40 60 30 50 30 35 C30 20 40 10 50 10 Z" fill="currentColor" opacity="0.9"/>
                            <path d="M80 35 C90 35 95 45 95 55 C95 70 80 80 50 80" fill="none" stroke="currentColor" strokeWidth="2" />
                            <path d="M20 35 C10 35 5 45 5 55 C5 70 20 80 50 80" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="50" cy="25" r="3" fill="#FFF" />
                            {/* Crown */}
                            <path d="M35 10 L50 0 L65 10" fill="none" stroke="currentColor" strokeWidth="3" />
                       </svg>
                   </div>
                ) : (
                    // Abstract Representation of Sarasvati (White/Blue, Veena/Swan implied)
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/20 to-transparent" />
                        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-32 md:h-32 text-cyan-100 drop-shadow-[0_0_10px_rgba(100,200,255,0.8)]">
                             <path d="M50 20 C65 20 75 35 75 50 C75 70 60 90 50 90 C40 90 25 70 25 50 C25 35 35 20 50 20 Z" fill="currentColor" opacity="0.9" />
                             {/* Veena Strings */}
                             <line x1="45" y1="30" x2="45" y2="80" stroke="cyan" strokeWidth="1" />
                             <line x1="50" y1="30" x2="50" y2="80" stroke="cyan" strokeWidth="1" />
                             <line x1="55" y1="30" x2="55" y2="80" stroke="cyan" strokeWidth="1" />
                        </svg>
                    </div>
                )}
            </div>
            <div className={`absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 px-2 md:px-4 py-0.5 md:py-1 rounded-full border backdrop-blur-md text-[8px] md:text-sm font-divine tracking-widest whitespace-nowrap shadow-lg
                ${isBrahma ? 'bg-amber-950/80 border-amber-500 text-amber-200' : 'bg-cyan-950/80 border-cyan-400 text-cyan-100'}
            `}>
                {type}
            </div>
        </div>
    );
};

export const StoryInterface: React.FC<StoryInterfaceProps> = ({ river, language, translations, onBack }) => {
    const [script, setScript] = useState<StorySegment[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1); // -1 is loading
    const [loading, setLoading] = useState(true);
    
    // Popups
    const [showQuestionPopup, setShowQuestionPopup] = useState(false);
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [questionInput, setQuestionInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [imageLoadingMsg, setImageLoadingMsg] = useState("");
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState<string>("");

    // Audio State
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
    
    // Story version tracking to handle race conditions during background generation
    const storyVersionRef = useRef(0);

    // Speech Recognition Ref
    const recognitionRef = React.useRef<any>(null);

    useEffect(() => {
        loadStory();
        return () => {
             stopAudio();
             if (audioContextRef.current) {
                 audioContextRef.current.close();
             }
        };
    }, [river.name, language]);

    // Effect to Auto-Play audio when currentIndex changes or when data arrives for current index
    useEffect(() => {
        if (currentIndex >= 0 && script[currentIndex]) {
            playCurrentSegmentAudio();
        }
    }, [currentIndex]);

    // Effect to pick up audio if it arrives while we are waiting on the current slide
    useEffect(() => {
        if (currentIndex >= 0 && script[currentIndex]?.audioData && isAudioLoading && !isAudioPlaying) {
            playCurrentSegmentAudio();
        } else if (currentIndex >= 0 && script[currentIndex]?.audioFailed && isAudioLoading) {
             setIsAudioLoading(false);
        }
    }, [script]);

    const loadStory = async (topic?: string) => {
        stopAudio();
        setLoading(true);
        setScript([]);
        setCurrentIndex(-1);
        
        // Increment version to invalidate previous background tasks
        storyVersionRef.current += 1;
        const currentVersion = storyVersionRef.current;

        const newScript = await generateStoryScript(river.name, language, topic);
        
        if (currentVersion !== storyVersionRef.current) return;

        setScript(newScript);
        setLoading(false);
        setCurrentIndex(0);

        // Start background audio generation
        preloadAudioSequentially(newScript, currentVersion);
    };

    const preloadAudioSequentially = async (segments: StorySegment[], version: number) => {
        for (let i = 0; i < segments.length; i++) {
            if (version !== storyVersionRef.current) return;

            // Only generate if not already present and not failed
            if (!segments[i].audioData && !segments[i].audioFailed) {
                const audioData = await generateSpeech(segments[i].text, segments[i].speaker);
                
                if (version !== storyVersionRef.current) return;

                setScript(prev => {
                    // Ensure we don't mess up if script changed unexpectedly
                    if (prev.length !== segments.length) return prev;
                    const newScript = [...prev];
                    if (newScript[i]) {
                         if (audioData) {
                            newScript[i] = { ...newScript[i], audioData };
                         } else {
                            newScript[i] = { ...newScript[i], audioFailed: true };
                         }
                    }
                    return newScript;
                });
            }
        }
    };

    const handleNext = () => {
        if (currentIndex < script.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            stopAudio();
            setShowQuestionPopup(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleAskQuestion = async (customTopic?: string) => {
        const topic = customTopic || questionInput;
        if (!topic.trim()) return;
        
        setShowQuestionPopup(false);
        setQuestionInput("");
        setVoiceStatus("");
        await loadStory(topic);
    };

    const handleVisualize = async () => {
        setShowImagePopup(true);
        setIsImageLoading(true);
        setGeneratedImage(null);
        setImageLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);

        const currentSegment = script[currentIndex];
        const prompt = currentSegment.visualDescription || currentSegment.text;
        
        const imgData = await generateDivineIllustration(prompt);
        setGeneratedImage(imgData);
        setIsImageLoading(false);
    };

    // Audio Playback Logic
    const stopAudio = () => {
        if (audioSourceRef.current) {
            try {
                audioSourceRef.current.stop();
            } catch (e) {
                // Ignore errors if already stopped
            }
            audioSourceRef.current = null;
        }
        setIsAudioPlaying(false);
        setIsAudioLoading(false);
    };

    const playCurrentSegmentAudio = async () => {
        const segment = script[currentIndex];
        if (!segment) return;

        stopAudio(); // Stop any previous audio

        if (segment.audioData) {
            setIsAudioLoading(false);
            await playAudio(segment.audioData);
        } else if (segment.audioFailed) {
             setIsAudioLoading(false);
        } else {
            // Data not ready yet, set loading.
            setIsAudioLoading(true);
        }
    };

    const playAudio = async (base64Data: string) => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            const audioBuffer = await decodeAudioData(
                decode(base64Data),
                ctx,
                24000,
                1
            );

            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            
            source.onended = () => {
                setIsAudioPlaying(false);
            };

            audioSourceRef.current = source;
            source.start();
            setIsAudioPlaying(true);

        } catch (error) {
            console.error("Audio playback error:", error);
            setIsAudioLoading(false);
            setIsAudioPlaying(false);
        }
    };

    const handleListenToggle = () => {
        if (isAudioPlaying) {
            stopAudio();
        } else {
            playCurrentSegmentAudio();
        }
    };

    const handleVoiceStart = () => {
        setVoiceStatus("");
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            setVoiceStatus(translations.voiceNotSupported);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = SPEECH_LANG_MAP[language] || language;
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onstart = () => {
            setIsListening(true);
            setVoiceStatus(translations.speakNow + "...");
        };

        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setQuestionInput(transcript);
            setIsListening(false);
            setVoiceStatus(""); 
        };

        recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
            if (event.error === 'no-speech') {
                setVoiceStatus(translations.voiceNoSpeech);
            } else if (event.error === 'not-allowed') {
                setVoiceStatus("Permission denied.");
            } else {
                setVoiceStatus("Error: " + event.error);
            }
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        try {
            recognitionRef.current.start();
        } catch (e) {
            console.error("Failed to start recognition", e);
            setIsListening(false);
        }
    };

    const handleVoiceStop = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
            setVoiceStatus("");
        }
    };

    const currentSegment = script[currentIndex];
    const isBrahma = currentSegment?.speaker === 'Brahma';
    const suggestions = getQuestionSuggestions(river.name, language);

    return (
        <div className="relative w-full h-full flex flex-col items-center p-2 md:p-8 overflow-hidden">
            
            {/* Header Container - Just Title now, back button is in App.tsx */}
            <div className="w-full shrink-0 z-30 flex items-center justify-center relative mb-2 md:mb-4 pointer-events-none">
                <div className="text-center px-2 pointer-events-auto">
                     <h2 className="text-2xl md:text-4xl font-divine text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        {river.name}
                    </h2>
                </div>
            </div>

            {/* Main Stage */}
            <div className="flex-1 min-h-0 w-full max-w-6xl flex flex-col md:flex-row items-center justify-center relative md:gap-8">
                {loading ? (
                    <div className="text-center space-y-4 animate-pulse">
                        <Sparkles className="w-12 h-12 text-amber-400 mx-auto animate-spin" />
                        <p className="text-xl font-divine text-amber-200">{translations.loadingText}</p>
                    </div>
                ) : (
                    <>
                         {/* Mobile Avatar Row - Side by side at the top */}
                         <div className="md:hidden w-full flex justify-between px-6 shrink-0 mb-2 z-10">
                            <div className={`transition-all duration-500 ${isBrahma ? 'opacity-100 scale-110' : 'opacity-50 grayscale scale-90'}`}>
                                 <Avatar type="Brahma" isActive={isBrahma} />
                            </div>
                            <div className={`transition-all duration-500 ${!isBrahma ? 'opacity-100 scale-110' : 'opacity-50 grayscale scale-90'}`}>
                                 <Avatar type="Sarasvati" isActive={!isBrahma} />
                            </div>
                         </div>

                        {/* Desktop Brahma (Left) */}
                        <div className={`hidden md:block order-1 shrink-0 transition-all duration-500 ${isBrahma ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                            <Avatar type="Brahma" isActive={isBrahma} />
                        </div>

                        {/* Speech Bubble Area (Center) - Scrollable content */}
                        <div className="md:order-2 flex-1 min-h-0 w-full max-w-2xl mx-2 flex flex-col justify-center relative z-20 mb-2 md:mb-0">
                            <div className={`
                                relative flex flex-col max-h-full
                                rounded-3xl border backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-all duration-500
                                ${isBrahma 
                                    ? 'bg-gradient-to-br from-amber-950/80 to-black/80 border-amber-500/40 text-amber-100' 
                                    : 'bg-gradient-to-br from-cyan-950/80 to-black/80 border-cyan-500/40 text-cyan-100'}
                            `}>
                                {/* Speech Pointer (Desktop) */}
                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-6 h-6 transform rotate-45 border-t border-l backdrop-blur-xl
                                    ${isBrahma 
                                        ? '-left-3 bg-amber-950/80 border-amber-500/40' 
                                        : '-right-3 bg-cyan-950/80 border-cyan-500/40'}
                                `} style={isBrahma ? {} : {left: 'auto', borderTop: 'none', borderLeft: 'none', borderBottom: '1px solid rgba(6,182,212,0.4)', borderRight: '1px solid rgba(6,182,212,0.4)'}} />

                                {/* Scrollable Text Area - Compact padding on mobile */}
                                <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
                                    <p className="text-base md:text-2xl font-light leading-relaxed font-serif italic">
                                        "{currentSegment.text}"
                                    </p>
                                </div>

                                {/* Audio Button attached to bubble footer */}
                                <div className="absolute -bottom-4 right-6 z-30">
                                     <button 
                                        onClick={handleListenToggle}
                                        disabled={currentSegment.audioFailed}
                                        className={`flex items-center gap-2 border border-white/20 text-xs px-3 py-1.5 rounded-full transition-colors shadow-lg
                                            ${isBrahma 
                                                ? 'bg-amber-900 text-amber-200 hover:bg-amber-800 hover:text-white' 
                                                : 'bg-cyan-900 text-cyan-200 hover:bg-cyan-800 hover:text-white'
                                            }
                                            ${isAudioPlaying ? 'ring-2 ring-white/50' : ''}
                                            ${currentSegment.audioFailed ? 'opacity-50 cursor-not-allowed' : ''}
                                        `}
                                        title={currentSegment.audioFailed ? "Audio Unavailable" : translations.listenBtn}
                                    >
                                        {currentSegment.audioFailed ? (
                                            <VolumeX className="w-3 h-3" />
                                        ) : isAudioLoading ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : isAudioPlaying ? (
                                            <StopCircle className="w-3 h-3" />
                                        ) : (
                                            <Volume2 className="w-3 h-3" />
                                        )}
                                        <span className="hidden sm:inline">
                                            {currentSegment.audioFailed ? "No Audio" : (isAudioPlaying ? translations.stopBtn : translations.listenBtn)}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Sarasvati (Right) */}
                        <div className={`hidden md:block order-3 shrink-0 transition-all duration-500 ${!isBrahma ? 'opacity-100' : 'opacity-50 grayscale'}`}>
                             <Avatar type="Sarasvati" isActive={!isBrahma} />
                        </div>
                    </>
                )}
            </div>

            {/* Navigation Controls - Footer */}
            {!loading && (
                <div className="shrink-0 z-30 w-full max-w-5xl mt-2 md:mt-8 bg-slate-900/80 backdrop-blur-xl p-2 md:p-4 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
                    <div className="flex items-center justify-between gap-2 md:gap-4">
                        
                        {/* Left: Prev Button */}
                        <Button onClick={handlePrev} disabled={currentIndex === 0} variant="outline" className="!px-3 !py-2 text-sm md:text-base border-slate-600 text-slate-300 hover:bg-slate-800 min-w-[40px] md:min-w-[100px]">
                            <ChevronLeft className="w-4 h-4 md:mr-2" />
                            <span className="hidden md:inline">{translations.prevBtn}</span>
                        </Button>

                        {/* Center: Primary Controls Group */}
                        <div className="flex items-center justify-center gap-3 flex-1">
                            {/* Replay */}
                            <button onClick={() => loadStory()} className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-colors shadow-lg" title={translations.replayBtn}>
                                <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            
                            {/* VISUALIZE - Icon on mobile, Text on desktop */}
                            <button 
                                onClick={handleVisualize}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white p-3 md:px-6 md:py-3 rounded-full transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105 font-divine tracking-wide border border-violet-400/30"
                                title={translations.visualizeBtn}
                            >
                                <ImageIcon className="w-5 h-5 md:w-5 md:h-5" />
                                <span className="hidden md:inline text-base">{translations.visualizeBtn}</span>
                            </button>
                            
                            {/* Ask Question */}
                            <button onClick={() => setShowQuestionPopup(true)} className="p-3 rounded-full bg-amber-900/40 hover:bg-amber-800/60 text-amber-400 hover:text-amber-200 border border-amber-500/30 transition-colors shadow-lg" title={translations.askQuestionBtn}>
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>

                        {/* Right: Next Button */}
                        <Button onClick={handleNext} variant="primary" className="!px-4 !py-2 text-sm md:text-base min-w-[80px] md:min-w-[120px]">
                            <span className="inline mr-1 md:mr-2">{currentIndex === script.length - 1 ? translations.askQuestionBtn : translations.nextBtn}</span>
                            {currentIndex === script.length - 1 ? <Sparkles className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>
            )}

            {/* --- POPUPS --- */}

            {/* Question/Topic Popup */}
            {showQuestionPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-amber-500/30 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.2)] max-h-[90vh] flex flex-col">
                        <div className="bg-slate-800/50 p-4 border-b border-white/10 flex justify-between items-center">
                            <h3 className="font-divine text-xl text-amber-100">{translations.askQuestionTitle}</h3>
                            <button onClick={() => setShowQuestionPopup(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            {/* Suggestions */}
                            <div className="mb-6">
                                <h4 className="text-sm text-amber-200/70 uppercase tracking-wider mb-3 font-bold">{translations.suggestionsTitle}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((suggestion, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => handleAskQuestion(suggestion)}
                                            className="text-left px-3 py-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20 hover:bg-indigo-900/60 hover:border-amber-500/50 text-slate-200 text-xs md:text-sm transition-all duration-300"
                                        >
                                            <Sparkles className="w-3 h-3 inline-block mr-2 text-amber-400" />
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="relative mt-4">
                                <div className="relative">
                                    <textarea 
                                        value={questionInput}
                                        onChange={(e) => setQuestionInput(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 pr-12 text-white focus:ring-2 focus:ring-amber-500/50 focus:border-transparent outline-none h-24 resize-none placeholder-slate-500"
                                        placeholder={isListening ? translations.listening : translations.inputPlaceholder}
                                    />
                                    
                                    {/* Mic Button */}
                                    <button 
                                        onClick={isListening ? handleVoiceStop : handleVoiceStart}
                                        className={`absolute bottom-4 right-16 p-2 rounded-full transition-all ${
                                            isListening 
                                                ? 'bg-red-500/20 text-red-400 animate-pulse' 
                                                : 'text-slate-400 hover:text-white hover:bg-white/10'
                                        }`}
                                        title={isListening ? "Stop listening" : "Speak"}
                                    >
                                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                    </button>

                                    {/* Send Button */}
                                    <button 
                                        onClick={() => handleAskQuestion()}
                                        disabled={!questionInput.trim()}
                                        className="absolute bottom-4 right-4 p-2 bg-amber-600 rounded-full hover:bg-amber-500 disabled:opacity-50 text-white transition-all hover:scale-110"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                                {/* Voice Feedback Status */}
                                <p className={`text-xs mt-2 ml-1 transition-all ${
                                    voiceStatus.includes(translations.voiceNoSpeech) || voiceStatus.includes("Error") || voiceStatus.includes("denied")
                                    ? "text-red-400" 
                                    : "text-amber-400 animate-pulse"
                                }`}>
                                    {voiceStatus || (isListening ? translations.speakNow + "..." : "")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Popup */}
            {showImagePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                     <div className="relative max-w-2xl w-full">
                        <button onClick={() => setShowImagePopup(false)} className="absolute -top-10 right-0 text-white hover:text-amber-400 transition-colors">
                            <X className="w-8 h-8" />
                        </button>

                        {isImageLoading ? (
                            <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping" />
                                    <div className="absolute inset-0 border-4 border-t-cyan-400 rounded-full animate-spin" />
                                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-cyan-200" />
                                </div>
                                <h3 className="font-divine text-2xl text-cyan-100 animate-pulse">Sarasvati is creating...</h3>
                                <p className="text-cyan-200/70 italic text-lg">"{imageLoadingMsg}"</p>
                            </div>
                        ) : (
                             generatedImage ? (
                                <div className="bg-black border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl relative group">
                                     <img src={generatedImage} alt="Divine Visualization" className="w-full h-auto max-h-[70vh] object-contain" />
                                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
                                        <p className="text-amber-100 font-serif text-center italic">{translations.imageRevealText}</p>
                                     </div>
                                </div>
                             ) : (
                                 <div className="text-white">Failed to generate vision.</div>
                             )
                        )}
                     </div>
                </div>
            )}
        </div>
    );
};
