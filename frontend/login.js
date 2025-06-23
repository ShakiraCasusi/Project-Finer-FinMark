document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const [email, password] = [...e.target.elements].map(el => el.value);
  const errorDiv = document.getElementById('login-error');
  errorDiv.textContent = '';
  showLoading(true);
  loginBtn.disabled = true;
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    showLoading(false);
    loginBtn.disabled = false;
    if (data.success) {
      window.location.href = "dashboard.html";
    } else {
      errorDiv.textContent = data.message || 'Login failed!';
    }
  } catch {
    showLoading(false);
    loginBtn.disabled = false;
    errorDiv.textContent = 'Server error. Please try again.';
  }
});

function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}

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

// REGISTRATION FORM SUBMIT with error display
document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const [email, password, confirm] = [...e.target.elements].map(el => el.value);
  const errorDiv = document.getElementById('register-error');
  errorDiv.textContent = '';
  if (password !== confirm) {
    errorDiv.textContent = 'Passwords do not match!';
    return;
  }
  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      alert(data.message || 'Registered!');
      document.getElementById('register-modal').style.display = 'none';
      e.target.reset();
    } else {
      errorDiv.textContent = data.message || 'Registration failed!';
    }
  } catch {
    errorDiv.textContent = 'Server error. Please try again.';
  }
});

// --- LOGIN BUTTON SHOW ONLY IF FIELDS ARE FILLED ---
const loginForm = document.getElementById('login-form');
const loginBtn = loginForm.querySelector('.login');
loginForm.addEventListener('input', () => {
  const filled = Array.from(loginForm.elements)
    .filter(el => el.type === 'email' || el.type === 'password')
    .every(el => el.value.trim() !== '');
  if (filled) {
    loginBtn.style.display = '';
  } else {
    loginBtn.style.display = 'none';
  }
});
loginBtn.style.display = 'none'; // Hide by default

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

// backend/server.js
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    return res.json({ success: true, message: 'Login successful!' });
  }
  res.status(400).json({ success: false, message: 'Invalid credentials' });
});
