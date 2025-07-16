import { initAddSweet } from './add.js';
import { initViewSweets } from './view.js';

export async function loadRoute(route) {
  const res = await fetch(`pages/${route}.html`);
  const html = await res.text();
  const container = document.getElementById('content');
  container.innerHTML = html;

  // Dynamically update style
  const styleLink = document.getElementById('page-style');
  styleLink.setAttribute('href', `style/${route}.css`);

  if (route === 'add') initAddSweet();
  if (route === 'view') initViewSweets();
}
