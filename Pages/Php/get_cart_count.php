<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["count" => 0]);
    exit;
}

$host = "localhost"; $dbname = "admins"; $user = "root"; $pass = "";
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $stmt = $pdo->prepare("SELECT SUM(qty) as total FROM cart_items WHERE user_id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(["count" => (int)($row['total'] ?? 0)]);
} catch (Exception $e) {
    echo json_encode(["count" => 0]);
}
?>