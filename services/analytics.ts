
export const GA_MEASUREMENT_ID = 'G-BP9S9G6BRB';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Helper to safely call gtag
const safeGtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  safeGtag('event', eventName, params);
};

export const Analytics = {
  logLanguageChange: (lang: string) => 
    trackEvent('language_change', { language: lang }),
    
  logBeginJourney: () => 
    trackEvent('begin_journey'),

  logRiverSelect: (riverId: string, riverName: string) => 
    trackEvent('select_content', { content_type: 'river', item_id: riverId, item_name: riverName }),

  logStoryStart: (riverName: string, topic: string = 'Main Legend') =>
    trackEvent('story_start', { river: riverName, topic }),

  logStoryProgress: (riverName: string, slideIndex: number, totalSlides: number) =>
    trackEvent('story_progress', { river: riverName, slide_index: slideIndex, total_slides: totalSlides }),

  logStoryComplete: (riverName: string, totalSlides: number) => 
    trackEvent('story_complete', { river: riverName, total_slides: totalSlides }),

  logImageGeneration: (riverName: string) =>
    trackEvent('generate_image', { river: riverName }),

  logAudioPlay: (riverName: string, speaker: string) =>
    trackEvent('audio_play', { river: riverName, speaker }),

  logQuestionAsked: (riverName: string, inputType: 'text' | 'voice') =>
    trackEvent('ask_question', { river: riverName, input_type: inputType }),

  logCostEstimate: (riverName: string, totalCost: number) =>
    trackEvent('session_cost_estimate', { river: riverName, value: totalCost, currency: 'USD' })
};
