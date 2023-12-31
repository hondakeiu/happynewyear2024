import * as Tone from 'tone';

let player: Tone.Player | null = null;
let pausedTime = 0;

const play = async () => {
  if (!player) {
    player = new Tone.Player({
      url: 'src/home/sounds/track1.mp3',
      autostart: false,
    }).toDestination();
    player.volume.value = -20;
  }
  await Tone.start();
  await Tone.loaded();
  Tone.Transport.start();
  player.start('+0.1', pausedTime);
};

const pause = () => {
  if (player && player.state === 'started') {
    Tone.Transport.pause();
    pausedTime = Tone.Transport.seconds;
    player.stop();
  }
};

const home = document.querySelector('.home')!;
const playButton = document.querySelector('.player button.play')!;

playButton.addEventListener('click', () => {
  if (home.classList.contains('is-playing')) {
    home.classList.remove('is-playing');
    pause();
  } else {
    home.classList.add('is-playing');
    play();
  }
});
