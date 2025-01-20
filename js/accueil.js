document.addEventListener('DOMContentLoaded', function() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const colItems = document.getElementById('colItems');

    if (colItems) {
        colItems.innerHTML = ''; 
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                </div>
                <div class="card-body">
                    <h2 class="card-title" id="Name">${product.name}</h2>
                    <p class="card-text" id="Desc">${product.description}</p>
                    <button type="button" class="btn btn-outline-warning" id="morebtn">See more</button>
                </div>
            `;
            colItems.appendChild(card);
        });
    }
});