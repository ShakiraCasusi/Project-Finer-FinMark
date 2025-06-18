document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = '';

  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.textContent = `Token: ${data.token}`;
      resultDiv.classList.remove('error');
    } else {
      resultDiv.textContent = `${data.error}`;
      resultDiv.classList.add('error');
    }
  } catch (err) {
    resultDiv.textContent = 'Network error';
    resultDiv.classList.add('error');
  }
});
