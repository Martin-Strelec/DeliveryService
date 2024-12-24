userDetails = JSON.parse(localStorage.getItem("currentUser"));

document.addEventListener("DOMContentLoaded", () => {
  //Used for populationg the fields of the form
  populateFields();
  //Initialization
  init();
  //Updating values
  updateValues();
});
function populateFields() {
  document
    .getElementById("uNameInput")
    .setAttribute("value", userDetails.uName);
  document
    .getElementById("emailInput")
    .setAttribute("value", userDetails.email);
  document
    .getElementById("passwordInput")
    .setAttribute("value", userDetails.pwd);
  document
    .getElementById("firstNameInput")
    .setAttribute("value", userDetails.firstName);
  document
    .getElementById("lastNameInput")
    .setAttribute("value", userDetails.lastName);
  document
    .getElementById("phoneInput")
    .setAttribute("value", userDetails.phone);
  document
    .getElementById("addressInput")
    .setAttribute("value", userDetails.address);
  document
    .getElementById("countryInput")
    .setAttribute("value", userDetails.country);
  document
    .getElementById("eircodeInput")
    .setAttribute("value", userDetails.eircode);
}
function init() {
  //Returning html elements
  const checkPasswordContainer = document.getElementById("checkPassword");
  const actionButtonsContainer = document.getElementById("actionButtons");
  const form = document.getElementById("changeDetailsForm");
  const detailsSubmitButton = document.getElementById("formSubmitButton");
  const password = document.getElementById("changeDetailsField");
  const submitButton = document.getElementById("submitButton");
  const logoutButton = document.getElementById('logoutButton');
  const updateButton = document.getElementById("updateButton");
  const inputFields = document.querySelectorAll("[id$=Input]");

  //Adding eventlistener to the update button
  updateButton.addEventListener("click", () => {
    //Hides the action buttons
    actionButtonsContainer.setAttribute("hidden", "true");
    //Reveals the password field
    checkPasswordContainer.removeAttribute("hidden");
  });

  //Adding event Listener for the logout button. Logs out the user
  logoutButton.addEventListener('click', () => {
    localStorage.setItem('currentUser','');
    window.location = './login.html';
  })

  //Adding eventListener for the submit button
  submitButton.addEventListener("click", () => {
    //CHecks if the user inputted his password correctly. Removes the disabled attribute from the fields
    if (password.value === userDetails.pwd) {
      inputFields.forEach((field) => {
        field.removeAttribute("disabled");
        document.getElementById('passwordInput').setAttribute('type','text');
      });
      //Reveals the update button
      checkPasswordContainer.setAttribute("hidden", "true");
      detailsSubmitButton.removeAttribute("hidden");
      password.value = "";
    } else {
      password.value = "";
      form.setAttribute("class", "was-validated");
    }
  });

  //Adding eventListener for the detailsSubmitButton
  detailsSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    //Updates the user's details
    updateUser();
    //Populates the fields
    populateFields();
    //Disables all fields
    inputFields.forEach((field) => {
      field.setAttribute("disabled", "true");
    });
    //Changes the password input field back to password type
    document.getElementById('passwordInput').setAttribute('type','password');
    //Reveals and hides buttons
    detailsSubmitButton.setAttribute("hidden", "true");
    actionButtonsContainer.removeAttribute("hidden");
  });

  //Adding eventListener to the cancelButton
  cancelButton.addEventListener("click", () => {
    actionButtonsContainer.removeAttribute("hidden");
    checkPasswordContainer.setAttribute("hidden", "true");
  });
}
function updateUser() {
  /*Function gets the currentUser and all users. Function tempCreates a new user with updated values from the currentUser
  * TempUser is then pushed in to the users array that is parsed back into the localStorage
  */
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  updatedUser = {
    id: currentUser.id,
    uName: document.getElementById("uNameInput").value,
    email: document.getElementById("emailInput").value,
    pwd: document.getElementById("passwordInput").value,
    firstName: document.getElementById("firstNameInput").value,
    lastName: document.getElementById("lastNameInput").value,
    phone: document.getElementById("phoneInput").value,
    address: document.getElementById("addressInput").value,
    country: document.getElementById("countryInput").value,
    eircode: document.getElementById("eircodeInput").value,
  };

  console.log(updateUser);

  //Updating user in the user list
  const index = users.map((u) => u.id).indexOf(updatedUser.id);
  if (index !== -1) {
    users.splice(index, 1);
    users.push(updatedUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
  }

  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  updateValues();
}
function updateValues() {
  //Local storage return values
  const getCart = localStorage.getItem('cart');

  //Selecting elements on the page
  const currentUserIcon = document.getElementById('currentUser');
  const cartCount = document.getElementById('cartCount');

  var tempTotal = 0;
  var tempCount = 0;

  if (getCart !== '[]') {
      const getCart = JSON.parse(localStorage.getItem('cart'));

      getCart.forEach(item => {
          const itemCount = document.getElementById(`${item.Type}-count`);
          if (itemCount !== null) {
              itemCount.textContent = `${item.count}`;
          }

          tempTotal += item.count * item.Price;
          tempCount += item.count;
      })
  }
  else {
      tempTotal = 0;
      tempCount = 0;
  }

  cartCount.innerHTML = tempCount;

  displayUser(currentUserIcon);
}
function displayUser(element) {
  if (localStorage.getItem('currentUser') !== '') {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      element.setAttribute('class', 'bg-light rounded-3 p-1 ms-1 small');
      element.textContent = `${currentUser.uName}`;
  }
}
