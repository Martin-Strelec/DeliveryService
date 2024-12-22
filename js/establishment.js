document.addEventListener('DOMContentLoaded', () => {
    const selected = JSON.parse(localStorage.getItem('selectedEstablishment'));
    const menuSelect = document.getElementById('selection');
    const content = document.getElementById('content');

    //Setting title
    const title = document.querySelector('title');
    title.innerHTML = (`${selected.establishmentName}`);

    console.log(localStorage.getItem('cart'));
    console.log(localStorage.getItem('cartCount'));

    createAccordion(selected, menuSelect);
    createActionMenu(menuSelect, selected)
    createContent(selected, content);
    updateValues();

    // console.log(document.getElementById('itemCount-Clam Chowder'));
    // console.log(document.getElementById('Clam Chowder-add-btn'));
    // console.log(document.getElementById('search'));
})

function createAccordion(item, container) {

    //Create container for the accordion
    const accordionContainer = document.createElement('div');

    //Set attributes for the accodion container
    accordionContainer.classList.add('accordion');
    accordionContainer.setAttribute('id', 'accordionParent');

    //Add all the sections included in the data.json file
    for (var i = 0; i < item.menu.length; i++) {

        //Create accordion item elements
        const accordionItem = document.createElement('div');
        const accordionBody = document.createElement('div');
        const accordionCollapse = document.createElement('div');
        const accordionHeader = document.createElement('h2');
        const accordionCollapseButton = document.createElement('button');

        //Add class for the accordion item
        accordionItem.classList.add('accordion-item');

        //Add class for the accordion header
        accordionHeader.classList.add('accordion-header');

        //Set attributes for the accodionCollapse button
        accordionCollapseButton.setAttribute('class', 'accordion-button collapsed');
        accordionCollapseButton.setAttribute('type', 'button');
        accordionCollapseButton.setAttribute('data-bs-toggle', 'collapse');
        accordionCollapseButton.setAttribute('data-bs-target', `#collapse-${i}`);
        accordionCollapseButton.setAttribute('aria-expanded', 'false');
        accordionCollapseButton.setAttribute('data-bs-target', `#collapse-${i}`);
        accordionCollapseButton.setAttribute('aria-controls', `collapse-${i}`);
        accordionCollapseButton.textContent = `${Object.keys(item.menu[i])}`;

        //Set attributes for the accordion collapse container
        accordionCollapse.setAttribute('id', `collapse-${i}`);
        accordionCollapse.setAttribute('class', 'accordion-collapse collapse');
        accordionCollapse.setAttribute('data-bs-parent', 'accordionParent');

        //Add class for the accordion body container
        accordionBody.classList.add('accordion-body');

        //Get the object with the index of i from the menu
        const foodGroups = item.menu[i];
        //Get all the objects contained in the foodGroups object
        const foodGroups2 = foodGroups[Object.keys(foodGroups)];

        //Create a container for each item in the object
        foodGroups2.forEach(food => {

            //Create container for each item 
            const container = document.createElement('div');
            const itemContainer = document.createElement('div');
            const buttonContainer = document.createElement('div');
            const accordionBodyItem = document.createElement('p');
            const accordionBodyItemPrice = document.createElement('p');
            const accordionBodyAddButton = document.createElement('button');
            const accordionBodyItemCount = document.createElement('p');
            const accordionBodyRemoveButton = document.createElement('button');

            //Container
            container.setAttribute('class', 'container');

            //Item Container styling
            itemContainer.setAttribute('class', 'row d-flex justify-content-between border border-2 border-secondary rounded-1 p-2 m-2 border-opacity-10')

            //Button Container styling 
            buttonContainer.setAttribute('class', 'd-flex justify-content-end');

            //Get the values from the object
            accordionBodyItem.textContent = food.Type;
            accordionBodyItemPrice.textContent = `${food.Price === 0 ? 'Free' : food.Price + '$'}`;

            accordionBodyItemCount.setAttribute('id', `${food.Type}-count`);
            accordionBodyItemCount.setAttribute('class', 'mx-3');
            accordionBodyItemCount.textContent = '0';

            //Set attributes for the BodyButton
            accordionBodyAddButton.setAttribute('type', 'button');
            accordionBodyAddButton.setAttribute('class', 'btn btn-info');
            accordionBodyAddButton.setAttribute('id', `${food.Type}-add-btn`);
            accordionBodyAddButton.addEventListener('click', () => {
                addToCart(food);
                updateValues();
            })
            accordionBodyAddButton.textContent = "+";

            accordionBodyRemoveButton.setAttribute('type', 'button');
            accordionBodyRemoveButton.setAttribute('class', 'btn btn-danger');
            accordionBodyRemoveButton.setAttribute('id', `${food.Type}-remove-btn`);
            accordionBodyRemoveButton.addEventListener('click', () => {
                removeFromCart(food);
                updateValues();
            })
            accordionBodyRemoveButton.textContent = "-";

            //Append all containers to the item
            const elementContainer1 = document.createElement('div');
            const elementContainer2 = document.createElement('div');
            const elementContainer3 = document.createElement('div');

            elementContainer1.setAttribute('class', 'col-sm-10 col-lg-6 align-items-center text-left');
            elementContainer1.appendChild(accordionBodyItem);
            itemContainer.appendChild(elementContainer1);

            elementContainer2.setAttribute('class', 'col-sm-2 col-lg-2 align-items-center text-sm-left text-md-center');
            elementContainer2.appendChild(accordionBodyItemPrice);
            itemContainer.appendChild(elementContainer2);

            elementContainer3.setAttribute('class', 'col-lg-4 align-items-center justify-content-end');
            buttonContainer.appendChild(accordionBodyAddButton);
            buttonContainer.appendChild(accordionBodyItemCount);
            buttonContainer.appendChild(accordionBodyRemoveButton);
            elementContainer3.appendChild(buttonContainer);

            itemContainer.appendChild(elementContainer3);
            container.appendChild(itemContainer);

            //Finally append the item container to accordion body
            accordionBody.appendChild(container);
        })

        //Append all of the elements to the accordion container
        accordionHeader.appendChild(accordionCollapseButton);
        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionCollapse);
        accordionContainer.appendChild(accordionItem);
    }
    container.appendChild(accordionContainer);
}
function createContent(establishment, element) {
    const container = document.createElement('div');
    const heading = document.createElement('h1');
    const deliveryHours = document.createElement('p');
    const openingHours = document.createElement('p');
    const description = document.createElement('p');

    //heading
    heading.setAttribute('class', 'mb-3');
    heading.textContent = `${establishment.establishmentName}`;

    //delivery hours
    deliveryHours.setAttribute('class', 'fw-light');
    deliveryHours.textContent = `Delivery Hours: ${establishment.deliveryHours}`;

    //opening hours
    openingHours.setAttribute('class', 'fw-light');
    openingHours.textContent = `Opening hours: ${establishment.openingHours}`;

    //description
    description.setAttribute('class', 'fw-light');
    description.textContent = `${establishment.description}`;

    //Appending to element
    container.appendChild(heading);

    container.appendChild(deliveryHours);
    container.appendChild(openingHours);
    container.appendChild(description);

    element.appendChild(container);
}
function createActionMenu(element) {
    const container = document.createElement('div');
    const rowContainer = document.createElement('div');
    const elementContainer1 = document.createElement('div');
    const elementContainer2 = document.createElement('div');
    const removeAllButton = document.createElement('input');
    const checkoutButton = document.createElement('a');
    const itemCount = document.createElement('p');
    const priceCount = document.createElement('p');

    //container
    container.setAttribute('class', 'container');
    container.setAttribute('hidden', true);
    container.setAttribute('id', 'actionMenu');
    //row
    rowContainer.setAttribute('class', 'row align-items-center justify-content-center');

    //Discard all button
    removeAllButton.setAttribute('type', 'button');
    removeAllButton.setAttribute('class', 'btn btn-primary');
    removeAllButton.setAttribute('id', 'discardAll-action-btn');
    removeAllButton.setAttribute('value', 'Discard All');
    removeAllButton.addEventListener('click', () => {
        localStorage.setItem('cart', '[]');
        updateValues();
    })

    //Checkout button
    checkoutButton.setAttribute('type', 'button');
    checkoutButton.setAttribute('class', 'btn btn-primary');
    checkoutButton.setAttribute('href', './cart.html');
    checkoutButton.setAttribute('id', 'checkout-action-btn');
    checkoutButton.textContent = 'Go to Cart 🛒';

    itemCount.setAttribute('id', 'itemsCount');
    itemCount.textContent = '0';

    priceCount.setAttribute('id', 'itemsPrice');
    priceCount.textContent = '0';

    elementContainer1.setAttribute('class', 'd-flex mt-2 justify-content-between');
    elementContainer1.appendChild(itemCount);
    elementContainer1.appendChild(priceCount);
    rowContainer.appendChild(elementContainer1);

    elementContainer2.setAttribute('class', 'col-md-12 my-2 d-flex justify-content-md-between justify-content-center gap-2');
    elementContainer2.appendChild(removeAllButton);
    elementContainer2.appendChild(checkoutButton);
    rowContainer.appendChild(elementContainer2);

    container.appendChild(rowContainer);
    element.appendChild(container);
}

