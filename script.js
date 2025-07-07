document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const newChatBtn = document.querySelector('.new-chat-btn');
  const historyItems = document.querySelectorAll('.history-item');

  // Your Render/Heroku backend URL
  const BACKEND_URL = 'https://backend-chatbot-83ij.onrender.com';

  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');

    if (isUser) {
      contentDiv.innerHTML = `<p>${text}</p>`;
    } else {
      contentDiv.innerHTML = `
        <div class="message-header">
          <div class="avatar">
            <img src="./images/Logo.jpg" alt="img" height="40" style="border-radius: 50%;">
          </div>
          <span>Half Civilian</span>
        </div>
        <p>${text}</p>
      `;
    }

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      addMessage(data.reply, false);
    } catch (error) {
      console.error('Error:', error);
      addMessage("Arre bhai! Connection issue ho gaya. Phir try karo...", false);
    }
  }

  // New Chat button functionality
  newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    addMessage("Jai Hind! My name is Sahil Chaudhary, Let's improve life, and make ssb cake walk.", false);
    historyItems.forEach(item => item.classList.remove('active'));
  });

  // Chat history items
  historyItems.forEach(item => {
    item.addEventListener('click', () => {
      historyItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      chatMessages.innerHTML = '';
      addMessage("Selected: " + item.querySelector('span').textContent, false);
    });
  });

  // Initial welcome message
  addMessage("Jai Hind! My name is Sahil Chaudhary, Let's improve life, and make ssb cake walk.", false);

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});