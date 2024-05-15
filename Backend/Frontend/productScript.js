document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const productsList = document.getElementById('productsList');
            data.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `${product.name}: ${product.category}: ${product.price}`;
                productsList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
