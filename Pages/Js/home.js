document.addEventListener('DOMContentLoaded', () => {
    fetchFeaturedProducts();
});

async function fetchFeaturedProducts() {
    try {
        const response = await fetch('./Pages/Php/get_custom_products.php');
        const products = await response.json();

        const grid = document.getElementById('featured-grid');
        grid.innerHTML = '';

        products.slice(0, 4).forEach(product => {
            grid.innerHTML += `
                <div class="col-md-3">
                    <div class="product-card h-100 rounded-4 p-3 bg-dark border border-secondary text-white shadow-hover">
                        <img src="${product.image}" class="img-fluid rounded-3 mb-3" style="height:180px; object-fit:contain; width:100%" alt="${product.name}">
                        <span class="badge bg-secondary mb-2 text-uppercase">${product.type}</span>
                        <h6 class="mb-2 text-truncate">${product.name}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="fw-bold text-success">$${product.price}</span>
                            <a href="Pages/Html/products.html" class="btn btn-sm btn-outline-light rounded-circle">→</a>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading featured products:", error);
    }
}