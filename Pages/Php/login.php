<?php
// Php/login.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
session_start();

$host = "localhost";
$dbname = "admins";
$user = "root";
$pass = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "No data received"]);
        exit;
    }

    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT id, name, email, password, role FROM admins WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($admin && $admin['password'] === $password) {
        $_SESSION['user_id'] = $admin['id'];
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['user_role'] = 'admin';


        echo json_encode(["status" => "success", "role" => "admin", "user" => $admin]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id, fullName AS name, email, password FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $user['password'] === $password) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_role'] = 'user';
        $_SESSION['admin_logged_in'] = false;

        echo json_encode(["status" => "success", "role" => "user", "user" => $user]);
        exit;
    }

    echo json_encode(["status" => "error", "message" => "wrong password or email"]);

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>