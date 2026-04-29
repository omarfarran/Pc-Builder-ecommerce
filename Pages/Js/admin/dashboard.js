
document.addEventListener('DOMContentLoaded', function () {
    fetchDashboardData();
});


async function fetchDashboardData() {
    try {
        const response = await fetch('../Php/admin/get_dashboard_stats.php');

        if (response.status === 401) {
            console.warn("Unauthorized access, redirecting...");
            window.location.href = '../Html/signin.html';
            return;
        }

        const data = await response.json();

        document.getElementById('total-revenue').innerText = `$${data.stats.total_revenue}`;
        document.getElementById('total-orders').innerText = data.stats.total_orders;
        document.getElementById('total-products').innerText = data.stats.total_products;
        document.getElementById('active-users').innerText = data.stats.active_users;

        renderCharts(data.category_sales);

        renderRecentOrders(data.recent_orders);

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
}

function renderCharts(categoryData) {
    const ctxCategory = document.getElementById('categoryChart').getContext('2d');

    if (window.myCategoryChart) window.myCategoryChart.destroy();

    window.myCategoryChart = new Chart(ctxCategory, {
        type: 'doughnut',
        data: {
            labels: categoryData.map(c => c.category),
            datasets: [{
                data: categoryData.map(c => c.count),
                backgroundColor: ['#0d6efd', '#6610f2', '#d63384', '#fd7e14', '#198754', '#0dcaf0'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#fff', padding: 20 }
                }
            }
        }
    });

    const ctxRevenue = document.getElementById('revenueChart').getContext('2d');
    if (window.myRevenueChart) window.myRevenueChart.destroy();

    window.myRevenueChart = new Chart(ctxRevenue, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Monthly Revenue ($)',
                data: [400, 1200, 900, 2500],
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#aaa' }, grid: { color: '#333' } },
                x: { ticks: { color: '#aaa' }, grid: { color: '#333' } }
            },
            plugins: {
                legend: { labels: { color: '#fff' } }
            }
        }
    });
}


function renderRecentOrders(orders) {
    const container = document.getElementById('recent-orders');

    if (!orders || orders.length === 0) {
        container.innerHTML = '<p class="text-secondary p-3 text-center">No recent orders found.</p>';
        return;
    }

    let tableHtml = `
        <table class="table table-dark table-hover mt-3 mb-0">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
    `;

    orders.forEach(order => {
        const displayName = (order.userName && order.userName.trim() !== "") ? order.userName : "Customer #" + order.id;
        const statusClass = order.status === 'completed' ? 'bg-success' : 'bg-warning text-dark';

        tableHtml += `
            <tr>
                <td>#${order.id}</td>
                <td>${displayName}</td>
                <td>$${order.total}</td>
                <td><span class="badge ${statusClass}">${order.status}</span></td>
                <td>${order.date}</td>
            </tr>
        `;
    });

    tableHtml += '</tbody></table>';
    container.innerHTML = tableHtml;
}


function logout() {
    if (confirm("Are you sure you want to sign out?")) {
        window.location.href = '../Php/logout.php';
    }
}