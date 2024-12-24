document.addEventListener('DOMContentLoaded', () => {
    //Initializes buttons
    initButtons();
    //Update values
    updateValues();
    //Fetching the establishments from the localStorage
    fetchEstablishments('./json/data.json');
})
async function fetchEstablishments(path) {
    try {
        const response = await fetch(path); // Await fetch call
        const jsonData = await response.json(); // Await response parsing
        data = jsonData.items; // Set global data to fetched data
        data.forEach(item => {
            const cityFilter = localStorage.getItem('cityFilter')
            if (cityFilter === item.location.city || 
                cityFilter === '') {
                createCard(item, document.getElementById('shopDisplay'));
            }
        })
    } catch (error) {
        console.error(`Error fetching establishments: ${error.message}`);
    }
}
//Asynchrounous creating of establishments cards
async function createCard(item, element) {
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
    cardButton.setAttribute('class', 'btn btn-secondary');
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
function showAlert(state) {
    //Used for showing the alert if the city does not match any establishment stored in the localStorage
    const alert = document.getElementById('filterAlert');

    if (state) {
        alert.innerHTML = 'Could not find any establishments!';
        alert.removeAttribute('hidden');
    }
}
function initButtons() {
    //Returning html elements
    const clearFilterButton = document.getElementById('clearFilterButton');
    const searchBarField = document.getElementById('searchBarField');
    const alert = document.getElementById('filterAlert');

    //Adding eventListener to the seacrhbarField. Used for clearing the searchbar and the alert
    searchBarField.addEventListener('click', () => {
        document.getElementById('filterAlert').setAttribute('hidden',true);
        localStorage.setItem('cityFilter','');
    })

    //Adding eventListener for the clearFilterButton
    clearFilterButton.addEventListener('click', () => {
        clearFilterButton.setAttribute('hidden',true);
        alert.setAttribute('hidden',true);
        localStorage.setItem('cityFilter','');
        document.getElementById('shopDisplay').innerHTML = '';
        fetchEstablishments('./json/data.json');
        updateValues();
    })
}
function updateValues() {
    //Local storage return values
    const getCart = localStorage.getItem('cart');
    const getCityFilter = localStorage.getItem('cityFilter');

    //Selecting elements on the page
    const currentUserIcon = document.getElementById('currentUser');
    const cartCount = document.getElementById('cartCount');
    const searchBarField = document.getElementById('searchBarField');
    const clearFilterButton = document.getElementById('clearFilterButton');
    
    if (getCityFilter !== '') {
        clearFilterButton.removeAttribute('hidden');
    }

    if (getCityFilter === '-1') {
        showAlert(true);
    }

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
    searchBarField.value = localStorage.getItem('cityFilter') === '-1' ? '' : localStorage.getItem('cityFilter');

    displayUser(currentUserIcon);
}
function displayUser(element) {
    if (localStorage.getItem('currentUser') !== '') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        element.setAttribute('class', 'bg-light rounded-3 p-1 ms-1 small');
        element.textContent = `${currentUser.uName}`;
    }
}