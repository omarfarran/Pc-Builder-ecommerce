<?php
$conn = new mysqli("localhost", "root", "", "admins");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$success = false;
$error = "";
$reset_link = "";

if (isset($_POST['submit_reset'])) {

    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $result = $conn->query("SELECT * FROM users WHERE email = '$email'");

    if ($result->num_rows > 0) {

        $token  = bin2hex(random_bytes(32));
        $expire = date("Y-m-d H:i:s", strtotime('+1 hour'));

        $conn->query("
            UPDATE users 
            SET reset_token = '$token', token_expire = '$expire' 
            WHERE email = '$email'
        ");

        $reset_link = "../Php/reset_password.php?token=$token&email=$email";
        $success = true;

    } else {
        $error = "Email not found in our system.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
</head>

<body class="bg-light d-flex align-items-center justify-content-center" style="height:100vh;">

<div class="card shadow-lg p-4 text-center" style="max-width: 500px; width:100%;">

    <?php if ($success): ?>

        <!-- SUCCESS ICON -->
        <i class="bi bi-check-circle-fill text-success mb-3" style="font-size:4rem;"></i>

        <h3 class="text-success">Success!</h3>

        <p class="text-muted">
            Account found. Click the button below to reset your password.
        </p>

        <a href="<?= $reset_link ?>" class="btn btn-primary w-100 mb-3">
            Reset Password
        </a>

    <?php else: ?>

        <!-- ERROR ICON -->
        <i class="bi bi-x-circle-fill text-danger mb-3" style="font-size:4rem;"></i>

        <h3 class="text-danger">Error!</h3>

        <p class="text-muted">
            <?= $error ?>
        </p>

    <?php endif; ?>

    <a href="../Html/forgot-password.html" class="text-decoration-none">
        ← Go Back
    </a>
</div>

</body>
</html>
