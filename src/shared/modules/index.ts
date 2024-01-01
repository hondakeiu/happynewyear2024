import { Howl } from 'howler';

let player: Howl | null = null;
let pausedTime = 0;
let currentTrack = 1;

const play = () => {
  if (player) {
    player.unload();
  }
  player = new Howl({
    src: [`src/home/sounds/track${currentTrack}.mp3`],
    volume: 0.9,
    onload: () => {
      console.log(pausedTime);
      home.classList.remove('is-track1', 'is-track2');
      home.classList.add(`is-track${currentTrack}`);
      player?.play();
      player?.seek(pausedTime);
    },
    onend: () => {
      home.classList.remove(`is-track${currentTrack}`);
      currentTrack = currentTrack === 1 ? 2 : 1;
      pausedTime = 0;
      play();
    },
  });
};

const pause = () => {
  if (player && player.playing()) {
    pausedTime = player.seek() as number;
    player.unload();
    player = null;
  }
};

const home = document.querySelector('.home')!;
const playButton = document.querySelector('.player button.play')!;
const backButton = document.querySelector('.player button.back')!;
const skipButton = document.querySelector('.player button.skip')!;

playButton.addEventListener('click', () => {
  if (home.classList.contains('is-playing')) {
    home.classList.remove('is-playing');
    pause();
  } else {
    home.classList.add('is-playing');
    play();
  }
});

backButton.addEventListener('click', () => {
  if (player && player.playing()) {
    currentTrack = currentTrack === 1 ? 2 : 1;
    pausedTime = 0;
    player.stop();
    play();
  }
});

skipButton.addEventListener('click', () => {
  if (player && player.playing()) {
    currentTrack = currentTrack === 1 ? 2 : 1;
    pausedTime = 0;
    player.stop();
    play();
  }
});
