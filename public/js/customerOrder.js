//identify root element for rendering orderItem
const orderElId = document.getElementById("orderEl-id");
const orderElName = document.getElementById("orderEl-name");
const orderElStatus = document.getElementById("orderEl-status");
const orderElPrice = document.getElementById("orderEl-price");

//identify positions of item details
const orderItemId = document.getElementById("#itemId");
const orderItemName = document.getElementById("#itemName");
const orderItemPrice = document.getElementById("#itemPrice");
const orderItemStatus = document.getElementById("#itemStatus");


//define variables to be set in localStorage
let cart = {};
let count = 0;
let sum = 0;
let cartRef = "";
//update DOM with current values in localStorage

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
const addItem = (button) => {
    let id = button.dataset.id;
    let price = button.dataset.price;
    let status = button.dataset.status;
    let name = button.dataset.name;

    if (id in cart) {
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
    console.log(cart, "cart");
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    renderItem();
};

const updateCart = () => {
    document.getElementById("sum").textContent = sum;
    document.getElementById("count").textContent = count;
    localStorage.setItem("sum", sum);
    localStorage.setItem("count", count);
}
//render items from localStorage
const renderItem = () => {
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
    };

    for(let id in cart){
        let item = cart[id];
        console.log(item, "item in localStorage");
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
            button.setAttribute("class", "btn btn-dark col-3 update-order-button");
            button.setAttribute("onclick", "removeEl(this)");
        } else {
            console.log(item.name, "Item not available");
        }
    }
};

//if orderElId has first child... submit button visible else orderElId.text Content = Selected items will appear here. 

//remove order item
const removeEl = (button) => {
    const parentEl = button.closest(".row");
    console.log(parentEl, 'parentEl');
    parentEl.remove();
};
const refInput = document.getElementById("refInput");


const storeRef = (refName) => {
    localStorage.setItem("cartRef", refName);
    const refEl = document.createElement("div");
    refEl.textContent = refName;
    refInput.append(refEl);
    console.log("Reference name is now: " + refName);
};

const submitOrder = async (event, cartRef, cart) => {
    // if (localStorage.getItem("cart")) {
    //     cart = JSON.parse(localStorage.getItem("cart"));
    // };
    // if(localStorage.getItem("cartRef")) {
    //     cartRef = JSON.parse(localStorage.getItem("cartRef"));
    // };
    // if (localStorage.getItem("sum")) {
    //     sum = parseInt(localStorage.getItem("sum"));
    // };

    const response = await fetch(`/api/customerOrders/data/:id`, {
        method:'POST',
        body: JSON.stringify({ cartRef, cart, sum}),
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