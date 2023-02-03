// *List musics
fetch("../../musics_infos.json")
  .then((response) => response.json())
  .then((json) => getMusics(json.musics));
// console.log(json.musics);
var musicsList = [];

function getMusics(list) {
  for (let i = 0; i < list.length; i++) {
    musicsList.push(list[i]);
  }
  // console.log(musicsList[0].title);
}
