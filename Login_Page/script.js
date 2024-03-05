function slideContent(side) {
    const leftContent = document.getElementById('signin');
    const rightContent = document.getElementById('signup');
    const signInForm = document.getElementById('signinform');
    const signUpForm = document.getElementById('signupform');
  
    if (side === 'left') {
      leftContent.classList.add('slide-left');
      signInForm.classList.remove('hidden');
    } else {
      rightContent.classList.add('slide-right');
      signUpForm.classList.remove('hidden');
    }
  }
  