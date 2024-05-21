let fetchProducts;
let currentPage = 1;
const pageSize = 10;

function goToNextPage() {
    currentPage++;
    fetchProducts();
    updatePaginationButtons();
  }


  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
      fetchProducts();
      updatePaginationButtons();
    }
  }
  function updatePaginationButtons() {
    const previousButton = pagination.querySelector('button:first-child');
    const nextButton = pagination.querySelector('button:last-child');
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage >= Math.ceil(products.length / pageSize);
  }

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');

    fetchProducts = function() {
        fetch('/api/products?page=${currentPage}&pageSize=${pageSize}')
            .then(response => response.json())
            .then(products => {
                productList.innerHTML = '';
                const startIndex = (currentPage - 1) * pageSize;
                const endIndex = Math.min(startIndex + pageSize, products.length);
                products.slice(startIndex, endIndex).forEach(product => {
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
    const pagination = document.querySelector('.pagination');
  if (pagination) {
    pagination.innerHTML = `
      <button class="nxtbtn" onclick="goToPreviousPage()">Prev</button>
      <button class="prvbtn" onclick="goToNextPage()">Next</button>
    `;
  }
 
});



function editProduct(productId) {
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(product => {
       
        document.getElementById('editProductId').value = product._id;
        document.getElementById('editProductName').value = product.name;
        document.getElementById('editCategory').value = product.category;
        document.getElementById('editPrice').value = product.price;
        document.getElementById('editImageUrl').value = product.imageUrl;

        document.getElementById('editForm').style.display = 'block';
      })
      .catch(error => console.error('Error fetching product for edit:', error));
  }

  const editForm = document.getElementById('editForm');
  editForm.addEventListener('submit', event => {
    event.preventDefault();
    const productId = document.getElementById('editProductId').value;
    const productName = document.getElementById('editProductName').value;
    const category = document.getElementById('editCategory').value;
    const price = document.getElementById('editPrice').value;
    const imageUrl = document.getElementById('editImageUrl').value;

    fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: productName, category, price, imageUrl })
    })
      .then(response => response.json())
      .then(updatedProduct => {
        fetchProducts(); 
        editForm.style.display = 'none'; 
      })
      .catch(error => console.error('Error updating product:', error));
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
