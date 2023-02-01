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
  pipes = [];

// pipe settings
const pipeWidth = 10;
const pipeHeight = 50;
const pipeGap = 5;
const pipeLoc = 10;

var position;

function drawWall() {
  // !Experimental:
  // ctx.reset();
  // *black for reset
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // *blue for wall
  ctx.fillStyle = "blue";
  position--;
  ctx.fillRect(position, 110, pipeWidth, pipeHeight);
  // console.log(position);
}
function launch() {
  position = 260;
  setInterval(drawWall, 1000);
}

// start game
const play = document.getElementById("play");
play.addEventListener("click", launch);
