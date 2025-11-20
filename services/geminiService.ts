import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client
// NOTE: In a real deployment, ensure process.env.API_KEY is set. 
// If it's missing, we will gracefully degrade to a basic string check in the component.
const apiKey = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const checkProphecyMeaning = async (userAnswer: string): Promise<boolean> => {
  if (!ai) {
    // Fallback if no API key is present
    console.warn("Gemini API Key missing, using fallback validation.");
    const lower = userAnswer.toLowerCase();
    return lower.includes("homework") || lower.includes("study") || lower.includes("work");
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      The user is playing a game where they need to translate a secret code 'lihela yewerik sheni taba3eni'.
      The correct meaning implies 'I have a lot of homework', 'I need to study', or 'Academic pressure'.
      
      User's Answer: "${userAnswer}"
      
      Determine if the user's answer is semantically similar to the correct meaning. 
      Respond with JSON.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
          },
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    return result.isCorrect === true;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback on error
    const lower = userAnswer.toLowerCase();
    return lower.includes("homework") || lower.includes("study");
  }
};
