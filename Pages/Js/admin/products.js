let allProducts = [];
let currentEditId = null;

document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProducts() {
    try {
        const response = await fetch('../Php/admin/products_handler.php?action=get_products');

        if (response.status === 401) {
            window.location.href = '../Html/signin.html';
            return;
        }

        allProducts = await response.json();
        document.getElementById('totalProducts').innerText = allProducts.length;
        renderProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function renderProducts(products) {
    const tbody = document.getElementById('products-body');
    tbody.innerHTML = products.map(p => {
        const imgPath = p.image && p.image.trim() !== "" ? p.image : "../../assets/images/placeholder.webp";

        return `
        <tr>
            <td>
                <img src="${imgPath}" width="30" height="30" class="me-2" style="object-fit: cover; border-radius: 4px;" 
                     onerror="this.onerror=null; this.src='../../assets/images/placeholder.webp';">
                ${p.name}
            </td>
            <td>${p.type}</td>
            <td>${p.brand}</td>
            <td>$${p.price}</td>
            <td>${p.stock}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="openEditModal(${p.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

async function addProduct() {
    const fd = new FormData();
    fd.append('name', document.getElementById('add-name').value);
    fd.append('brand', document.getElementById('add-brand').value);
    fd.append('type', document.getElementById('add-type').value);
    fd.append('price', document.getElementById('add-price').value);
    fd.append('stock', document.getElementById('add-stock').value);
    fd.append('image', document.getElementById('add-image').value);
    fd.append('description', document.getElementById('add-description').value);

    try {
        const response = await fetch('../Php/admin/products_handler.php?action=add_product', {
            method: 'POST',
            body: fd
        });

        const result = await response.json();
        if (result.success) {
            alert("Product added successfully!");
            closeAddModal();
            document.querySelectorAll('#addModal input, #addModal textarea, #addModal select').forEach(el => el.value = "");
            fetchProducts();
        } else {
            alert("Error adding product");
        }
    } catch (error) {
        console.error("Add error:", error);
    }
}

async function updateProduct() {
    const fd = new FormData();
    fd.append('id', currentEditId);
    fd.append('name', document.getElementById('edit-name').value);
    fd.append('type', document.getElementById('edit-type').value);
    fd.append('brand', document.getElementById('edit-brand').value);
    fd.append('price', document.getElementById('edit-price').value);
    fd.append('stock', document.getElementById('edit-stock').value);
    fd.append('image', document.getElementById('edit-image').value);
    fd.append('description', document.getElementById('edit-description').value);

    const response = await fetch('../Php/admin/products_handler.php?action=update_product', { method: 'POST', body: fd });
    const result = await response.json();
    if(result.success) {
        document.getElementById('editModal').classList.add('d-none');
        fetchProducts();
    }
}

async function deleteProduct(id) {
    if(confirm('Delete this product?')) {
        const fd = new FormData();
        fd.append('id', id);
        await fetch('../Php/admin/products_handler.php?action=delete_product', { method: 'POST', body: fd });
        fetchProducts();
    }
}

function logout() {
    window.location.href = '../Php/logout.php';
}

function filterProducts() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term)
    );
    renderProducts(filtered);
}

function openAddModal() { document.getElementById('addModal').classList.remove('d-none'); }
function closeAddModal() { document.getElementById('addModal').classList.add('d-none'); }
function closeEditModal() { document.getElementById('editModal').classList.add('d-none'); }

function openEditModal(id) {
    currentEditId = id;
    const p = allProducts.find(prod => prod.id == id);
    if (p) {
        document.getElementById('edit-name').value = p.name;
        document.getElementById('edit-brand').value = p.brand;
        document.getElementById('edit-type').value = p.type;
        document.getElementById('edit-price').value = p.price;
        document.getElementById('edit-stock').value = p.stock;
        document.getElementById('edit-image').value = p.image;
        document.getElementById('edit-description').value = p.description;
        document.getElementById('editModal').classList.remove('d-none');
    }
}