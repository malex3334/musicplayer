"use strict";

const data = [
  {
    song: "Mówiłaś Mi",
    artist: "O.S.T.R.",
    cover:
      "https://images.genius.com/95158566e73ea4ee02dd2b7b24463d8d.500x500x1.jpg",
    audio: "/music/OSTR.mp3",
  },
  {
    song: "To jest ta miłość",
    artist: "O.S.T.R.",
    cover: "https://www.gloskultury.pl/wp-content/uploads/2017/12/ostry.jpg",
    audio: "/music/OSTR2.mp3",
  },
  {
    song: "Na Szczycie Blend",
    artist: "SzUsty Blend",
    cover: "https://i1.sndcdn.com/artworks-000554516715-g2a53s-t500x500.jpg",
    audio: "/music/Quebo.mp3",
  },
  {
    song: "Panamericana",
    artist: "Eldo",
    cover:
      "https://images.genius.com/40f956cb7b2fe1cabe03005755474b4d.803x800x1.jpg",
    audio: "/music/Eldo1.mp3",
  },
];

// time converter seconds to MMSS

const currentTimeMMSS = function (seconds) {
  let sec = 0;
  let min = 0;

  sec = Math.floor(seconds) % 60;
  min = parseInt(Math.floor(seconds) / 60);
  if (sec.toString().length == 1) sec = "0" + sec;
  if (min <= 9) min = "0" + min;
  return `${min}:${sec}`;
};

const songTitle = document.getElementById("title");
const artistName = document.getElementById("artist");
const cover = document.getElementById("cover");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentTimeEl = document.getElementById("current");
const songDurationEl = document.getElementById("duration");
const progressBar = document.getElementById("progress");
const sliderDuration = document.getElementById("slider-duration");
const audio = document.getElementById("audio");
const player = document.getElementById("player");

const volumeMinEl = document.getElementById("volume-min");
const volumeMaxEl = document.getElementById("volume-max");

//SONGS CHANGE
let i = 0;
const albumCover = document.getElementById("cover");
const currentTimeCon = Math.floor(audio.currentTime);
const songDurationCon = Math.floor(audio.duration);
const volumeSlider = document.getElementById("volume-slider");
const currentVolumeSlider = document.getElementById("current-volume");

// TIMERS
let timeMMSS = 0;

//LOAD SONG
const loadSong = function () {
  audio.src = data[i].audio;

  //LOAD DATA
  albumCover.style.background = `url(\"${data[i].cover}\")`;
  albumCover.style.backgroundSize = "cover";
  document.body.style.background = `url(\"${data[i].cover}\")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.background = `url(\"${data[i].cover}\")`;
  document.body.style.backgroundSize = "cover";
  songTitle.innerHTML = data[i].song;
  artistName.innerHTML = data[i].artist;

  audio.addEventListener("canplay", () => {
    songDurationEl.innerHTML = currentTimeMMSS(audio.duration);
  });

  //current time AND SONG DURATION
  audio.addEventListener("timeupdate", () => {
    // SHOW FUNCTION
    progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    currentTimeEl.innerHTML = currentTimeMMSS(audio.currentTime);
  });

  sliderDuration.addEventListener("click", (e) => {
    let sliderPositionX = e.offsetX;
    let sliderPositionXValue =
      (sliderPositionX / sliderDuration.offsetWidth) * audio.duration;
    audio.currentTime = sliderPositionXValue;
  });
};

// PLAY
const playAudio = function () {
  audio.play();

  // VOLUME SLIDER
  volumeSlider.addEventListener("click", (e) => {
    let volumeSliderPositionX = e.offsetX;
    let volumeSliderPositionXValue =
      (volumeSliderPositionX / volumeSlider.offsetWidth) * 1;

    audio.volume = volumeSliderPositionXValue;
    currentVolumeSlider.style.width = `${volumeSliderPositionXValue * 100}%`;

    volumeMaxEl.addEventListener("click", () => {
      audio.volume = 1;
      currentVolumeSlider.style.width = "100%";
      volumeMaxEl.style.color = "white";
      volumeMinEl.style.color = "black";
    });
    volumeMinEl.addEventListener("click", () => {
      audio.volume = 0;
      currentVolumeSlider.style.width = "0";
      volumeMinEl.style.color = "white";
      volumeMaxEl.style.color = "black";
    });

    audio.volume < 0.02
      ? (volumeMinEl.style.color = "white")
      : (volumeMinEl.style.color = "black");

    audio.volume > 0.98
      ? (volumeMaxEl.style.color = "white")
      : (volumeMaxEl.style.color = "black");
  });
};

// KEEP PLAYING AFTER SONGS END
audio.onended = function () {
  functionNext();
  loadSong();
  const isPlaying = play.classList.contains("active");
  if (isPlaying) {
    setTimeout(() => {
      playAudio();
    }, 500);
  }
};

const pauseAudio = function () {
  audio.pause();
};

const stopAudio = function () {
  audio.pause();
};

//  PLAY CLICKED
play.addEventListener("click", () => {
  play.classList.add("active");
  pause.classList.remove("active");
  cover.style.animationPlayState = "running";
  playAudio();
});

//  PAUSE CLICKED
pause.addEventListener("click", () => {
  play.classList.remove("active");
  pause.classList.add("active");
  cover.style.animationPlayState = "paused";
  pauseAudio();
});

// FORWARD CLICKED
next.addEventListener("click", () => {
  functionNext();
  loadSong();
  const isPlaying = play.classList.contains("active");
  if (isPlaying) {
    playAudio();
  }
});

// PREVIOUS CLICKED
previous.addEventListener("click", () => {
  functionPrvious();
  loadSong();
  const isPlaying = play.classList.contains("active");
  if (isPlaying) {
    playAudio();
  }
});

// INCREMENT SONG INDEX
const functionNext = function () {
  if (i >= data.length - 1) i = 0;
  else i++;
};

// DECREMENT SONG INDEX
const functionPrvious = function () {
  if (i <= 0) i = data.length - 1;
  else i--;
};

// FUNCTIONS ON START
loadSong();
