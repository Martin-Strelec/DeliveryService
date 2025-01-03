document.addEventListener("DOMContentLoaded", () => {
    //Initialization
    init();
    //Updating values
    updateValues();
});

function init() {
    //Returning html elements
    const createAccountButton = document.getElementById("createAccountButton");
    const cancelButton = document.getElementById('cancelButton');

    //Adding event listener for createAccountButton
    createAccountButton.addEventListener("click", (e) => {
        e.preventDefault();
        createUser();
    })

    //Adding event listener for createAccountButton
    cancelButton.addEventListener("click", () => {
        history.back();
    });
}
function createUser() {
    //Returning values from localStorage
    const users = JSON.parse(localStorage.getItem("users"));

    //Returning values from the form input fields and creating a new user object
    createdUser = {
        id: users.count,
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

    //Checking if the user is not already in the localStorage
    const index = users.map((u) => u.email).indexOf(createdUser.email);

    if (index !== -1) {
        const alert = document.getElementById('actionAlert');

        alert.innerHTML = 'User with this email already exists! Change the email'
        alert.removeAttribute('hidden');  
    }
    //User is added to the localStorage
    else {
        users.push(createdUser);
        localStorage.setItem("users", JSON.stringify(users));
        history.back();
    }

    localStorage.setItem("currentUser", JSON.stringify(createdUser));
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
