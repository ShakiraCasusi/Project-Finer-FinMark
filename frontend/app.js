document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const [email, password] = [...e.target.elements].map(el => el.value);

  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message || 'Logged in!');
});

// Show/hide registration modal
document.getElementById('show-register').onclick = function(e) {
  e.preventDefault();
  document.getElementById('register-modal').style.display = 'flex';
};
document.getElementById('close-register').onclick = function() {
  document.getElementById('register-modal').style.display = 'none';
};
// Hide modal when clicking outside content
window.onclick = function(event) {
  const modal = document.getElementById('register-modal');
  if (event.target === modal) modal.style.display = 'none';
};

// REGISTRATION FORM SUBMIT
document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const [email, password, confirm] = [...e.target.elements].map(el => el.value);
  if (password !== confirm) {
    alert('Passwords do not match!');
    return;
  }
  const res = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  alert(data.message || 'Registered!');
  if (data.success) {
    document.getElementById('register-modal').style.display = 'none';
  }
});

// --- LOGIN BUTTON ENABLE ONLY IF FIELDS ARE FILLED ---
const loginForm = document.getElementById('login-form');
const loginBtn = loginForm.querySelector('.login');
loginForm.addEventListener('input', () => {
  const filled = Array.from(loginForm.elements)
    .filter(el => el.type === 'email' || el.type === 'password')
    .every(el => el.value.trim() !== '');
  if (filled) {
    loginBtn.style.display = '';
    loginBtn.disabled = false;
  } else {
    loginBtn.style.display = 'none';
    loginBtn.disabled = true;
  }
});
// Initialize login button as hidden/disabled
loginBtn.style.display = 'none';
loginBtn.disabled = true;

// --- SIGN UP BUTTON ENABLE ONLY IF FIELDS ARE FILLED ---
const regForm = document.getElementById('register-form');
const regBtn = regForm.querySelector('.fb-btn');
regForm.addEventListener('input', () => {
  const filled = Array.from(regForm.elements)
    .filter(el => el.type === 'email' || el.type === 'password')
    .every(el => el.value.trim() !== '');
  if (filled) {
    regBtn.classList.add('active');
    regBtn.disabled = false;
  } else {
    regBtn.classList.remove('active');
    regBtn.disabled = true;
  }
});
regBtn.disabled = true;
