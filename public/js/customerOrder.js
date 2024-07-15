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

const addItem = (button) => {
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');
    const status = button.getAttribute('data-status');

    console.log('Button clicked');
    console.log('ID:', id);
    console.log('Name:', name);
    console.log('Price:', price);

    if(status === "Available") {
        let itemEl = document.createElement("div");
        let nameEl = document.createElement("h5");
        let quantityEl = document.createElement("div");
        let priceEl = document.createElement("div");
        let button = document.createElement("button");
        
        orderElId.appendChild(itemEl);
        itemEl.append(nameEl);
        nameEl.textContent = name;
        itemEl.append(quantityEl);
        quantityEl.textContent = 1;
        itemEl.append(priceEl);
        priceEl.textContent = price;
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
        button.setAttribute("class", "btn btn-dark col-2");
        button.setAttribute("onclick", "removeEl(this)");
    } else {
        alert(name, "not available");
    }
};

//if orderElId has first child... submit button visible else orderElId.text Content = Selected items will appear here. 

//remove order item
const removeEl = (button) => {
    const parentEl = button.closest(".row");
    parentEl.remove();
};

var reviewEl = document.querySelector("#review");

    // let response = "Thank you for your submission " + referenceName.value + ".";
    // submissionResponseEl.textContent = response;

//collect values
const collectValues = () => {
    const orderElement = document.getElementById('orderEl-id');
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
   
    console.log(items, "items");
    console.log(quantities, "quantities");
    reference_name = refName.value;
    console.log(reference_name, "reference_name");
    return { reference_name, items };
}

//Submit order
const submitOrder = async ({ reference_name, items }) => {
    console.log('here in submit order');
    console.log(reference_name);
    console.log(items);
    if(reference_name && items.length) {
        console.log(reference_name + " and " + items, "reference_name and items");
        const total_amount = 10.00;

        const response = await fetch(`/api/customerOrders/data`, {
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
