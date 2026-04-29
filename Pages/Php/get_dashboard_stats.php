<?php

header("Content-Type: application/json");
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$host = "localhost";
$dbname = "admins";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

    $revenue = $pdo->query("SELECT SUM(total) as total FROM orders WHERE status = 'completed'")->fetch();

    $ordersCount = $pdo->query("SELECT COUNT(id) as count FROM orders")->fetch();

    $productsCount = $pdo->query("SELECT COUNT(id) as count FROM products")->fetch();

    $usersCount = $pdo->query("SELECT COUNT(id) as count FROM users")->fetch();

    $recentOrders = $pdo->query("SELECT id, userName, status, total FROM orders ORDER BY id DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);

    $categories = $pdo->query("SELECT type, COUNT(*) as count FROM products GROUP BY type")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "stats" => [
            "totalRevenue" => $revenue['total'] ?? 0,
            "totalOrders" => $ordersCount['count'],
            "totalProducts" => $productsCount['count'],
            "activeUsers" => $usersCount['count']
        ],
        "recentOrders" => $recentOrders,
        "categories" => $categories
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}