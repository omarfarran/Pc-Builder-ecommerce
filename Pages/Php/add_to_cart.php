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
    echo json_encode(["status" => "error", "message" => "Please sign in first"]);
    exit;
}

$user_id = $_SESSION['user_id'];
$product_id = $_POST['product_id'];

try {
    $sql = "INSERT INTO cart_items (user_id, product_id, qty) VALUES (?, ?, 1) 
            ON DUPLICATE KEY UPDATE qty = qty + 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id, $product_id]);
    echo json_encode(["status" => "success", "message" => "Added to cart"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Database error"]);
}
?>