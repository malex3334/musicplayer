"use strict";

const data = [
  {
    song: "Mówiłaś Mi",
    artist: "O.S.T.R.",
    cover:
      "https://images.genius.com/95158566e73ea4ee02dd2b7b24463d8d.500x500x1.jpg",
    audio: "/music/OSTR.mp3",
    background: "",
  },
  {
    song: "To jest ta miłość",
    artist: "O.S.T.R.",
    cover: "https://www.gloskultury.pl/wp-content/uploads/2017/12/ostry.jpg",
    audio: "/music/OSTR2.mp3",
    background: "",
  },
  {
    song: "Na Szczycie Blend",
    artist: "SzUsty Blend",
    cover: "https://i1.sndcdn.com/artworks-000554516715-g2a53s-t500x500.jpg",
    audio: "/music/Quebo.mp3",
    background: "",
  },
];

// console.log(data[0].song);
// console.log(data[0].cover);
// console.log(data[0].audio);

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
const audio = document.getElementById("audio");
//SONGS CHANGE
let i = 0;
const albumCover = document.getElementById("cover");
const currentTimeCon = Math.floor(audio.currentTime);
const songDurationCon = Math.floor(audio.duration);

// TIMERS
const currentTimeFormat = function () {
  if (currentTimeCon < 9) {
    `0${currentTimeCon}`;
  }
};

//LOAD SONG
const loadSong = function () {
  audio.src = data[i].audio;

  //load data
  albumCover.style.background = `url(\"${data[i].cover}\")`;
  albumCover.style.backgroundSize = "cover";
  document.body.style.background = `url(\"${data[i].cover}\")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.background = `url(\"${data[i].cover}\")`;
  document.body.style.backgroundSize = "cover";
  songTitle.innerHTML = data[i].song;
  artistName.innerHTML = data[i].artist;

  //current time AND SONG DURATION
  audio.addEventListener("timeupdate", () => {
    progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    currentTimeEl.innerHTML = Math.floor(audio.currentTime);
    songDurationEl.innerHTML = Math.floor(audio.duration);
  });
};

const playAudio = function () {
  audio.play();
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

const functionNext = function () {
  if (i >= data.length - 1) i = 0;
  else i++;
};

const functionPrvious = function () {
  if (i <= 0) i = data.length - 1;
  else i--;
};

//TIMMERS

// FUNCTIONS ON START
loadSong();

console.log(audio.currentTime);
console.log(audio.duration);
