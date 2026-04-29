<?php
session_start();

$host = "localhost";
$dbname = "admins";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // جلب الإحصائيات (العدد الكلي والمبلغ الكلي)
    $stmtStats = $pdo->prepare("SELECT COUNT(*) as total_orders, SUM(total) as total_spent FROM orders WHERE userId = ?");
    $stmtStats->execute([$user_id]);
    $stats = $stmtStats->fetch();

    // جلب الطلبات
    $stmtOrders = $pdo->prepare("SELECT * FROM orders WHERE userId = ? ORDER BY date DESC");
    $stmtOrders->execute([$user_id]);
    $orders = $stmtOrders->fetchAll();

    // جلب المنتجات لكل طلب لكي تظهر داخل الـ order-item
    foreach ($orders as &$order) {
        $stmtItems = $pdo->prepare("
            SELECT oi.qty, p.name 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = ?
        ");
        $stmtItems->execute([$order['id']]);
        $order['items'] = $stmtItems->fetchAll();
    }

    echo json_encode([
        "status" => "success",
        "stats" => [
            "total_orders" => $stats['total_orders'] ?? 0,
            "total_spent" => $stats['total_spent'] ?? 0
        ],
        "orders" => $orders
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>