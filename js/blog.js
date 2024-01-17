function md_2_html(md_path, html_element) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', md_path, true);
    xhr.responseType = 'text';
    xhr.onload = function() {
        if (xhr.status === 200) {
            // 将服务器返回的数据解析为字符串
            var fileContent = xhr.responseText;
            var regex = /^---(?:\r?\n.*)*---\r?\n/;
            fileContent = fileContent.replace(regex, "");

            var tempElement = document.createElement('div');
            tempElement.innerHTML = fileContent;
            var cssLinks = tempElement.querySelectorAll('link[rel="stylesheet"]');
            
            cssLinks.forEach(function(link) {
                console.log('css',link.href);
                var newLink = document.createElement('link');
                newLink.href = link.href;
                newLink.rel = 'stylesheet';
                document.head.appendChild(newLink);
              });

              var regex = /<a[^>]*>(lczxxx123\.github\.io)<\/a>/g;
              fileContent = fileContent.replace(regex, "");
              html_element.innerHTML = fileContent;
        }
    };
    xhr.send();
  }
//   md_2_html('/doc/else/test.md', document.getElementById('preview'));
var url = window.location.search;
var params = new URLSearchParams(url);
var paramsLength = url.length;
var buttonContainer = document.getElementById("buttonContainer");
var contentContainer = document.getElementById('contentContainer');
var bodyNode = contentContainer.parentNode

console.log('参数长度:', paramsLength);
console.log('arggg:', url); 
if (paramsLength > 1) {
    buttonContainer.parentNode.removeChild(buttonContainer);
    sss = url.slice(1)
    console.log('arggg:', sss); 
    md_2_html(sss, contentContainer);
}
else{    
    buttonContainer.parentNode.removeChild(buttonContainer);
    contentContainer.parentNode.removeChild(contentContainer);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/doc/docnames.txt', false)
    xhr.send();
    if (xhr.status === 200) {
        var jsonData = JSON.parse(xhr.responseText);
        var entries = Object.entries(jsonData);
        entries.sort(function (a, b) {
          var numA = parseInt(a[0]);
          var numB = parseInt(b[0]);
          return numB - numA;
        });
        for (var i = 0; i < entries.length; i++) {
            var key = entries[i][0];
            let newContainer = document.createElement("div");
            newContainer.id = key;
            newContainer.className = "buttoncontainer";
            bodyNode.appendChild(newContainer);
            var newStringElement = document.createElement("div");
            newStringElement.textContent = key; 
            newStringElement.className = "yearstring";
            newContainer.appendChild(newStringElement);
            var value = entries[i][1];
            var sortedValue = value.sort(function (a, b) {
                var dateA = new Date(a['date']);
                var dateB = new Date(b['date']);
                return dateB - dateA;
              });
            sortedValue.forEach(value => {
                let newButton = document.createElement("button");
                newButton.textContent = value['name'];
                newButton.addEventListener("click", function() {
                    window.location.href = '/html/blog.html?' + value['permalink'];
                });
                newButton.classList.add('button')
                r = Math.floor(Math.random() * 256);
                g = Math.floor(Math.random() * 256);
                b = Math.floor(Math.random() * 256);
                br = (r * 299 + g * 587 + b * 114) / 1000;
                coat = "rgba(" + r + ", " + g + ", " + b + ", " + 0.6 + ")";
                newButton.style.backgroundColor = coat;
                if (br < 128){
                    newButton.style.color = "white";
                } else {
                    newButton.style.color = "black";
                }
                newContainer.appendChild(newButton);
            });
          }
      } else {
        throw new Error('Failed to fetch the file: ' + url);
    }    
    // fileNames.forEach(fileName => {
    //     //const filePath = fileName.startsWith('./') ? '/doc/' + fileName.slice(2) : '/doc/' + fileName;
    //     var segments = fileName.split(',');
    //     var firstSegment = segments[0];
    //     var secondSegment = segments[1];
    //     //let filePath = firstSegment
    //     let filePath = '/html/blog.html?' + firstSegment;
    //     console.log('文件路径:', filePath); 
    //     let newButton = document.createElement("button");
    //     newButton.className = "button";
    //     newButton.textContent = secondSegment;
    //     newButton.addEventListener("click", function() {
    //         window.location.href = filePath;
    //     });
    //     r = Math.floor(Math.random() * 256);
    //     g = Math.floor(Math.random() * 256);
    //     b = Math.floor(Math.random() * 256);
    //     br = (r * 299 + g * 587 + b * 114) / 1000;
    //     coat = "rgba(" + r + ", " + g + ", " + b + ", " + 0.6 + ")";
    //     newButton.style.backgroundColor = coat;
    //     if (br < 128){
    //         newButton.style.color = "white";
    //     } else {
    //         newButton.style.color = "black";
    //     }
    //     buttonContainer.appendChild(newButton);
    // });
}
