import { Howl } from 'howler';

let player: Howl | null = null;
let pausedTime = 0;
let currentTrack = 1;
const volumes = [0.45, 0.45, 0.35, 0.4, 0.32];
const length = volumes.length;

const play = () => {
  if (player) {
    player.unload();
  }
  home.classList.add('is-loading');
  home.classList.remove('is-paused');
  player = new Howl({
    src: [`assets/sounds/track${currentTrack}.mp3`],
    volume: volumes[currentTrack - 1],
    onload: () => {
      home.classList.remove('is-loading', 'is-playing', 'is-track1', 'is-track2', 'is-track3', 'is-track4', 'is-track5');
      home.classList.add(`is-track${currentTrack}`, 'is-playing');
      player?.play();
      player?.seek(pausedTime);
    },
    onloaderror: () => {
      home.classList.remove('is-loading');
    },
    onend: () => {
      home.classList.remove(`is-track${currentTrack}`, 'is-playing');
      currentTrack = (currentTrack % length) + 1;
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
    home.classList.remove('is-playing');
    home.classList.add('is-paused');
  }
};

const home = document.querySelector('.home')!;
const playButton = document.querySelector('.player button.play')!;
const backButton = document.querySelector('.player button.back')!;
const skipButton = document.querySelector('.player button.skip')!;

playButton.addEventListener('click', () => {
  if (home.classList.contains('is-playing')) {
    pause();
  } else {
    play();
  }
});

backButton.addEventListener('click', () => {
  currentTrack = currentTrack === 1 ? length : currentTrack - 1;
  pausedTime = 0;
  if (player && player.playing()) {
    home.classList.remove('is-playing');
    player.stop();
  } else {
    home.classList.remove('is-paused');
  }
  play();
});

skipButton.addEventListener('click', () => {
  currentTrack = (currentTrack % length) + 1;
  pausedTime = 0;
  if (player && player.playing()) {
    home.classList.remove('is-playing');
    player.stop();
  } else {
    home.classList.remove('is-paused');
  }
  play();
});