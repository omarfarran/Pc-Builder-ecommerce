<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method Not Allowed"
    ]);
    exit;
}

$host = "localhost";
$dbname = "admins";
$user = "root";
$pass = "";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
} catch (PDOException $e) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON data"
    ]);
    exit;
}

$fullName = trim($data["fullName"] ?? "");
$email    = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if ($fullName === "" || $email === "" || $password === "") {
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit;
}


$check = $pdo->prepare(
    "SELECT id FROM users WHERE email = ? LIMIT 1"
);
$check->execute([$email]);

if ($check->fetch()) {
    echo json_encode([
        "status" => "error",
        "message" => "Email already exists"
    ]);
    exit;
}


$stmt = $pdo->prepare(
    "INSERT INTO users (fullName, email, password)
     VALUES (?, ?, ?)"
);

$success = $stmt->execute([
    $fullName,
    $email,
    $password
]);

if (!$success) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create account"
    ]);
    exit;
}


echo json_encode([
    "status" => "success",
    "user" => [
        "id" => $pdo->lastInsertId(),
        "fullName" => $fullName,
        "email" => $email
    ]
]);
