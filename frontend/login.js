const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginBtn = loginForm.querySelector('.login');
const togglePassword = document.getElementById('toggle-password');
const loginError = document.getElementById('login-error');

// Enable/disable login button
function checkInputs() {
  loginBtn.disabled = !(emailInput.value.trim() && passwordInput.value.trim());
}
emailInput.addEventListener('input', checkInputs);
passwordInput.addEventListener('input', checkInputs);
checkInputs();

// Toggle password visibility
togglePassword.addEventListener('click', function () {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  this.innerHTML = type === 'password' ? '&#128065;' : '&#128584;';
});

// Real Login Submit (connects to backend)
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.textContent = '';
  loginBtn.disabled = true;
  showLoading(true);

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        password: passwordInput.value.trim()
      })
    });
    const data = await res.json();
    showLoading(false);
    loginBtn.disabled = false;
    if (data.success) {
      window.location.href = "dashboard.html";
    } else {
      loginError.textContent = data.message || "Invalid credentials. Please try again or create an account.";
      loginError.style.color = "red";
    }
  } catch (err) {
    showLoading(false);
    loginBtn.disabled = false;
    loginError.textContent = "Server error. Please try again.";
    loginError.style.color = "red";
  }
});

// Modal Logic
const openRegister = document.getElementById('open-register');
const registerModal = document.getElementById('register-modal');
const closeRegister = document.getElementById('close-register');

openRegister.addEventListener('click', () => registerModal.style.display = 'flex');
closeRegister.addEventListener('click', () => registerModal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === registerModal) registerModal.style.display = 'none';
});

// Registration
const registerForm = document.getElementById('register-form');
const registerBtn = registerForm.querySelector('.fb-btn');
const registerError = document.getElementById('register-error');
const regPassword = registerForm.querySelector('input[placeholder="Password"]');
const regConfirm = registerForm.querySelector('input[placeholder="Confirm Password"]');

function checkRegisterInputs() {
  const allFilled = [...registerForm.elements].every(el => el.value.trim());
  registerBtn.disabled = !allFilled;
}
registerForm.addEventListener('input', checkRegisterInputs);

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  registerError.textContent = '';
  if (regPassword.value !== regConfirm.value) {
    registerError.textContent = 'Passwords do not match!';
    return;
  }
  registerBtn.disabled = true;
  showLoading(true);

  // Collect registration data
  const inputs = registerForm.querySelectorAll('input, select');
  const values = Array.from(inputs).map(el => el.value);
  const [firstName, lastName, email, company, revenue, role, location, employees, password, confirm] = values;

  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName, lastName, email, company, revenue, role, location, employees, password
      })
    });
    const data = await res.json();
    showLoading(false);
    registerBtn.disabled = false;
    if (data.success) {
      registerForm.reset();
      registerModal.style.display = 'none';
      // Show a success message on the login form
      loginError.textContent = "Account created! Please sign in.";
      loginError.style.color = "green";
    } else {
      registerError.textContent = data.message || "Registration failed!";
    }
  } catch (err) {
    showLoading(false);
    registerBtn.disabled = false;
    registerError.textContent = "Server error. Please try again.";
  }
});

function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}