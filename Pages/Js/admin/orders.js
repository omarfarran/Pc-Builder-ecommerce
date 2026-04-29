let allOrders = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});

// 1. جلب الطلبات مع فحص الأمان (401)
async function fetchOrders() {
    try {
        const response = await fetch('../Php/admin/orders_handler.php?action=get_orders');

        // التحقق مما إذا كان المستخدم غير مصرح له (انتهت الجلسة)
        if (response.status === 401) {
            window.location.href = '../Html/signin.html';
            return;
        }

        const data = await response.json();
        allOrders = data.orders;

        document.getElementById('stat-total-orders').innerText = data.stats.total;
        document.getElementById('stat-pending').innerText = data.stats.pending;
        document.getElementById('stat-processing').innerText = data.stats.processing;
        document.getElementById('stat-revenue').innerText = `$${data.stats.revenue}`;

        renderOrders(allOrders);
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
}

// 2. رسم الجدول
function renderOrders(orders) {
    const tbody = document.getElementById('orders-body');
    tbody.innerHTML = '';

    if (!orders || orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-secondary">No orders found.</td></tr>';
        return;
    }

    orders.forEach(order => {
        const customerName = (order.userName && order.userName.trim() !== '') ? order.userName : 'Customer #' + order.id;

        tbody.innerHTML += `
            <tr>
                <td>#${order.id}</td>
                <td>${customerName}<br><small class="text-muted">${order.email}</small></td>
                <td>${order.date}</td>
                <td><span class="badge ${getStatusClass(order.status)}">${order.status}</span></td>
                <td>$${order.total}</td>
                <td><button class="btn btn-sm btn-outline-info" onclick="viewOrderItems(${order.id})">Items</button></td>
                <td>
                    <select class="form-select form-select-sm bg-dark text-white border-secondary" 
                            onchange="updateStatus(${order.id}, this.value)">
                        <option value="">Status...</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </td>
            </tr>
        `;
    });
}

// 3. عرض تفاصيل الطلب
async function viewOrderItems(orderId) {
    try {
        const response = await fetch(`../Php/admin/orders_handler.php?action=get_order_items&order_id=${orderId}`);

        if (response.status === 401) { window.location.href = '../Html/signin.html'; return; }

        const items = await response.json();
        const listBody = document.getElementById('items-list-body');
        listBody.innerHTML = items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>$${item.price}</td>
            </tr>
        `).join('');

        document.getElementById('itemsModal').classList.remove('d-none');
    } catch (error) {
        console.error("Error loading items:", error);
    }
}

// 4. تحديث حالة الطلب
async function updateStatus(id, newStatus) {
    if (!newStatus) return;
    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', newStatus);

    const response = await fetch('../Php/admin/orders_handler.php?action=update_status', {
        method: 'POST',
        body: formData
    });

    if (response.status === 401) { window.location.href = '../Html/signin.html'; return; }

    const res = await response.json();
    if (res.success) fetchOrders();
}

function logout() {
    window.location.href = '../Php/logout.php';
}

function filterOrders() {
    const term = document.getElementById('orders-search').value.toLowerCase();
    const status = document.getElementById('status-filter').value;
    const filtered = allOrders.filter(o =>
        ((o.userName || '').toLowerCase().includes(term) || o.id.toString().includes(term)) &&
        (status === 'all' || o.status === status)
    );
    renderOrders(filtered);
}

function getStatusClass(status) {
    if (status === 'completed') return 'bg-success';
    if (status === 'pending') return 'bg-warning text-dark';
    if (status === 'cancelled') return 'bg-danger';
    return 'bg-primary';
}

function closeItemsModal() { document.getElementById('itemsModal').classList.add('d-none'); }