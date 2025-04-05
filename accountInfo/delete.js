/*
  <script>
    // Load username from localStorage when the page loads
    window.onload = function() {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        document.getElementById('current-username').value = storedUsername;
      } else {
        document.getElementById('current-username').value = "User123"; // Default if no username is stored
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
        alert("Password changed successfully!");
      } else {
        alert("Password confirmation does not match or password is empty.");
      }
    }

    function uploadProfilePicture() {
      const profilePicInput = document.getElementById('new-profile-picture');
      if (profilePicInput.files && profilePicInput.files[0]) {
        alert("Profile picture uploaded successfully!");
      }
    }

    function cancelChanges() {
      alert("Changes canceled.");
    }

    function saveChanges() {
      alert("All changes saved successfully!");
    }
  </script>
*/