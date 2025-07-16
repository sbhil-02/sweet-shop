export function initSearchSweet() {
  const btn = document.getElementById('searchBtn');
  const tbody = document.getElementById('searchTableBody');

  btn.addEventListener('click', async () => {
    const name = document.getElementById('searchName').value.toLowerCase();
    const category = document.getElementById('searchCategory').value.toLowerCase();
    const min = +document.getElementById('minPrice').value || 0;
    const max = +document.getElementById('maxPrice').value || Infinity;

    try {
      const res = await fetch('http://localhost:3000/sweets');
      const sweets = await res.json();

      const filtered = sweets.filter(s =>
        s.name.toLowerCase().includes(name) &&
        s.category.toLowerCase().includes(category) &&
        s.price >= min && s.price <= max
      );

      tbody.innerHTML = filtered.length
        ? filtered.map(s => `
            <tr>
              <td>${s.id}</td>
              <td>${s.name}</td>
              <td>${s.category}</td>
              <td>${s.price}</td>
              <td>${s.quantity}</td>
            </tr>
          `).join('')
        : `<tr><td colspan="5">No matches found.</td></tr>`;
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5">Error fetching sweets.</td></tr>`;
    }
  });
}
