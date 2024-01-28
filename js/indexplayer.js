var meting = document.querySelector("meting-js");
var playplayButton = document.getElementById("playplay");
var playnextButton = document.getElementById("playnext");
var playpauseButton = document.getElementById("playpause");
var listButton = document.getElementById("list");
playnextButton.addEventListener("click", function () {
  document.querySelector(".aplayer-icon-forward").click();
});
playplayButton.addEventListener("click", function () {
  document.querySelector(".aplayer-play").click();
});
playpauseButton.addEventListener("click", function () {
  document.querySelector(".aplayer-pause").click();
});
listButton.addEventListener("click", function () {
  document.querySelector(".aplayer-icon-menu").click();
});

var playlist_id = "3141023413";

function addBeiYong() {
  window.meting_api =
    "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r";
  document.getElementById(
    "meting_js"
  ).innerHTML = `<meting-js server="netease" type="playlist" id="${playlist_id}" autoplay="false" order="random" list-folded="true"></meting-js>`;
}

function checkADDDD() {
  setTimeout(() => {
    const metingElement = window.customElements.get("meting-js");
    if (metingElement) {
      console.log("meting-js 元素已找到！");
      const aplayerChildren = document.querySelector(".aplayer");
      if (!aplayerChildren) {
        console.log("aplayer元素未找到！加载備用player.");
        addBeiYong();
      }
    } else {
      console.log("meting-js元素未找到！加载備用player.");
      addBeiYong();
    }
  }, 3000);
}

checkADDDD();
