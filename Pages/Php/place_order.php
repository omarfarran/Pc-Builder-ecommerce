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

$user_id  = $_SESSION['user_id'];
$userName = $_POST['full_name'] ?? 'Guest';
$email    = $_POST['email'] ?? '';
$phone    = $_POST['phone'] ?? '';
$total    = $_POST['total'] ?? 0;
$city = $_POST['city'] ?? '';
$address = $_POST['address'] ?? '';
$date     = date("Y-m-d");

try {
    $pdo->beginTransaction();

    $cartStmt = $pdo->prepare("SELECT c.product_id, c.qty, p.price 
                               FROM cart_items c 
                               JOIN products p ON c.product_id = p.id 
                               WHERE c.user_id = ?");
    $cartStmt->execute([$user_id]);
    $cartItems = $cartStmt->fetchAll();

    if (empty($cartItems)) {
        throw new Exception("Your cart is empty. Cannot place an order.");
    }



    $stmt = $pdo->prepare("INSERT INTO orders (userId, userName, email, phone, city, address, date, status, total) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)");
    $stmt->execute([$user_id, $userName, $email, $phone, $city, $address, $date, $total]);
    $order_id = $pdo->lastInsertId();

    if (!$order_id) {
        throw new Exception("Failed to get Order ID. Check Auto-Increment.");
    }

    $itemStmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)");
    foreach ($cartItems as $item) {
        $itemStmt->execute([
            $order_id,
            $item['product_id'],
            $item['qty'],
            $item['price']
        ]);
    }

    $clearCart = $pdo->prepare("DELETE FROM cart_items WHERE user_id = ?");
    $clearCart->execute([$user_id]);

    $pdo->commit();
    echo json_encode(["status" => "success", "message" => "Order #$order_id placed successfully!"]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode(["status" => "error", "message" => "Database Error: " . $e->getMessage()]);
}
?>