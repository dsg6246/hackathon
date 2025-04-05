document.getElementById('account-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const profilePic = document.getElementById('profile-pic').files[0];
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    if (profilePic) {
      formData.append('profile-pic', profilePic);
    }
  
    // Simulate sending the data to the server (replace with actual backend code)
    console.log('Saving changes...');
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Profile Picture:', profilePic ? profilePic.name : 'No file selected');
  
    // Optionally, you can show a success message or handle the response from the server here.
    alert('Changes saved!');
  });
  