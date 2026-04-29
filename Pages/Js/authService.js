async function getUsers(){

  // users.json الأصلي
  const res = await fetch("../../Data/users.json");
  const staticUsers = await res.json();

  // users مشتركين بالـ localStorage
  const localUsers =
    JSON.parse(localStorage.getItem("users")) || [];

  // دمجهم
  return [...staticUsers, ...localUsers];
}

function saveUser(user){

  let users =
    JSON.parse(localStorage.getItem("users")) || [];

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
}
function togglePassword() {
  const passwordInput = document.getElementById("password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
