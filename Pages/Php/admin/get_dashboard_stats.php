<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('HTTP/1.1 401 Unauthorized');
    echo json_encode(["error" => "Unauthorized access. Please login."]);
    exit;
}

header('Content-Type: application/json');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");

$host     = "localhost";
$username = "root";
$password = "";
$dbname   = "admins";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

mysqli_set_charset($conn, "utf8mb4");

$response = [
    "stats" => [
        "total_revenue" => "0.00",
        "total_orders" => 0,
        "total_products" => 0,
        "active_users" => 0
    ],
    "category_sales" => [],
    "recent_orders" => []
];


$res_orders = mysqli_query($conn, "SELECT SUM(total) as revenue, COUNT(id) as orders_count FROM orders");
if ($res_orders) {
    $data = mysqli_fetch_assoc($res_orders);
    $response['stats']['total_revenue'] = number_format((float)($data['revenue'] ?? 0), 2);
    $response['stats']['total_orders'] = (int)$data['orders_count'];
}

$res_prod = mysqli_query($conn, "SELECT COUNT(*) as count FROM products");
if ($res_prod) {
    $response['stats']['total_products'] = (int)mysqli_fetch_assoc($res_prod)['count'];
}

$res_user = mysqli_query($conn, "SELECT COUNT(*) as count FROM users");
if ($res_user) {
    $response['stats']['active_users'] = (int)mysqli_fetch_assoc($res_user)['count'];
}

$res_cat = mysqli_query($conn, "SELECT type as category, COUNT(*) as count FROM products GROUP BY type");
if ($res_cat) {
    while($row = mysqli_fetch_assoc($res_cat)) {
        $response['category_sales'][] = $row;
    }
}

$res_recent = mysqli_query($conn, "SELECT id, userName, total, status, date FROM orders ORDER BY id DESC LIMIT 5");
if ($res_recent) {
    while($row = mysqli_fetch_assoc($res_recent)) {
        $response['recent_orders'][] = $row;
    }
}

echo json_encode($response);