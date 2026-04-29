let allProducts = [];
let selectedComponents = {};

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Custom PC Builder Initialized...");

    const isLoggedIn = await checkAuth();

    if (isLoggedIn) {
        const warningBox = document.getElementById('signin-warning');
        if(warningBox) warningBox.classList.add('d-none');

        fetchProducts();
    } else {
        disableDropdowns();
    }

    setupAddAllToCart();
});

async function checkAuth() {
    try {
        const res = await fetch('../Php/check_session.php');
        const data = await res.json();
        return data.isLoggedIn;
    } catch (err) {
        console.error("Auth check failed:", err);
        return false;
    }
}

function disableDropdowns() {
    const buttons = document.querySelectorAll('.dropdown-toggle');
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        btn.innerText = "Sign in to build";
    });
}

async function fetchProducts() {
    try {
        const response = await fetch('../Php/get_custom_products.php');
        allProducts = await response.json();
        console.log("Products loaded from DB:", allProducts);

        const types = ['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'case'];

        types.forEach(type => {
            const menu = document.querySelector(`.dropdown-menu[data-type="${type}"]`);
            if (!menu) return;

            const filtered = allProducts.filter(p => p.type.toLowerCase() === type.toLowerCase());

            if (filtered.length === 0) {
                menu.innerHTML = '<li><a class="dropdown-item disabled">No items found</a></li>';
            } else {
                menu.innerHTML = filtered.map(p => `
                    <li><a class="dropdown-item d-flex justify-content-between align-items-center" 
                           href="javascript:void(0)" 
                           onclick="selectComponent('${type}', ${p.id})">
                        <span>${p.name}</span>
                        <span class="badge bg-dark border border-secondary">$${p.price}</span>
                    </a></li>
                `).join('');
            }
        });
    } catch (err) {
        console.error("Error loading products:", err);
    }
}

window.selectComponent = function(type, id) {
    console.log(`Action: Selecting ${type} with ID: ${id}`);

    const product = allProducts.find(p => p.id == id);
    if (!product) {
        console.error("Product not found in the list!");
        return;
    }

    selectedComponents[type] = product;

    const btn = document.querySelector(`.dropdown-menu[data-type="${type}"]`).previousElementSibling;
    btn.innerHTML = `${product.name} <span class="text-success ms-2">$${product.price}</span>`;

    const summaryLabel = document.getElementById(`sel-${type}`);
    if (summaryLabel) {
        summaryLabel.innerText = product.name;
        summaryLabel.classList.add("text-success", "fw-bold");
    }

    if (type.toLowerCase() === 'case') {
        const mainImage = document.getElementById('pc-main-image');
        if (mainImage) mainImage.src = product.image;
    }

    renderSelectedList();
};

function renderSelectedList() {
    const listContainer = document.getElementById('selected-components-list');
    const countLabel = document.getElementById('components-count');

    let html = "";
    let count = 0;

    for (const key in selectedComponents) {
        const item = selectedComponents[key];
        count++;
        html += `
            <div class="comp-item bg-black border border-secondary p-2 rounded d-flex align-items-center justify-content-between mb-2">
                <div class="d-flex align-items-center gap-2">
                    <img src="${item.image}" width="45" height="45" style="object-fit: cover;" class="rounded">
                    <div>
                        <h6 class="mb-0 text-white" style="font-size: 0.85rem;">${item.name}</h6>
                        <small class="text-muted text-uppercase">${item.type}</small>
                    </div>
                </div>
                <div class="fw-bold text-success">$${item.price}</div>
            </div>
        `;
    }

    listContainer.innerHTML = html;
    countLabel.innerText = count;
}

function setupAddAllToCart() {
    const btn = document.getElementById('add-all-to-cart');
    btn.addEventListener('click', async () => {
        const selectedArray = Object.values(selectedComponents);

        if (selectedArray.length === 0) {
            alert("Please select at least one component first!");
            return;
        }

        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Adding...`;

        try {
            for (let item of selectedArray) {
                const fd = new FormData();
                fd.append('product_id', item.id);
                fd.append('qty', 1);

                await fetch('../Php/add_to_cart.php', { method: 'POST', body: fd });
            }
            alert("Success! Your custom PC parts are in the cart.");
            window.location.href = "cart.html";
        } catch (err) {
            alert("Failed to add items to cart.");
            btn.disabled = false;
            btn.innerText = "Add All Components to Cart";
        }
    });
}