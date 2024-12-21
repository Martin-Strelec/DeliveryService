console.log(JSON.parse(localStorage.getItem('cards')));

document.addEventListener('DOMContentLoaded', () => {
    initSubmitButton();
    updateValues();
    displayElements();
})

function displayElements() {

    const getUser = localStorage.getItem('currentUser');
    const cart = JSON.parse(localStorage.getItem('cart'));

    const deliveryDetails = document.getElementById('deliveryDetails');
    const orderSummaryItems = document.getElementById('orderSummaryItems');

    if (getUser === '') {
        const container = document.createElement('div');

        deliveryDetails.innerHTML = '';

        container.setAttribute('class', 'container bg-secondary p-3 rounded col-9');

        const heading = document.createElement('p');
        const loginButton = document.createElement('a');

        heading.innerHTML = 'Log In / Register to continue'

        loginButton.setAttribute("type", "button");
        loginButton.setAttribute("href", "./login.html");
        loginButton.setAttribute("class", "btn btn-primary");
        loginButton.textContent = "Login / Register";

        container.appendChild(heading);
        container.appendChild(loginButton);
        deliveryDetails.appendChild(container);
    }
    else {
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
    const cards = JSON.parse(localStorage.getItem('cards'));

    const submitOrderButton = document.getElementById('submitOrderButton');
    const submitAlert = document.getElementById('submitAlert');

    submitOrderButton.addEventListener("click", (e) => {
        e.preventDefault();
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
    });
}
function updateValues() {
    //Local storage return values
    const getCart = localStorage.getItem('cart');


    //Selecting elements on the page
    const currentUserIcon = document.getElementById('currentUser');
    const cartCount = document.getElementById('cartCount');
    const totalCount = document.getElementById('totalCount');
    const totalPrice = document.getElementById('totalPrice');

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
        element.setAttribute('class', 'bg-primary rounded-3 p-1 ms-1 text-white small');
        element.textContent = `${currentUser.uName}`;
    }
}



