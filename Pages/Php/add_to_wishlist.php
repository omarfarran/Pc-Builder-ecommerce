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
    $sql = "INSERT IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id, $product_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Added to wishlist"]);
    } else {
        echo json_encode(["status" => "info", "message" => "Already in wishlist"]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error processing request"]);
}
?>