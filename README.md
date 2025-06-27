📊 Project Finer FinMark – Milestone 2

**Modernized Financial Platform – Refined Project Prototype (Milestone 2)**  
Compiled on: June 24, 2025

---

🛠 Tools & Technologies

- **Backend:** Node.js, Express, MongoDB, Mongoose, bcrypt  
- **Frontend:** HTML, CSS, JavaScript  
- **Testing:** Jest, Supertest  
- **Dev Tools:** VS Code, Git, Windows Terminal  

---

✅ Features Implemented

🔧 Project Structure
- Organized into `/frontend` and `/backend` directories.
- Follows modular design for maintainability.

🔐 Authentication (Login & Registration)
- **Login form:**  
  - FinMark branding  
  - Email & Password inputs  
  - Show/hide password toggle  
  - Inline validation and feedback  
  - Async loading indicator  
- **Registration form:**  
  - Modal UI with field validation (all fields required, password match)  
  - Buttons only enabled when inputs are filled  
  - Error/success messages shown inline  

🌐 Backend API
- `/api/login`: Authenticates users  
- `/api/register`: Registers new users  
- Passwords securely hashed using `bcrypt`  
- User data persisted in MongoDB  
- CORS enabled for frontend-backend communication  

📋 Dashboard
- `dashboard.html` & `dashboard.css`
- Sidebar navigation with static widgets
- Logout button clears storage and redirects to login
- Current page highlighted in the sidebar

---

🔄 Navigation Flow

- ✅ **Login:** Redirects to `dashboard.html` on success  
- ✅ **Logout:** Clears `localStorage` & `sessionStorage`, redirects to `login.html`  
- ✅ **Registration:** On success, user is prompted to log in  

---

🧑‍💻 Authentication Workflow

🔸 Registration
1. User opens registration modal.
2. All fields required; passwords must match.
3. Sends POST to `/api/register` → password hashed & stored in MongoDB.
4. Displays success or error message.

🔸 Login
1. User enters email and password.
2. Sends POST to `/api/login` → credentials validated.
3. On success → redirected to dashboard.  
   On failure → error shown inline.

🔸 Logout
1. Logout button in sidebar clears session/local storage.
2. Redirects user to login screen.

---

💻 Testing

✅ Manual Testing
- Verified:
  - Login/Registration flow
  - Input validation
  - Redirect behavior
  - MongoDB persistence

✅ Automated Testing
- Used **Jest** and **Supertest**
- Test coverage for registration endpoint:
  - Valid user creation
  - Invalid input handling

---

🧪 Password Toggle Logic
- Improved show/hide toggle:
  - Syncs icon and input type
  - Tooltip updates dynamically
  - Works in both login and registration forms

---

📐 UI/UX Enhancements
- Responsive layout tweaks
- Color-coded feedback messages
- Interactive sidebar for dashboard navigation

---

🪛 Setup Guide (Windows)

1. Install Node.js

https://nodejs.org/en/download
node -v
npm -v

2. Install MongoDB Community Edition
bash
Copy
Edit
https://www.mongodb.com/try/download/community

3. Add MongoDB to PATH
C:\Program Files\MongoDB\Server\8.0\bin

4. Create MongoDB Data Directory
mkdir C:\data\db

5. Start MongoDB Server
mongod

6. Clone the Project
git clone https://github.com/ShakiraCasusi/Project-Finer-FinMark
cd Project-Finer-FinMark

7. Install Backend Dependencies
cd backend
npm install

8. Start Backend Server
node server.js
Should see:
MongoDB connected
Backend running on http://localhost:3000

9. Run Automated Tests (Optional)
npx jest

10. Serve the Frontend
cd frontend
npx live-server
Opens in browser: http://127.0.0.1:8080/register.html

11. Create and Test an Account
Register via the form
Log in using the account
Access the dashboard



📁 Repository Structure
Project-Finer-FinMark/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── ...
│
├── frontend/
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── css/
│   └── js/
│
└── README.md


📌 Notes
Dynamic user info not yet shown on dashboard.
Dashboard currently static.