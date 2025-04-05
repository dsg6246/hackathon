// DOM elements
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const userNameDisplay = document.getElementById('user-name');

// To store JWT token
let token = '';

// Login button click event
loginBtn.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem('token', token); // Save token in localStorage
    loadChat();
  }
});

// Register button click event
registerBtn.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  alert(data.message);
});

// Load chat messages
async function loadChat() {
  loginContainer.style.display = 'none';
  chatContainer.style.display = 'block';

  const response = await fetch('http://localhost:5000/messages');
  const messages = await response.json();

  chatBox.innerHTML = ''; // Clear chat box before adding new messages
  messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${message.username}: ${message.content}`;
    chatBox.appendChild(messageDiv);
  });
}

// Send message event
sendBtn.addEventListener('click', async () => {
  const content = messageInput.value;
  const username = localStorage.getItem('username'); // Store username in localStorage

  const response = await fetch('http://localhost:5000/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ username, content })
  });

  if (response.ok) {
    loadChat(); // Reload messages after sending
  }
});
