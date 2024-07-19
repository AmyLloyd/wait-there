const orderElId = document.getElementById("orderEl-id");

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
};

const updateCart = () => {
    document.getElementById('sum').textContent = sum;
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
        console.log(cart[id], "cart[id]");
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
            const total = item.price * item.qty;
            priceEl.textContent = total;
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

//if orderElId has first child... submit button visible else orderElId.text Content = Selected items will appear here. 

//iterate over the array of objects cart and collect all cart.id into one array.

// Function to update the cart and sum in local storage
const updateLocalStorage = (cart, sum) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("sum", JSON.stringify(sum));
};

// Function to remove order item from the page and from local storage
const removeEl = (button) => {
    const id = button.getAttribute('data-id');
        const item = cart[id];
        if(cart[id]){
            console.log("cart[id]");
            if (cart[id].qty>1) {
                console.log(cart[id].qty, "cart[id].qty");
                cart[id].qty--;
                console.log(cart[id].qty, "cart[id].qty");
                sum -= item.price * item.qty;
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
                console.log(cart, 'cart');
        
                // Update local storage
                updateLocalStorage(cart, sum, count);
        
                console.log(cart, 'updated cart');
                console.log(sum, 'sum');

                // Find the closest parent element with class 'row'
                const row = button.closest(".row");

                if (row) {
                    row.remove();
                }
            };
            updateCart();
            renderCart();
        } else {
        console.error('Item not found in the cart');
    }
};

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

// document.getElementById('submitBtn').addEventListener("click", submitOrder);
document.addEventListener('click', (event) => {
    if (event.target.matches('.add-button')) {
        addItem(event.target);
    }
    if (event.target.matches('.remove-button')) {
        console.log(event.target, "event.target");
        removeEl(event.target);
    }
});