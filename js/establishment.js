document.addEventListener('DOMContentLoaded', () => {
    //Returning values from localStorage
    const selected = JSON.parse(localStorage.getItem('selectedEstablishment'));
    //Returning html elements
    const menuSelect = document.getElementById('selection');
    const content = document.getElementById('content');

    //Setting title
    const title = document.querySelector('title');
    title.innerHTML = (`${selected.establishmentName}`);

    //Creates the accordion element based on the menu of selected establishment 
    createAccordion(selected, menuSelect);
    //Creates action menu that allows the user to continue to cart or to discard all items 
    createActionMenu(menuSelect, selected)
    //Creates information section containing info about the establishment
    createContent(selected, content);
    updateValues();
})

function createAccordion(item, container) {

    //Create container for the accordion
    const accordionContainer = document.createElement('div');
    const heading = document.createElement('h1');

    //Heading 
    heading.setAttribute('class','text-center');
    heading.textContent = `${item.establishmentName} Menu`;

    //Set attributes for the accodion container
    accordionContainer.setAttribute('class','accordion');
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
            container.setAttribute('class', 'container ');

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
    container.appendChild(heading);
    container.appendChild(accordionContainer);
}
function createContent(establishment, element) {
    //Defining main container 
    const container = document.createElement('div');

    //Defining generalInfoContainer
    const generalInfoContainer = document.createElement('div');
    const generalInfoHeading = document.createElement('h2');
    const deliveryHoursContainer = document.createElement('div');
    const deliveryHoursHeading = document.createElement('h4');
    const deliveryHoursContent = document.createElement('p');
    const openingHoursContainer = document.createElement('div');
    const openingHoursHeading = document.createElement('h4');
    const openingHoursContent = document.createElement('p');
    const descriptionContainer = document.createElement('div');
    const descriptionContent = document.createElement('p');
    const contactContainer = document.createElement('div');
    const contactHeading = document.createElement('h4');
    const contactPhone = document.createElement('p');
    const contactEmail = document.createElement('p');

    //Defining locationInfo container
    const locationContainer = document.createElement('div');
    const locationHeading = document.createElement('h2');
    const locationAddressContainer = document.createElement('div');
    const locationAddressHeading = document.createElement('h4');
    const locationAddressContent = document.createElement('p');
    const mapContainer = document.createElement('div');
    
    
    //Main container 
    container.setAttribute('class','row justify-content-center p-3')

    //General Info container
    generalInfoContainer.setAttribute('class','row bg-light rounded-3 m-3 p-3');

    //Generail info heading
    generalInfoHeading.innerHTML = 'About us';
    generalInfoHeading.setAttribute('class','text-center py-2');

    //delivery hours
    deliveryHoursContainer.setAttribute('class','container col-lg-6');
    deliveryHoursHeading.innerHTML = 'Delivery Hours';
    deliveryHoursHeading.setAttribute('class','fw-normal');
    deliveryHoursContent.setAttribute('class', 'fw-light');
    deliveryHoursContent.innerHTML = `${establishment.deliveryHours}`;
    deliveryHoursContainer.appendChild(deliveryHoursHeading);
    deliveryHoursContainer.appendChild(deliveryHoursContent);

    //opening hours
    openingHoursContainer.setAttribute('class','container col-lg-6');
    openingHoursHeading.innerHTML = 'Opening Hours';
    openingHoursHeading.setAttribute('class','fw-normal');
    openingHoursContent.setAttribute('class', 'fw-light');
    openingHoursContent.textContent = `${establishment.openingHours}`;
    openingHoursContainer.appendChild(openingHoursHeading);
    openingHoursContainer.appendChild(openingHoursContent);

    //description
    descriptionContainer.setAttribute('class','container');
    descriptionContent.setAttribute('class', 'fw-light');
    descriptionContent.textContent = `${establishment.description}`;
    descriptionContainer.appendChild(descriptionContent);

    //Contact
    contactContainer.setAttribute('class','container');
    contactHeading.innerHTML = 'Contact';
    contactHeading.setAttribute('class','fw-normal');
    contactPhone.setAttribute('class', 'fw-light');
    contactPhone.textContent = `📞 ${establishment.contact.phone}`;
    contactEmail.setAttribute('class','fw-light');
    contactEmail.textContent = `📧 ${establishment.contact.email}`;
    contactContainer.appendChild(contactHeading);
    contactContainer.appendChild(contactPhone);
    contactContainer.appendChild(contactEmail);

    //Appending to General Info
    generalInfoContainer.appendChild(generalInfoHeading);
    generalInfoContainer.appendChild(descriptionContainer);
    generalInfoContainer.appendChild(deliveryHoursContainer);
    generalInfoContainer.appendChild(openingHoursContainer);
    generalInfoContainer.appendChild(contactContainer);
    


    //location
    //Container
    locationContainer.setAttribute('class','row p-3 m-3 rounded-3 bg-light');
    //Heading 
    locationHeading.innerHTML = 'Where to find us 📌';
    locationHeading.setAttribute('class','text-center py-2');
    //Address
    locationAddressContainer.setAttribute('class','col-md-6');
    locationAddressHeading.innerHTML = 'Address';
    locationAddressHeading.setAttribute('class','fw-normal');
    locationAddressContent.setAttribute('class','fw-light');
    locationAddressContent.innerHTML = `${establishment.location.address}`;
    locationAddressContainer.appendChild(locationAddressHeading);
    locationAddressContainer.appendChild(locationAddressContent);
    //Map
    mapContainer.setAttribute('class', 'col-md-6 ratio ratio-4x3');
    mapContainer.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3201.0769569355966!2d-8.477088620709557!3d54.271604068860775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485ee9b5677caee9%3A0xa00c7a997317380!2sSligo%2C%20Irsko!5e0!3m2!1scs!2scz!4v1734970892856!5m2!1scs!2scz" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    //Appending to container
    locationContainer.appendChild(locationHeading);
    locationContainer.appendChild(locationAddressContainer);
    locationContainer.appendChild(mapContainer);

    container.appendChild(generalInfoContainer);
    container.appendChild(locationContainer);

    element.appendChild(container);
}
function createActionMenu(element) {
    //Defining elements
    const container = document.createElement('div');
    const rowContainer = document.createElement('div');
    const elementContainer1 = document.createElement('div');
    const elementContainer2 = document.createElement('div');
    const removeAllButton = document.createElement('input');
    const checkoutButton = document.createElement('a');
    const itemCount = document.createElement('p');
    const priceCount = document.createElement('p');

    //container
    container.setAttribute('class', 'container p-1');
    container.setAttribute('hidden', true);
    container.setAttribute('id', 'actionMenu');
    //row
    rowContainer.setAttribute('class', 'row align-items-center justify-content-center');

    //Discard all button
    removeAllButton.setAttribute('type', 'button');
    removeAllButton.setAttribute('class', 'btn btn-light');
    removeAllButton.setAttribute('id', 'discardAll-action-btn');
    removeAllButton.setAttribute('value', 'Discard All');
    removeAllButton.addEventListener('click', () => {
        localStorage.setItem('cart', '[]');
        updateValues();
    })

    //Checkout button
    checkoutButton.setAttribute('type', 'button');
    checkoutButton.setAttribute('class', 'btn btn-light');
    checkoutButton.setAttribute('href', './cart.html');
    checkoutButton.setAttribute('id', 'checkout-action-btn');
    checkoutButton.textContent = 'Go to Cart 🛒';

    itemCount.setAttribute('id', 'itemsCount');
    itemCount.textContent = '0';

    priceCount.setAttribute('id', 'itemsPrice');
    priceCount.textContent = '0';

    //Total count appending 
    elementContainer1.setAttribute('class', 'd-flex mt-2 justify-content-between');
    elementContainer1.appendChild(itemCount);
    elementContainer1.appendChild(priceCount);
    rowContainer.appendChild(elementContainer1);

    //Buttons appending 
    elementContainer2.setAttribute('class', 'col-md-12 my-2 d-flex justify-content-md-between justify-content-center gap-2');
    elementContainer2.appendChild(removeAllButton);
    elementContainer2.appendChild(checkoutButton);
    rowContainer.appendChild(elementContainer2);

    //Appending to the main container
    container.appendChild(rowContainer);
    element.appendChild(container);
}
function addToCart(food) {
    //Same functionality as the function in the checkout.js
    //LocalStorage return values
    getCart = localStorage.getItem('cart');

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
    //Same functionality as the function in the checkout.js
    const getCart = localStorage.getItem('cart');

    if (getCart !== '[]') {
        tempCart = JSON.parse(getCart);
        const index = tempCart.map((t) => t.Type).indexOf(food.Type);

        if (index !== -1) {
            tempCart[index].count -= 1;
            if (tempCart[index].count == 0) {
                document.getElementById(`${food.Type}-count`).innerHTML = '0';
                tempCart.splice(index, 1);
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

            tempTotal += item.count * item.Price;
            tempCount += item.count;
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
function displayUser(element) {
    if (localStorage.getItem('currentUser') !== '') {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        element.setAttribute('class', 'bg-light rounded-3 p-1 ms-1 small');
        element.textContent = `${currentUser.uName}`;
    }
}