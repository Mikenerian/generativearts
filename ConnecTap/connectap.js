
let t = 0;
let mousePositions = [];
let circlePositions = [];
let maxStoreFrames = 100;
let delayRate = 32;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  circlePositions.push({x: width / 2, y: height / 2});
}

function draw() {
  background(220);

  // Store current mouse position
  mousePositions.push({x: mouseX, y: mouseY});
  if (mousePositions.length > maxStoreFrames) {
    mousePositions.shift();
  }

  let dividedX = circlePositions[circlePositions.length - 1].x + (mouseX - circlePositions[circlePositions.length - 1].x) / delayRate;
  let dividedY = circlePositions[circlePositions.length - 1].y + (mouseY - circlePositions[circlePositions.length - 1].y) / delayRate;

  // Draw the circle with perlin noise
  let circleColor = color(0, 180, 255, 100); // R, G, B, A(透明度)
  fill(circleColor);
  let circleBase = 200;
  let noiseValue2 = noise(t + 1000);
  let sizeVariation = circleBase * (noiseValue2 * 2 - 1) * 0.3;
  let circleSize = circleBase + sizeVariation;

  if (dividedX && dividedY) {
    ellipse(dividedX, dividedY, circleSize, circleSize);
  } else {
    ellipse(mouseX, mouseY, circleSize, circleSize);
  }

  // Store current circle position
  circlePositions.push({x: dividedX, y: dividedY});
  if (circlePositions.length > maxStoreFrames) {
    circlePositions.shift();
  }

  // update noise seed
  t += 0.01;
}
