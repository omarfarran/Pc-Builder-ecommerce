<?php
$conn = new mysqli("localhost", "root", "", "admins");

$message = "";
$show_form = false;

if (isset($_GET['token']) && isset($_GET['email'])) {
    $token = mysqli_real_escape_string($conn, $_GET['token']);
    $email = mysqli_real_escape_string($conn, $_GET['email']);
    $now = date("Y-m-d H:i:s");

    $query = "SELECT * FROM users WHERE email='$email' AND reset_token='$token' AND token_expire > '$now'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $show_form = true;
    } else {
        $message = "<div class='alert alert-danger'>Invalid link or expired token!</div>";
    }
}

if (isset($_POST['update_password'])) {
    $new_pass = $_POST['password'];
    $email = $_POST['email'];

    $update = $conn->query("UPDATE users SET password = '$new_pass', reset_token = NULL, token_expire = NULL WHERE email = '$email'");

    if ($update) {
        $message = "<div class='alert alert-success'>Password updated successfully! <a href='../Html/signin.html'>Sign in here</a></div>";
        $show_form = false;
    } else {
        $message = "<div class='alert alert-danger'>Something went wrong!</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../Css/main.css"/>
    <link rel="stylesheet" href="../Css/forgot-password.css"/>
</head>
<body>
<main>
    <div class="page-wrapper d-flex align-items-center justify-content-center" style="min-height: 100vh;">
        <div class="reset-card p-4">
            <h2 class="fw-bold text-white text-center mb-4">New Password</h2>

            <?php echo $message; ?>

            <?php if ($show_form): ?>
                <form action="reset_password.php" method="POST">
                    <input type="hidden" name="email" value="<?php echo htmlspecialchars($_GET['email']); ?>">

                    <div class="mb-3">
                        <label class="text-white mb-2">Enter New Password</label>
                        <input type="password" name="password" required class="form-control bg-dark text-white border-dark" placeholder="Minimum 6 characters">
                    </div>

                    <button type="submit" name="update_password" class="btn btn-light w-100 fw-semibold">
                        Update Password
                    </button>
                </form>
            <?php endif; ?>

            <div class="text-center mt-3">
                <a href="../Html/signin.html" class="back-link">Back to Login</a>
            </div>
        </div>
    </div>
</main>
</body>
</html>