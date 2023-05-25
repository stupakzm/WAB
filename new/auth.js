const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');

passwordInput.addEventListener('input', function() {
  const password = passwordInput.value;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\';:/?.,><~-]).{8,}$/;

  if (passwordPattern.test(password)) {
    passwordInput.setCustomValidity('');
    passwordError.textContent = '';
  } else {
    passwordInput.setCustomValidity('Invalid password');
    passwordError.textContent = 'Must contain lowercase & uppercase letters, one digit, & one symbol';
  }
});

passwordInput.addEventListener('invalid', function() {
  passwordError.textContent = passwordInput.validationMessage;
});

// Check if the user is already logged in on page load


var nameSave;
var emailSave;
var passwordSave;



window.addEventListener('DOMContentLoaded', () => {
  const storedUser = localStorage.getItem('user');
  const storedEmail = localStorage.getItem('email');

  if (storedUser && storedEmail) {
    // User is logged in
    nameSave = storedUser;
    emailSave = storedEmail;
    passwordSave = localStorage.getItem('password');

    showProfilePage();
  }
});

// Get the form element
const form = document.querySelector('form');

async function saveTask(name, email) {
  const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
  });

  if (response.ok) {
      console.log('Task saved successfully');
  } else {
      console.error('Error saving task:', response.statusText);
  }
}

// Add an event listener to the form's submit event
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form fields
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Check if the values are not empty
  if (name && email && password) {
    // Store the values in localStorage
    localStorage.setItem('user', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    nameSave = name;
    emailSave = email;
    passwordSave = password;

    showProfilePage();
    saveTask(name, email);
  }
});

// Function to show the profile page
function showProfilePage() {
  // Hide the form and show the profile section
  document.querySelector('.order').style.display = 'none';
  document.querySelector('#profile').style.display = 'block';
  document.getElementById('login-link').textContent = 'Profile';
  document.getElementById('login-link').href = '#profile';

  // Display the user's name and email on the profile page
  document.getElementById('profile-name').textContent = nameSave;
  document.getElementById('profile-email').textContent = emailSave;
}

