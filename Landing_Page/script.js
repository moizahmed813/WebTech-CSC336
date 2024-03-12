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
