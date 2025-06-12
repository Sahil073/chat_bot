const synth = window.speechSynthesis;

// Add visual elements
const speakStatus = document.createElement('div');
speakStatus.id = "speak-status";
speakStatus.style.marginTop = "20px";
speakStatus.style.color = "#10a37f";
speakStatus.style.fontSize = "18px";
document.body.appendChild(speakStatus);

const avatarPulse = document.querySelector('.avatar');
avatarPulse.style.transition = "box-shadow 0.3s ease-in-out";

// Mic button
const micBtn = document.createElement('button');
micBtn.innerText = 'Ask Rohit by Voice';
micBtn.style.marginTop = '40px';
micBtn.style.padding = '14px 24px';
micBtn.style.fontSize = '16px';
micBtn.style.background = '#ffffff';
micBtn.style.color = '#000';
micBtn.style.border = 'none';
micBtn.style.borderRadius = '50px';
micBtn.style.cursor = 'pointer';
micBtn.style.transition = 'background-color 0.3s ease';

micBtn.addEventListener('mouseover', () => micBtn.style.background = '#0d8c6c');
micBtn.addEventListener('mouseout', () => micBtn.style.background = '#10a37f');

document.body.appendChild(micBtn);

micBtn.addEventListener('click', () => {
  if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
    alert("Your browser doesn't support voice recognition.");
    return;
  }

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  speakStatus.innerText = "🎤 Speak now...";
  avatarPulse.style.boxShadow = "0 0 25px #10a37f";

  recognition.start();

  recognition.onresult = async (event) => {
    speakStatus.innerText = "";
    avatarPulse.style.boxShadow = "none";

    const userText = event.results[0][0].transcript;
    console.log("You said:", userText);

    try {
      const res = await fetch("https://backend-chatbot-83ij.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      console.log("Rohit replies:", data.reply);

      speakStatus.innerText = "🗣️ Rohit is speaking...";
      avatarPulse.style.boxShadow = "0 0 25px #ffffff";

      const speak = new SpeechSynthesisUtterance(data.reply);
      speak.lang = 'en-IN';
      speak.rate = 1;

      synth.speak(speak);
      speak.onend = () => {
        speakStatus.innerText = "";
        avatarPulse.style.boxShadow = "none";
      };
    } catch (err) {
      speakStatus.innerText = "❌ Error! Please try again.";
      avatarPulse.style.boxShadow = "none";
      console.error("API Error:", err);
    }
  };

  recognition.onerror = (event) => {
    avatarPulse.style.boxShadow = "none";
    if (event.error === 'no-speech') {
      speakStatus.innerText = "❗ No voice detected. Try again.";
    } else {
      speakStatus.innerText = "❌ Mic error. Please check permissions.";
    }
    console.error("Voice recognition error:", event.error);
  };
});