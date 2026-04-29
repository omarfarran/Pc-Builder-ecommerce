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

$typeTables = [
        "CPU" => "cpu",
        "GPU" => "gpu",
        "RAM" => "ram",
        "PSU" => "psu",
        "Storage" => "storage",
        "Motherboard" => "motherboard",
        "Case" => "pc_cases"
];

$specs = [];

if (isset($typeTables[$product['type']])) {
    $table = $typeTables[$product['type']];
    $stmt = $pdo->prepare("SELECT * FROM $table WHERE product_id = ?");
    $stmt->execute([$id]);
    $specs = $stmt->fetch(PDO::FETCH_ASSOC) ?? [];
}

echo json_encode([
        "status" => "success",
        "product" => $product,
        "specs" => $specs
]);
