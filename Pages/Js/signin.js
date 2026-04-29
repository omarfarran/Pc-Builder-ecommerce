async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch("../Php/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.status === "success") {
            localStorage.setItem("currentUser", JSON.stringify(data.user));

            if (data.role === "admin") {
                window.location.href = "../Admin/dashboard.html";
            } else {
                window.location.href = "products.html";
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server connection error. Check XAMPP.");
    }
}