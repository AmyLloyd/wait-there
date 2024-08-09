
//Set variables to access sections
const welcomeSec = document.getElementById("welcomeSec");
const userDetailsInput = document.getElementById("userDetailsInput");
const order = document.getElementById("order");
const menu = document.getElementById("menu");
const userDetails = document.getElementById("userDetails");

//set variables for buttons
const agreementBtn = document.querySelector("#agreementBtn");
const userEditBtn = document.querySelector("#userEditBtn");

//set original attributes of sections
welcomeSec.setAttribute("style", "display: flex");
userDetailsInput.setAttribute("style", "visibility: hidden");
order.setAttribute("style", "visibility: hidden");
menu.setAttribute("style", "visibility: hidden");
userDetails.setAttribute("style", "visibility: hidden");

agreementBtn.addEventListener('click', function(event) {
    event.preventDefault;
    agreementBtn.disabled = true;
    
    welcomeSec.setAttribute("style","display: none");
    renderUserDetails();
    menu.setAttribute("style", "visibility: visible");
    order.setAttribute("style", "visibility: visible");
});

userEditBtn.addEventListener('click', function(event) {
    event.preventDefault;
    userDetailsInput.setAttribute("style", "display: block");
})

const orderElId = document.getElementById("orderEl-id");
const submitBtn = document.getElementById("submitBtn");
const visibleItem = document.querySelector(".visibleItem");
const hiddenItem1 = document.querySelector(".hiddenItem1");
const hiddenItem2 = document.querySelector(".hiddenItem2");
const hiddenItem6 = document.querySelector(".hiddenItem6");
const orderBody = document.getElementById("orderBody");

const refAnchor = document.getElementById("refAnchor");
const locationAnchor = document.getElementById("locationAnchor");

let cart = JSON.parse(localStorage.getItem('cart')) || {};
let sum = parseFloat(localStorage.getItem('sum')) || 0;
let count = parseInt(localStorage.getItem('count')) || 0;
let cartRef = JSON.parse(localStorage.getItem('cartRef')) || "";
let cartLocation = JSON.parse(localStorage.getItem('cartLocation')) || "";

window.onload = () => {
    try {
        renderCart();
        updateCart();
        toggleOrderItems();
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

//add item to localStorage
const addItem = (addButton) => {
    const id = addButton.getAttribute('data-id');
    const price = parseFloat(addButton.getAttribute('data-price'));
    const status = addButton.getAttribute('data-status');
    const name = addButton.getAttribute('data-name');
    addButton.classList.add('flash');
    setTimeout(() => {
        addButton.classList.remove('flash');
    }, 500);
    
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
    toggleOrderItems();
};

const toggleOrderItems = () => {
    if(orderElId.hasChildNodes()) {
        hiddenItem1.style.display = "block";
        hiddenItem2.style.display = "block";
        visibleItem.style.display = "none";

    } else if(!orderElId.hasChildNodes()) {
        hiddenItem1.style.display = "none";
        hiddenItem2.style.display = "none";
        visibleItem.style.display = "block";
    }
};

const updateCart = () => {
    document.getElementById('sum').textContent = "$" + sum;
    document.getElementById('count').textContent = count;
};

const storeRef = (refInput) => {
    const refName = refInput.trim(); 
    localStorage.setItem("cartRef", JSON.stringify(refName));
    cartRef = refName;
    userDetails.setAttribute("style", "visibility: visible");
    refAnchor.textContent = cartRef;
    if(refAnchor.innerHTML && locationAnchor.innerHTML) {
        userDetailsInput.setAttribute("style", "display: none");
    }
};
const storeLocation = (locationRef) => {
    localStorage.setItem("cartLocation", JSON.stringify(locationRef));
    cartLocation = locationRef;
    userDetails.setAttribute("style", "visibility: visible");
    locationAnchor.textContent = cartLocation;
    if(refAnchor.innerHTML && locationAnchor.innerHTML) {
        userDetailsInput.setAttribute("style", "display: none");
    }
};

const renderUserDetails = () => {
    if(localStorage.getItem("cartLocation") || localStorage.getItem("cartRef")) {
        cartLocation = JSON.parse(localStorage.getItem("cartLocation"));
        cartRef = JSON.parse(localStorage.getItem("cartRef"));
        userDetails.setAttribute("style", "visibility: visible");
        userDetailsInput.setAttribute("style", "display: none");
        if(cartLocation) {
            locationAnchor.textContent = cartLocation;
        };
        if(cartRef) {
            refAnchor.textContent = cartRef;
        };
    } else {
        userDetails.setAttribute("style", "display: none");
        userDetailsInput.setAttribute("style", "visibility: visible");
    }
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
            let nameEl = document.createElement("div");
            let quantityEl = document.createElement("div");
            let priceEl = document.createElement("div");
            let buttonContainer = document.createElement("div");
            let button = document.createElement("button");
            orderElId.appendChild(itemEl);
            itemEl.append(nameEl);
            nameEl.textContent = item.name;
            itemEl.append(quantityEl);
            quantityEl.textContent = item.qty;
            itemEl.append(priceEl);
            const total = item.price * item.qty;
            priceEl.textContent = `$` + total;
            const minusIcon = `
            <i class="bi bi-dash-circle-fill text-light m-1"></i>
            `
            button.innerHTML = minusIcon;
            buttonContainer.setAttribute("class", "col-2 text-end");
            itemEl.append(buttonContainer);
            buttonContainer.append(button);
            itemEl.setAttribute("data-id", id);
            itemEl.setAttribute("data-quantity", 1)
            itemEl.setAttribute("class", "row d-flex justify-content-between align-items-center m-1");
            nameEl.setAttribute("class", "col-5 text-start");
            quantityEl.setAttribute("class", "col-2 text-center");
            priceEl.setAttribute("class", "col-3 text-center");
            button.setAttribute("type", "button");
            button.setAttribute("class", "btn btn-dark btn-sm remove-button");
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
            toggleOrderItems();
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
        alert("Thank you " + cartRef + " for your order.\nIt will be delivered to you at location " + cartLocation + " shortly.\nPlease show the following order confirmation on delivery.");
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
    if (event.target.matches('.add-button') || event.target.closest('.add-button')) {
        addItem(event.target.closest('.add-button'));
    }
    if (event.target.matches('.remove-button') || event.target.closest('.remove-button')) {
        removeEl(event.target.closest('.remove-button'));
    }
});

submitBtn.addEventListener('click', submitOrder);

window.onpagehide = () => {
    try {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartRef");
        localStorage.removeItem("cartLocation");
        localStorage.removeItem("sum");
        localStorage.removeItem("count");
    } catch(err) {
        console.log(err);
    }


};
