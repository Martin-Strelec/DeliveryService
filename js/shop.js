const main = document.getElementById('root');

sessionStorage.setItem('count', 0);
sessionStorage.setItem('checkout', 0);
document.querySelector('#cartCount').innerHTML = sessionStorage.getItem('count');

// Use fetch to get data from the API
fetch('./json/data.json')
    .then(function (response) {
        return response.json();
    })
    .then(data => {
        // // Begin accessing JSON data here
        data.items.forEach(item => {
            //Creating card
            const card = document.createElement('div');
            card.setAttribute('class', 'card col-md-3 px-0');
            card.setAttribute('style', 'width: 19rem')

            //Card body
            const cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');

            //Card banner
            const banner = document.createElement('img');
            banner.src = item.banner;
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
            cardButton.setAttribute('class', 'btn btn-primary');
            cardButton.setAttribute('data-bs-toggle', 'modal');
            cardButton.setAttribute('data-bs-target', `#staticBackdrop-${item.establishmentIdentifier}`);
            cardButton.textContent = 'View Menu';

            //Card appending
            card.appendChild(banner);
            card.appendChild(cardBody);
            cardBody.appendChild(cardHeading);
            cardBody.appendChild(cardOpeningHours);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardButton);
            shopDisplay.appendChild(card);

            createModal(item, document.body);
        });
    })
    .catch(function (error) {
        // Handle any errors from the fetch operation
        // const errorMessage = document.createElement('marquee');
        // errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
        // main.appendChild(errorMessage);
    });
