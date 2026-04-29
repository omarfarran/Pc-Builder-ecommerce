<?php
session_start();
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('HTTP/1.1 401 Unauthorized');
    exit();
}


header('Content-Type: application/json');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");

$host     = "localhost";
$username = "root";
$password = "";
$dbname   = "admins";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';

if ($action == 'get_products') {
    $res = mysqli_query($conn, "SELECT * FROM products ORDER BY id DESC");
    $products = [];
    while ($row = mysqli_fetch_assoc($res)) {
        $products[] = $row;
    }
    echo json_encode($products);
}

if ($action == 'add_product') {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $type = mysqli_real_escape_string($conn, $_POST['type']);
    $brand = mysqli_real_escape_string($conn, $_POST['brand']);
    $price = (float)$_POST['price'];
    $stock = (int)$_POST['stock'];
    $desc = mysqli_real_escape_string($conn, $_POST['description']);
    $image = mysqli_real_escape_string($conn, $_POST['image']);

    $sql = "INSERT INTO products (name, type, brand, price, stock, description, image) 
            VALUES ('$name', '$type', '$brand', $price, $stock, '$desc', '$image')";
    echo json_encode(["success" => mysqli_query($conn, $sql)]);
}

if ($action == 'update_product') {
    $id = (int)$_POST['id'];
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $type = mysqli_real_escape_string($conn, $_POST['type']);
    $brand = mysqli_real_escape_string($conn, $_POST['brand']);
    $price = (float)$_POST['price'];
    $stock = (int)$_POST['stock'];
    $desc = mysqli_real_escape_string($conn, $_POST['description']);
    $image = mysqli_real_escape_string($conn, $_POST['image']);

    $sql = "UPDATE products SET name='$name', type='$type', brand='$brand', price=$price, 
            stock=$stock, description='$desc', image='$image' WHERE id=$id";
    echo json_encode(["success" => mysqli_query($conn, $sql)]);
}

if ($action == 'delete_product') {
    $id = (int)$_POST['id'];
    echo json_encode(["success" => mysqli_query($conn, "DELETE FROM products WHERE id=$id")]);
}
