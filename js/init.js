document.addEventListener('DOMContentLoaded', () => {
    fetchUser('./json/users.json'); 
    fetchCards('./json/cards.json');
    updateValues();
})
function fetchUser(path) {
    fetch(path)
    .then(function (response) {
        return response.json();
    })
    .then(data => {
        // Begin accessing JSON data here
        console.log(data.users[0]);
        localStorage.setItem('users',JSON.stringify(data.users));
        //localStorage.setItem('currentUser',JSON.stringify(data.users[0]));
        localStorage.setItem('currentUser',"");
        console.log(localStorage.getItem('defaultUser'));
    })
    .catch(function (error) {
        // Handle any errors from the fetch operation
        // const errorMessage = document.createElement('marquee');
        // errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
        // main.appendChild(errorMessage);
    });
}
function fetchCards (path) {
    fetch(path)
    .then(function (response) {
        return response.json();
    })
    .then(data => {
        // Begin accessing JSON data here
        localStorage.setItem('cards',JSON.stringify(`${data.cards}`));
    })
    .catch(function (error) {
        // Handle any errors from the fetch operation
        // const errorMessage = document.createElement('marquee');
        // errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
        // main.appendChild(errorMessage);
    });
}
function updateValues() {
    const cartCount = document.getElementById('cartCount');
    const cartTotalPrice = document.getElementById('totalPrice');
    const cartTotalCount = document.getElementById('totalCount');
    const currentUserIcon = document.getElementById('currentUser');

    const cart = JSON.parse(localStorage.getItem('cart'));
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    var totalCost = 0;
    var totalCount = 0;

    displayUser(currentUser, currentUserIcon);

    if (cart.length !== 0) {
        cart.forEach(item => {
            totalCost += item.Price * item.count;
            totalCount += item.count;
        })
        cartCount.textContent = `${totalCount}`;
        cartTotalPrice.textContent = `Price: ${totalCost}$`;
        cartTotalCount.textContent = `Items: ${totalCount}`;
    }
    else {
        cartCount.textContent = '0';
    }
}
function displayUser(user, element) {
    element.setAttribute('class','bg-primary rounded-3 p-1 ms-1 text-white small');
    element.textContent = `${user.uName}`;
}