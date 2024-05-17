fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                const cakeContainer = document.getElementById('cakecontainer');
                const breadContainer = document.getElementById('breadcontainer');
                const bevContainer = document.getElementById('bevcontainer');
                const snackContainer = document.getElementById('snackcontainer');
                const donutContainer = document.getElementById('donutcontainer');
                const bisContainer = document.getElementById('biscontainer');

                products.forEach(product => {
                    
                    const productCard = document.createElement('div');
                    productCard.classList.add('card');

                    const img = document.createElement('img');
                    img.src = product.imageUrl;
                    img.alt = product.name;
                    productCard.appendChild(img);

                    const name = document.createElement('h5');
                    name.textContent = product.name;
                    productCard.appendChild(name);

                    const category = document.createElement('p');
                    category.textContent = `Category: ${product.category}`;
                    productCard.appendChild(category);

                    const price = document.createElement('p');
                    price.textContent = `Price: ${product.price}`;
                    productCard.appendChild(price);

                    const button = document.createElement('button');
                    button.textContent = 'Buy Now';
                    button.classList.add('btn', 'btn-warning', 'mt-3');
                    productCard.appendChild(button);

                    if (product.category === 'Cakes') {
                        cakeContainer.appendChild(productCard);
                    } else if (product.category === 'Breads') {
                        breadContainer.appendChild(productCard);
                    } else if (product.category === 'Beverages') {
                        bevContainer.appendChild(productCard);
                    } else if (product.category === 'Snacks') {
                        snackContainer.appendChild(productCard);
                    } else if (product.category === 'Doughnuts') {
                        donutContainer.appendChild(productCard);
                    } else if (product.category === 'Biscuits') {
                        bisContainer.appendChild(productCard);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });