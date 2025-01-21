/*document.addEventListener('DOMContentLoaded', function() {
    const addForm = document.getElementById('addForm');
    const productTable = document.getElementById('productTable');

    // Function to load all products from localStorage
    function loadAllProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.forEach(product => addProductToTable(product));
    }

    // Function to update the card with all products
 function updateCardsWithAllProducts() {
   const products = JSON.parse(localStorage.getItem("products")) || [];
   const flavorsImg = document.querySelector(".flavors-img");

   if (flavorsImg) {
     flavorsImg.innerHTML = ""; 
     products.forEach((product) => {
       const card = document.createElement("div");
       card.className = "card";
       card.style.width = "18rem";
       card.innerHTML = `
                <img src="${product.image}" class="card-img-top" alt="${product.name}" height="320px">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <a href="#" class="btn btn-primary">See More</a>
                </div>
            `;
       flavorsImg.appendChild(card);
     });
   }
 }

 // Call the function to update the cards with products
 updateCardsWithAllProducts();

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

*/
document.addEventListener("DOMContentLoaded", function () {
  const addForm = document.getElementById("addForm");
  const productTable = document.getElementById("productTable");
  let editProductId = null; // Track the product being edited

  // Function to load all products from localStorage
  function loadAllProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach((product) => addProductToTable(product));
  }

  // Function to update the card with all products
  function updateCardsWithAllProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const flavorsImg = document.querySelector(".flavors-img");

    if (flavorsImg) {
      flavorsImg.innerHTML = ""; // Clear existing content
      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        card.innerHTML = `
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" height="320px">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <a href="details.html?id=${product.id}" class="btn btn-primary">See More</a>
                    </div>
                `;
        flavorsImg.appendChild(card);
      });
    }
  }

  // Function to add a product to the table
  function addProductToTable(product) {
    const row = document.createElement("tr");
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

  // Add product form submission
  addForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const productCategory = document.getElementById("categorie").value;
    const productDescription =
      document.getElementById("productDescription").value;
    const productImage = document.getElementById("productImage").value;

    const product = {
      id: editProductId || Date.now(), // Use existing ID if editing, else generate new ID
      name: productName,
      category: productCategory,
      description: productDescription,
      image: productImage,
    };

    // Add or update the product in localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if (editProductId) {
      // Update existing product
      const index = products.findIndex((p) => p.id === editProductId);
      if (index !== -1) {
        products[index] = product;
      }
    } else {
      // Add new product
      products.push(product);
    }
    localStorage.setItem("products", JSON.stringify(products));

    // Refresh the table and cards
    productTable.innerHTML = ""; // Clear table
    loadAllProducts(); // Reload products
    updateCardsWithAllProducts(); // Update cards
    addForm.reset(); // Reset form
    editProductId = null; // Reset edit mode
  });

  // Load all products on page load
  loadAllProducts();
  updateCardsWithAllProducts();

  // Function to search products
  function search() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const rows = productTable.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const name = row.getElementsByTagName("td")[2].textContent.toLowerCase();
      const id = row.getElementsByTagName("td")[0].textContent.toLowerCase();

      if (name.includes(searchTerm) || id.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    }
  }

  // Function to edit a product
  window.editProduct = function (id) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id === id);

    if (product) {
      // Populate the form with product details
      document.getElementById("productName").value = product.name;
      document.getElementById("categorie").value = product.category;
      document.getElementById("productDescription").value = product.description;
      document.getElementById("productImage").value = product.image;

      // Set the product ID for update
      editProductId = id;
    }
  };

  // Function to delete a product
  window.deleteProduct = function (id) {
    if (confirm("Are you sure you want to delete this product?")) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = products.filter((product) => product.id !== id);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Remove the product from the table
      const rows = productTable.getElementsByTagName("tr");
      for (let i = 1; i < rows.length; i++) {
        const rowId = rows[i].getElementsByTagName("td")[0].textContent;
        if (rowId == id) {
          rows[i].remove();
          break;
        }
      }

      updateCardsWithAllProducts();
    }
  };
});