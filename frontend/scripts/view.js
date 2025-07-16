export async function initViewSweets() {
  const tbody = document.getElementById("sweetTableBody");
  tbody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';

  try {
    const res = await fetch("http://localhost:3000/sweets");
    const sweets = await res.json();

    if (sweets.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6">No sweets available.</td></tr>';
      return;
    }

    tbody.innerHTML = "";
    for (const sweet of sweets) {
      const row = document.createElement("tr");
      row.innerHTML = `
  <td>${sweet.id}</td>
  <td>${sweet.name}</td>
  <td>${sweet.category}</td>
  <td>${sweet.price}</td>
  <td>${sweet.quantity}</td>
  <td>
    <button onclick="purchaseSweet(${sweet.id})">🛒</button>
    <button onclick="restockSweet(${sweet.id})">➕</button>
    <button onclick="deleteSweet(${sweet.id})">❌</button>
  </td>
`;

      tbody.appendChild(row);
    }
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6">Error loading sweets.</td></tr>';
  }
}

// Function to restock a sweet
window.restockSweet = async function (id) {
  const qty = prompt("Enter quantity to restock:", "1");
  if (!qty || isNaN(qty) || qty <= 0) {
    alert("Invalid quantity");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/restock/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: +qty }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Restocked successfully!");
      initViewSweets(); // reload updated table
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    alert("❌ Network error");
  }
};

// Function to purchase a sweet
window.purchaseSweet = async function (id) {
  const qty = prompt("Enter quantity to purchase:", "1");
  if (!qty || isNaN(qty) || qty <= 0) {
    alert("Invalid quantity");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/purchase/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: +qty })
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Purchase successful!");
      initViewSweets(); // reload updated table
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    alert("❌ Network error");
  }
};

// Function to delete a sweet
window.deleteSweet = async function (id) {
  if (!confirm("Are you sure you want to delete this sweet?")) return;

  try {
    const res = await fetch(`http://localhost:3000/delete/${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Sweet deleted!");
      initViewSweets();
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    alert("❌ Network error");
  }
};
