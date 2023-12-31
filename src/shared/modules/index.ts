const home = document.querySelector('.home')!;
const playButton = document.querySelector('.player button.play')!;

playButton.addEventListener('click', () => {
  if (home.classList.contains('is-playing')) {
    home.classList.remove('is-playing');
  } else {
    home.classList.add('is-playing');
  }
})