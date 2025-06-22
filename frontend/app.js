document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const [email, password] = [...e.target.elements].map(el => el.value);

  const res = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message || 'Logged in!');
});
