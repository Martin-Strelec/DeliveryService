/*
*Local storage -> used variables
*
* cart
* cartCount
* cartTotal
* users
* currentUser
* selectedEstablishment
*/

// localStorage.clear();
// console.log(localStorage);

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.length === 0) {
        localStorage.setItem('cartCount', '0');
        localStorage.setItem('cartTotal', '0');
        localStorage.setItem('cart', '[]');
        localStorage.setItem('users', '');
        localStorage.setItem('currentUser', '');
        localStorage.setItem('selectedEstablishment', '');
        fetchUser('./json/users.json');
        fetchCreditCards('./json/cards.json');
    }
    console.log(localStorage.getItem('cards'));
    console.log(localStorage.getItem('cart'));
    console.log(localStorage.getItem('cartCount'));
    console.log(localStorage.getItem('users'));
    updateValues();
})


function fetchUser(path) {
    fetch(path)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            // Begin accessing JSON data here
            localStorage.setItem('users', JSON.stringify(data.users));
            localStorage.setItem('currentUser', "");
        })
        .catch(function (error) {
            // Handle any errors from the fetch operation
            // const errorMessage = document.createElement('marquee');
            // errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
            // main.appendChild(errorMessage);
        });
}
function fetchCreditCards(path) {
    fetch(path)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            // Begin accessing JSON data here
            localStorage.setItem('cards', JSON.stringify(data.cards));
        })
        .catch(function (error) {
            // Handle any errors from the fetch operation
            // const errorMessage = document.createElement('marquee');
            // errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
            // main.appendChild(errorMessage);
        });
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
        element.setAttribute('class', 'bg-primary rounded-3 p-1 ms-1 text-white small');
        element.textContent = `${currentUser.uName}`;
    }
}