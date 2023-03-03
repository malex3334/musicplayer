"use strict";

let data = [
  // {
  //   id: 1,
  //   song: "Mówiłaś Mi",
  //   artist: "O.S.T.R.",
  //   cover:
  //     "https://images.genius.com/95158566e73ea4ee02dd2b7b24463d8d.500x500x1.jpg",
  //   audio: "/music/OSTR.mp3",
  //   fav: true,
  // },
  // {
  //   id: 2,
  //   song: "To jest ta miłość",
  //   artist: "O.S.T.R.",
  //   cover: "https://www.gloskultury.pl/wp-content/uploads/2017/12/ostry.jpg",
  //   audio: "/music/OSTR2.mp3",
  //   fav: true,
  // },
  // {
  //   id: 3,
  //   song: "Na Szczycie Blend",
  //   artist: "SzUsty Blend",
  //   cover: "https://i1.sndcdn.com/artworks-000554516715-g2a53s-t500x500.jpg",
  //   audio: "/music/Quebo.mp3",
  //   fav: true,
  // },
  // {
  //   id: 4,
  //   song: "Panamericana",
  //   artist: "Eldo",
  //   cover:
  //     "https://images.genius.com/40f956cb7b2fe1cabe03005755474b4d.803x800x1.jpg",
  //   audio: "/music/Eldo1.mp3",
  //   fav: false,
  // },
];
const allSongs = [
  {
    id: 1,
    song: "Mówiłaś Mi",
    artist: "O.S.T.R.",
    cover:
      "https://images.genius.com/95158566e73ea4ee02dd2b7b24463d8d.500x500x1.jpg",
    audio: "/music/OSTR.mp3",
    fav: false,
  },
  {
    id: 2,
    song: "To jest ta miłość",
    artist: "O.S.T.R.",
    cover: "https://www.gloskultury.pl/wp-content/uploads/2017/12/ostry.jpg",
    audio: "/music/OSTR2.mp3",
    fav: false,
  },
  {
    id: 3,
    song: "Na Szczycie Blend",
    artist: "SzUsty Blend",
    cover: "https://i1.sndcdn.com/artworks-000554516715-g2a53s-t500x500.jpg",
    audio: "/music/Quebo.mp3",
    fav: false,
  },
  {
    id: 4,
    song: "Panamericana",
    artist: "Eldo",
    cover:
      "https://images.genius.com/40f956cb7b2fe1cabe03005755474b4d.803x800x1.jpg",
    audio: "/music/Eldo1.mp3",
    fav: false,
  },
];

let favSongsData = [];

function updateFavSongsList() {
  let filter = allSongs.filter((x) => x.fav == true);
  favSongsData = filter;
}

data = allSongs;
updateFavSongsList();

const createPlaylist = function () {
  let songPlaylistIndex = 1;

  data.forEach((song) => {
    const newLi = document.createElement("li");
    newLi.classList.add("playlist__list_element");
    newLi.setAttribute("data-id", song.id);
    playlist.appendChild(newLi);
    newLi.innerHTML = `${songPlaylistIndex++}. ${song.artist} - ${
      song.song
    } <span class='songtime'></span>`;

    newLi.addEventListener("click", (e) => {
      i = e.target.getAttribute("data-id");
      loadSong();
      "e", e.target.getAttribute("data-id");

      const isPlaying = play.classList.contains("active");
      if (isPlaying) {
        playAudio();
      }
    });
  });
};

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
// OPTIONS
let repeatFlag = false;
let shuffleFlag = false;
const repeatBtn = document.querySelector("#repeat");
const shuffleBtn = document.querySelector("#shuffle");

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
const playlist = document.getElementById("playlist__list");

const volumeMinEl = document.getElementById("volume-min");
const volumeMaxEl = document.getElementById("volume-max");

//SONGS CHANGE
let i = 0;
const albumCover = document.getElementById("cover");
const currentTimeCon = Math.floor(audio.currentTime);
const songDurationCon = Math.floor(audio.duration);
const volumeSlider = document.getElementById("volume-slider");
const currentVolumeSlider = document.getElementById("current-volume");

// FAV
const toggleFavPlaylist = document.getElementById("toggle-fav");
toggleFavPlaylist.innerText = "Fav Songs";
let showFav = false;

toggleFavPlaylist.addEventListener("click", () => {
  showFav = !showFav;
  toggleFavPlaylist.classList.toggle("toggle-active");
  if (showFav == false) {
    data = allSongs;
    toggleFavPlaylist.innerText = "Fav Songs";
  } else {
    toggleFavPlaylist.innerText = "All Songs";
    data = favSongsData;
  }
  // clear playlist
  playlist.innerHTML = ``;
  createPlaylist();
});

