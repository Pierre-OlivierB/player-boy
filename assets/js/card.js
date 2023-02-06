var keyCard = 0;

const content = document.getElementById("content");

function createCard(el) {
  var card = `<div class="card" id="card${el}">
  <div class="card-top">
    <div class="ct ct-left">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="ct ct-mid"></div>
    <div class="ct ct-right">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
  <div class="card-mid">
    <p>
      <span class="title-cd">Titre</span>-
      <span class="artist-cd">Artiste</span>-
      <span class="time-cd">Time</span>
    </p>
  </div>
  <div class="card-bot df">
    <i class="fas fa-play play-card df">
      <i class="fas fa-play play-white"> </i>
    </i>
  </div>
  </div>`;
  return card;
}

function repeatCard() {
  content.innerHTML = "";
  for (let i = 0; i < musicsList.length; i++) {
    content.innerHTML += createCard(keyCard);
    let titleCard = document.querySelectorAll(".title-cd");
    let artCard = document.querySelectorAll(".artist-cd");
    let timeCard = document.querySelectorAll(".time-cd");
    // console.log(titleCard[i].innerText);
    titleCard[i].innerText = musicsList[i].title;
    artCard[i].innerText = musicsList[i].artist;
    timeCard[i].innerText = musicsList[i].time;
    keyCard++;
  }
}
// console.log(titleCard, artCard, timeCard);
// console.log(content);
window.addEventListener("load", repeatCard);

const cardsChoice = document.getElementById("cardsChoice");
const drawerContent = document.getElementById("drawer-content");
const drawerFixePart = document.querySelector(".cpb-top");
// console.log(drawerFixePart);
// console.log(cardsChoice.value, drawerContent);

cardsChoice.addEventListener("change", () => {
  // console.log(drawerContent.scrollbars);
  drawerFixePart.style.transform =
    "translateX(" + cardsChoice.value * 5.5 + "px)";
  drawerContent.style.transform = "translateX(" + -cardsChoice.value + "%)";
  // console.log(cardsChoice.value);
});
