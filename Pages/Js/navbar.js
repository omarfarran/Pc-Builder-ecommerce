document.addEventListener("DOMContentLoaded", () => {
    const navUser = document.getElementById("nav-user");
    const userName = document.getElementById("user-name");
    const navSignin = document.getElementById("nav-signin");
    const navSignup = document.getElementById("nav-signup");
    const navLogout = document.getElementById("nav-logout");
    const logoutBtn = document.getElementById("logout-btn");
    const favCounter = document.getElementById("fav-counter");
    const cartCounter = document.getElementById("cart-counter");

    function updateNavbar() {
        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (user) {
            navUser?.classList.remove("d-none");
            navLogout?.classList.remove("d-none");
            navSignin?.classList.add("d-none");
            navSignup?.classList.add("d-none");

            if (userName) {
                userName.textContent = user.name || user.fullName || "User";
            }
        } else {
            navUser?.classList.add("d-none");
            navLogout?.classList.add("d-none");
            navSignin?.classList.remove("d-none");
            navSignup?.classList.remove("d-none");
        }

        if (favCounter) {
            const totalFav = user?.favorites?.length || 0;
            favCounter.textContent = totalFav;
            favCounter.classList.toggle("d-none", totalFav === 0);
        }
    }

    function updateCartCounter() {
        if (!cartCounter) return;
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        cartCounter.textContent = total;
        cartCounter.classList.toggle("d-none", total === 0);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            try {
                await fetch("../Php/logout.php", {
                    method: "GET",
                    credentials: "same-origin"
                });

                localStorage.removeItem("currentUser");
                localStorage.removeItem("cart");


                window.location.href = "../Html/signin.html";

            } catch (err) {
                console.error("Logout failed:", err);
            }
        });
    }

    updateNavbar();
    updateCartCounter();

    window.addEventListener("storage", () => {
        updateNavbar();
        updateCartCounter();
    });
});
