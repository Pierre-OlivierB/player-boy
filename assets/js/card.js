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
    let bgCard = document.querySelectorAll(".card-mid");
    // console.log(titleCard[i].innerText);
    titleCard[i].innerText = musicsList[i].title;
    artCard[i].innerText = musicsList[i].artist;
    timeCard[i].innerText = musicsList[i].time;
    bgCard[
      i
    ].style.background = `url('./img/img-cards/${musicsList[i].img}') center/cover`;
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
      wall = [canvas.width, wallHeight];
      wall1 = [canvas.width, wallHeight];
      wall2 = [canvas.width, wallHeight];
      position = [wall, wall1, wall2];
      index = 0;
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
const drawerBackPart = document.querySelector(".cpb-mid");
// var cardsChoiceChanged;
// var cardsChoiceLoad;
var screenWidth = window.innerWidth;
var verifChange = false;
// console.log(drawerFixePart);
// console.log(cardsChoice.value, drawerContent);
function highInnerWidth() {
  drawerFixePart.style.transform =
    "translateX(" + cardsChoice.value * 5.5 + "px)";
  drawerContent.style.transform = "translateX(" + -cardsChoice.value + "%)";
}
function lowInnerWidth() {
  drawerBackPart.style.transform =
    "translateY(" + (-45 + cardsChoice.value / 2) + "%)";
}
function resetForTransform() {
  drawerBackPart.style.transform = "translateY(0)";
  drawerFixePart.style.transform = "translateX(0)";
  drawerContent.style.transform = "translateX(0)";
}
// function resetForLow() {
//   drawerBackPart.style.transform = "translateY(0)";
//   drawerFixePart.style.transform = "translateX(0)";
//   drawerContent.style.transform = "translateX(0)";
// }

window.addEventListener("load", (e) => {
  // console.log(e.currentTarget.innerWidth);
  // console.log(verifChange);
  // console.log(!verifChange);

  cardsChoiceChanged = 0;

  if (e.currentTarget.innerWidth > 1279) {
    cardsChoice.addEventListener("change", () => {
      highInnerWidth();
      // console.log("test passed");
    });
  } else if (e.currentTarget.innerWidth <= 1279) {
    cardsChoice.addEventListener(
      "change",
      () => {
        lowInnerWidth();
      },
      false
    );
  }

  // console.log(cardsChoice.value);
});

window.addEventListener(
  "resize",
  () => {
    location.reload();
  }
  //   resetForTransform();

  //   cardsChoice.addEventListener("change", () => {
  //     highInnerWidth();
  //   });
  // console.log(verifChange, cardsChoiceChanged);
  // console.log(e.currentTarget.innerWidth);
  // if (e.currentTarget.innerWidth > 1279 && verifChange == true) {
  //   resetForTransform();

  //   cardsChoice.addEventListener("change", () => {
  //     highInnerWidth();
  //   });
  // } else if (e.currentTarget.innerWidth < 1279 && verifChange == true) {
  //   resetForTransform();
  //   cardsChoice.addEventListener("change", () => {
  //     lowInnerWidth();
  //   });
  // }
);

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
