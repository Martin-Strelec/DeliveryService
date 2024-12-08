document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('cart', JSON.stringify([]));
    document.querySelector('#cartCount').innerHTML = localStorage.getItem('count');
    const selected = JSON.parse(localStorage.getItem('selectedEstablishment'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const content = document.getElementById('content')

    //Setting title
    const title = document.querySelector('title');
    title.innerHTML = (`${selected.establishmentName}`);

    
    //createHeader();
    createAccordion(selected, content);
    createActionMenu(content)
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
            container.setAttribute('class','container');

            //Item Container styling
            itemContainer.setAttribute('class', 'row d-flex justify-content-between border border-2 border-secondary rounded-1 p-2 m-2 border-opacity-10')

            //Button Container styling 
            buttonContainer.setAttribute('class', 'd-flex justify-content-end');

            //Get the values from the object
            accordionBodyItem.textContent = food.Type;
            accordionBodyItemPrice.textContent = `${food.Price === 0 ? 'Free' : food.Price + '$'}`;

            accordionBodyItemCount.setAttribute('id', `${food.Type}-count`);
            accordionBodyItemCount.setAttribute('class','mx-3');
            accordionBodyItemCount.textContent = "0";

            //Set attributes for the BodyButton
            accordionBodyAddButton.setAttribute('type', 'button');
            accordionBodyAddButton.setAttribute('class', 'btn btn-info');
            accordionBodyAddButton.setAttribute('id', `${food.Type}-add-btn`);
            accordionBodyAddButton.addEventListener('click', () => {
                addToTempBasket(food, accordionBodyItemCount);
                updateValues();
                
            })
            accordionBodyAddButton.textContent = "+";

            accordionBodyRemoveButton.setAttribute('type', 'button');
            accordionBodyRemoveButton.setAttribute('class', 'btn btn-danger');
            accordionBodyRemoveButton.setAttribute('id', `${food.Type}-remove-btn`);
            accordionBodyRemoveButton.addEventListener('click', () => {
                removeFromTempBasket(food, accordionBodyItemCount);
                updateValues(accordionBodyItemCount);
                document.querySelector('#cartCount').innerHTML = localStorage.getItem('count');
            })
            accordionBodyRemoveButton.textContent = "-";

            //Append all containers to the item
            const elementContainer1 = document.createElement('div');
            const elementContainer2 = document.createElement('div');
            const elementContainer3 = document.createElement('div');

            elementContainer1.setAttribute('class', 'col-sm-10 col-md-6 align-items-center text-left');
            elementContainer1.appendChild(accordionBodyItem);
            itemContainer.appendChild(elementContainer1);

            elementContainer2.setAttribute('class', 'col-sm-2 col-md-2 align-items-center text-sm-left text-md-center');
            elementContainer2.appendChild(accordionBodyItemPrice);
            itemContainer.appendChild(elementContainer2);

            elementContainer3.setAttribute('class', 'col-md-4 align-items-center justify-content-end');
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
function createHeader() {
    const heading = document.createElement('h1');

}
function createActionMenu(element) {
    const container = document.createElement('div');
    const rowContainer = document.createElement('div');
    const elementContainer1 = document.createElement('div');
    const elementContainer2 = document.createElement('div');
    const elementContainer3 = document.createElement('div');
    const removeAllButton = document.createElement('input');
    const itemCount = document.createElement('p');
    const priceCount = document.createElement('p');

    //container
    container.setAttribute('class', 'container');

    //row
    rowContainer.setAttribute('class', 'row align-items-center justify-content-center');

    //button
    removeAllButton.setAttribute('type', 'button');
    removeAllButton.setAttribute('class', 'btn btn-primary');
    removeAllButton.setAttribute('value', 'Discard All');
    removeAllButton.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify([]));
        updateValues();
    })


    itemCount.setAttribute('id', 'itemsCount');
    itemCount.textContent = '0';

    priceCount.setAttribute('id', 'itemsPrice');
    priceCount.textContent = '0';

    elementContainer1.setAttribute('class', 'col-8');
    elementContainer1.appendChild(removeAllButton);
    rowContainer.appendChild(elementContainer1);

    elementContainer2.setAttribute('class', 'col-2');
    elementContainer2.appendChild(itemCount);
    rowContainer.appendChild(elementContainer2);

    elementContainer3.setAttribute('class', 'col-2');
    elementContainer3.appendChild(priceCount);
    rowContainer.appendChild(elementContainer3);

    container.appendChild(rowContainer);
    element.appendChild(container);
}
function addToTempBasket(food, element) {
    var currentCart = [];
    var isInside = false;
    var updatedFood;

    currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart === null) {
        const foodCount = {
            count: 1
        }
        updatedFood = { ...food, ...foodCount }
        currentCart = [updatedFood];
    }
    else {
        currentCart.forEach(item => {
            if (food.Type === item.Type) {
                isInside = true;
                item.count += 1;
                updatedFood = item;
            }
        })
        if (!isInside) {
            foodCount = {
                count: 1
            }
            updatedFood = { ...food, ...foodCount }
            console.log(updatedFood);
            currentCart.push(updatedFood);
        }
    }

    console.log(updatedFood);
    element.textContent = updatedFood.count;
    localStorage.setItem('cart', JSON.stringify(currentCart));
}
function removeFromTempBasket(food, element) {
    var currentCart = [];

    currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart !== null) {
        for (var i = 0; i < currentCart.length; i++) {
            if (food.Type === currentCart[i].Type) {
                currentCart[i].count -= 1;
                element.textContent = `${currentCart[i].count}`;
                if (currentCart[i].count === 0) {
                    currentCart.splice(i, 1);
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }
}
function updateValues() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    var tempPrice = 0;
    var tempCount = 0;
    const itemsCount = document.querySelector(`#itemsCount`);
    const itemsPrice = document.querySelector(`#itemsPrice`);
    const cartCount = document.querySelector('#cartCount');
    const allItemsCount = document.querySelectorAll('[id$="-count"]');

    if (cart.length !== 0) {
        cart.forEach(item => {
            
            tempPrice += item.count * item.Price;
            tempCount += item.count;
        })
    }
    else {
        allItemsCount.forEach(item => {
            item.textContent = '0';
        })
        tempPrice = 0;
        tempCount = 0;
    }

    cartCount.innerHTML = tempCount === 0 ? '':tempCount;
    itemsCount.textContent = tempCount === 0 ? '':`Items: ${tempCount}`;
    itemsPrice.textContent = tempPrice === 0 ? '':`Price: ${tempPrice}$`;
    localStorage.setItem('count', tempCount === 0 ? '': `${tempCount}`);
    localStorage.setItem('cost', tempPrice === 0 ? '': `${tempCount}`);
}
