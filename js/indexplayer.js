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
