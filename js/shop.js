console.log(localStorage.getItem('cards'));
console.log(localStorage.getItem('cart'));
console.log(localStorage.getItem('cartCount'));
console.log(localStorage.getItem('users'));

document.addEventListener('DOMContentLoaded', () => {
    fetchData('./json/data.json');
    updateValues();
})
async function fetchData(path) {
    const main = document.getElementById('shopDisplay');

    fetch(path)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            // // Begin accessing JSON data here
            data.items.forEach(item => {
                createCard(item, main);
            });
        })
        .catch(function (error) {
            // Handle any errors from the fetch operation
            // const errorMessage = document.createElement('marquee');
            // errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
            // main.appendChild(errorMessage);
        });
}
function createCard(item, element) {
    //Creating card
    const card = document.createElement('div');
    card.setAttribute('class', 'card col-md-3 px-0');
    card.setAttribute('style', 'width: 19rem')

    //Card body
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    //Card banner
    const banner = document.createElement('img');
    banner.setAttribute('src', `${item.banner}`);
    banner.setAttribute('class', 'card-img-top');

    //Card heading
    const cardHeading = document.createElement('h5');
    cardHeading.setAttribute('class', 'card-title');
    cardHeading.textContent = `${item.establishmentName}`;

    //Opening hours
    const cardOpeningHours = document.createElement('p');
    cardOpeningHours.setAttribute('class', 'fw-light');
    cardOpeningHours.textContent = `Delivery Hours: ${item.deliveryHours}`;

    //Card text
    const cardText = document.createElement('p');
    cardText.setAttribute('class', 'card-text');
    cardText.textContent = `${item.description.substring(0, 50)}...`;

    //Card button
    const cardButton = document.createElement('a');
    cardButton.setAttribute('type', 'button');
    cardButton.setAttribute('href', './establishment.html')
    cardButton.setAttribute('class', 'btn btn-primary');
    cardButton.addEventListener('click', () => { 
        const current = localStorage.getItem('selectedEstablishment');
        if (current !== item.establishmentName && current !== '') {
            localStorage.setItem('cart', JSON.stringify([]));
            localStorage.setItem('selectedEstablishment', JSON.stringify(item));
        }
        else {
            localStorage.setItem('selectedEstablishment', JSON.stringify(item));
        } 
    })
    cardButton.textContent = 'View Menu';

    //Card appending
    card.appendChild(banner);
    card.appendChild(cardBody);
    cardBody.appendChild(cardHeading);
    cardBody.appendChild(cardOpeningHours);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    element.appendChild(card);
}
function updateValues() {
    //LocalStorage return values
    const getCartCount = localStorage.getItem('cartCount');

    //Selecting elements on the page
    const cartCount = document.getElementById('cartCount');
    const currentUserIcon = document.getElementById('currentUser');

    displayUser(currentUserIcon);

    cartCount.textContent = `${getCartCount}`;
}
function displayUser(element) {
    if (localStorage.getItem('currentUser') !== '') {
        //JSON parsing
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        element.setAttribute('class', 'bg-primary rounded-3 p-1 ms-1 text-white small');
        element.textContent = `${currentUser.uName}`;
    }
}