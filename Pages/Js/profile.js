document.addEventListener("DOMContentLoaded", async () => {
    const ordersList = document.getElementById("orders-list");
    const totalOrdersEl = document.getElementById("total-orders");
    const totalSpentEl = document.getElementById("total-spent");

    try {
        const response = await fetch("../Php/get_profile_data.php", {
            credentials: "same-origin"
        });

        const data = await response.json();

        if (data.status === "error" || data.message === "Unauthorized") {
            window.location.href = "../Html/signin.html";
            return;
        }

        totalOrdersEl.textContent = data.stats.total_orders;
        totalSpentEl.textContent = `$${parseFloat(data.stats.total_spent || 0).toFixed(2)}`;

        if (!data.orders || data.orders.length === 0) {
            ordersList.innerHTML = `<p class="text-center mt-4 text-white">You don't have any orders yet.</p>`;
            return;
        }

        ordersList.innerHTML = data.orders.map(order => {
            let statusClass = "processing";
            if (order.status === "completed") statusClass = "delivered";
            if (order.status === "shipped") statusClass = "shipped";

            return `
                <div class="order-item mb-3">
                    <div class="order-left">
                        <h6 class="text-white mb-1">Order #${order.id}</h6>
                        <span>Date: ${order.date}</span>
                        <div class="mt-2">
                            ${order.items.map(item => `
                                <small class="d-block text-secondary">
                                    • ${item.name} (x${item.qty})
                                </small>
                            `).join("")}
                        </div>
                    </div>

                    <div class="order-right">
                        <div class="badge-status ${statusClass}">
                            ${order.status.toUpperCase()}
                        </div>
                        <h5 class="text-success mb-0 fw-bold">
                            $${parseFloat(order.total).toFixed(2)}
                        </h5>
                    </div>
                </div>
            `;
        }).join("");

    } catch (error) {
        console.error("Profile load error:", error);
    }
});
