document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#cartCount').innerHTML = localStorage.getItem('count');
    const selected = JSON.parse(localStorage.getItem('selectedEstablishment'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const content = document.getElementById('content')
    
    //Setting title
    const title = document.querySelector('title');
    title.innerHTML = (`${selected.establishmentName}`);

    //createHeader();
    createAccordion(selected, content);
    createActionMenu(cart,content)

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
        foodGroups2.forEach((food, i) => {

            //Create container for each item 
            const itemContainer = document.createElement('div');
            const buttonContainer = document.createElement('div');
            const accordionBodyItem = document.createElement('p');
            const accordionBodyItemPrice = document.createElement('p');
            const accordionBodyAddButton = document.createElement('button');
            const accordionBodyItemCount = document.createElement('p');
            const accordionBodyRemoveButton = document.createElement('button');

            //Item Container styling
            itemContainer.setAttribute('class', 'row d-flex border border-2 border-secondary rounded-1 p-2 m-2 border-opacity-10')

            //Button Container styling 
            buttonContainer.setAttribute('class', 'd-flex');

            //Get the values from the object
            accordionBodyItem.textContent = food.Type;
            accordionBodyItemPrice.textContent = `${food.Price === 0 ? 'Free' : food.Price+'$'}`;

            // accordionBodyItemCount.setAttribute('id', `${food.Type}-count`);
            accordionBodyItemCount.id = `${food.Type}-count`;
            accordionBodyItemCount.textContent = "0";

            //Set attributes for the BodyButton
            accordionBodyAddButton.setAttribute('type', 'button');
            accordionBodyAddButton.setAttribute('class', 'btn btn-info');
            accordionBodyAddButton.setAttribute('id', `${food.Type}-add-btn`);
            accordionBodyAddButton.addEventListener('click', () => {
                addToTempBasket(food, accordionBodyItemCount);
                calculateTotal(JSON.parse(localStorage.getItem('cart')));
                document.querySelector('#itemsTotal').textContent = `Items: ${localStorage.getItem('count')}`;
                document.querySelector('#cartCount').innerHTML = localStorage.getItem('count');
            })
            accordionBodyAddButton.textContent = "+";

            accordionBodyRemoveButton.setAttribute('type', 'button');
            accordionBodyRemoveButton.setAttribute('class', 'btn btn-danger');
            accordionBodyRemoveButton.setAttribute('id', `${food.Type}-remove-btn`);
            accordionBodyRemoveButton.addEventListener('click', () => {
                removeFromTempBasket(food, accordionBodyItemCount);
                calculateTotal(JSON.parse(localStorage.getItem('cart')));
                document.querySelector('#itemsTotal').textContent = `Items: ${localStorage.getItem('count')}`;
                document.querySelector('#cartCount').innerHTML = localStorage.getItem('count');
            })
            accordionBodyRemoveButton.textContent = "-";

            //Append all containers to the item
            const dividingContainer1 = document.createElement('div');
            const dividingContainer2 = document.createElement('div');
            const dividingContainer3 = document.createElement('div');

            dividingContainer1.setAttribute('class','col-6 d-flex align-items-center');
            dividingContainer1.appendChild(accordionBodyItem);
            itemContainer.appendChild(dividingContainer1);

            dividingContainer2.setAttribute('class','col-3 d-flex align-items-center');
            dividingContainer2.appendChild(accordionBodyItemPrice);
            itemContainer.appendChild(dividingContainer2);

            dividingContainer3.setAttribute('class','col-3 d-flex align-items-center');
            buttonContainer.appendChild(accordionBodyAddButton);
            buttonContainer.appendChild(accordionBodyItemCount);
            buttonContainer.appendChild(accordionBodyRemoveButton);
            dividingContainer3.appendChild(buttonContainer);
            itemContainer.appendChild(dividingContainer3);

            //Finally append the item container to accordion body
            accordionBody.appendChild(itemContainer);
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
function createActionMenu(array, element) {
    
}
function addToTempBasket(food, element) {
    var currentCart = [];
    var isInside = false;

    currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart === null) {
        const foodCount = {
            count: 1
        }
        var updatedFood = { ...food, ...foodCount }
        currentCart = [updatedFood];
    }
    else {
        currentCart.forEach(item => {
            if (food.Type === item.Type) {
                isInside = true;
                item.count += 1;
            }
        })
        if (!isInside) {
            foodCount = {
                count: 1
            }
            var updatedFood = { ...food, ...foodCount }
            currentCart.push(updatedFood);
        }
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));
}
function removeFromTempBasket(food, element) {
    var currentCart = [];

    currentCart = JSON.parse(localStorage.getItem('cart'));
    if (currentCart !== null) {
        for (var i = 0; i < currentCart.length; i++) {
            if (food.Type === currentCart[i].Type) {
                currentCart[i].count -= 1;
                if (currentCart[i].count === 0) {
                    currentCart.splice(i, 1);
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }
}
function calculateTotal(array) {
    var totalCost = 0;
    var totalCount = 0;

    array.forEach(item => {
        const element = document.querySelector(`#${item.Type}-add-btn`);

        totalCost += item.count * item.Price;
        totalCount += item.count;
        element.textContent = item.count;
    })
    localStorage.setItem('count', `${totalCount}`);
    localStorage.setItem('cost', `${totalCost}`);
}
