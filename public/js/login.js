document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username === 'admin' && password === 'password') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Wrong username and password');
    }
  });
  