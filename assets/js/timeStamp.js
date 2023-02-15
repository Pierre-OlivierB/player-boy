//**link mp3.infos to audioContext */
const visualizeAudioTwo = (url) => {
  fetch(url)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) =>
      drawTwo(normalizeDataTwo(filterDataTwo(audioBuffer)))
    );
};

//* filter fetch data*/
const filterDataTwo = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 70;
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  return filteredData;
};
//**if no sound, min=1 */
const normalizeDataTwo = (filteredData) => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
};
//*inject data.infos in html */
const drawTwo = (normalizedData) => {
  const canvas = document.getElementById("tstp-canvas");
  const dpr = window.devicePixelRatio || 1;
  const padding = 20;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.translate(0, 85);

  //*Draw line segment/
  const width = canvas.offsetWidth / normalizedData.length;
  for (let i = 0; i < normalizedData.length; i++) {
    const x = width * i;
    let height = normalizedData[i] * canvas.offsetHeight - padding;
    if (height < 0) {
      height = 0;
    } else if (height / 2 > canvas.offsetHeight - padding) {
      height = canvas.offsetHeight - padding;
    }
    drawLineSegmentTwo(ctx, x, height, width, (i + 1) % 2);
  }
};
//*draw lines/
const drawLineSegmentTwo = (ctx, x, height, width, isEven) => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "orange";
  ctx.beginPath();
  height = isEven ? height / 2 : -height / 2;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);
  ctx.stroke();
};
