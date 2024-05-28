async function checkSession() {
    try {
      const response = await fetch('/api/check-session');
      if (!response.ok) {
        throw new Error('Session expired');
      }
      const data = await response.json();
      if (!data.valid) {
        clearSearchHistory();
      }
    } catch (error) {
      clearSearchHistory();
    }
}

  function clearSearchHistory() {
    sessionStorage.removeItem('searchHistory');
    document.getElementById('category-input').value = '';
    document.getElementById('product-container').innerHTML = '';
    document.getElementById('pagination-container').innerHTML = '';
    document.getElementById('error-message').textContent = 'Session expired.';
    document.getElementById('history-list').innerHTML = '';
  }

  function updateSearchHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    const searchHistory = JSON.parse(sessionStorage.getItem('searchHistory')) || [];
    historyList.innerHTML = '';
    searchHistory.forEach(term => {
      const listItem = document.createElement('li');
      listItem.textContent = term;
      historyList.appendChild(listItem);
    });
  }

  setInterval(checkSession, 1000);

document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const category = document.getElementById('category-input').value.trim();
    const validCategories = ['Cakes', 'Breads', 'Beverages', 'Snacks', 'Doughnuts', 'Biscuits'];
    const errorMessageElement = document.getElementById('error-message');
    const productContainer = document.getElementById('product-container');
    const paginationContainer = document.getElementById('pagination-container');
    const productsPerPage = 3; 

    errorMessageElement.textContent = '';
    productContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    if (!validCategories.includes(category)) {
        errorMessageElement.textContent = 'Please enter a valid category.';
        return;
    }

    try {
        const response = await fetch(`/api/products?category=${encodeURIComponent(category)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();

        const matchingProducts = products.filter(product => product.category === category);

        const totalPages = Math.ceil(matchingProducts.length / productsPerPage);
        let currentPage = 1;

        function renderProducts(page) {
            const startIndex = (page - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const displayedProducts = matchingProducts.slice(startIndex, endIndex);

            productContainer.innerHTML = '';
            displayedProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.imageUrl}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <p>${product.price}</p>
                `;
                productContainer.appendChild(productCard);
            });

            paginationContainer.innerHTML = '';
            if (totalPages > 1) {
                if (currentPage > 1) {
                    const prevButton = document.createElement('button');
                    prevButton.textContent = 'Prev';
                    prevButton.addEventListener('click', () => {
                        currentPage--;
                        renderProducts(currentPage);
                    });
                    paginationContainer.appendChild(prevButton);
                }
                if (currentPage < totalPages) {
                    const nextButton = document.createElement('button');
                    nextButton.textContent = 'Next';
                    nextButton.addEventListener('click', () => {
                        currentPage++;
                        renderProducts(currentPage);
                    });
                    paginationContainer.appendChild(nextButton);
                }
            }
        }

        renderProducts(currentPage);

        if (matchingProducts.length === 0) {
            productContainer.innerHTML = `<p>No products found. "${category}".</p>`;
        }
        let searchHistory = JSON.parse(sessionStorage.getItem('searchHistory')) || [];
            searchHistory.push(category);
            sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        updateSearchHistoryDisplay();

        }catch (error) {
            errorMessageElement.textContent = 'Error searching products.';
            console.error('Error searching products:', error);
    }
});

updateSearchHistoryDisplay();

