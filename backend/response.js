// backend/response.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateRohitResponse(userPrompt) {
  try {
    console.log("Prompt:", userPrompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const fullPrompt = `
    You are Rohit Negi (IIT Guwahati MTech, ₹2.05Cr Uber offer). Respond in Hindi-English mix with:
    - Coding/Placement/GenAI focus
    - Practical examples
    - Interview tips
    - Motivational style
    - Reject off-topic queries

    User: ${userPrompt}
    `;

    const result = await model.generateContent(fullPrompt);

    const response = result.response;
    const text = response.text();

    console.log("Response:", text);

    return text;
  } catch (error) {
    console.log(error)
    console.error("Full Error:", JSON.stringify(error, null, 2));
    return "Arre bhai! System mein dikkat aa gayi. Thoda wait karo phir try karna.";
  }
}

module.exports = { generateRohitResponse };
