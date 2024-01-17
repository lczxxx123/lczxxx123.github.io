function updateTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var timeString = hours + ":" + minutes + ":" + seconds;
  document.querySelector(".time").textContent = timeString;

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  var dateString = year + "-" + month + "-" + day;
  document.querySelector(".date").textContent = dateString;
}
setInterval(updateTime, 1000);
setInterval(function () {
  var blinkers = document.querySelectorAll(".blink");
  for (var i = 0; i < blinkers.length; i++) {
    blinkers[i].classList.toggle("hidden");
  }
}, 500);