//Create Modal function
function createModal(item, container) {

    //Card modal
    //Create html elements needed for the creation of bootstrap modal
    const modalContainer = document.createElement('div');
    const modalDialog = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalHeader = document.createElement('div');
    const modalBody = document.createElement('div');
    const modalFooter = document.createElement('div');
    const modalTitle = document.createElement('h1');

    //Modal body elements
    const modalBodyContainer = document.createElement('div');
    const modalBodyHeader = document.createElement('h2');
    const modalBodyAddress = document.createElement('p');
    const modalBodyOpeningHours = document.createElement('p');
    const modalBodyDeliveryHours = document.createElement('p');
    const modalBodyContactHeader = document.createElement('p');
    const modalBodyContactPhone = document.createElement('p');
    const modalBodyContactEmail = document.createElement('p');

    //Modal footer elements
    const modalCloseButton = document.createElement('button');
    const modalItemsTotal = document.createElement('p');
    const modalAddToBasket = document.createElement('button');

    //Set attributes for the modal container
    modalContainer.setAttribute('class', "modal fade");
    modalContainer.setAttribute('id', `staticBackdrop-${item.establishmentIdentifier}`);
    modalContainer.setAttribute("data-bs-backdrop", "static");
    modalContainer.setAttribute("data-bs-keyboard", "false");
    modalContainer.setAttribute("tabindex", "-1");
    modalContainer.setAttribute("aria-labelledby", "staticBackdropLabel");
    modalContainer.setAttribute("aria-hidden", "true");

    //Add corresponding classes to all div elements
    modalDialog.setAttribute('class', "modal-dialog modal-dialog-scrollable");
    modalContent.classList.add("modal-content");
    modalHeader.classList.add("modal-header");
    modalBody.classList.add("modal-body");
    modalFooter.classList.add("modal-footer");

    //Set attributes for the modal title
    modalTitle.setAttribute('class', "modal-title fs-5");
    modalTitle.setAttribute("id", "staticBackdropLabel");
    modalTitle.textContent = `${item.establishmentName}`;

    //Display description uniquely for each establishment
    modalBodyContainer.setAttribute('class', 'mt-3');
    modalBodyHeader.textContent = `${item.establishmentName}`;

    modalBodyAddress.setAttribute('class', 'fw-light');
    modalBodyAddress.textContent = `Address: ${item.location.address}`;

    modalBodyDeliveryHours.setAttribute('class', 'fw-light');
    modalBodyDeliveryHours.textContent = `Delivery Hours: ${item.deliveryHours}`;

    modalBodyOpeningHours.setAttribute('class', 'fw-light');
    modalBodyOpeningHours.textContent = `Opening Hours: ${item.openingHours}`;

    modalBodyContactHeader.setAttribute('class', 'fw-light h3');
    modalBodyContactHeader.textContent = 'Contact';

    modalBodyContactEmail.setAttribute('class', 'fw-light');
    modalBodyContactEmail.textContent = `Email: ${item.contact.email}`;

    modalBodyContactPhone.setAttribute('class', 'fw-light');
    modalBodyContactPhone.textContent = `Phone: ${item.contact.phone}`;

    modalBodyContainer.appendChild(modalBodyHeader);
    modalBodyContainer.appendChild(modalBodyAddress);
    modalBodyContainer.appendChild(modalBodyDeliveryHours);
    modalBodyContainer.appendChild(modalBodyOpeningHours);
    modalBodyContainer.appendChild(modalBodyContactHeader);
    modalBodyContainer.appendChild(modalBodyContactEmail);
    modalBodyContainer.appendChild(modalBodyContactPhone);

    //Set close button attributes
    modalCloseButton.setAttribute("type", "button");
    modalCloseButton.classList.add("btn-close");
    modalCloseButton.setAttribute("data-bs-dismiss", "modal");
    modalCloseButton.setAttribute("aria-label", "Close");
    modalCloseButton.addEventListener('click', () => {
        document.querySelector('#itemsTotal').textContent = "";
        sessionStorage.setItem('count',0);
    })

    //Modal items total
    modalItemsTotal.setAttribute('id', 'itemsTotal');

    //Set AddToBasket button attributes
    modalAddToBasket.setAttribute("type", "button");
    modalAddToBasket.setAttribute('class', "btn btn-primary");
    modalAddToBasket.textContent = "Add to basket";

    //Create accordion inside modal body
    createAccordion(item, modalBody);
    modalBody.appendChild(modalBodyContainer);
    //Apppend all elements into one container
    modalFooter.appendChild(modalItemsTotal);
    modalFooter.appendChild(modalAddToBasket);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalCloseButton);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modalContainer.appendChild(modalDialog);

    container.appendChild(modalContainer);
}
//Create Accordion function
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
        for (var j = 0; j < foodGroups2.length; j++) {

            //Create container for each item 
            const itemContainer = document.createElement('div');
            const accordionBodyItem = document.createElement('p');
            const accordionBodyItemPrice = document.createElement('p');
            const accordionBodyButton = document.createElement('button');

            //Item Container styling
            itemContainer.setAttribute('class', 'border border-2 border-secondary rounded-1 p-2 m-2 border-opacity-10')

            //Get the values from the object
            var food = {
                "Name": foodGroups2[j].Type,
                "Price": foodGroups2[j].Price
            }

            accordionBodyItem.textContent = food.Name;
            accordionBodyItemPrice.textContent = `Price: ${food.Price}$`;

            //Set attributes for the BodyButton
            accordionBodyButton.setAttribute('type', 'button');
            accordionBodyButton.setAttribute('class', 'btn btn-secondary');
            accordionBodyButton.setAttribute('id', `${food.Name}-btn`);
            accordionBodyButton.addEventListener('click', () => {
                var count = sessionStorage.getItem('count');
                count++;
                sessionStorage.setItem('count', count);
                document.querySelector('#itemsTotal').textContent = `Items: ${count}`;
                //addToCart(food);
            })
            accordionBodyButton.textContent = "Add";

            //Append all containers to the item
            itemContainer.appendChild(accordionBodyItem);
            itemContainer.appendChild(accordionBodyItemPrice);
            itemContainer.appendChild(accordionBodyButton);

            //Finally append the item container to accordion body
            accordionBody.appendChild(itemContainer);
        }

        //Append all of the elements to the accordion container
        accordionHeader.appendChild(accordionCollapseButton);
        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(accordionCollapse);
        accordionContainer.appendChild(accordionItem)
    }
    //Append to modal
    container.appendChild(accordionContainer);
}
