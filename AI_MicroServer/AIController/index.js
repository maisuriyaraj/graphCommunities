import  { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GIMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function createAIPrompt(prompt){
    try {
        
    const result = await model.generateContent(prompt);
    console.log(result?.response?.candidates[0]?.content?.parts[0]?.text)
    return result?.response?.candidates[0]?.content?.parts[0]?.text;  
    } catch (error) {
        console.log("AI Response Error ", error);
    }

}