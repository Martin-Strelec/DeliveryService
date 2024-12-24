/*
*Local storage -> used variables
*
* cart
* cartCount
* cartTotal
* users
* currentUser
* selectedEstablishment
* townFilter 
*
*/

// localStorage.clear();
// console.log(localStorage);

document.addEventListener('DOMContentLoaded', () => {
    //If local storage is empty > define default values
    if (localStorage.length === 0) {
        localStorage.setItem('cartCount', '0');
        localStorage.setItem('cartTotal', '0');
        localStorage.setItem('cart', '[]');
        localStorage.setItem('users', '');
        localStorage.setItem('currentUser', '');
        localStorage.setItem('selectedEstablishment', '');
        localStorage.setItem('cityFilter', '');
        fetchUser('./json/users.json');
        fetchCreditCards('./json/cards.json');
    }
    updateValues();
})
async function fetchUser(path) {
    try {
        const response = await fetch(path); // Await fetch call
        const jsonData = await response.json(); // Await response parsing
        data = jsonData.users; // Set global data to fetched data
        localStorage.setItem('users', JSON.stringify(data));
        localStorage.setItem('currentUser', JSON.stringify(data[0]));
    } catch (error) {
        console.error(`Error fetching establishments: ${error.message}`);
    }
}
async function fetchCreditCards(path) {
    try {
        const response = await fetch(path); // Await fetch call
        const jsonData = await response.json(); // Await response parsing
        data = jsonData.cards; // Set global data to fetched data
        localStorage.setItem('cards', JSON.stringify(data));
    } catch (error) {
        console.error(`Error fetching establishments: ${error.message}`);
    }
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