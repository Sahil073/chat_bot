document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const newChatBtn = document.querySelector('.new-chat-btn');
  const historyItems = document.querySelectorAll('.history-item');

  // ✅ Correct API endpoint
  const BACKEND_URL = 'https://backend-chatbot-83ij.onrender.com/api/chat';

  // ✅ Adds a message (user or bot)
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

  // ✅ Send message to backend
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
      if (data.reply) {
        addMessage(data.reply, false);
      } else {
        addMessage("⚠️ No reply received. Please try again later.", false);
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage("❌ Arre bhai! Connection issue ho gaya. Phir try karo...", false);
    }
  }

  // ✅ Start a new chat
  newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    addMessage("🎖️ Jai Hind! My name is Sahil Chaudhary, Let's improve life and make SSB a cakewalk.", false);
    historyItems.forEach(item => item.classList.remove('active'));
  });

  // ✅ Chat history buttons
  historyItems.forEach(item => {
    item.addEventListener('click', () => {
      historyItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      chatMessages.innerHTML = '';
      addMessage(`📚 Selected: ${item.querySelector('span').textContent}`, false);
    });
  });

  // ✅ Initial message
  addMessage("🎖️ Jai Hind! My name is Sahil Chaudhary, Let's improve life and make SSB a cakewalk.", false);

  // ✅ Send on button click or Enter key
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
