function slideContent(side) {
    const leftContent = document.getElementById('leftContent');
    const rightContent = document.getElementById('rightContent');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
  
    if (side === 'left') {
      leftContent.classList.add('slide-left');
      signInForm.classList.remove('hidden');
    } else {
      rightContent.classList.add('slide-right');
      signUpForm.classList.remove('hidden');
    }
  }
  