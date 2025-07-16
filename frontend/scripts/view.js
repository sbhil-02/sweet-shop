export async function initViewSweets() {
  const tbody = document.getElementById('sweetTableBody');
  tbody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';

  try {
    const res = await fetch('http://localhost:3000/sweets');
    const sweets = await res.json();

    if (sweets.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">No sweets available.</td></tr>';
      return;
    }

    tbody.innerHTML = '';
    for (const sweet of sweets) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${sweet.id}</td>
        <td>${sweet.name}</td>
        <td>${sweet.category}</td>
        <td>${sweet.price}</td>
        <td>${sweet.quantity}</td>
      `;
      tbody.appendChild(row);
    }
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="5">Error loading sweets.</td></tr>';
  }
}
