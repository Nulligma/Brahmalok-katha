import React, { useState, useEffect, useRef } from 'react';
import { River, ChatMessage, Language, TranslationBundle } from '../types';
import { generateStoryResponse, generateDivineIllustration } from '../services/geminiService';
import { Send, Sparkles, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface ChatInterfaceProps {
  river: River;
  language: Language;
  translations: TranslationBundle;
  onBack: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ river, language, translations, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial story load
  useEffect(() => {
    const initStory = async () => {
      setLoading(true);
      const initialResponse = await generateStoryResponse([], river.name, language);
      
      setMessages([
        {
          id: 'init',
          role: 'model',
          text: initialResponse,
          timestamp: Date.now()
        }
      ]);
      setLoading(false);
    };

    initStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [river.name, language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.concat(userMsg).map(m => ({ role: m.role, text: m.text }));
    const response = await generateStoryResponse(history, river.name, language);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response,
      timestamp: Date.now()
    }]);
    setLoading(false);
  };

  const handleGenerateImage = async (contextText: string) => {
    if (generatingImage) return;
    setGeneratingImage(true);
    
    // Create a placeholder message for the image
    const imgMsgId = Date.now().toString();
    setMessages(prev => [...prev, {
      id: imgMsgId,
      role: 'model',
      text: translations.imageLoadingText,
      isImageLoading: true,
      timestamp: Date.now()
    }]);

    // Extract a prompt from the text or use the river default if context is too short
    const promptToUse = contextText.length > 50 ? contextText.substring(0, 300) : river.imagePrompt;
    const base64Image = await generateDivineIllustration(promptToUse);

    setMessages(prev => prev.map(msg => {
        if (msg.id === imgMsgId) {
            return {
                ...msg,
                text: translations.imageRevealText,
                imageUrl: base64Image || undefined,
                isImageLoading: false
            };
        }
        return msg;
    }));
    setGeneratingImage(false);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto glass-panel rounded-2xl overflow-hidden border-amber-500/20">
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
        <button onClick={onBack} className="flex items-center text-amber-200 hover:text-amber-100 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-divine">{translations.backBtn}</span>
        </button>
        <div className="text-center">
          <h2 className="text-xl font-divine text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
            {river.name}
          </h2>
          <p className="text-xs text-slate-400">{river.sanskritName}</p>
        </div>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' 
                ? 'bg-indigo-900/40 border-indigo-500/30 rounded-tr-sm' 
                : 'bg-slate-800/40 border-amber-500/20 rounded-tl-sm'} 
                p-6 rounded-2xl border backdrop-blur-md relative group`}>
              
              {/* Avatar/Icon */}
              <div className={`absolute -top-3 ${msg.role === 'user' ? '-right-3' : '-left-3'} 
                w-8 h-8 rounded-full flex items-center justify-center border border-white/20
                ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-amber-600'}`}>
                  {msg.role === 'user' ? (
                    <span className="text-[10px] font-bold">{translations.you}</span>
                  ) : (
                    <Sparkles className="w-4 h-4 text-yellow-200" />
                  )}
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-amber max-w-none font-light leading-relaxed text-lg">
                {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                ))}
              </div>

              {/* Image Generation Result */}
              {msg.isImageLoading && (
                  <div className="mt-4 flex flex-col items-center justify-center h-64 bg-black/20 rounded-lg animate-pulse border border-white/5">
                      <Sparkles className="w-8 h-8 text-amber-400 animate-spin mb-2" />
                      <p className="text-sm text-amber-200 font-divine">{translations.imageLoadingText}</p>
                  </div>
              )}
              
              {msg.imageUrl && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      <img src={msg.imageUrl} alt="Divine Vision" className="w-full h-auto object-cover" />
                  </div>
              )}

              {/* Action Buttons for Model Messages */}
              {msg.role === 'model' && !msg.imageUrl && !msg.isImageLoading && (
                  <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => handleGenerateImage(msg.text)}
                        className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-100 px-3 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 hover:bg-amber-800/50"
                        disabled={generatingImage}
                      >
                          <ImageIcon className="w-3 h-3" />
                          {generatingImage ? translations.visualizingBtn : translations.visualizeBtn}
                      </button>
                  </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
           <div className="flex justify-start">
             <div className="bg-slate-800/40 border border-amber-500/20 p-4 rounded-2xl rounded-tl-sm backdrop-blur-md flex items-center gap-3">
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-amber-200/70 font-divine">{translations.loadingText}</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={translations.inputPlaceholder}
            className="w-full bg-slate-800/50 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
            disabled={loading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-2 p-2 bg-amber-600 rounded-full text-white hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
