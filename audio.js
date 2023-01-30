//**Initialisation audio */
window.AudioContext = window.AudioContext;

const audioContext = new AudioContext();
// var currentBuffer = null;

//**link mp3.infos to audioContext */
const visualizeAudio = (url) => {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => draw(visualizeAudio(audioBuffer)));
};
// console.log(visualizeAudio);
//* filter fetch data*/
const filterData = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 70;
  const blockSize = Math.floor(rawData.length / samples);
  const filterData = [];
  for (let i = 0; i < samples; i++) {
    // filterData.push(rawData[i * blockSize]);
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]);
    }
    filterData.push(sum / blockSize);
  }
  return filterData;
};
console.log(filterData);
//**if no sound, min=1 */
const normalizeData = (filterData) => {
  const multiplier = Math.pow(Math.max(...filterData), -1);
  return filterData.map((n) => n * multiplier);
};
//*inject data.infos in html */
const draw = (normalizeData) => {
  const canvas = document.querySelector("canvas");
  //   console.log(canvas);
  const dpr = window.devicePixelRatio || 1;
  const padding = 20;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.translate(0, canvas.offsetHeight / 2 + padding);

  console.log(normalizeData);
  //*Draw line segment/
  const width = canvas.offsetWidth / normalizeData.length;
  console.log(normalizeData);
  for (let i = 0; i < normalizeData.length; i++) {
    const x = width * i;
    let height = normalizeData[i] * canvas.offsetHeight - padding;
    if (height < 0) {
      height = 0;
    } else if (height > canvas.offsetHeight / 2) {
      height = height > canvas.offsetHeight / 2;
    }
    drawLineSegment(ctx, x, height, width, (i + 1) % 2);
  }
};
//*draw lines/
const drawLineSegment = (ctx, x, y, width, isEven) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  y = isEven ? y : -y;
  ctx.moveto(x, 0);
  ctx.molineTo(x, y);
  ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);
  ctx.stroke();
};

visualizeAudio("./list/ambient-background-cross-cultures-131570.mp3");
