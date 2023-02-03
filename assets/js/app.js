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

// *sound control
const soundCtrlPlus = document.getElementById("plus-btn");
const soundCtrlMinus = document.getElementById("minus-btn");
const countVol = document.getElementById("cnt-sound");
console.log(countVol.innerText);
var vol = player.volume;
// console.log(soundCtrl);

function soundPlus() {
  if (vol === 1 || vol > 1) {
    vol = 1;
    console.log("no plus");
  } else if (vol < 1) {
    vol = vol + 0.01;
  }
  countVol.innerText = Math.ceil(vol * 100);

  console.log(vol);
}
function soundMinus() {
  if (vol === 0 || vol <= 0.01) {
    vol = 0;

    console.log("no minus");
  } else if (vol > 0.01) {
    vol = vol - 0.01;
  }
  countVol.innerText = Math.ceil(vol * 100);
  console.log(vol);
}

soundCtrlPlus.addEventListener("click", soundPlus);
soundCtrlMinus.addEventListener("click", soundMinus);