function addToCart(food) {
    //LocalStorage return values
    
    getCart = localStorage.getItem('cart');
    console.log(getCart);

    //Temp variables
    var tempTotal = parseInt(localStorage.getItem('cartTotal'));
    var tempCount = parseInt(localStorage.getItem('cartCount'));
    var tempCart = [];
    var updatedFood;
    const spreadedFood = {
        count: 1
    }

    if (getCart === '[]') {
        updatedFood = { ...food, ...spreadedFood }
        tempTotal = updatedFood.Price;
        tempCount = 1;
        tempCart.push(updatedFood);
    }
    else {
        tempCart = JSON.parse(getCart);
        const index = tempCart.map((t) => t.Type).indexOf(food.Type);

        if (index !== -1) {
            tempCart[index].count += 1;
        }
        else {
            updatedFood = { ...food, ...spreadedFood };
            tempCart.push(updatedFood);
        }
    }

    localStorage.setItem('cart', JSON.stringify(tempCart));

}
function removeFromCart(food) {
    const getCart = localStorage.getItem('cart');

    if (getCart !== '[]') {
        tempCart = JSON.parse(getCart);
        const index = tempCart.map((t) => t.Type).indexOf(food.Type);

        if (index !== -1) {
            tempCart[index].count -= 1;
            if (tempCart[index].count == 0) {
                tempCart.splice(index,1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(tempCart));
    }
}
function updateValues() {
    //Local storage return values
    const getCart = localStorage.getItem('cart');

    //Selecting elements on the page
    const itemsCount = document.getElementById('itemsCount');
    const itemsPrice = document.getElementById('itemsPrice');
    const currentUserIcon = document.getElementById('currentUser');
    const cartCount = document.getElementById('cartCount');

    const allItemsCount = document.querySelectorAll('[id$="-count"]');

    var tempTotal = 0;
    var tempCount = 0;

    if (getCart !== '[]') {
        const getCart = JSON.parse(localStorage.getItem('cart'));
        actionMenuVisible(true);

        getCart.forEach(item => {
            const itemCount = document.getElementById(`${item.Type}-count`);
            if (itemCount !== null) {
                itemCount.textContent = `${item.count}`;
            }

            console.log(item.count * item.Price);
            console.log(parseInt(item.count * item.Price));

            tempTotal += item.count * item.Price;
            tempCount += item.count;
            console.log(tempTotal);
            console.log(tempCount);
        })
    }
    else {
        actionMenuVisible(false)
        allItemsCount.forEach(item => {
            item.textContent = '0';
        })
        tempTotal = 0;
        tempCount = 0;
    }

    localStorage.setItem('cartCount', `${tempCount}`);
    localStorage.setItem('cartTotal', `${tempTotal}`);

    cartCount.innerHTML = tempCount === 0 ? '0' : tempCount;
    itemsCount.textContent = tempCount === 0 ? '' : `Items: ${tempCount}`;
    itemsPrice.textContent = tempTotal === 0 ? '' : `Price: ${tempTotal}$`;
    displayUser(currentUser, currentUserIcon);
}
function actionMenuVisible(state) {
    const menu = document.getElementById('actionMenu');
    if (state) {
        menu.removeAttribute('hidden');
    }
    else {
        menu.setAttribute('hidden', 'true');
    }
}
function displayUser(user, element) {
    if (localStorage.getItem('currentUser') !== '') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        element.setAttribute('class', 'bg-primary rounded-3 p-1 ms-1 text-white small');
        element.textContent = `${currentUser.uName}`;
    }
}