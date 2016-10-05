// Code goes here

var count = 2, remainingTime = 60, interval;

var createMatrix = function (n) {
  var container, innerWith, row, column, aWidth, gap, x, y, colors;

  colors = rndColors(20);
  x = Math.floor(Math.random() * n);
  y = Math.floor(Math.random() * n);

  document.getElementById("infoMsg").innerHTML = "Level " + (count - 1);
  container = document.getElementById("matrixContainer");
  innerWidth = container.clientWidth;
  container.setAttribute("style", "width: " + innerWidth + "px;");
  //gap = border width (1) + margin (5) per edge
  gap = 6;
  aWidth = Math.floor(innerWidth / n) - 2 * gap;
  for (row = 0; row < n; row++) {
    var aChild = document.createElement("div");

    for (column = 0; column < n; column++) {
      var aCube = document.createElement("div");
      aCube.className = "cube";
      aCube.style.height = aWidth + "px";
      aCube.style.width = aWidth + "px";
      aCube.style.display = "inline-block";
      aCube.style.margin = "0 5px";
      aCube.style.padding = "0";
      aCube.style.border = "1px solid black";

      if (row === x && column === y) {
        aCube.style.backgroundColor = colors[0];
        aCube.addEventListener("click", createNextMatrix);
      } else {
        aCube.style.backgroundColor = colors[1];
      }

      aChild.appendChild(aCube);
    }

    aChild.className = "row";
    aChild.style.height = aWidth + "px";
    aChild.style.margin = "10px 0";
    aChild.style.padding = "0";
    container.appendChild(aChild);
  }
}

var createNextMatrix = function () {
  document.getElementById("matrixContainer").innerHTML = "";
  count++;
  createMatrix(count);
}

var rndColors = function (diff) {
  var r1, r2, g1, g2, b1, b2, color1, color2;
  r1 = Math.floor(Math.random() * (256 - diff));
  r2 = r1 + diff;
  g1 = Math.floor(Math.random() * (256 - diff));
  g2 = g1 + diff;
  b1 = Math.floor(Math.random() * (256 - diff));
  b2 = b1 + diff;
  color1 = "rgb(" + r1 + ", " + g1 + ", " + b1 + ")";
  color2 = "rgb(" + r2 + ", " + g2 + ", " + b2 + ")";
  return [color1, color2];
}

var countdown = function () {
  remainingTime--;
  document.getElementById("countdown").innerHTML = remainingTime;
  if (remainingTime <= 0) {
    clearInterval(interval);
    Array.prototype.slice.call(document.getElementsByClassName("cube")).forEach(function (entry) {
      entry.removeEventListener("click", createNextMatrix);
    });
    var redirect = confirm("You've reached to Level " + (count - 1) + " ! You're eligible to get the reward!");
    if (redirect) {
      document.getElementById("congratsButton").style.display = "block";
    }
  }
}

document.getElementById("countdown").innerHTML = remainingTime;
interval = window.setInterval(countdown, 1000);
createMatrix(count);
