// main.js – handles login + role-based redirect

// Submit login form
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      const token = data.token;
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      // Route by role
      if (role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else if (role === 'client') {
        window.location.href = 'client-dashboard.html';
      } else {
        alert('Unknown role. Access denied.');
