let products = JSON.parse(localStorage.getItem('products')) || [];
let currentId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

// Function to add a product
document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const categorie = document.getElementById('categorie').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').value;

    if (productName && categorie && productDescription && productImage) {
        const product = {
            id: currentId++,
            name: productName,
            categorie: categorie,
            description: productDescription,
            image: productImage
        };
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        renderTable();
        document.getElementById('addForm').reset();
    }
});

function search() {
    const searchQuery = document.getElementById('search').value.trim().toLowerCase();

    // Filter products based on the search query
    const filteredProducts = products.filter(product =>
        product.id.toString().includes(searchQuery) || 
        product.name.toLowerCase().includes(searchQuery) ||
        product.categorie.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
    );

    // Update the table with filtered products
    renderTable(filteredProducts);

    // Handle no results
    if (filteredProducts.length === 0) {
        const tbody = document.querySelector('#productTable');
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No products found</td></tr>';
    }
}

// Function to delete a product
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    renderTable();
}

// Function to update a product
function updateProduct(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        const newName = prompt("Enter new product name:", product.name);
        const newCategorie = prompt("Enter new product category:", product.categorie);
        const newDescription = prompt("Enter new product description:", product.description);
        const newImage = prompt("Enter new image URL:", product.image);

        if (newName && newCategorie && newDescription && newImage) {
            product.name = newName;
            product.categorie = newCategorie;
            product.description = newDescription;
            product.image = newImage;
            localStorage.setItem('products', JSON.stringify(products));
            renderTable();
        }
    }
}

// Function to render the table
function renderTable(filteredProducts = products) {
    const tbody = document.querySelector('#productTable');
    tbody.innerHTML = '';

    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
            <td>${product.name}</td>
            <td>${product.categorie}</td>
            <td class="description" title="${product.description}">${product.description}</td>
            <td>
                <button class="btn btn-warning btn-sm me-2" onclick="updateProduct(${product.id})">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


// Render table on page load
renderTable();
