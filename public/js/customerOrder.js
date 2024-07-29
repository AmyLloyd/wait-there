const orderElId = document.getElementById("orderEl-id");
const submitBtn = document.getElementById("submitBtn");
let hiddenElements = document.querySelectorAll(".hiddenElement");
const visibleItem = document.querySelector(".visibleItem");
const hiddenItem1 = document.querySelector(".hiddenItem1");
const hiddenItem2 = document.querySelector(".hiddenItem2");

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
    toggleVisibility();
};

const toggleVisibility = () => {
    if(orderElId.hasChildNodes()) {
        // for(i = 0; i < hiddenElements.length; i++) {
        //     hiddenElements[i].computedStyleMap.display = "block";
        // }
        console.log("orderElId has child nodes");
        console.log(hiddenItem1, "hiddenItem1");
        hiddenItem1.style.display = "block";
        hiddenItem2.style.display = "block";
        visibleItem.style.display = "none";
        
    } else if(!orderElId.hasChildNodes()) {
        console.log("else if");
        hiddenItem1.style.display = "none";
        hiddenItem2.style.display = "none";
        visibleItem.style.display = "block";
    }
};

const updateCart = () => {
    document.getElementById('sum').textContent = sum;
    document.getElementById('count').textContent = count;
};

const storeRef = (refInput) => {
    const refName = refInput.trim(); 
    const refEl = document.createElement("h5");
    console.log("refName", refName);
    refEl.textContent = refName;
    refAnchor.append(refEl);
    localStorage.setItem("cartRef", JSON.stringify(refName));
    cartRef = refName;
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

//if orderElId has first child... submit button visible else orderElId.text Content = Selected items will appear here. 

//iterate over the array of objects cart and collect all cart.id into one array.
// const toggleVisibility = () => {
//     let elements = document.querySelectorAll(".toggleVisibility");
//     console.log(elements, "elements");
//     for (let i = 0; i < elements.length; i++) {
//         console.log(elements[i], "element");
//         if (elements[i].style.display === "none") {
//             console.log("here");
//             elements[i].style.display = "block";
//         } else {
//             console.log("else here");
//             elements[i].style.display = "none";
//         }
//     }
// };

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
            console.log("cart[id]");
            if (cart[id].qty>1) {
                console.log(cart[id].qty, "cart[id].qty");
                cart[id].qty--;
                console.log(cart[id].qty, "cart[id].qty");
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
            toggleVisibility();
        } else {
        console.error('Item not found in the cart');
    }
};

const submitOrder = async (event) => {
    event.preventDefault();
    console.log(cart, 'cart');
    const items = [];
    for(let id in cart){
        let counter = cart[id].qty; 
        while (counter > 0){
            items.push(id);
            counter--;
            console.log(counter, items);
        };
    };
        
    console.log(cartRef, items, sum);
    const id = 1;

    const response = await fetch(`/api/customerOrders/data/${id}`, {
        method:'POST',
        body: JSON.stringify({ items, sum, cartRef }),
        headers: {  
            'Content-Type': 'application/json',
        },
    });
    if(response.ok) {
        alert("Thank you " + cartRef + " for your order. It will be delivered shortly.");
        localStorage.removeItem("cart");
        localStorage.removeItem("cartRef");
        localStorage.removeItem("sum");
        localStorage.removeItem("count");
        while (orderElId.hasChildNodes()) {
            orderElId.removeChild(orderElId.firstChild);
            }  
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

submitBtn.addEventListener('click', submitOrder);