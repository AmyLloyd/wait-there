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

const renderItem = () => {
    let orderList = {};
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

// const addItem = (button) => {
//     const id = button.getAttribute('data-id');
//     const name = button.getAttribute('data-name');
//     const price = button.getAttribute('data-price');
//     const status = button.getAttribute('data-status');

//     if(status === "Available") {
//         let itemEl = document.createElement("div");
//         let nameEl = document.createElement("h5");
//         let quantityEl = document.createElement("div");
//         let priceEl = document.createElement("div");
//         let button = document.createElement("button");
        
//         orderElId.appendChild(itemEl);
//         itemEl.append(nameEl);
//         nameEl.textContent = name;
//         itemEl.append(quantityEl);
//         quantityEl.textContent = 1;
//         itemEl.append(priceEl);
//         priceEl.textContent = price;
//         itemEl.append(button);
//         button.textContent = "Remove";
//         itemEl.setAttribute("data-id", id);
//          //If element already exists with this id or text content, change quantity to +1
//         itemEl.setAttribute("data-quantity", 1)
//         itemEl.setAttribute("class", "row");
//         nameEl.setAttribute("class", "col-5");
//         quantityEl.setAttribute("class", "col-1");
//         priceEl.setAttribute("class", "col-3");
//         button.setAttribute("type", "button");
//         button.setAttribute("class", "btn btn-dark col-3 update-order-button");
//         button.setAttribute("onclick", "removeEl(this)");
//     } else {
//         console.log(name, "Item not available");
//     }
// };

//if orderElId has first child... submit button visible else orderElId.text Content = Selected items will appear here. 

//remove order item
const removeEl = (button) => {
    const parentEl = button.closest(".row");
    console.log(parentEl, 'parentEl');
    parentEl.remove();
};

var reviewEl = document.querySelector("#review");

    // let response = "Thank you for your submission " + referenceName.value + ".";
    // submissionResponseEl.textContent = response;

//collect values
const collectValues = () => {
    const orderElement = document.getElementById('orderEl-id');
    if(!orderElement.children.length) {
        alert("Add items to order");
        return;
    };

    let id;
    let items = [];
    let quantity;
    let quantities=[];
    let reference_name = "";
 
    for(i=0; i < orderElement.children.length; i++ ) {
        id = orderElement.children[i].getAttribute('data-id');
        quantity = orderElement.children[i].getAttribute('data-quantity');
        items.push(id);
        quantities.push(quantity);
    }


    return { reference_name, items };
}

//Submit order
const submitOrder = async ({ reference_name, items }) => {
    console.log(reference_name + " and " + "items.length:" + items.length);
    if(!reference_name || !items.length) {
        console.log("Order details missing");
        return;
    }
    if(reference_name && items.length) {
        console.log(reference_name + " and " + items, "reference_name and items");
        const total_amount = 10.00;

        const response = await fetch(`/api/customerOrders/data/:id`, {
            method:'POST',
            body: JSON.stringify({ reference_name, items, total_amount}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.ok) {
            alert("Order submitted for " + reference_name);
            // document.location.replace('/confirmation');
        } else {
            alert("Order submission failed.");
        };
    }
}

const reviewOrder = (event) => {
    event.preventDefault();
    const { reference_name, items, quantities } = collectValues();
    submitOrder({ reference_name, items, quantities });
};

reviewEl.addEventListener("click", reviewOrder);
