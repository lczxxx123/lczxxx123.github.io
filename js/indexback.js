var imageFolderPath = "/images/";
var imageInfoPath = "/images/imnames.txt";
var imagePathList = [];
var imageList = [];
var currentImage = 0;
var flag = true;

function changeBackground() {
  currentImage = (currentImage + 1) % imagePathList.length;
  if (Number.isNaN(currentImage)) {
    currentImage = 0
  }
  var imageUrl = imagePathList[currentImage];
  document.documentElement.style.backgroundImage = "url('" + imageUrl + "')";
}

async function getimagePathList(filePath) {
  try {
    const response = await fetch(filePath);
    const data = await response.text();
    const lines = data.split("\n");
    const imagePathList = [];
    lines.forEach((line) => {
      const imagePath = imageFolderPath + line;
      imagePathList.push(imagePath);
    });
    console.log("getimagePathList获取的图片列表:", imagePathList);
    return imagePathList;
  } catch (error) {
    throw new Error("请求错误: " + error);
  }
}

document.getElementById("backbutton").addEventListener("click", async () => {
  if (flag) {
    flag = false;
    try {
      imagePathList = await getimagePathList(imageInfoPath);
      console.log("async获取的图片列表:", imagePathList);
    } catch (error) {
      console.log("发生错误:", error);
    }
    for (var i = 0; i < imagePathList.length; i++) {
      var image = new Image();
      image.src = imagePathList[i];
      image.onload = (function (iurl) {
        console.log("图片预加载完成", iurl);
      })(imagePathList[i]);
      imageList.push(image);
    }
    console.log("处理结束");
    document.documentElement.style.backgroundImage =
      "url('" + imagePathList[0] + "')";
    console.log("imagePathList[0]", imagePathList[0]);
    setInterval(changeBackground, 10000);
  } else {
    changeBackground();
  }
});


const playButton1 = document.getElementById("playButton1");
const playButton2 = document.getElementById("playButton2");
const videoModal1 = document.getElementById("videoModal1");
const videoPlayer1 = document.getElementById("videoPlayer1");
const videoModal2 = document.getElementById("videoModal2");
const videoPlayer2 = document.getElementById("videoPlayer2");
const overlay1 = document.getElementById("overlay1");
const overlay2 = document.getElementById("overlay2");

playButton1.addEventListener("click", () => {
  videoModal1.style.display = "flex";
  videoPlayer1.play();
});

playButton2.addEventListener("click", () => {
    videoModal2.style.display = "flex";
    videoPlayer2.play();
  });
  

overlay1.addEventListener("click", () => {
  videoPlayer1.pause();
  videoModal1.style.display = "none";
});

overlay2.addEventListener("click", () => {
    videoPlayer2.pause();
    videoModal2.style.display = "none";
  });
  