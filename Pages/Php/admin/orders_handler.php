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




$action = $_GET['action'] ?? '';

if ($action == 'get_orders') {
    $res = mysqli_query($conn, "SELECT * FROM orders ORDER BY id DESC");
    $orders = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $orders[] = $row;
    }

    $total_orders = count($orders);
    $pending = 0;
    $processing = 0;
    $revenue = 0;

    foreach ($orders as $o) {
        $revenue += $o['total'];
        if ($o['status'] == 'pending') $pending++;
        if ($o['status'] == 'processing') $processing++;
    }

    echo json_encode([
        "orders" => $orders,
        "stats" => [
            "total" => $total_orders,
            "pending" => $pending,
            "processing" => $processing,
            "revenue" => number_format($revenue, 2)
        ]
    ]);
    exit;
}

if ($action == 'get_order_items') {
    $order_id = (int)$_GET['order_id'];
    $query = "SELECT oi.*, p.name FROM order_items oi 
              JOIN products p ON oi.product_id = p.id 
              WHERE oi.order_id = $order_id";
    $res = mysqli_query($conn, $query);
    $items = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $items[] = $row;
    }
    echo json_encode($items);
    exit;
}

if ($action == 'update_status') {
    $id = (int)$_POST['id'];
    $status = mysqli_real_escape_string($conn, $_POST['status']);
    $sql = "UPDATE orders SET status = '$status' WHERE id = $id";
    echo json_encode(["success" => mysqli_query($conn, $sql)]);
    exit;
}