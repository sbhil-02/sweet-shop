import { setRole } from './main.js';

export function initLogin() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const pwd = document.getElementById('password').value;
    const user=document.getElementById('username').value;
    
    if ( user==='user' && pwd === 'user123') {
      setRole('user');
      window.loadRoute('view');
    } else if (user==='owner' && pwd === 'owner123') {
      setRole('owner');
      window.loadRoute('view');
    } else {
      alert('❌ Invalid password');
    }
  });
}
