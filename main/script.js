// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase config object (copy from the Firebase console)
const firebaseConfig = {

  apiKey: "AIzaSyBxPRpFQ5YRdE-bug7pedUYbZjPlELX72E",

  authDomain: "hackathon-bad4e.firebaseapp.com",

  projectId: "hackathon-bad4e",

  storageBucket: "hackathon-bad4e.firebasestorage.app",

  messagingSenderId: "776253336136",

  appId: "1:776253336136:web:24f81bb6b357aa7a90067d"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Example: Writing data to Firebase Realtime Database
const userId = "user123"; // You can dynamically get user IDs
set(ref(database, 'users/' + userId), {
    username: "exampleUser",
    email: "user@example.com"
}).then(() => {
    console.log("Data written to Firebase!");
}).catch((error) => {
    console.error("Error writing to Firebase:", error);
});
// ==================================================================
// ==================================================================

// Arrays to store posts, events, and discussions
let posts = [];
let events = [];
let discussions = [];

// Function to add a post
function addPost() {
    const postText = document.getElementById("new-post").value;
    if (postText.trim() !== "") {
        posts.push(postText);
        document.getElementById("new-post").value = "";
        displayPosts();
    }
}

// Function to display posts
function displayPosts() {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
    posts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.textContent = post;
        postList.appendChild(postDiv);
    });
}

// Function to add an event
function addEvent() {
    const eventName = document.getElementById("event-name").value;
    const eventDate = document.getElementById("event-date").value;
    if (eventName.trim() !== "" && eventDate) {
        events.push({ name: eventName, date: eventDate });
        document.getElementById("event-name").value = "";
        document.getElementById("event-date").value = "";
        displayEvents();
    }
}

// Function to display events
function displayEvents() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";
    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.className = "event";
        eventDiv.innerHTML = `<strong>${event.name}</strong><br><em>${event.date}</em>`;
        eventList.appendChild(eventDiv);
    });
}

// Function to add a discussion
function addDiscussion() {
    const discussionText = document.getElementById("new-discussion").value;
    if (discussionText.trim() !== "") {
        discussions.push({ text: discussionText, likes: 0, comments: [] });
        document.getElementById("new-discussion").value = "";
        displayDiscussions();
    }
}

// Function to display discussions
function displayDiscussions() {
    const discussionList = document.getElementById("discussion-list");
    discussionList.innerHTML = "";
    discussions.forEach((discussion, index) => {
        const discussionDiv = document.createElement("div");
        discussionDiv.className = "discussion";
        discussionDiv.innerHTML = `
            <p>${discussion.text}</p>
            <button class="like-button" onclick="toggleLike(${index})">Like (${discussion.likes})</button>
            <span class="toggle-comments" onclick="toggleComments(${index})">Toggle Comments</span>
            <div class="comment-section" id="comment-section-${index}">
                <div class="comments" id="comments-${index}">
                    <!-- Comments will appear here -->
                </div>
                <div class="comment-form">
                    <textarea id="comment-input-${index}" placeholder="Add a comment..."></textarea>
                    <button onclick="addComment(${index})">Comment</button>
                </div>
            </div>
        `;
        discussionList.appendChild(discussionDiv);
    });
}

// Function to toggle the like button
function toggleLike(index) {
    discussions[index].likes++;
    displayDiscussions();
}

// Function to toggle the comment section visibility
function toggleComments(index) {
    const commentSection = document.getElementById(`comment-section-${index}`);
    commentSection.style.display = commentSection.style.display === "none" || commentSection.style.display === "" ? "block" : "none";
}

// Function to add a comment to a discussion
function addComment(index) {
    const commentInput = document.getElementById(`comment-input-${index}`).value;
    if (commentInput.trim() !== "") {
        discussions[index].comments.push(commentInput);
        document.getElementById(`comment-input-${index}`).value = "";
        displayDiscussions();
    }
}

// Function to display comments for a specific discussion
function displayComments(index) {
    const commentsList = document.getElementById(`comments-${index}`);
    commentsList.innerHTML = "";
    discussions[index].comments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.textContent = comment;
        commentsList.appendChild(commentDiv);
    });
}

// Initial rendering of content
displayPosts();
displayEvents();
displayDiscussions();


// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if dark mode is enabled in localStorage and apply it
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    // Toggle dark mode on icon click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Store dark mode preference in localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.removeItem('darkMode');
        }
    });
});
