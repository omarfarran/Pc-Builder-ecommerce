<?php

header("Content-Type: application/json; charset=UTF-8");
session_start();


$host = "localhost";
$dbname = "admins";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

    $stats = $pdo->query("SELECT SUM(total) as revenue, COUNT(id) as orders FROM orders")->fetch(PDO::FETCH_ASSOC);

    $productsCount = $pdo->query("SELECT COUNT(id) as total FROM products")->fetchColumn();

    $usersCount = $pdo->query("SELECT COUNT(id) as total FROM users")->fetchColumn();

    $chartData = $pdo->query("SELECT date, SUM(total) as daily_revenue FROM orders GROUP BY date ORDER BY date ASC LIMIT 7")->fetchAll(PDO::FETCH_ASSOC);

    $categoryData = $pdo->query("SELECT p.type as category, COUNT(oi.id) as sales 
                                 FROM order_items oi 
                                 JOIN products p ON oi.product_id = p.id 
                                 GROUP BY p.type")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "revenue" => $stats['revenue'] ?? 0,
        "orders" => $stats['orders'] ?? 0,
        "products" => $productsCount,
        "users" => $usersCount,
        "chart" => $chartData,
        "categories" => $categoryData
    ]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}