import { initAddSweet } from './add.js';
import { initViewSweets } from './view.js';
import { initSearchSweet } from './search.js'; 

export async function loadRoute(route) {
  const res = await fetch(`pages/${route}.html`);
  const html = await res.text();
  document.getElementById('content').innerHTML = html;

  document.getElementById('page-style')?.setAttribute('href', `style/${route}.css`);

  if (route === 'add') initAddSweet();
  if (route === 'view') initViewSweets();
  if (route === 'search') initSearchSweet(); 
}
