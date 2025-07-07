// Optional: You can show a static welcome message or guidance below the avatar
const speakStatus = document.createElement('div');
speakStatus.id = "speak-status";
speakStatus.style.marginTop = "20px";
speakStatus.style.color = "#10a37f";
speakStatus.style.fontSize = "18px";
speakStatus.innerText = "👋 Welcome, future officer! Scroll to explore SSB stages and guidance.";
document.body.appendChild(speakStatus);

// Optional: Light pulse on avatar to make it lively
const avatarPulse = document.querySelector('.avatar');
avatarPulse.style.transition = "box-shadow 0.3s ease-in-out";
avatarPulse.style.boxShadow = "0 0 15px #10a37f";
