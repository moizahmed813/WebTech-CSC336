
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
      alert("Form submitted successfully!");
      const formData = new FormData(form);
      console.log("Form data:", formData);
      form.reset();
  });

});

function slideContent(direction) {
  const formGrid = document.querySelector('.form-grid');

  if (direction === 'left') {
    formGrid.classList.remove('signup');
    formGrid.classList.add('signin');
  } else if (direction === 'right') {
    formGrid.classList.remove('signin');
    formGrid.classList.add('signup');
  }
}



  