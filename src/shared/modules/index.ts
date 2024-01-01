import * as Tone from 'tone';

let player: Tone.Player | null = null;
let pausedTime = 0;
let currentTrack = 1;

const play = async () => {
  if (player) {
    player.dispose();
  }
  player = new Tone.Player({
    url: `src/home/sounds/track${currentTrack}.mp3`,
    autostart: false,
    onload: () => {
      player?.start('+0.1', pausedTime);
      home.classList.add(`is-track${currentTrack}`);
    },
    onstop: () => {
      home.classList.remove(`is-track${currentTrack}`);
      currentTrack = currentTrack === 1 ? 2 : 1;
      pausedTime = 0;
      play();
    },
  }).toDestination();
  player.volume.value = -10;
  await Tone.start();
  await Tone.loaded();
  Tone.Transport.start();
};

const pause = () => {
  if (player && player.state === 'started') {
    Tone.Transport.pause();
    pausedTime = Tone.Transport.seconds;
    player.dispose();
    player = null;
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