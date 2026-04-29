async function loadFavoritesPage() {
    const grid = document.getElementById("fav-grid");
    const emptySection = document.querySelector(".fav-empty");
    const listSection = document.querySelector(".fav-list");

    if (!grid) return;

    try {
        const response = await fetch("../Php/get_favorites.php");
        const favProducts = await response.json();

        if (!favProducts || favProducts.length === 0) {
            emptySection?.classList.remove("d-none");
            listSection?.classList.add("d-none");
            return;
        }

        emptySection?.classList.add("d-none");
        listSection?.classList.remove("d-none");

        grid.innerHTML = favProducts.map(product => `
            <div class="col-md-4 col-lg-3">
                <div class="card bg-dark text-white border-secondary h-100 shadow-sm">
                    <img src="${product.image}" class="card-img-top p-3" style="height:180px; object-fit:contain;">
                    <div class="card-body d-flex flex-column">
                        <h6 class="fw-bold">${product.name}</h6>
                        <p class="text-success fw-bold">$${parseFloat(product.price).toFixed(2)}</p>
                        <div class="mt-auto d-flex gap-2">
                            <button class="btn btn-light btn-sm flex-grow-1" onclick="addToCart(${product.id})">Add to Cart</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="removeFromFav(${product.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`).join('');

        document.getElementById("fav-count").innerText = `Your saved products (${favProducts.length} items)`;

    } catch (error) {
        console.error("Error loading favorites:", error);
    }
}

async function removeFromFav(productId) {
    const formData = new FormData();
    formData.append('product_id', productId);

    const res = await fetch('../Php/remove_from_wishlist.php', { method: 'POST', body: formData });
    const data = await res.json();

    if (data.status === "success") {
        location.reload();
    }
}

document.addEventListener("DOMContentLoaded", loadFavoritesPage);