$(document).ready(function() {
    $(document).on('click', '.update-button', function(event) {
        //prevents dropdown from closing
        event.stopPropagation();        
        const button = $(this);
        const id = button.data("id");
        console.log(id, "id");
        const value = button.text();
        console.log(value, "value");
        let updateStatus;
      
            if(value === "Available"){
                updateStatus = "Unavailable";
            } else if(value === 'Unavailable') {
                updateStatus = "Available";
            } else {
                updateStatus = "Unavailable";
            }
        updateItem(id, updateStatus, button);
    })
});

const updateItem = async (id, updateStatus, button) => {
    
    if (id && updateStatus) {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ updateStatus }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                button.text(updateStatus);
            } else {
                console.log('Failed to update item status');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to update item status');
        }
    } else {
        console.error('ID or updatedStatus is missing');
        console.log('Error when updating item status');
    }
};

const createItem = async(name, price, status, category_id) => {
    if(name && price && category_id) {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'POST',
                body: JSON.stringify({ name, price, category_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok) {
                console.log("New item created");
            } else {
                console.log("Failed to add new item");
            };
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to add item');
        }
    } else {
        console.log("Check new item details");
    };
};

$(document).ready(function() {
    $(document).on('click', '.update-order-button', function(event) {
        //prevents dropdown from closing
        // event.stopPropagation();        
        const button = $(this);
        const id = button.data("id");
        const value = button.text();
        let updateStatus;
      
            if(value === "Being prepared"){
                updateStatus = "Ready";
            } else if(value === 'Ready') {
                updateStatus = "In transit";
            } else if(value === 'In transit') {
                updateStatus = "Delivered";
            } else if(value === "Delivered") {
                updateStatus = "Being prepared";
            } else {
                updateStatus = "Order status error";
            }
        updateOrder(id, updateStatus, button);
    })
});

const updateOrder = async (id, updateStatus, button) => {
    
    if (id && updateStatus) {
        console.log(id, "id", updateStatus, "updateStatus");
        try {
            const response = await fetch(`/api/customerOrders/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ updateStatus }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                button.text(updateStatus);
            } else {
                console.log('Failed to update item status');
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Failed to update item status');
        }
    } else {
        console.error('ID or updatedStatus is missing');
        console.log('Error when updating item status');
    }
};