$(document).ready(function() {
    $(document).on('click', '.update-button', function(event) {
        //prevents dropdown from closing
        event.stopPropagation();

        const button = $(this);

        const id = button.data("id");
        const value = button.text();
        let updateStatus;
      
            if(value === "Available"){
                updateStatus = "Unavailable";
            } else if(value === 'Unavailable') {
                updateStatus = "Available";
            } else {
                console.log('value unknown');
            }
        updateItem(id, updateStatus, button);
    })
});

const updateItem = async (id, updateStatus, button) => {
    if (id && updateStatus) {
        console.log(updateStatus, 'updateStatus');

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
                console.log(`Item status updated`);
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
