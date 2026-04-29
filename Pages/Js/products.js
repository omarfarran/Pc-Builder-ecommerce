let allProducts = [];
let filteredProducts = [];
let currentCategory = "All";
let currentBrand = "All";
let currentSort = "az";

// 1. Load Products on page load
async function loadProducts() {
    const productsGrid = document.getElementById("products-grid");
    if(productsGrid) productsGrid.innerHTML = `<div class="text-center text-white"><h3>Loading...</h3></div>`;

    try {
        // تأكد من المسار الصحيح لملف PHP
        const response = await fetch("../Php/get_products.php");
        allProducts = await response.json();
        filteredProducts = [...allProducts];
        renderProducts();
        setupFilters();
        updateCartCounter();
    } catch (error) {
        if(productsGrid) productsGrid.innerHTML = `<div class="text-center text-danger"><h3>Error loading products.</h3></div>`;
        console.error(error);
    }
}

// 2. Render Products (Updated with "View" Button)
function renderProducts() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `<h3 class="text-white text-center w-100">No products found.</h3>`;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card bg-dark text-white border-secondary h-100 shadow-sm">
                <div class="position-relative p-3" style="background: #1a1a1a; cursor: pointer;" onclick="viewProduct(${product.id})">
                    <img src="${product.image}" class="card-img-top" style="height: 180px; object-fit: contain;">
                </div>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 align-self-start">${product.type}</span>
                    <h6 class="card-title fw-bold text-truncate" title="${product.name}">${product.name}</h6>
                    <div class="mt-auto">
                        <h5 class="text-success">$${parseFloat(product.price).toFixed(2)}</h5>
                        <div class="d-flex gap-2 mt-2">
                             <button class="btn btn-outline-info btn-sm" onclick="viewProduct(${product.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button class="btn btn-light btn-sm flex-grow-1 fw-bold" onclick="addToCart(${product.id})">Add to Cart</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="addToWishlist(${product.id})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. View Product Function (Modal Logic)
async function viewProduct(id) {
    const modalBody = document.getElementById("productModalBody");
    // إظهار اللودينج داخل المودال
    modalBody.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-light" role="status"></div>
            <p class="mt-2">Loading details...</p>
        </div>`;

    // فتح المودال باستخدام Bootstrap API
    const myModalEl = document.getElementById('productModal');
    const modal = new bootstrap.Modal(myModalEl);
    modal.show();

    try {
        const res = await fetch(`../Php/get_product_details.php?id=${id}`);
        const data = await res.json();

        if (data.status !== "success") {
            modalBody.innerHTML = `<p class="text-danger text-center">Product not found.</p>`;
            return;
        }

        const p = data.product;

        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6 d-flex align-items-center justify-content-center bg-white rounded p-3">
                    <img src="${p.image}" class="img-fluid" style="max-height: 300px;">
                </div>
                <div class="col-md-6 mt-3 mt-md-0">
                    <small class="text-muted">${p.type} / ${p.brand}</small>
                    <h3 class="fw-bold mt-1">${p.name}</h3>
                    <h2 class="text-success my-3">$${parseFloat(p.price).toFixed(2)}</h2>
                    
                    <p class="text-light opacity-75">${p.description || "No description available for this product."}</p>
                    
                    <ul class="list-unstyled mb-4">
                        <li><strong>Brand:</strong> ${p.brand}</li>
                        <li><strong>Category:</strong> ${p.type}</li>
                        <li><strong>Stock:</strong> ${p.stock > 0 ? `<span class="text-success">In Stock (${p.stock})</span>` : `<span class="text-danger">Out of Stock</span>`}</li>
                    </ul>

                    <div class="d-grid gap-2">
                        <button class="btn btn-success btn-lg" onclick="addToCart(${p.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;

    } catch (err) {
        modalBody.innerHTML = `<p class="text-danger text-center">Error loading product details.</p>`;
        console.error(err);
    }
}

// ... بقية دوال السلة (addToCart, updateCartCounter, etc.) تبقى كما هي ...

// باقي الدوال المساعدة
async function addToCart(id) {
    const formData = new FormData();
    formData.append('product_id', id);
    try {
        const res = await fetch('../Php/add_to_cart.php', { method: 'POST', body: formData });
        const data = await res.json();
        if(data.status === 'success') {
            alert("✅ " + data.message);
            updateCartCounter();
        } else {
            alert("❌ " + data.message);
            if(data.message.includes('sign in')) window.location.href = '../Html/signin.html';
        }
    } catch (e) { console.error(e); }
}

async function updateCartCounter() {
    try {
        const res = await fetch('../Php/get_cart_count.php');
        const data = await res.json();
        const counterElement = document.getElementById('cart-counter'); // تأكد من الـ ID في HTML
        if (counterElement) {
            counterElement.innerText = data.count || 0;
            counterElement.classList.remove('d-none');
        }
    } catch (e) { console.log("User not logged in"); }
}

async function addToWishlist(id) {
    const formData = new FormData();
    formData.append('product_id', id);
    try {
        const res = await fetch('../Php/add_to_wishlist.php', { method: 'POST', body: formData });
        const data = await res.json();
        alert(data.message);
    } catch (e) { console.error(e); }
}

function setupFilters() {
    const searchInput = document.getElementById("search-input");
    if(searchInput) searchInput.addEventListener("input", filterAll);

    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = e.target.getAttribute("data-cat");
            const brand = e.target.getAttribute("data-brand");
            const sort = e.target.getAttribute("data-sort");
            if(cat) currentCategory = cat;
            if(brand) currentBrand = brand;
            if(sort) currentSort = sort;
            filterAll();
        });
    });
}

function filterAll() {
    const search = document.getElementById("search-input") ? document.getElementById("search-input").value.toLowerCase() : "";
    filteredProducts = allProducts.filter(p =>
        p.name.toLowerCase().includes(search) &&
        (currentCategory === "All" || p.type === currentCategory) &&
        (currentBrand === "All" || p.brand === currentBrand)
    );
    if (currentSort === "az") filteredProducts.sort((a,b) => a.name.localeCompare(b.name));
    else filteredProducts.sort((a,b) => b.name.localeCompare(a.name));
    renderProducts();
}

document.addEventListener("DOMContentLoaded", loadProducts);