// Get references to DOM elements
const sendImageBtn = document.getElementById('send-image-btn'); // Button to trigger image upload
const sendBtn = document.getElementById('send-btn'); // Button to send text messages
const messageInput = document.getElementById('message-input'); // Input for text messages
const imageInput = document.getElementById('image-input'); // Hidden file input for image selection
const chatBox = document.getElementById('chat-box'); // Chat box where messages are displayed

// Event listener for "Send Image" button
sendImageBtn.addEventListener('click', function () {
    imageInput.click(); // Trigger the hidden file input when the "Send Image" button is clicked
});

// Event listener for file selection (image upload)
imageInput.addEventListener('change', function () {
    const file = imageInput.files[0]; // Get the selected image file
    if (file) {
        const reader = new FileReader();  // Create FileReader to read the file

        reader.onload = function (event) {
            // When the file is successfully read, display it
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'sent');
            
            const imageElement = document.createElement('img');  // Create an img element
            imageElement.src = event.target.result;  // Set the image source to base64 string
            imageElement.style.maxWidth = '100%';  // Ensure the image fits within the chat
            messageDiv.appendChild(imageElement);

            chatBox.appendChild(messageDiv); // Add the message (with image) to the chat
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the new message
        };

        reader.readAsDataURL(file);  // Read the file as a base64 string
    }
});

// Event listener for text message "Send" button
sendBtn.addEventListener('click', function () {
    const messageText = messageInput.value.trim(); // Get the message text
    if (messageText) {
        // Create a new message div
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        
        // Add the text message inside the message div
        messageDiv.textContent = messageText;
        chatBox.appendChild(messageDiv); // Add the message to the chat
        
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the new message
        messageInput.value = ''; // Clear the input field after sending the message
    }
});

// Optional: Handle the "Enter" key for sending text messages
messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendBtn.click(); // Trigger the send button click when "Enter" is pressed
    }
});