const favParent = document.querySelector(".options");
favParent.classList.add("options__like");
const favIcon = document.createElement("span");
favIcon.classList.add("fav");

function favSongs(isFav) {
  const iconEmpty = `<svg width='2rem' height="2rem" viewBox="0 0 512 512"><path xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="64" d="M 352.92 80 C 288 80 256 144 256 144 s -32 -64 -96.92 -64 c -52.76 0 -94.54 44.14 -95.08 96.81 c -1.1 109.33 86.73 187.08 183 252.42 a 16 16 0 0 0 18 0 c 96.26 -65.34 184.09 -143.09 183 -252.42 c -0.54 -52.67 -42.32 -96.81 -95.08 -96.81 Z" /></svg>`;

  if (isFav == true) {
    favIcon.innerHTML = iconEmpty;
    favIcon.classList.add("fav-active");
    favParent.appendChild(favIcon);
  } else {
    favIcon.innerHTML = iconEmpty;
    favIcon.classList.remove("fav-active");
    favParent.appendChild(favIcon);
  }
}

favIcon.addEventListener("click", (e) => {
  data[i].fav = !data[i].fav;

  if (data[i].fav == true) {
    favIcon.classList.add("fav-active");
  } else {
    favIcon.classList.remove("fav-active");
  }
  updateFavSongsList();
  playlist.innerHTML = ``;
  createPlaylist();
});

function updateFavState() {}

// TIMERS
let timeMMSS = 0;

//LOAD SONG
const loadSong = function () {
  const result = (audio.src = data.filter((data) => data.id == i));
  const newID = result[0]?.id;
  let songIndex = data
    .map((e) => {
      return e.id;
    })
    .indexOf(newID);

  // audio.src = data[0].audio;
  if (songIndex === undefined || songIndex == -1) {
    audio.src = data[0].audio;
  }

  if (songIndex >= 0) {
    i = songIndex;
    audio.src = data[i].audio;
  }

  let currentPlaylistSong = document.querySelectorAll(
    ".playlist__list_element"
  );
  // check if fav and show icon
  favSongs(data[i].fav);

  // highlight current song on playlist
  const prevCurrentPlaylistSong = document.querySelector(".playlist-active");
  prevCurrentPlaylistSong?.classList.remove("playlist-active");
  currentPlaylistSong[i]?.classList.add("playlist-active");
  //LOAD DATA
  albumCover.style.background = `url(\"${data[i].cover}\")`;
  albumCover.style.backgroundSize = "cover";
  document.body.style.background = `url(\"${data[i].cover}\")`;
  document.body.style.backgroundSize = "cover";
  document.body.style.background = `url(\"${data[i].cover}\")`;
  document.body.style.backgroundSize = "cover";
  songTitle.innerHTML = data[i].song;
  artistName.innerHTML = data[i].artist;

  // TO BE FIXED

  audio.addEventListener("canplay", function abc() {
    songDurationEl.innerHTML = currentTimeMMSS(audio.duration);
    data[i].songDuration = currentTimeMMSS(audio.duration);
    document.querySelectorAll(".songtime")[i].innerHTML = currentTimeMMSS(
      audio.duration
    );

    audio.removeEventListener("canplay", abc);
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
  if (repeatFlag == true) {
    playAudio();
  } else {
    functionNext();
    loadSong();
    const isPlaying = play.classList.contains("active");
    if (isPlaying) {
      setTimeout(() => {
        playAudio();
      }, 500);
    }
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
  if (shuffleFlag == true) {
    let test = randomNumber(data.length, i);
    i = test;
  } else {
    if (i >= data.length - 1) i = 0;
    else i++;
  }
  i++;
};

// DECREMENT SONG INDEX
const functionPrvious = function () {
  if (shuffleFlag == true) {
    let test = randomNumber(data.length, i);
    i = test;
  }
  if (i <= 0) {
    i = data.length;
  }
};

// FUNCTIONS ON START
loadSong();

createPlaylist();

// REPEAT BUTTON
repeatBtn.addEventListener("click", () => {
  if (repeatFlag == true) {
    repeatFlag = false;
    repeatBtn.classList.remove("option-active");
  } else {
    repeatBtn.classList.add("option-active");
    repeatFlag = true;
  }

  // repeatFlag ? (repeatFlag = false) : (repeatFlag = true);
});
// SHUFFLE BUTTON
shuffleBtn.addEventListener("click", () => {
  if (shuffleFlag == true) {
    shuffleFlag = false;
    shuffleBtn.classList.remove("option-active");
  } else {
    shuffleBtn.classList.add("option-active");
    shuffleFlag = true;
  }
});

// random number different than previous
function randomNumber(max, index) {
  let prevNumber = index;
  let number = Math.floor(Math.random() * max);

  if (prevNumber == number) {
    return randomNumber(max, index);
  } else return number;
}
