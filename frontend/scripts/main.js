let role = null;

export function setRole(r) {
  role = r;

  // 🔐 Hide/show Add button based on role
  const addBtn = document.getElementById('addBtn');
  if (addBtn) {
    addBtn.style.display = r === 'owner' ? 'inline-block' : 'none';
  }
}

export function getRole() {
  return role;
}

import { loadPage } from './routes.js';

export function loadRoute(route) {
  // Restrict Add Sweet page to only 'owner'
  if (route === 'add' && role !== 'owner') {
    alert('❌ Access Denied: Only owners can add sweets.');
    return;
  }

  // For other routes, allow
  loadPage(route);
}


// Hide Add button on initial load
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addBtn');
  if (addBtn) addBtn.style.display = 'none';
});


window.loadRoute = loadRoute;

// Initial route
loadRoute('login');
