
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { getBrahmaInstruction, getQuestionInstruction, LANGUAGES } from "../constants";
import { Language, StorySegment } from "../types";

// --- START DEV ONLY: USAGE TRACKING ---
export interface UsageRecord {
    timestamp: number;
    model: string;
    type: 'Text' | 'Audio' | 'Image';
    inputTokens: number;
    outputTokens: number;
}

let usageHistory: UsageRecord[] = [];

export const clearUsageHistory = () => {
    usageHistory = [];
};

export const getUsageHistory = () => {
    return [...usageHistory];
};

const logUsage = (model: string, type: 'Text' | 'Audio' | 'Image', response: any) => {
    const meta = response.usageMetadata;
    if (meta) {
        usageHistory.push({
            timestamp: Date.now(),
            model,
            type,
            inputTokens: meta.promptTokenCount || 0,
            outputTokens: meta.candidatesTokenCount || 0
        });
    } else if (type === 'Image') {
        // Fallback for image if no metadata, assume fixed cost tracking logic elsewhere relies on count
        usageHistory.push({
            timestamp: Date.now(),
            model,
            type,
            inputTokens: 0,
            outputTokens: 0
        });
    }
};
// --- END DEV ONLY ---

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is missing");
        throw new Error("API Key is missing from environment variables");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateStoryScript = async (
    riverName: string,
    language: Language,
    topic?: string
): Promise<StorySegment[]> => {
    const ai = getClient();
    const langConfig = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
    const systemInstruction = getBrahmaInstruction(language, langConfig.name);

    try {
        const model = "gemini-2.5-flash";
        let prompt = `Tell the divine legend of the holy river ${riverName}.`;
        
        if (topic) {
            prompt = `The devotee asks: "${topic}" regarding the river ${riverName}. Create a dialogue between Brahma and Sarasvati explaining this topic in detail, weaving in mythology, facts, or descriptions as appropriate.`;
        }

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            speaker: { type: Type.STRING, enum: ["Brahma", "Sarasvati"] },
                            text: { type: Type.STRING },
                            visualDescription: { type: Type.STRING }
                        },
                        required: ["speaker", "text", "visualDescription"]
                    }
                }
            }
        });

        logUsage(model, 'Text', response);

        if (response.text) {
            return JSON.parse(response.text) as StorySegment[];
        }
        return [];
    } catch (error) {
        console.error("Error generating story script:", error);
        return [{ speaker: "Brahma", text: "The connection to Brahmalok is faint. Please try again.", visualDescription: "Dark cosmos" }];
    }
};

export const generateStoryResponse = async (
    history: { role: 'user' | 'model'; text: string }[],
    riverName: string,
    language: Language
): Promise<string> => {
    const ai = getClient();
    const langConfig = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
    
    const systemInstruction = `You are Lord Brahma. You are conversing with a devotee about the river ${riverName}.
Speak in ${langConfig.name}. Keep your tone divine, ancient, and wise.
Answer questions about the river's mythology, geography, or spiritual significance.
If this is the start of the conversation, welcome the devotee to the banks of ${riverName}.`;

    try {
        const model = "gemini-2.5-flash";
        const chat = ai.chats.create({
            model,
            config: {
                systemInstruction,
                temperature: 0.7
            },
            history: history.slice(0, -1).map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            }))
        });

        const lastMessage = history.length > 0 ? history[history.length - 1].text : "Pranam, Lord Brahma.";
        const response = await chat.sendMessage({ message: lastMessage });
        
        logUsage(model, 'Text', response);
        
        return response.text;
    } catch (error) {
        console.error("Chat generation error", error);
        return "The cosmic currents are turbulent. I cannot speak at this moment.";
    }
};

export const generateAnswer = async (
    question: string,
    context: string,
    language: Language
): Promise<string> => {
    const ai = getClient();
    const langConfig = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
    const systemInstruction = getQuestionInstruction(language, langConfig.name);

    try {
        const model = "gemini-2.5-flash";
        const response = await ai.models.generateContent({
            model,
            contents: `Context: ${context}\n\nUser Question: ${question}`,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });

        logUsage(model, 'Text', response);

        return response.text || "Silence echoes in the void.";
    } catch (e) {
        return "I cannot hear you clearly amidst the cosmic roar.";
    }
};

export const generateDivineIllustration = async (prompt: string): Promise<string | null> => {
    const ai = getClient();
    const model = 'gemini-2.5-flash-image';
    try {
        const response = await ai.models.generateContent({
            model,
            contents: {
                parts: [
                    { text: `A divine, mystical, high-quality oil painting style illustration of: ${prompt}. Indian mythology art style, glowing, ethereal, detailed, masterpiece.` }
                ]
            }
        });

        logUsage(model, 'Image', response);

        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};

export const generateSpeech = async (text: string, speaker: 'Brahma' | 'Sarasvati'): Promise<string | null> => {
    const ai = getClient();
    const voiceName = speaker === 'Brahma' ? 'Charon' : 'Aoede';
    const model = "gemini-2.5-flash-preview-tts";

    try {
        const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName }
                    },
                },
            },
        });

        logUsage(model, 'Audio', response);

        // Extract base64 audio data
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        return base64Audio || null;
    } catch (error) {
        console.error("Error generating speech:", error);
        return null;
    }
};
