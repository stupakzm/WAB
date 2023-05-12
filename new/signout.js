// assuming the user's name is stored in a variable called `userName`
document.cookie = `userName=${userName}`;

//const userName = getCookie('userName');

var userName;
if (localStorage.getItem('user')) {
  var user = JSON.parse(localStorage.getItem('user'));
  userName = user.name;
} else {
  userName = 'Guest';
}


if (userName) {
  const userNameLink = document.getElementById('profile-name');//was userNameLink
  userNameLink.innerText = userName;
  userNameLink.href = '#'; // add a link so it's clickable
  //const signOutBtn = document.getElementById('signOutBtn');
  //signOutBtn.style.display = 'block'; // show the sign out button
}

const signOutBtn = document.getElementById('signOutBtn');
if(signOutBtn != null){
signOutBtn.addEventListener('click', () => {
  //document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.reload(); // reload the page to clear the header
});
}
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
  