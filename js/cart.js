document.addEventListener("DOMContentLoaded", () => {
  const orderDetails = document.getElementById("orderDetails");
  const cart = JSON.parse(localStorage.getItem("cart"));

  displayItems(cart, orderDetails);
  updateValues();
});
function displayItems(cart, element) {
  element.innerHTML = "";

  const vstackContainer = document.createElement("div");
  vstackContainer.setAttribute("class", "vstack gap-3 p-5 rounded-3 bg-body-secondary");

  if (cart.length !== 0) {
    const selectedEstablishment = JSON.parse(
      localStorage.getItem("selectedEstablishment")
    );
    const heading = document.createElement("h1");
    heading.setAttribute("class", " pb-2 text-center fw-light border-bottom");
    heading.textContent = `${selectedEstablishment.establishmentName} (${selectedEstablishment.establishmentType})`;

    element.appendChild(heading);

    cart.forEach((item) => {
      const itemContainer = document.createElement("div");
      const buttonContainer = document.createElement("div");
      const itemNameContainer = document.createElement("div");
      const itemAttributesContainer = document.createElement("div");
      const itemPriceContainer = document.createElement("div");

      const itemName = document.createElement("p");
      const itemAttributes = document.createElement("p");
      const itemPrice = document.createElement("p");
      const addButton = document.createElement("button");
      const subtractButton = document.createElement("button");
      const removeButton = document.createElement("button");

      //Item container
      itemContainer.setAttribute("class", "row py-2 bg-light rounded-3 ");

      //Button container
      buttonContainer.setAttribute(
        "class",
        "col-sm-2 col-6 d-flex align-items-center justify-content-start justify-content-sm-end"
      );

      //Item Attributes
      itemAttributes.textContent = `${item.count} x `;
      itemAttributesContainer.setAttribute(
        "class",
        "col-sm-2  d-flex align-items-center justify-content-start"
      );
      itemAttributesContainer.appendChild(itemAttributes);

      //Item Name
      itemName.textContent = `${item.Type}`;
      itemNameContainer.setAttribute(
        "class",
        "col-sm-4 flex-sm-grow-1 d-flex align-items-center justify-content-start"
      );
      itemNameContainer.appendChild(itemName);

      //Item Total Price
      itemPrice.textContent = `${item.Price * item.count}$`;
      itemPriceContainer.setAttribute(
        "class",
        "col-sm-3 col-6 d-flex align-items-center justify-content-end"
      );
      itemPriceContainer.appendChild(itemPrice);

      //Set attributes for the addButton
      addButton.setAttribute("type", "button");
      addButton.setAttribute("class", "btn btn-info");
      addButton.setAttribute("id", `${item.Type}-add-btn`);
      addButton.addEventListener("click", () => {
        addToCart(item);
        displayItems(JSON.parse(localStorage.getItem("cart")), element);
      });
      addButton.textContent = "+";
      buttonContainer.appendChild(addButton);

      //Set attributes for the subtractButton
      subtractButton.setAttribute("type", "button");
      subtractButton.setAttribute("class", "btn btn-danger");
      subtractButton.setAttribute("id", `${item.Type}-subtract-btn`);
      subtractButton.addEventListener("click", () => {
        subtractFromCart(item);
        displayItems(JSON.parse(localStorage.getItem("cart")), element);
      });
      subtractButton.textContent = "-";
      buttonContainer.appendChild(subtractButton);

      //Set attributes for the subtractButton
      removeButton.setAttribute("type", "button");
      removeButton.setAttribute("class", "btn btn-danger ms-2");
      removeButton.setAttribute("id", `${item.Type}-remove-btn`);
      removeButton.addEventListener("click", () => {
        removeFromCart(item);
        displayItems(JSON.parse(localStorage.getItem("cart")), element);
      });
      removeButton.textContent = "X";
      itemPriceContainer.appendChild(removeButton);

      //itemContainer.appendChild(removeButton);
      itemContainer.appendChild(itemAttributesContainer);
      itemContainer.appendChild(itemNameContainer);
      itemContainer.appendChild(buttonContainer);
      itemContainer.appendChild(itemPriceContainer);
      vstackContainer.appendChild(itemContainer);
    });
    element.appendChild(vstackContainer);
    actionMenu(element);
  } else {
    const buttonContainer = document.createElement("div");

    const empty = document.createElement("h1");

    const homeButton = document.createElement("a");
    const shopButton = document.createElement("a");

    empty.setAttribute("class", "text-center");
    empty.textContent = "Empty Cart";

    buttonContainer.setAttribute(
      "class",
      "d-flex justify-content-center gap-3"
    );

    homeButton.setAttribute("type", "button");
    homeButton.setAttribute("href", "./index.html");
    homeButton.setAttribute("class", "btn btn-primary");
    homeButton.textContent = "Go home";
    buttonContainer.appendChild(homeButton);

    shopButton.setAttribute("type", "button");
    shopButton.setAttribute("href", "./shop.html");
    shopButton.setAttribute("class", "btn btn-primary");
    shopButton.textContent = "Back to Shops";
    buttonContainer.appendChild(shopButton);

    vstackContainer.appendChild(empty);
    vstackContainer.appendChild(buttonContainer);
    element.appendChild(vstackContainer);

    console.log(localStorage.getItem('cart'));
  }
  updateValues();
}
function actionMenu(element) {
  const container = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const totalTextContainer = document.createElement("div");

  const checkoutButton = document.createElement("a");
  const discardAllButton = document.createElement("button");

  container.setAttribute(
    "class",
    "row mt-3 gap-3 gap-sm-0 justify-content-center border-top pt-3"
  );

  buttonContainer.setAttribute(
    "class",
    "col-sm-8 gap-2 d-flex align-items-center justify-content-start"
  );

  totalTextContainer.setAttribute(
    "class",
    "col-sm-4 gap-3 d-flex justify-content-end"
  );

  const totalPrice = document.createElement("p");
  const totalCount = document.createElement("p");

  checkoutButton.setAttribute("type", "button");
  checkoutButton.setAttribute("href", "./checkout.html");
  checkoutButton.setAttribute("class", "btn btn-primary");
  checkoutButton.textContent = "Checkout";
  buttonContainer.appendChild(checkoutButton);

  discardAllButton.setAttribute("type", "button");
  discardAllButton.setAttribute("class", "btn btn-primary");
  discardAllButton.setAttribute("id", "discardAll-action-btn");
  discardAllButton.textContent = "Discard All";
  discardAllButton.addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify([]));
    updateValues();
    displayItems(JSON.parse(localStorage.getItem("cart")), element);
  });
  buttonContainer.appendChild(discardAllButton);

  totalCount.setAttribute("id", "totalCount");
  totalTextContainer.appendChild(totalCount);

  totalPrice.setAttribute("id", "totalPrice");
  totalTextContainer.appendChild(totalPrice);

  container.appendChild(buttonContainer);
  container.appendChild(totalTextContainer);
  element.appendChild(container);
}
function addToCart(food) {
  var currentCart = [];
  var isInside = false;
  var updatedFood;

  currentCart = JSON.parse(localStorage.getItem("cart"));
  if (currentCart.length === 0) {
    const foodCount = {
      count: 1,
    };

    updatedFood = { ...food, ...foodCount };
    currentCart = [updatedFood];
  } else {
    currentCart.forEach((item) => {
      if (food.Type === item.Type) {
        isInside = true;
        item.count += 1;
        updatedFood = item;
      }
    });
    if (!isInside) {
      foodCount = {
        count: 1,
      };
      updatedFood = { ...food, ...foodCount };
      console.log(updatedFood);
      currentCart.push(updatedFood);
    }
  }
  //console.log(updatedFood);
  localStorage.setItem("cart", JSON.stringify(currentCart));
}
function subtractFromCart(food) {
  const getCart = localStorage.getItem('cart');

  if (getCart !== '[]') {
    tempCart = JSON.parse(getCart);
    const index = tempCart.map((t) => t.Type).indexOf(food.Type);

    if (index !== -1) {
      tempCart[index].count -= 1;
      if (tempCart[index].count == 0) {
        tempCart.splice(index, 1);
      }
    }
    console.log(tempCart);
    localStorage.setItem('cart', JSON.stringify(tempCart));
  }
}
function removeFromCart(food) {
  currentCart = JSON.parse(localStorage.getItem("cart"));
  if (currentCart !== 0) {
    const index = currentCart.map((t) => t.Type).indexOf(food.Type);
    console.log(index);
    if (index !== -1) {
      currentCart.splice(index, 1);
      console.log(currentCart);
    }
  }
  localStorage.setItem("cart", JSON.stringify(currentCart));
}
function updateValues() {
  const cartTotalPrice = document.getElementById("totalPrice");
  const cartTotalCount = document.getElementById("totalCount");
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
    cartTotalCount.textContent = tempCount === 0 ? '' : `Items: ${tempCount}`;
    cartTotalPrice.textContent = tempTotal === 0 ? '' : `Price: ${tempTotal}$`;
  }
  else {
    tempTotal = 0;
    tempCount = 0;
  }

  localStorage.setItem('cartCount', `${tempCount}`);
  localStorage.setItem('cartTotal', `${tempTotal}`);

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