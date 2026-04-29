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
}header('Content-Type: application/json');

try {
$stmt = $pdo->prepare("SELECT id, name, type, brand, price, image FROM products WHERE stock > 0");
$stmt->execute();
$products = $stmt->fetchAll();

echo json_encode($products);
} catch (PDOException $e) {
echo json_encode(["error" => $e->getMessage()]);
}
?>