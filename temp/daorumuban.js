// 创建一个新的 <div> 元素
var navdivElement = document.createElement("div");
navdivElement.id = "navdiv";
navdivElement.className = "navdivclass";

// 获取 body 元素
var bodyElement = document.body;

// 将 <div> 元素添加到 body 元素的最后一个子元素之后
bodyElement.insertBefore(navdivElement, bodyElement.firstElementChild);

// 使用 fetch 获取导航栏内容
fetch("nav.html")
  .then((response) => response.text())
  .then((data) => {
    // 将导航栏内容设置为 <div> 的内容
    navdivElement.innerHTML = data;
  });

var footerdivElement = document.createElement("div");
footerdivElement.id = "footerdiv";
footerdivElement.className = "footerdivclass";

// 获取 body 元素
var bodyElement = document.body;

// 将 <div> 元素添加到 body 元素的最后一个子元素之后
bodyElement.insertBefore(footerdivElement, bodyElement.lastElementChild);

// 使用 fetch 获取导航栏内容
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    // 将导航栏内容设置为 <div> 的内容
    footerdivElement.innerHTML = data;
  });
