$(document).ready(function() {
    var apiLocation = "https://jsonplaceholder.typicode.com/posts";

    function fetchProducts(){
        $.ajax({
            url: apiLocation,
            method: "GET",
            dataType: "json",
            success: function (data) {
                var productsList = $("#productsList");
                productsList.empty();
                $.each(data, function (index, product) {
                    productsList.append(
                    `<div class="mb-3">
                            <h3>${product.title}</h3>
                            <h3>${product.cat}</h3>
                            <div>${product.content}</div>
                            <div>
                                <button class="btn btn-warning mt-3" data-id="${product.id}">Edit</button>
                                <button class="btn btn-danger mt-3" data-id="${product.id}">Delete</button>
                            </div>
                        </div>
                        <hr />
                        `
                    );
                });
                },
                error: function (error) {
                console.error("Error fetching products:", error);
                },
            });
            }        

    fetchProducts(); 

    $("#createBtn").click(function(event) {
        event.preventDefault();
        var name = $("#createTitle").val();
        var category = $("#createCategory").val();
        var detail = $("#createContent").val();

        $.ajax({
            url: apiLocation,
            method: "POST",
            data: {
                title: name,
                cat: category,
                content: detail,
                userId: 1 
            },
            success: function(response) {
                console.log("Product created:", response);
                fetchProducts();
            },
            error: function(xhr, status, error) {
                console.error("Error creating product:", error);
            }
        });
    });
})