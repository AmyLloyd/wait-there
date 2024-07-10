const updateBtnHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/items/${id}`, {
            method: 'UPDATE',
        });

        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update item status');
        }
    }
};

document
    .querySelector('.item-list')
    .addEventListener('click', updateBtnHandler);