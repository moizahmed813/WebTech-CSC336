document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  // form.addEventListener("submit", function (event) {
  //   event.preventDefault();
  //     alert("Form submitted successfully!");
  //     const formData = new FormData(form);
  //     console.log("Form data:", formData);
  //     form.reset();
  // });

  function validateForm() {
    let valid = true;
    resetErrors();

    const firstName = document.getElementById("firstName").value;
  //   const lastName = document.getElementById("lastName").value;
  //   const email = document.getElementById("email").value;
  //   const message = document.getElementById("message").value;

    const firstNameError = document.getElementById("firstNameError");
  //   const lastNameError = document.getElementById("lastNameError");
  //   const emailError = document.getElementById("emailError");
  //   const messageError = document.getElementById("messageError");

    if (firstName.trim() === "") {
      displayError(firstNameError, "Please enter your First Name");
      valid = false;
    }

    if (lastName.trim() === "") {
      displayError(lastNameError, "Please enter your Last Name");
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayError(emailError, "Invalid email address");
      valid = false;
    }

    if (message.trim() === "") {
      displayError(messageError, "Please enter your message");
      valid = false;
    }

    return valid;
  }

  function displayError(errorElement, errorMessage) {
    errorElement.textContent = errorMessage;
  }

  function resetErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(function (errorElement) {
      errorElement.textContent = "";
    });
  }

});

