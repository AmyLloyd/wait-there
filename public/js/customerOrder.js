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

    orderElId.setAttribute("data-id", id);
    
    orderElName.textContent = name;
    orderElPrice.textContent = price;
    orderElStatus.textContent = status;
  
};
// No need to get the button element by ID here as it's passed directly from the HTML

let items = [];
