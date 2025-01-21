document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id == productId);

  if (product) {
    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productDescription").textContent =
      product.description;
  } else {
    window.location.href = "index.html"; // Redirect if product not found
  }
});
