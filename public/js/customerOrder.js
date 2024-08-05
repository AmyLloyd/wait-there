const orderElId = document.getElementById("orderEl-id");
const submitBtn = document.getElementById("submitBtn");
const visibleItem = document.querySelector(".visibleItem");
const hiddenItem1 = document.querySelector(".hiddenItem1");
const hiddenItem2 = document.querySelector(".hiddenItem2");
const hiddenItem3 = document.querySelector(".hiddenItem3");
const hiddenItem4 = document.querySelector(".hiddenItem4");
const hiddenItem5 = document.querySelector(".hiddenItem5");
const hiddenItem6 = document.querySelector(".hiddenItem6");
const orderBody = document.getElementById("orderBody");

const refAnchor = document.getElementById("refAnchor");
const locationAnchor = document.getElementById("locationAnchor");

let cart = JSON.parse(localStorage.getItem('cart')) || {};
let sum = parseFloat(localStorage.getItem('sum')) || 0;
let count = parseInt(localStorage.getItem('count')) || 0;
let cartRef = JSON.parse(localStorage.getItem('cartRef')) || "";
let cartLocation = JSON.parse(localStorage.getItem('cartLocation')) || "";

window.onload = (event) => {
    event.preventDefault();
    try {
        renderCart();
        updateCart();
        toggleVisibility();
        renderLocation();
        renderRef();
    } catch (error) {
        console.error('Error rendering cart:', error);
    }
};

if (localStorage.getItem("count")) {
    count = parseInt(localStorage.getItem("count"));
};

if (localStorage.getItem("sum")) {
    sum = parseInt(localStorage.getItem("sum"));
};

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));

};

if (localStorage.getItem("cartRef")) {
    cartRef = JSON.parse(localStorage.getItem("cartRef"));
};

if(localStorage.getItem("cartLocation")) {
    cartLocation = JSON.parse(localStorage.getItem("cartLocation"));
};

//add item to localStorage
const addItem = (addButton) => {
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
    sum += price;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("sum", sum);
    localStorage.setItem("count", count);

    updateCart();
    renderCart();
    toggleVisibility();
};

const toggleVisibility = () => {
    if(orderElId.hasChildNodes()) {
        hiddenItem1.style.display = "block";
        hiddenItem2.style.display = "block";
        hiddenItem3.style.display = "block";
        hiddenItem4.style.display = "block";
        hiddenItem5.style.display = "block";
        hiddenItem6.style.display = "block";
        visibleItem.style.display = "none";

    } else if(!orderElId.hasChildNodes()) {
        hiddenItem1.style.display = "none";
        hiddenItem2.style.display = "none";
        hiddenItem3.style.display = "none";
        hiddenItem4.style.display = "none";
        hiddenItem5.style.display = "none";
        hiddenItem6.style.display = "none";
        visibleItem.style.display = "block";
    }
};

const updateCart = () => {
    document.getElementById('sum').textContent = "$" + sum;
    document.getElementById('count').textContent = count;
};

const storeRef = (refInput) => {
    const refName = refInput.trim(); 
    const refEl = document.createElement("p");
    refEl.textContent = "Your reference name: " + refName;
    refAnchor.append(refEl);
    localStorage.setItem("cartRef", JSON.stringify(refName));
    cartRef = refName;
};
const storeLocation = (locationInput) => {
    const locationRef = locationInput;
    const locationEl = document.createElement("p");
    while (locationAnchor.hasChildNodes()) {
        locationAnchor.removeChild(locationAnchor.firstChild);
    }  
    locationEl.textContent = "Location: Bay " + locationRef;
    locationAnchor.append(locationEl);
    localStorage.setItem("cartLocation", JSON.stringify(locationRef));
    cartLocation = locationRef;
};
const renderRef = () => {
    if (localStorage.getItem("cartRef")) {
        cartRef = JSON.parse(localStorage.getItem("cartRef"));
    };
    const refEl = document.createElement("p");
    refEl.textContent = "Your reference name: " + cartRef;
    refAnchor.append(refEl);
}

