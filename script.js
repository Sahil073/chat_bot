document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const newChatBtn = document.querySelector('.new-chat-btn');
  const historyItems = document.querySelectorAll('.history-item');

  // ✅ Clean and complete addMessage function
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
            <img src="./images/rohit_negi.png" alt="img" height="40" style="border-radius: 50%;">
          </div>
          <span>Rohit Negi</span>
        </div>
        <p>${text}</p>
      `;
    }

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Handle sending messages
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = '';

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      addMessage(data.reply, false);
    } catch (error) {
      addMessage("Arre bhai! Connection issue ho gaya. Phir try karo...", false);
    }
  }

  // 🔁 "New Thread" button click: clears and resets with avatar
  newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    addMessage("Namaste dosto! Main Rohit Negi. Coding, placements, aur GenAI pe sawal pucho!", false);

    // Remove active class from all history items
    historyItems.forEach(item => item.classList.remove('active'));
  });

  // Handle chat history click
  historyItems.forEach(item => {
    item.addEventListener('click', () => {
      historyItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      chatMessages.innerHTML = '';
      addMessage("Selected: " + item.querySelector('span').textContent, false);
    });
  });

  // 👋 Initial welcome message with image
  addMessage("Namaste dosto! Main Rohit Negi. Coding, placements, aur GenAI pe sawal pucho!", false);

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
