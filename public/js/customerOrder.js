// //identify root element for rendering orderItem
const orderElId = document.getElementById("orderEl-id");
// const orderElName = document.getElementById("orderEl-name");
// const orderElStatus = document.getElementById("orderEl-status");
// const orderElPrice = document.getElementById("orderEl-price");

// //identify positions of item details
// const orderItemId = document.getElementById("#itemId");
// const orderItemName = document.getElementById("#itemName");
// const orderItemPrice = document.getElementById("#itemPrice");
// const orderItemStatus = document.getElementById("#itemStatus");


//define variables to be set in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let sum = parseFloat(localStorage.getItem('sum')) || 0;
let count = parseInt(localStorage.getItem('count')) || 0;
let cartRef = "";
//update DOM with current values in localStorage

// if (localStorage.getItem("count")) {
//     count = parseInt(localStorage.getItem("count"));
// };

// if (localStorage.getItem("sum")) {
//     sum = parseInt(localStorage.getItem("sum"));
// };

// if (localStorage.getItem("cart")) {
//     cart = JSON.parse(localStorage.getItem("cart"));
// };

// if (localStorage.getItem("cartRef")) {
//     cartRef = JSON.parse(localStorage.getItem("cartRef"));
// };
    
//add item to localStorage
const addItem = (addButton) => {
    // Extract data attributes from the button
    console.log(addButton, 'addButton');
    const id = addButton.getAttribute('data-id');
    const price = parseFloat(addButton.getAttribute('data-price'));
    const status = addButton.getAttribute('data-status');
    const name = addButton.getAttribute('data-name');
    
    if (cart[id]) {
        cart[id].qty++;
    } else {
        let cartItem = {
            name: name,
            price: price,
            status: status,
            qty: 1
        };
        cart[id] = cartItem;
    }
    count++;
    sum +- price;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("sum", sum);
    localStorage.setItem("count", count);

    updateCart();
    renderCart();
};

// Event listener for the remove button
document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', (event) => addItem(event.currentTarget));
});

const updateCart = () => {
    document.getElementById('sum').textContent = sum.toFixed(2);
    document.getElementById('count').textContent = count;
};

const storeRef = (refInput) => {
    const refName = refInput.trim(); 
    const refEl = document.createElement("div");
    refEl.textContent = refName;
    refAnchor.append(refEl);
    localStorage.setItem("cartRef", JSON.stringify(refName));
};
//render items from localStorage
const renderCart = () => {
    while (orderElId.hasChildNodes()) {
    orderElId.removeChild(orderElId.firstChild);
    }   
    for(let id in cart){
        let item = cart[id];
        if(item.status = "Available") {
            let itemEl = document.createElement("div");
            let nameEl = document.createElement("h5");
            let quantityEl = document.createElement("div");
            let priceEl = document.createElement("div");
            let button = document.createElement("button");
            
            orderElId.appendChild(itemEl);
            itemEl.append(nameEl);
            nameEl.textContent = item.name;
            itemEl.append(quantityEl);
            quantityEl.textContent = item.qty;
            itemEl.append(priceEl);
            priceEl.textContent = item.price;
            itemEl.append(button);
            button.textContent = "Remove";
            itemEl.setAttribute("data-id", id);
             //If element already exists with this id or text content, change quantity to +1
            itemEl.setAttribute("data-quantity", 1)
            itemEl.setAttribute("class", "row");
            nameEl.setAttribute("class", "col-5");
            quantityEl.setAttribute("class", "col-1");
            priceEl.setAttribute("class", "col-3");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-dark col-3 remove-button");
           
        } else {
            console.log(item.name, "Item not available");
        }
    };
};

//if orderElId has first child... submit button visible else orderElId.text Content = Selected items will appear here. 

//iterate over the array of objects cart and collect all cart.id into one array.

// Function to update the cart and sum in local storage
const updateLocalStorage = (cart, sum) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("sum", JSON.stringify(sum));
};

// Function to remove order item from the page and from local storage
const removeEl = (event) => {
    event.preventDefault();
    // Find the closest parent element with class 'row'
    console.log('here');
    const parentEl = event.target.closest(".row");
    console.log(parentEl, 'parentEl');

    // Remove the parent element from the DOM
    parentEl.remove();

    // Get the data-id attribute from the button
    const id = button.dataset.id;
    console.log(id);

    // Find the item in the cart to get its price and quantity
    const item = cart.find(item => item.id === id);

    if (item) {
        // Update the sum
        sum -= item.price;

        // Remove the item from the cart
        cart = cart.filter(item => item.id !== id);

        // Update local storage
        updateLocalStorage(cart, sum);

        console.log(cart, 'updated cart');
        console.log(sum, 'updated sum');

        // Call updateCart to reflect changes on the page
        updateCart();
    } else {
        console.error('Item not found in the cart');
    }
};

// Event listener for the remove button
document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', (event) => removeEl(event.currentTarget));
});


const submitOrder = async (event) => {
    console.log("submitOrder");
    event.preventDefault();
    console.log(cart, "cart");

    const items = [];

    cart.forEach(obj => {
        items.push(obj.id);
    });
        
    console.log(cartRef, items, sum);

    const response = await fetch(`/api/customerOrders/data/:id`, {
        method:'POST',
        body: JSON.stringify({ items, sum, cartRef }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        alert("Thank you " + cartRef + "for your order. It will be delivered shortly.");
        // document.location.replace('/confirmation');
    } else {
        alert("Order submission failed.");
    };
};

document.getElementById('submitBtn').addEventListener("click", submitOrder);
