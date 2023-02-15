const titleScreen = document.getElementById("title-sc");
const artScreen = document.getElementById("artist-sc");
const timeScreen = document.getElementById("time-sc");

// *Load 1frst production
function loadMusicScreen(e) {
  titleScreen.innerText = musicsList[e].title;
  artScreen.innerText = musicsList[e].artist;
  timeScreen.innerText = musicsList[e].time;
  player.src = musicsList[e].src;
}
window.addEventListener("load", () => {
  loadMusicScreen(0);
  visualizeAudioTwo(player.src);
});
var indexMusic = 0;
//*--------------------------------------------------------------
// *sound control
const soundCtrlPlus = document.getElementById("plus-btn");
const soundCtrlMinus = document.getElementById("minus-btn");
const countVol = document.getElementById("cnt-sound");
var vol;

function soundPlus() {
  vol = player.volume;
  if (vol === 1 || vol > 1) {
    vol = 1;
  } else if (vol < 1) {
    vol = vol + 0.05;
    vol = Math.round(vol * 100) / 100;
  }
  countVol.innerText = Math.ceil(vol * 100);
  player.volume = vol;
}
function soundMinus() {
  vol = player.volume;
  if (vol === 0 || vol <= 0.01) {
    vol = 0;
  } else if (vol > 0.01) {
    vol = vol - 0.05;
    vol = Math.round(vol * 100) / 100;
  }
  countVol.innerText = Math.ceil(vol * 100);
  player.volume = vol;
}

soundCtrlPlus.addEventListener("click", soundPlus);
soundCtrlMinus.addEventListener("click", soundMinus);

//*-------------------------------------------------------
//* next music
const nextMusic = document.getElementById("next-btn");
const prevMusic = document.getElementById("before-btn");

function nxtMsc() {
  console.log("next music");
  if (indexMusic === musicsList.length - 1) {
    indexMusic = 0;
  } else if (indexMusic < musicsList.length - 1) {
    indexMusic++;
  }
  console.log(indexMusic);
  //* reset gamescreen
  onPlay = false;
  greyTime.style.width = 0;
  clearInterval(intervalRender);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  loadMusicScreen(indexMusic);
  visualizeAudioTwo(player.src);
  wall = [canvas.width, wallHeight];
  wall1 = [canvas.width, wallHeight];
  wall2 = [canvas.width, wallHeight];
  position = [wall, wall1, wall2];
  index = 0;
}
function prvMsc() {
  console.log("previous music");
  if (indexMusic === 0) {
    indexMusic = musicsList.length - 1;
  } else if (indexMusic > 0) {
    indexMusic--;
  }
  onPlay = false;
  greyTime.style.width = 0;
  clearInterval(intervalRender);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  loadMusicScreen(indexMusic);
  visualizeAudioTwo(player.src);
  wall = [canvas.width, wallHeight];
  wall1 = [canvas.width, wallHeight];
  wall2 = [canvas.width, wallHeight];
  position = [wall, wall1, wall2];
  index = 0;
}

nextMusic.addEventListener("click", nxtMsc);
prevMusic.addEventListener("click", prvMsc);

// !-----------------------------------------
// *Stop Btns
const stopBtn = document.getElementById("stop");

function stopMusic() {
  if (onPlay || inPause) {
    onPlay = false;
    inPause = false;
    greyTime.style.width = 0;
    clearInterval(intervalRender);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    loadMusicScreen(indexMusic);
    visualizeAudioTwo(player.src);
    wall = [canvas.width, wallHeight];
    wall1 = [canvas.width, wallHeight];
    wall2 = [canvas.width, wallHeight];
    position = [wall, wall1, wall2];
    index = 0;
  }
}
stopBtn.addEventListener("click", stopMusic);

// !------------------------------------------------
// *Select
const slctBtn = document.getElementById("select");
var selectToggle = false;
function selectPress() {
  if (!selectToggle) {
    selectToggle = true;
    timePassed.classList.add("time-passed-visible");
    pause();
  } else if (selectToggle) {
    selectToggle = false;
    timePassed.classList.remove("time-passed-visible");
  }
}
slctBtn.addEventListener("click", selectPress);
//* start game
const playBtn = document.getElementById("play");
playBtn.addEventListener("click", () => {
  launch();
  selectToggle ? selectPress() : null;
});
