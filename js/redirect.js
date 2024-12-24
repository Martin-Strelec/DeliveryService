//Used to redirect user if there is no currentUser selected
if (localStorage.getItem("currentUser") === "") {
    window.location = './login.html';
  }