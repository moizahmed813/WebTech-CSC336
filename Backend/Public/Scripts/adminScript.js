let fetchProducts;

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');

    fetchProducts = function() {
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                productList.innerHTML = '';
                products.forEach(product => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${product.imageUrl}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>$${product.price}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" onclick="editProduct('${product._id}')">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product._id}')">Delete</button>
                        </td>
                    `;
                    productList.appendChild(tr);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    fetchProducts();

    const addProductForm = document.getElementById('addStoryForm');
    addProductForm.addEventListener('submit', event => {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const category = document.getElementById('category').value;
        const price = document.getElementById('price').value;
        const imageUrl = document.getElementById('imageUrl').value;

        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: productName, category, price, imageUrl })
        })
        .then(response => response.json())
        .then(newProduct => {
            fetchProducts(); 
            addProductForm.reset(); 
        })
        .catch(error => console.error('Error adding product:', error));
    });
});





function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchProducts(); 
    })
    .catch(error => console.error('Error deleting product:', error));
}