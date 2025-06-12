document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const newChatBtn = document.querySelector('.new-chat-btn');
  const historyItems = document.querySelectorAll('.history-item');

  // Add message to chat
  function addMessage(text, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    
    if (isUser) {
      contentDiv.innerHTML = `
        <p>${text}</p>
      `;
    } else {
      contentDiv.innerHTML = `
        <div class="message-header">
          <div class="avatar">RN</div>
          <span>Rohit Negi AI</span>
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
      // Replace with your actual API call
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

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    addMessage("Namaste dosto! 👋 Naya session shuru karte hain!", false);
    
    // Remove active class from all history items
    historyItems.forEach(item => item.classList.remove('active'));
  });

  // Handle chat history click
  historyItems.forEach(item => {
    item.addEventListener('click', () => {
      historyItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      // Here you would load the chat history for this item
      chatMessages.innerHTML = '';
      addMessage("Selected: " + item.querySelector('span').textContent, false);
    });
  });
});