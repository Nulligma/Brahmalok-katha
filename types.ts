
export enum ViewState {
  LANDING = 'LANDING',
  RIVER_SELECTION = 'RIVER_SELECTION',
  STORY_TELLING = 'STORY_TELLING'
}

export type Language = 'en' | 'hi' | 'mr' | 'kn' | 'ta' | 'ml';

export interface TranslationBundle {
  appName: string;
  tagline: string;
  welcome: string;
  beginBtn: string;
  chooseRiverTitle: string;
  chooseRiverSubtitle: string;
  backBtn: string;
  inputPlaceholder: string;
  loadingText: string;
  imageLoadingText: string;
  imageRevealText: string;
  visualizeBtn: string;
  visualizingBtn: string;
  footerText: string;
  you: string;
  listenLegend: string;
  nextBtn: string;
  prevBtn: string;
  askQuestionBtn: string;
  askQuestionTitle: string;
  closeBtn: string;
  submitQuestionBtn: string;
  replayBtn: string;
  suggestionsTitle: string;
  listening: string;
  speakNow: string;
  voiceNotSupported: string;
  voiceNoSpeech: string;
  listenBtn: string;
  stopBtn: string;
  joinWhatsapp: string;
}

export interface River {
  id: string;
  name: string;
  sanskritName: string;
  shortDesc: string;
  color: string; // Tailwind class for accent
  imagePrompt: string;
}

export interface StorySegment {
  speaker: 'Brahma' | 'Sarasvati';
  text: string;
  visualDescription: string; // For image generation prompt
  audioData?: string; // Base64 encoded audio
  audioFailed?: boolean; // Track if audio generation failed
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  isImageLoading?: boolean;
  imageUrl?: string;
}
