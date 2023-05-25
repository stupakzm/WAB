// Get the Sign out button element
const signOutButton = document.getElementById('sign-out-button');

// Add an event listener to the Sign out button
signOutButton.addEventListener('click', () => {
  // Clear the stored data in localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('email');
  localStorage.removeItem('password');

  // Clear the variables
  nameSave = null;
  emailSave = null;
  passwordSave = null;

  // Show the login form again
  document.querySelector('.order').style.display = 'block';
  document.querySelector('#profile').style.display = 'none';
  document.getElementById('login-link').textContent = 'Login';
  document.getElementById('login-link').href = '#login';
});

// Function to check if the user is logged in
function isLoggedIn() {
  if (nameSave && emailSave && passwordSave) {
    return true;
  } else {
    return false;
  }
}