const renderLocation = () => {
    if(localStorage.getItem("cartLocation")) {
    cartLocation = JSON.parse(localStorage.getItem("cartLocation"));
    };
    const locationEl = document.createElement("p");
    while (locationAnchor.hasChildNodes()) {
        locationAnchor.removeChild(locationAnchor.firstChild);
    }  
    locationEl.textContent = "Location: Bay " + cartLocation;
    locationAnchor.append(locationEl);
}

//render items from localStorage
const renderCart = () => {
    while (orderElId.hasChildNodes()) {
    orderElId.removeChild(orderElId.firstChild);
    }   
    for(let id in cart){
        let item = cart[id];
        if(item.status = "Available") {
            let itemEl = document.createElement("div");
            let nameEl = document.createElement("div");
            let quantityEl = document.createElement("div");
            let priceEl = document.createElement("div");
            let button = document.createElement("button");
            orderElId.appendChild(itemEl);
            itemEl.append(nameEl);
            nameEl.textContent = item.name;
            itemEl.append(quantityEl);
            quantityEl.textContent = item.qty;
            itemEl.append(priceEl);
            const total = item.price * item.qty;
            priceEl.textContent = `$` + total;
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
            button.setAttribute("data-id", id);            
        } else {
            console.log(item.name, "Item not available");
        }
    };
};

// Function to update the cart and sum in local storage
const updateLocalStorage = (cart, sum, count) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("sum", JSON.stringify(sum));
    localStorage.setItem("count", JSON.stringify(count));
};

// Function to remove order item from the page and from local storage
const removeEl = (button) => {
    const id = button.getAttribute('data-id');
        const item = cart[id];
        if(cart[id]){
            if (cart[id].qty>1) {
                cart[id].qty--;
                sum -= item.price;
                count--;
                // Update local storage
                updateLocalStorage(cart, sum, count);

            } else {
                // Update the sum
                sum -= item.price;
                count--;

                console.log(cart, 'cart');
                // Remove the item from the cart
                delete cart[id];

                // Update local storage
                updateLocalStorage(cart, sum, count);

                // Find the closest parent element with class 'row'
                const row = button.closest(".row");
                if (row) {
                    row.remove();
                }
            };
            updateCart();
            renderCart();
            toggleVisibility();
        } else {
        console.error('Item not found in the cart');
    }
};

const submitOrder = async (event) => {
    event.preventDefault();
    const items = [];
    for(let id in cart){
        let counter = cart[id].qty; 
        while (counter > 0){
            items.push(id);
            counter--;
            console.log(counter, items);
        };
    };
    const id = 11;
    const response = await fetch(`/api/customerOrders/data/${id}`, {
        method:'POST',
        body: JSON.stringify({ items, sum, cartRef, cartLocation }),
        headers: {  
            'Content-Type': 'application/json',
        },
    });
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    if(response.ok) {
        alert("Thank you " + cartRef + " for your order. It will be delivered to you at location " + cartLocation + " shortly. Please show the coloured order confirmation on pick-up.");
        localStorage.removeItem("cart");
        localStorage.removeItem("cartRef");
        localStorage.removeItem("cartLocation");
        localStorage.removeItem("sum");
        localStorage.removeItem("count");
        while (orderElId.hasChildNodes()) {
            orderElId.removeChild(orderElId.firstChild); 
        }
        const orderData = await response.json();
        document.location.replace(`/confirmation/${orderData.customerOrderData.admin_id}/${orderData.customerOrderData.id}`);
    };
};

// document.getElementById('submitBtn').addEventListener("click", submitOrder);
document.addEventListener('click', (event) => {
    if (event.target.matches('.add-button')) {
        addItem(event.target);
    }
    if (event.target.matches('.remove-button')) {
        removeEl(event.target);
    }
});

submitBtn.addEventListener('click', submitOrder);