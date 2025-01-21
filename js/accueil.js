document.addEventListener("DOMContentLoaded", function () {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const flavorsImg = document.querySelector(".flavors-img");

  if (flavorsImg) {
    flavorsImg.innerHTML = ""; // Clear existing content
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.width = "18rem"; // Set card width
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
});
