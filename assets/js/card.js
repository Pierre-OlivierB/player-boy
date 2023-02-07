var keyCard = 0;
var cardActive;

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
// *reapeat card, add listener on it, add possibility class on click
window.addEventListener("load", () => {
  repeatCard();
  cardActive = document.querySelectorAll(".card");
  cardActive.forEach((e) => {
    e.addEventListener("click", () => {
      for (let i = 0; i < cardActive.length; i++) {
        cardActive[i].classList.remove("card-active");
      }
      e.classList.add("card-active");
      // console.log(e.id.slice(4));
      indexMusic = e.id.slice(4);
      onPlay = false;
      greyTime.style.width = 0;
      clearInterval(intervalRender);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      loadMusicScreen(indexMusic);
      visualizeAudioTwo(player.src);
    });
  });
  let firstCard = document.getElementById("card0");
  // console.log(firstCard);
  firstCard.classList.add("card-active");
});
// !------------------------------------------------------------
// * Drawer
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

// !-----------------------------------------------------------
// * Card

// console.log(cardActive);

function addActiveOnChange() {
  // console.log(document.getElementById(`card${indexMusic}`));
  let nextCard = document.getElementById(`card${indexMusic}`);
  cardActive = document.querySelectorAll(".card");
  for (let i = 0; i < cardActive.length; i++) {
    cardActive[i].classList.remove("card-active");
  }
  nextCard.classList.add("card-active");
}
// function addActiveOnPrev() {

// }
nextMusic.addEventListener("click", addActiveOnChange);
prevMusic.addEventListener("click", addActiveOnChange);
