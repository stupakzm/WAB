 
 const passwordInput = document.querySelector('#password');

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



var nameSave;
var emailSave;
var passwordSave;


// Get the form element
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the form fields
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Check if the values are not empty
  if (name && email && password) {
    // Store the values in localStorage
    nameSave = name;
    emailSave = email;
    passwordSave = password;

    localStorage.setItem('user', name);
    localStorage.setItem('email', email);


    document.querySelector('.order').style.display = 'none';
    document.querySelector('#profile').style.display = 'block';
    document.getElementById('login-link').textContent = 'Profile';
    document.getElementById('login-link').href = '#profile';

    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-email').textContent = email;
    saveTaskAuth();
    
    // Send the data to the server using a fetch request
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response;
    })
      .then(response => response.json())
      .then(user => {
        console.log('user - ' + user);
      })
      .catch(error => {
    console.error('Fetch error:', error);
  });
  }
});


  

//checking func
function isLoggedIn() {
    
    if (nameSave && emailSave && passwordSave) {
        return true;
    } else {
        return false;
    }
}
  

