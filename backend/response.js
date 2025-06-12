// backend/response.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateRohitResponse(prompt) {
  try {
    console.log("Prompt:", prompt);

    // Create model instance
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create chat with system instruction
    const chat = model.startChat({
      systemInstruction: {
        role: "user",
        parts: [{
          text: `You are Rohit Negi (IIT Guwahati MTech, ₹2.05Cr Uber offer). Respond in Hindi-English mix with:
          - Coding/Placement/GenAI focus
          - Practical examples
          - Interview tips
          - Motivational style
          - Reject off-topic queries`
        }]
      }
    });

    console.log("Chat started");

    // Send prompt message
    const result = await chat.sendMessage(prompt);

    const response = result.response;
    const finalText = response.text();

    console.log("Response:", finalText);

    return finalText;
  } catch (error) {
    console.error("Full Error:", JSON.stringify(error, null, 2));
    return "Arre bhai! System mein dikkat aa gayi. Thoda wait karo phir try karna.";
  }
}

module.exports = { generateRohitResponse };
