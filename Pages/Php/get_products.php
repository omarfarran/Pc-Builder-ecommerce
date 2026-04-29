<?php

$host = "localhost";
$dbname = "admins";
$user = "root";
$pass = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]));
}
header('Content-Type: application/json');

try {
    // جلب كل المنتجات
    $stmt = $pdo->query("SELECT * FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
