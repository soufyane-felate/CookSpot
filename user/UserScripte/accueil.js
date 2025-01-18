document.addEventListener('DOMContentLoaded', function () {
    const productsPerPage = 4;
    let currentPage = 1; 

    // Function to load all products from localStorage
    function loadAllProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        updateCardsWithAllProducts(products);
        setupPagination(products);
    }

    // Function to update the card with all products
    function updateCardsWithAllProducts(products, page = 1) {
        const colItems = document.getElementById('colItems');
        if (colItems) {
            colItems.innerHTML = ''; 

            const start = (page - 1) * productsPerPage;
            const end = start + productsPerPage;
            const paginatedProducts = products.slice(start, end);

            paginatedProducts.forEach(product => {
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

    // Function to set up pagination
    function setupPagination(products) {
        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.innerHTML = ''; 

            const pageCount = Math.ceil(products.length / productsPerPage);

            for (let i = 1; i <= pageCount; i++) {
                const li = document.createElement('li');
                li.className = `page-item ${i === currentPage ? 'active' : ''}`;
                li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                li.addEventListener('click', () => {
                    currentPage = i;
                    updateCardsWithAllProducts(products, currentPage);
                    updatePaginationButtons();
                });
                pagination.appendChild(li);
            }
        }
    }

    // Function to update pagination buttons' active state
    function updatePaginationButtons() {
        const pagination = document.getElementById('pagination');
        if (pagination) {
            const buttons = pagination.getElementsByTagName('li');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('active');
                if (i + 1 === currentPage) {
                    buttons[i].classList.add('active');
                }
            }
        }
    }

    loadAllProducts();

    // Search functionality
    function search() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        updateCardsWithAllProducts(filteredProducts);
        setupPagination(filteredProducts);
    }

    // Attach search event listener
    document.getElementById('search').addEventListener('input', search);
});