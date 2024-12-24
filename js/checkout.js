document.addEventListener('DOMContentLoaded', () => {
    //Initialization of the buttons
    initSubmitButton();
    //Updating values
    updateValues();
    //Displaying elements based on the cart
    displayElements();
})
function displayElements() {
    //Returning values from local storage
    const getUser = localStorage.getItem('currentUser');
    const cart = JSON.parse(localStorage.getItem('cart'));

    //Returning html elements from the page
    const deliveryDetails = document.getElementById('deliveryDetails');
    const orderSummaryItems = document.getElementById('orderSummaryItems');

    //Checking active user
    if (getUser === '') {
        //Prompts the user to login or register
        const container = document.createElement('div');

        deliveryDetails.innerHTML = '';

        container.setAttribute('class', 'container text-center justify-content-center bg-secondary p-3 rounded col-9');

        const heading = document.createElement('p');
        const loginButton = document.createElement('a');
        const registerButton = document.createElement('a');

        heading.innerHTML = 'Log In / Register to continue'

        loginButton.setAttribute("type", "button");
        loginButton.setAttribute("href", "./login.html");
        loginButton.setAttribute("class", "btn btn-primary m-1");
        loginButton.textContent = "Login";

        registerButton.setAttribute("type", "button");
        registerButton.setAttribute("href", "./register.html");
        registerButton.setAttribute("class", "btn btn-primary m-1");
        registerButton.textContent = "Register";

        container.appendChild(heading);
        container.appendChild(loginButton);
        container.appendChild(registerButton);
        deliveryDetails.appendChild(container);
    }
    else {
        //Displays the user's delivery information
        const cardForm = document.getElementById('cardForm');

        cardForm.removeAttribute('hidden');

        currentUser = JSON.parse(getUser);
        document.getElementById('name').innerHTML = `${currentUser.firstName} ${currentUser.lastName}`;
        document.getElementById('phone').innerHTML = `${currentUser.phone}`;
        document.getElementById('address').innerHTML = `${currentUser.address}, ${currentUser.country}, ${currentUser.eircode}`
    }
    const selected = JSON.parse(localStorage.getItem('selectedEstablishment'));
    const heading = document.getElementById('establishmentHeading');

    heading.innerHTML = `${selected.establishmentName}`;
    heading.setAttribute('class', 'border-bottom text-center pb-2');

    //Displaying all of the items in the cart
    cart.forEach(item => {
        const container = document.createElement('div');
        const itemName = document.createElement('p');
        const itemCount = document.createElement('p');
        const itemTotalPrice = document.createElement('p');

        container.setAttribute('class', 'd-flex gap-3');

        itemName.innerHTML = `${item.Type}`;
        itemName.setAttribute('class', 'flex-grow-1');
        itemCount.innerHTML = `${item.count} x`;
        itemTotalPrice.innerHTML = `${item.count * item.Price}$`;

        container.appendChild(itemCount);
        container.appendChild(itemName);
        container.appendChild(itemTotalPrice);

        orderSummaryItems.appendChild(container);
    })
}
function initSubmitButton() {
    const submitOrderButton = document.getElementById('submitOrderButton');

    submitOrderButton.addEventListener("click", (e) => {
        e.preventDefault();
        cardValidation();
    });
}
function cardValidation() {
//Validating the card. If the card is valid, user is moved to different window. If not, the page will throw up errors
    const cards = JSON.parse(localStorage.getItem('cards'));
    const submitAlert = document.getElementById('submitAlert');

    const nameOnTheCard = document.getElementById("nameOnTheCardInput").value;
        const cardNumber = document.getElementById("cardNumberInput").value;
        const scc = document.getElementById("sccInput").value;
        const index = cards.map((u) => u.cardNumber).indexOf(cardNumber);
        if (index !== -1) {
            if (cards[index].nameOnTheCard === nameOnTheCard) {
                if (cards[index].SCC === scc) {
                    localStorage.setItem('cart',JSON.stringify([]));
                    window.location = "./orderSuccess.html"
                }
                else {
                    submitAlert.innerHTML = "Wrong SCC!";
                    submitAlert.removeAttribute('hidden');
                }
            } else {
                submitAlert.innerHTML = "Wrong Name!";
                submitAlert.removeAttribute('hidden');
            }
        } else {
            submitAlert.innerHTML = "Card Does not Exist!";
            submitAlert.removeAttribute('hidden');
        }
}
function updateValues() {
    //Local storage return values
    const getCart = localStorage.getItem('cart');


    //Selecting elements on the page
    const currentUserIcon = document.getElementById('currentUser');
    const cartCount = document.getElementById('cartCount');
    const totalCount = document.getElementById('totalCount');
    const totalPrice = document.getElementById('totalPrice');

    //Temp variables
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


    totalCount.innerHTML = `Items: ${tempCount}`;
    totalPrice.innerHTML = `Price: ${tempTotal}$`;

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



