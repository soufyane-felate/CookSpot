document.addEventListener('DOMContentLoaded', function() {
    const addForm = document.getElementById('addForm');
    const productTable = document.getElementById('productTable');

    // Function to load all products from localStorage
    function loadAllProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => addProductToTable(product));
    }

    // Function to add  the card with all products
    function updateCardsWithAllProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const colItems = document.getElementById('colItems');

        if (colItems) {
            colItems.innerHTML = ''; 
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'col-4 mb-4'; 
                card.innerHTML = `
                    <div class="card">
                        <div class="card-img">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid rounded" id="Img">
                        </div>
                        <h2 style="text-align: center" id="Name">${product.name}</h2>
                        <p style="text-align: center" id="Desc">${product.description}</p>
                        <button type="button" class="btn btn-outline-warning" id="morebtn">See more</button>
                    </div>
                `;
                colItems.appendChild(card);
            });
        }
    }

    // Function to add a product to the list
    function addProductToTable(product) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="img-fluid" style="width: 50px;"></td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="editProduct(${product.id})" class="btn btn-warning btn-sm">Edit</button>
                <button onclick="deleteProduct(${product.id})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;
        productTable.appendChild(row);
    }

    addForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productCategory = document.getElementById('categorie').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImage = document.getElementById('productImage').value;

        const product = {
            id: Date.now(), 
            name: productName,
            category: productCategory,
            description: productDescription,
            image: productImage
        };

        // Add the product to localStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        addProductToTable(product);

        updateCardsWithAllProducts();

        addForm.reset();
    });

    loadAllProducts();

    // Function to search products 
    function search() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const rows = productTable.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const name = row.getElementsByTagName('td')[2].textContent.toLowerCase();
            const id = row.getElementsByTagName('td')[0].textContent.toLowerCase();

            if (name.includes(searchTerm) || id.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    // Placeholder functions for edit and delete
    window.editProduct = function(id) {
        alert(`Edit product with ID: ${id}`);
    };

    window.deleteProduct = function(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const updatedProducts = products.filter(product => product.id !== id);
            localStorage.setItem('products', JSON.stringify(updatedProducts));

            const row = document.querySelector(`tr td:first-child:contains('${id}')`).parentNode;
            row.remove();

            updateCardsWithAllProducts();
        }
    };
});