
// 備忘：ChatGPTさんにはうまく修正できなかったが、円がマウスに近づくにつれてゆっくりと動くようにしたい。また、離れすぎていても急激に近づかないようにしてほしい。現状のコードではマウスの位置を逐次保存しているが、円の位置も保存して距離を取得するような処理が必要？

let t = 0;
let mousePositions = [];
let circlePositions = [];
let maxDelayFrames = 60;
let maxSpeed = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);

  // Store current mouse position
  mousePositions.push({x: mouseX, y: mouseY});
  if (mousePositions.length > maxDelayFrames) {
    mousePositions.shift();
  }

  // Calculate the distance between current and delayed position
  let totalDistance = 0;
  for (let i = 1; i < mousePositions.length; i++) {
    totalDistance += dist(mousePositions[i].x, mousePositions[i].y, mousePositions[i-1].x, mousePositions[i-1].y);
  }
  let averageDistance = totalDistance / (mousePositions.length - 1);

  // let currentPos = mousePositions[mousePositions.length - 1];
  // let delayedPos = mousePositions[0];
  // let distance = dist(currentPos.x, currentPos.y, delayedPos.x, delayedPos.y);

  // Adjust the delayFrames based on the distance
  let noiseValue1 = noise(t);
  let adjustedDistance = map(noiseValue1, 0, 1, 0.8, 1.2) * averageDistance;
  let delayFrames = map(adjustedDistance, 0, width, maxDelayFrames, 1);

  // Get the delayed position
  let index = Math.min(Math.floor(delayFrames), mousePositions.length - 1);
  let speed = Math.abs(mousePositions.length - 1 - index);
  speed = Math.min(speed, maxSpeed);
  index = mousePositions.length - 1 - speed;
  let delayedPosition = mousePositions[index];


  // Draw the circle with perlin noise
  let circleColor = color(0, 180, 255, 100); // R, G, B, A(透明度)
  fill(circleColor);
  let circleBase = 200;
  let noiseValue2 = noise(t + 1000);
  let sizeVariation = circleBase * (noiseValue2 * 2 - 1) * 0.3;
  let circleSize = circleBase + sizeVariation;

  if (delayedPosition) {
    ellipse(delayedPosition.x, delayedPosition.y, circleSize, circleSize);
  } else {
    ellipse(mouseX, mouseY, circleSize, circleSize);
  }

  t += 0.01;
}
