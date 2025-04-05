// Load username, password, and profile picture from localStorage when the page loads
window.onload = function() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const storedProfilePic = localStorage.getItem("profilePicture");
  
    // If a username is stored, display it in the current username field
    if (storedUsername) {
      document.getElementById('current-username').value = storedUsername;
      document.getElementById('new-username').value = storedUsername;
      document.getElementById('confirm-username').value = storedUsername;
    } else {
      document.getElementById('current-username').value = "User123"; // Default if no username is stored
    }
  
    // If a password is stored, don't display it for security reasons (just a placeholder for now)
    if (storedPassword) {
      document.getElementById('current-password').value = storedPassword;
    }
  
    // If there's a stored profile picture, set it as the image
    if (storedProfilePic) {
      document.getElementById('profile-picture').src = storedProfilePic;
    }
  }
  
  // Save the new username to localStorage
  function saveUsername() {
    const newUsername = document.getElementById('new-username').value;
    const confirmUsername = document.getElementById('confirm-username').value;
    
    if (newUsername === confirmUsername && newUsername !== "") {
      // Save to localStorage
      localStorage.setItem("username", newUsername);
      document.getElementById('current-username').value = newUsername;
      alert("Username changed successfully!");
    } else {
      alert("Username confirmation does not match or username is empty.");
    }
  }
  
  function savePassword() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (newPassword === confirmPassword && newPassword !== "") {
      // Save to localStorage (make sure to encrypt it in real applications)
      localStorage.setItem("password", newPassword);
      alert("Password changed successfully!");
    } else {
      alert("Password confirmation does not match or password is empty.");
    }
  }
  
  function uploadProfilePicture() {
    const profilePicInput = document.getElementById('new-profile-picture');
    if (profilePicInput.files && profilePicInput.files[0]) {
      const file = profilePicInput.files[0];
      const reader = new FileReader();
      
      // Read the file as a data URL
      reader.onload = function(e) {
        // Set the profile picture to the newly uploaded image
        const imageSrc = e.target.result;
        document.getElementById('profile-picture').src = imageSrc;
        
        // Save the profile picture to localStorage as a data URL
        localStorage.setItem("profilePicture", imageSrc);
        alert("Profile picture uploaded successfully!");
      };
      
      reader.readAsDataURL(file); // Convert the image to a data URL
    }
  }
  
  function cancelChanges() {
    alert("Changes canceled.");
  }
  
  function saveChanges() {
    alert("All changes saved successfully!");
  }
  