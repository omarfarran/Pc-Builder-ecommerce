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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $user_id = $_SESSION['user_id'];
    $product_id = $_POST['product_id'];

    try {
        $sql = "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$user_id, $product_id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["status" => "success", "message" => "Item removed from favorites"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Item not found"]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Database error"]);
    }
}
?>