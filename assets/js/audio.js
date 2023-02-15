//**Initialisation audio */
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
const canvas = document.getElementById("screen-canvas");
const ctx = canvas.getContext("2d");
const player = document.getElementById("player");
var heightArray = new Array();
var samplesAudio = 70;
const timePassed = document.getElementById("timePassed");

//**link mp3.infos to audioContext */
const visualizeAudio = (url) => {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => draw(normalizeData(filterData(audioBuffer))));
};
//* filter fetch data*/
const filterData = (audioBuffer) => {
  samplesAudio = Math.floor(player.duration);
  console.log(samplesAudio);
  const rawData = audioBuffer.getChannelData(0);
  const blockSize = Math.floor(rawData.length / samplesAudio);
  const filteredData = [];
  for (let i = 0; i < samplesAudio; i++) {
    filteredData.push(rawData[i * blockSize]);
  }
  return filteredData;
};
//**if no sound, min=1 */
const normalizeData = (filteredData) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
};
//*inject data.infos in html */
const draw = (normalizedData) => {
  // *reset data walls generation
  heightArray = [];
  const padding = 20;
  //*Draw line segment/
  for (let i = 0; i < normalizedData.length; i++) {
    let height = normalizedData[i] * canvas.height - padding;
    if (height < 0) {
      height = -height;
    }
    if (height > canvas.height - padding) {
      height = canvas.height - padding;
    }
    heightArray[i] = Math.ceil(height);
  }
};
//*draw lines/

//!-----------------------------------------------------
//*Game
var intervalRender;
var onPlay = false;
var inPause = false;
const greyTime = document.getElementById("grey-time-id");
const speed = 1;
const cTenth = canvas.width / 10;

let index = 0;

const wallWidth = 10;
const wallHeight = 50;
const wallGap = 50;
const wallLoc = 10;

var position = new Array();
var wall = [canvas.width, wallHeight],
  wall1 = [canvas.width, wallHeight],
  wall2 = [canvas.width, wallHeight];
position = [wall, wall1, wall2];

// *Fly
const img = new Image();
img.src = "../../img/fly.png";
var fly;
var flyHeight;
const size = [20, 30];

function drawWall() {
  // *black for reset
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // *blue for wall
  ctx.fillStyle = "blue";
  // *move the first el
  position[0][0] = position[0][0] - speed;
  // *display walls
  for (let i = 0; i < position.length; i++) {
    ctx.fillRect(
      position[i][0],
      canvas.height - heightArray[index + i],
      wallWidth,
      heightArray[index + i]
    );
  }

  // *first wall get out
  if (position[0][0] < -wallWidth) {
    index++;
    position = [...position.slice(1), [canvas.width, heightArray[index + 2]]];
  }
  //*first wall -middle screen = second move
  if (position[0][0] < canvas.width / 1.5) {
    position[1][0] = position[1][0] - speed;
  }
  // *third wall -middle screen = third move
  if (position[1][0] < canvas.width / 1.5) {
    position[2][0] = position[2][0] - speed;
  }
  // *close loop
  if (index > heightArray.length) {
    clearInterval(intervalRender);
    index = 0;
    onPlay = false;
    wall = [canvas.width, wallHeight];
    wall1 = [canvas.width, wallHeight];
    wall2 = [canvas.width, wallHeight];
    position = [wall, wall1, wall2];
    return console.log("fin");
  }
  timePassed.value = (player.currentTime * 100) / player.duration;
  greyTime.style.width = `${timePassed.value}%`;
  // *make fly appear
  if (position[1][1] > flyHeight) {
    flyHeight = flyHeight + flyHeight / position[1][1];
  }
  if (position[1][1] < flyHeight) {
    flyHeight = flyHeight - flyHeight / position[1][1];
  }
  ctx.drawImage(img, 0, 0, size[1], size[1], 0, flyHeight, size[1], size[1]);
}

const setup = () => {
  flyHeight = canvas.height / 2;
};

// *set-up launch
function launch() {
  if (!onPlay) {
    onPlay = true;
    inPause = false;
    player.play();
    visualizeAudio(player.src);
    samples = Math.ceil(player.duration);
    position;
    flyHeight = canvas.height / 2;
    intervalRender = setInterval(drawWall, 10);
  }
}
//*pause game

function pause() {
  inPause = true;
  player.pause();
  clearInterval(intervalRender);
  onPlay = false;
}

const pauseBtn = document.getElementById("pause");
pauseBtn.addEventListener("click", pause);
//!---------------------------------------------------------------//
//*TimeStamp*/

timePassed.addEventListener("click", () => {
  player.currentTime = (timePassed.value * player.duration) / 100;
  index = Math.ceil(player.currentTime);
  drawWall();
});
