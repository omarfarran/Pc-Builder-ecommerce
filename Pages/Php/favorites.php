<?php
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);
$ids = $input['ids'] ?? [];

if (empty($ids)) {
    echo json_encode([]);
    exit;
}

$host = "localhost"; $dbname = "admins"; $user = "root"; $pass = "";
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id IN ($placeholders)");
    $stmt->execute($ids);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Exception $e) {
    echo json_encode([]);
}
?>