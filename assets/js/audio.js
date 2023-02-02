//**Initialisation audio */
window.AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();
const canvas = document.getElementById("screen-canvas");
const ctx = canvas.getContext("2d");
var heightArray = new Array();
var samples = 50;

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
  // const dpr = window.devicePixelRatio || 1;
  const padding = 20;
  // canvas.width = canvas.offsetWidth * dpr;
  // canvas.height = (canvas.offsetHeight + padding * 2) * dpr;

  // ctx.scale(dpr, dpr);
  // ctx.translate(0, 250 + padding);

  //*Draw line segment/
  // const width = canvas.offsetWidth / normalizedData.length;
  for (let i = 0; i < normalizedData.length; i++) {
    // const x = width * i;
    let height = normalizedData[i] * canvas.height - padding;
    // console.log(height);
    if (height < 0) {
      height = -height;
    }
    if (height > canvas.height - padding) {
      height = canvas.height - padding;
    }
    // console.log(height);
    heightArray[i] = Math.ceil(height);
    // drawLineSegment(ctx, x, height, (i + 1) % 2);
  }
  // console.log(heightArray);
  // heightArray = [...normalizedData];
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
var intervalRender;
const player = document.getElementById("player");
const greyTime = document.getElementById("grey-time-id");
// console.log(greyTime);
// general settings
const speed = 1;
const cTenth = canvas.width / 10;

let index = 0,
  flyHeight;

// pipe settings
const wallWidth = 10;
const wallHeight = 50;
const wallGap = 50;
const wallLoc = 10;

var position = new Array();
var wall = [canvas.width, wallHeight],
  wall1 = [canvas.width, wallHeight],
  wall2 = [canvas.width, wallHeight];

function drawWall() {
  // !Experimental:
  // ctx.reset();
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

  // console.log(heightArray[0]);
  // console.log(position);
  // *first wall get out
  if (position[0][0] < -wallWidth) {
    index++;
    position = [...position.slice(1), [canvas.width, heightArray[index + 2]]];
    // console.log(position[0][0]);
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
    return console.log("fin");
  }
  timePassed.value = (player.currentTime * 100) / player.duration;
  greyTime.style.width = `${timePassed.value}%`;
}
// *set-up launch
function launch() {
  player.play();

  // console.log(Math.ceil(player.duration));
  samples = Math.ceil(player.duration);
  // console.log(samples);
  visualizeAudio("./list/tropical-summer-music-112842.mp3");
  position = [wall, wall1, wall2];
  intervalRender = setInterval(drawWall, 10);
}

//* start game
const play = document.getElementById("play");
play.addEventListener("click", launch);
// const music = new Audio("../../list/tropical-summer-music-112842.mp3");
// console.log(music.duration());
//*pause game
function pause() {
  player.pause();
}

const pauseBtn = document.getElementById("pause");
// console.log(pauseBtn);
pauseBtn.addEventListener("click", pause);
//!---------------------------------------------------------------//
//*TimeStamp*/
const timePassed = document.getElementById("timePassed");

timePassed.addEventListener("change", () => {
  console.log(timePassed.value);
});
