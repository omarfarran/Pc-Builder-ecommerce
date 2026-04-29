async function loadCartPage() {
    const cartGrid = document.getElementById("cart-grid");
    if (!cartGrid) return;

    try {
        const response = await fetch('../Php/get_cart.php');
        const cartItems = await response.json();

        const emptySection = document.querySelector(".is-empty");
        const listSection = document.querySelector(".cart-list");

        if (!cartItems || cartItems.length === 0) {
            if (emptySection) emptySection.classList.remove("d-none");
            if (listSection) listSection.classList.add("d-none");
            cartGrid.innerHTML = "";
            return;
        }

        if (emptySection) emptySection.classList.add("d-none");
        if (listSection) listSection.classList.remove("d-none");

        let subtotal = 0;
        let htmlContent = "";

        cartItems.forEach(item => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.qty) || 1;
            const itemTotal = price * qty;
            subtotal += itemTotal;

            htmlContent += `
            <div class="col-12 card bg-dark text-white border-secondary mb-3 p-3">
                <div class="row align-items-center">
                    <div class="col-md-2 text-center">
                        <img src="${item.image}" class="img-fluid rounded" style="max-height: 80px; object-fit: contain;">
                    </div>
                    <div class="col-md-4">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">${item.brand || ''}</small>
                    </div>
                    <div class="col-md-2 text-center">
                        <span>Qty: ${qty}</span>
                    </div>
                    <div class="col-md-2 text-success fw-bold text-center">
                        $${itemTotal.toFixed(2)}
                    </div>
                    <div class="col-md-2 text-end">
                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                             Remove
                        </button>
                    </div>
                </div>
            </div>`;
        });

        cartGrid.innerHTML = htmlContent;

        if (document.querySelector(".sub-total")) document.querySelector(".sub-total").innerText = `$${subtotal.toFixed(2)}`;
        if (document.querySelector(".total")) document.querySelector(".total").innerText = `$${subtotal.toFixed(2)}`;
        if (document.getElementById("cart-count")) document.getElementById("cart-count").innerText = `Your cart has (${cartItems.length} items)`;

    } catch (error) {
        console.error("Error loading cart:", error);
    }
}

window.removeFromCart = async function(productId) {
    if (!confirm("Are you sure you want to remove this item?")) return;

    const formData = new FormData();
    formData.append('product_id', productId);

    try {
        const res = await fetch('../Php/remove_from_cart.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        if (data.status === "success") {
            await loadCartPage();
            if (window.updateCartCounter) window.updateCartCounter();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

function setupCheckoutLogic() {
    const checkoutBtn = document.getElementById('open-checkout');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const totalText = document.querySelector(".total").innerText;
            const checkoutTotalDisplay = document.getElementById('checkout-total');
            if (checkoutTotalDisplay) checkoutTotalDisplay.innerText = totalText;

            const checkoutModalElement = document.getElementById('checkoutModal');
            if (checkoutModalElement) {
                const modalInstance = new bootstrap.Modal(checkoutModalElement);
                modalInstance.show();
            }
        });
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(checkoutForm);
            const totalAmount = document.getElementById('checkout-total').innerText.replace('$', '');
            formData.append('total', totalAmount);

            try {
                const response = await fetch('../Php/place_order.php', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();

                if (result.status === "success") {
                    alert(result.message);
                    window.location.href = "profile.html";
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Order submission error:", error);
                alert("Something went wrong while placing the order.");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCartPage();
    setupCheckoutLogic();
});