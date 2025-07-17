export function initAddSweet() {
  
  const form = document.getElementById('addSweetForm');


  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const sweet = {
      id: +form.id.value,
      name: form.name.value.trim(),
      category: form.category.value.trim(),
      price: +form.price.value,
      quantity: +form.quantity.value
    };

    try {
      const res = await fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sweet)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Sweet added successfully!');
        form.reset();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Network error');
    }
  });
}
