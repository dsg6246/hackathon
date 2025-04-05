const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');
const sendImageBtn = document.getElementById('send-image-btn');
const imageInput = document.getElementById('image-input');

// List of words to censor
const curseWords = ["badword1", "badword2", "curseword1", "curseword2"]; // Add your own curse words here

// Function to censor curse words in the message
function censorMessage(message) {
    let censoredMessage = message;
    curseWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');  // Match the word case-insensitively
        censoredMessage = censoredMessage.replace(regex, '****');
    });
    return censoredMessage;
}

// Function to send a text message
function sendMessage() {
    let messageText = messageInput.value.trim();
    if (messageText !== '') {
        messageText = censorMessage(messageText); // Censor curse words

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.textContent = messageText;
        chatBox.appendChild(messageDiv);
        
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Function to send an image message
function sendImage() {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'sent');
            
            const imageElement = document.createElement('img');
            imageElement.src = event.target.result;
            messageDiv.appendChild(imageElement);
            
            chatBox.appendChild(messageDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        };
        
        reader.readAsDataURL(file);  // Converts image to base64 string
        imageInput.value = '';  // Clear the file input after sending the image
    }
}

// Event listener for the send button (text)
sendBtn.addEventListener('click', sendMessage);

// Event listener for the send button (image)
sendImageBtn.addEventListener('click', sendImage);

// Event listener for Enter key press (text)
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
