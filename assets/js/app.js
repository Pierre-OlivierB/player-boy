// console.log("test");
//!Recup DOM
// var player = document.getElementById("player");

//*---------------------------------------
//*Tools:
//link : https://webdesign.tutsplus.com/tutorials/build-a-custom-html-music-player-using-javascript-and-the-web-audio-api--cms-93300
// console.log(player.currentTime);
// console.log(player.currentSrc);
// console.log(player.duration);
// console.log(player.ended);
// console.log(player.volume);

// player.play();
// player.pause();

//*see audioContext
//! wave sound
// TODO: read : https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
// TODO : see: https://www.youtube.com/watch?v=ftjZI4mLCoI&list=RDCMUCkjoHfkLEy7ZT4bA2myJ8xA&start_radio=1&rv=ftjZI4mLCoI&t=0
// *------------------------------------------------------------

const titleScreen = document.getElementById("title-sc");
const artScreen = document.getElementById("artist-sc");
const timeScreen = document.getElementById("time-sc");

// var titleCard, artCard, timeCard;
// console.log(titleScreen, artScreen, timeScreen);
// *Load 1frst production
function loadMusicScreen(e) {
  titleScreen.innerText = musicsList[e].title;
  artScreen.innerText = musicsList[e].artist;
  timeScreen.innerText = musicsList[e].time;
  player.src = musicsList[e].src;
}
// function loadMusicCard(e) {
//   titleCard[e].innerText = musicsList[e].title;
//   artCard[e].innerText = musicsList[e].artist;
//   timeCard[e].innerText = musicsList[e].time;
// }
window.addEventListener("load", () => {
  // console.log(musicsList[0].title);
  loadMusicScreen(0);
});
var indexMusic = 0;
//*--------------------------------------------------------------
// *sound control
const soundCtrlPlus = document.getElementById("plus-btn");
const soundCtrlMinus = document.getElementById("minus-btn");
const countVol = document.getElementById("cnt-sound");
// console.log(countVol.innerText);
var vol = player.volume;
// console.log(soundCtrl);

function soundPlus() {
  if (vol === 1 || vol > 1) {
    vol = 1;
    // console.log("no plus");
  } else if (vol < 1) {
    vol = vol + 0.01;
  }
  countVol.innerText = Math.ceil(vol * 100);

  //   console.log(vol);
}
function soundMinus() {
  if (vol === 0 || vol <= 0.01) {
    vol = 0;

    // console.log("no minus");
  } else if (vol > 0.01) {
    vol = vol - 0.01;
  }
  countVol.innerText = Math.ceil(vol * 100);
  //   console.log(vol);
}

soundCtrlPlus.addEventListener("click", soundPlus);
soundCtrlMinus.addEventListener("click", soundMinus);

//*-------------------------------------------------------
//* next music
const nextMusic = document.getElementById("next-btn");
const prevMusic = document.getElementById("before-btn");
// console.log(nextMusic, prevMusic);

function nxtMsc() {
  console.log("next music");
  if (indexMusic === musicsList.length - 1) {
    indexMusic = 0;
  } else if (indexMusic < musicsList.length - 1) {
    indexMusic++;
  }
  console.log(indexMusic);
  // reset gamescreen
  onPlay = false;
  greyTime.style.width = 0;
  clearInterval(intervalRender);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  loadMusicScreen(indexMusic);
  visualizeAudioTwo(player.src);
}
function prvMsc() {
  console.log("previous music");
  if (indexMusic === 0) {
    indexMusic = musicsList.length - 1;
  } else if (indexMusic > 0) {
    indexMusic--;
  }
  console.log(indexMusic);
  // reset gamescreen
  onPlay = false;
  greyTime.style.width = 0;
  clearInterval(intervalRender);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  loadMusicScreen(indexMusic);
  visualizeAudioTwo(player.src);
}

nextMusic.addEventListener("click", nxtMsc);
prevMusic.addEventListener("click", prvMsc);
