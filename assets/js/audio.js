//**Initialisation audio */
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
const canvas = document.getElementById("screen-canvas");
const ctx = canvas.getContext("2d");

//**link mp3.infos to audioContext */
const visualizeAudio = (url) => {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => draw(normalizeData(filterData(audioBuffer))));
};
//* filter fetch data*/
const filterData = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 50;
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
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
  const dpr = window.devicePixelRatio || 1;
  const padding = 20;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = (canvas.offsetHeight + padding * 2) * dpr;

  ctx.scale(dpr, dpr);
  ctx.translate(0, 250 + padding);

  //*Draw line segment/
  // const width = canvas.offsetWidth / normalizedData.length;
  for (let i = 0; i < normalizedData.length; i++) {
    // const x = width * i;
    let height = normalizedData[i] * canvas.offsetHeight - padding;
    // console.log(height);
    if (height > 0) {
      height = -height;
    }
    if (height > canvas.offsetHeight - padding) {
      height = canvas.offsetHeight - padding;
    }
    // console.log(ctx);
    // drawLineSegment(ctx, x, height, (i + 1) % 2);
  }
};
//*draw lines/
// const drawLineSegment = (ctx, x, height, isEven) => {
//   ctx.lineWidth = 5;
//   ctx.strokeStyle = "#fff";
//   ctx.beginPath();
//   height = isEven ? height : height;
//   ctx.moveTo(x, 0);
//   ctx.lineTo(x, height);
//   ctx.stroke();
// };

// visualizeAudio("./list/tropical-summer-music-112842.mp3");

//!-----------------------------------------------------
//*Game
// general settings
const speed = 1;
const cTenth = canvas.width / 10;

let index = 0,
  flyHeight,
  walls = [];

// pipe settings
const wallWidth = 10;
const wallHeight = 50;
const wallGap = 50;
const wallLoc = 10;

var position = new Array();

function drawWall() {
  // !Experimental:
  // ctx.reset();
  // *black for reset
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // *blue for wall
  ctx.fillStyle = "blue";
  // *move the first el
  position[0] = position[0] - speed;
  // *display walls
  for (let i = 0; i < position.length; i++) {
    ctx.fillRect(position[i], 110, wallWidth, wallHeight);
  }

  // console.log(position);
  // *first wall get out
  if (position[0] < -wallWidth) {
    position = [...position.slice(1), canvas.width];
    console.log(position);
  }
  //*first wall -middle screen = second move
  if (position[0] < canvas.width / 1.5) {
    position[1] = position[1] - speed;
  }
  // *third wall -middle screen = third move
  if (position[1] < canvas.width / 1.5) {
    position[2] = position[2] - speed;
  }
}
// *set-up launch
function launch() {
  position = [canvas.width, canvas.width, canvas.width];
  setInterval(drawWall, 10);
}

// start game
const play = document.getElementById("play");
play.addEventListener("click", launch);
