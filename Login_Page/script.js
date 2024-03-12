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

  