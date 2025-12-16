// Set the backend API URL
const API_URL = 'https://pawsomecareapp-production.up.railway.app/api/auth';

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const messageContainer = document.getElementById('message-container');

const lsubmit=document.querySelector(".lsubmit")
const rsubmit=document.querySelector(".rsubmit")




// --- Register Form Event Listener ---
rsubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const email=document.getElementById('register-email').value;
  
  if(username && password && !email)
  {
    showMessage('enter email.....','error')
    throw new Error(`enter email`);
    
  }
  showMessage('Registering...');

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
      body: JSON.stringify({ username,email, password })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage(`Success: ${data.msg}`, 'success');
      registerForm.reset();
    } else {
      throw new Error(data.msg || 'Registration failed');
    }
  } catch (err) {
    showMessage(`Error: ${err.message}`, 'error');
  }
});







// --- Login Form Event Listener ---
lsubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
//   const email=document.querySelector(".login-email").value
  showMessage('Logging in...');

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
      body: JSON.stringify({ username,password })
    });

    const data = await res.json();

    if (res.ok) {
      showMessage('Login successful! Redirecting...', 'success');

      // ⭐ Redirect
      setTimeout(() => {
        window.location.href = "dog_cat.html"; // <-- change page name
      }, 1000);

    } else {
      throw new Error(data.msg || 'Login failed');
    }
  } catch (err) {
    showMessage(`Error: ${err.message}`, 'error');
  }
});

// --- Helper function ---
function showMessage(message, type = 'info') {
  messageContainer.textContent = message;
  messageContainer.style.backgroundColor = 
    type === 'error' ? '#f8d7da' : (type === 'success' ? '#d4edda' : '#e2e3e5');
  messageContainer.style.color = 
    type === 'error' ? '#721c24' : (type === 'success' ? '#155724' : '#383d41');
}
 