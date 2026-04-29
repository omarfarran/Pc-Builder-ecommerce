async function signup() {
    const fullName =
        document.getElementById("fullname").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();

    if (!fullName || !email || !password || !confirmPassword) {
        alert("Fill all fields!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const res = await fetch("../Php/signup.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName,
            email,
            password
        })
    });

    const text = await res.text();
    const data = JSON.parse(text);

    if (data.status !== "success") {
        alert(data.message);
        return;
    }

    localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
    );

    window.location.href = "../Html/products.html";
}
