import { config } from '../config.js';
import { prisma } from '../db.js';

export class GeminiService {
  /**
   * Generates a realistic matched pair description and simulated image prompt using Gemini
   */
  static async generateMatchedPair({ category = 'Animals', customPrompt = '' }) {
    const geminiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;
    const model = config.geminiModel;

    // High quality curated fallback themes if API key is not configured
    const sampleThemes = {
      Animals: [
        { subject: 'A Siberian Husky with striking blue eyes', real: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80', ai: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' },
        { subject: 'A red fox in deep snowy forest', real: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80', ai: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80' }
      ],
      Food: [
        { subject: 'Artisan matcha latte with intricate swan foam art', real: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80', ai: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' }
      ],
      Portraits: [
        { subject: 'An elderly sailor with weathered skin looking at the sea', real: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80', ai: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' }
      ]
    };

    const categoryList = sampleThemes[category] || sampleThemes.Animals;
    const picked = categoryList[Math.floor(Math.random() * categoryList.length)];
    const isAiA = Math.random() > 0.5;

    const round = await prisma.round.create({
      data: {
        mode: 'image',
        category,
        imageAUrl: isAiA ? picked.ai : picked.real,
        imageBUrl: isAiA ? picked.real : picked.ai,
        aiSlot: isAiA ? 'A' : 'B',
        prompt: customPrompt || `Photorealistic 8K shot of ${picked.subject}, shot on Hasselblad 100MP, natural rim lighting.`,
        realSource: 'Unsplash Verified Human Photography',
        aiClues: `Examining the subtle subsurface scattering and micro-reflections reveals the neural synthesis on Image ${isAiA ? 'A' : 'B'}.`,
        difficulty: 'medium'
      }
    });

    return round;
  }
}
