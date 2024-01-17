fetch("/html/ssn.html")
  .then((response) => response.text())
  .then((data) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = data;

    const allcontentDivs = tempDiv.getElementsByClassName("ssn");
    const waterfallContainer = document.getElementById("waterfall-ssn");

    function add3ssncallback() {
      console.log("add3ssncallback");
      if (allcontentDivs.length === 0) {
        return;
      }
      waterfallContainer.appendChild(allcontentDivs[0]);
    }
    window.addEventListener("wheel", function () {
      clearTimeout(window.scrollEndTimer);
      window.scrollEndTimer = setTimeout(add3ssncallback, 100);
      console.log("userScrolling wheel");
    });
    window.addEventListener("touchend", function () {
      clearTimeout(window.scrollEndTimer);
      window.scrollEndTimer = setTimeout(add3ssncallback, 100);
      console.log("userScrolling touchend");
    });
    add3ssncallback();
    add3ssncallback();
  })
  .catch((error) => {
    console.log("加载内容时出错:", error);
  });
