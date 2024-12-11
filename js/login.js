document.addEventListener("DOMContentLoaded", () => {
  init();
  
  updateValues();
});

function init() {
  initButtons();
  loginUser();
}

function initButtons() {
  const forgotPasswordButton = document.getElementById('forgotPassword');
  const registerButton = document.getElementById('register');

  forgotPasswordButton.addEventListener('click', () => {

  })
  registerButton.addEventListener('click', () => {
    window.location = './register.html';
  })
}

function loginUser() {
  const users = JSON.parse(localStorage.getItem("users"));

  const login = document.getElementById("loginForm");
  const loginButton = document.getElementById("login");

  const loginAlert = document.getElementById('loginAlert');

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const index = users.map((u) => u.email).indexOf(email);
    if (index !== -1) {
      if (users[index].pwd === password) {
        localStorage.setItem('currentUser',JSON.stringify(users[index]));
        history.back();
      } else {
        loginAlert.innerHTML = "Wrong Password!";
        loginAlert.removeAttribute('hidden');
      }
    } else {
      loginAlert.innerHTML = "Email not Found!";
      loginAlert.removeAttribute('hidden');
    }
  });
}
function updateValues() {
  const cartCount = document.getElementById("cartCount");
  const currentUserIcon = document.getElementById("currentUser");

  const cart = JSON.parse(localStorage.getItem("cart"));

  var totalCount = 0;

  displayUser(currentUserIcon);

  if (cart.length !== 0) {
    cart.forEach((item) => {
      totalCount += item.count;
    });
    cartCount.textContent = `${totalCount}`;
  } else {
    cartCount.textContent = "0";
  }
}
function displayUser(element) {
  if (localStorage.getItem("currentUser") !== "") {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    element.setAttribute(
      "class",
      "bg-primary rounded-3 p-1 ms-1 text-white small"
    );
    element.textContent = `${currentUser.uName.substring(0, 3)}...`;
  }
}
