$(document).ready(function() {
    $(document).on('click', '.delete-item', function(event) {
        event.stopPropagation();
    const button = $(this);
    const id = button.data("id");
    deleteItem(id);
    })
});

// $(document).ready(function() {
//     $(document).on('click', '#delete-category-btn', function(event) {
//         event.preventDefault();
//         let data_id = getDataInput();
//         deleteCategory(data_id);
//     });
// });
$(document).ready(function() {
    $(document).on('click', '#delete-category-btn', function(event) {
        event.preventDefault();
        const categoryInput = document.querySelector('#category-input');
        const id = categoryInput.value;
        console.log(id, "id");
        deleteCategory(id);
    });
});

getCategoryInput = () => {
    const categoryInput = document.querySelector('#category-list');
    const categoryList = Array.from(document.querySelector('#categoryListOptions').options);
    const categoryValue = categoryInput.value;
    let category_id = null;
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryValue === categoryList[i].value) {
            category_id = categoryList[i].getAttribute('data-id');
           break
       }
    }
    return category_id;
};

deleteItem = async (id) => {
    if(id) {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });

            if(response.ok) {
                alert('Item deleted');
                location.reload();
            } else {
                alert("Failed to delete item.");
            };
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the item');
        };
    } else {
        alert("No item found.");
    };
};       

deleteCategory = async (id) => {
    const categoryInput = document.querySelector('#category-input');
    if(id) {
        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });
            if(response.ok) {
                alert('Category deleted');
                location.reload();
            } else {
                alert("Failed to delete category.");
            };
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the category');
        } finally {
            categoryInput.value = 'Select category';
        }
    };
};

const addItem = async(event) => {
    event.preventDefault();
    const nameInput = document.querySelector('#item-name');
    const priceInput = document.querySelector('#item-price');
    const category_id = document.querySelector('#category-list').value;
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value.trim()).toFixed(2);
    console.log(name, "name", price, "price", category_id, "category");
    
    if(name && !isNaN(price) && category_id) {
        try {
            const response = await fetch(`/api/items/`, {
                method: 'POST',
                body: JSON.stringify({ name, price, category_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok) {
                alert('New item added successfully!');
                nameInput.value = '';
                priceInput.value = '';
                categoryInput.value = 'Select category';
                // location.reload();
            } else {
                alert("Failed to add new item");
            };
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the item.');
            
        }
    } else {
        alert("Check item details");
    };
};

const addCategory = async (event) => {
    event.preventDefault();

    const categoryNameInput = document.querySelector('#category-name');
    const categoryName = categoryNameInput.value.trim();

    if(categoryName) {
        //Send post request to API endpoint
        try {
            const response = await fetch(`/api/categories/new`, {
                method: 'POST',
                body: JSON.stringify({ name: categoryName }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok) {
                alert('Category added successfully!');
                categoryNameInput.value = '';
                location.reload();
            } else {
                alert('Failed to add category');
            };
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the category');
        };
    } else {
        alert('Please enter a category name.')
    }
};

document.querySelector('#add-category-form').addEventListener('submit', addCategory);
document.querySelector('#add-item-form').addEventListener('submit', addItem);