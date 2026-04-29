<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "admins";
$user = "root";
$pass = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $user,
        $pass,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    echo json_encode(["status" => "error"]);
    exit;
}

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode(["status" => "error"]);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
$stmt->execute([$id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    echo json_encode(["status" => "error"]);
    exit;
}

echo json_encode([
    "status" => "success",
    "product" => $product
]);