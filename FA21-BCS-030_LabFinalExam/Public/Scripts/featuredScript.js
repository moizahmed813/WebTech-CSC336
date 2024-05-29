document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            const featuredProducts = products.filter(product => product.isFeatured);
            const container = document.getElementById('featured-products-container');

            featuredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-c');
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <p class="price">${product.price}</p>
                    <a  href="/api/products/${product._id}">View Details</a>
                `;
                container.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

function viewDetails(productId) {
    window.location.href = `/product-details/${productId}`;
}