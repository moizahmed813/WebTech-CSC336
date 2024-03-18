// $(document).ready(function() {
//     // Define the API endpoint
//     var apiLocation = "https://jsonplaceholder.typicode.com/posts";

//     // Make AJAX request to fetch data from the API
//     $.ajax({
//         url: apiLocation,
//         method: "GET",
//         dataType: "json",
//         success: function (data) {
//             var productsList = $("#productsList");
//             productsList.empty();
//             $.each(data, function (index, product) {
//                 productsList.append(
//                   `<div class="mb-3">
//                         <h3>${product.title}</h3>
//                         <div>${product.content}</div>
//                         <div>
//                             <button class="btn btn-warning mt-3" data-id="${product.id}">Edit</button>
//                             <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${product.id}">Delete</button>
//                         </div>
//                     </div>
//                     <hr />
//                     `
//                 );
//               });
//             },
//             error: function (error) {
//               console.error("Error fetching stories:", error);
//             },
//           });
//         })

//         function deleteProduct() {
//             let productId = $(this).attr("data-id");
//             $.ajax({
//               url: "https://jsonplaceholder.typicode.com/posts" + productId,
//               method: "DELETE",
//               success: function () {
//                 displayStories(); // Refresh the list after deleting a story
//               },
//               error: function (error) {
//                 console.error("Error deleting story:", error);
//               },
//             });
//           }

