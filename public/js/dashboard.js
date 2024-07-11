// const updateButton = document.getElementById("update-button");

// // const updateButtonHandler = async (event) => {
// //     event.preventDefault();
// //     event.target.
// // }

// document.querySelector('#update-button').addEventListener('click', updateButtonHandler);

// $(document).ready(function(){
//     $("#update-button").on('click', function(){
//       const id = $("#update-button").attr("data-id");
//       const value = $("#update-button").attr("data-value");
//       updateItem(id, value);
//     });
// });

// const updateItem = async (id, value) => {
//     if( id && value ) {
//         console.log(value, 'value');
//         if( value === 'Available') {
//             console.log('value = available');
//             const status = "Unavailable";
//             const response = await fetch (`api/items/${id}`, {
//                 method: 'PUT',
//                 body: JSON.stringify({ status }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if(response.ok) {
//                 alert('Item status updated to unavailable');
//             } else {
//                 alert('Failed to update item status');
//             }
    
//         } else if (value === 'Unavailable') {
//             const status = "Available";
//             const response = await fetch (`api/items/${id}`, {
//                 method: 'UPDATE',
//                 body: JSON.stringify({ status }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if(response.ok) {
//                 alert('Item status updated to available');
//             } else {
//                 alert('Failed to update item status');
//             }
//         } else {
//             alert('Update status error');
//         }
//     }
// };

$(document).ready(function() {
    $("#update-button").on('click', function() {
        const id = $(this).data("id");
        console.log(id, 'id');
        // const value = $(this).data("value");
        console.log($("#update-button").text());
        const value = $("#update-button").text();
        let updateStatus;
      
            if(value === "Available"){
                updateStatus = "Unavailable";
            } else if(value === 'Unavailable') {
                updateStatus = "Available";
            } else {
                console.log('value unknown');
            }

        console.log('Button clicked');
        console.log('ID:', id);
        console.log('Value:', value);

        updateItem(id, updateStatus);
    });
});

const updateItem = async (id, updateStatus) => {
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
                document.location.replace('/dashboard');
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
