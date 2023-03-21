let cameraZ = 0;
let stairList = [];
let timeSinceLastStair = 0;
let stairInterval = 100;
let maxStairs = 800;
let camXRotation = -Math.PI / 4;
let camYRotation = Math.PI / 4;
let lastClick = 0;

function mousePressed() {  // クリックで自動的に呼び出される関数
  let currentTime = millis();
  if (currentTime - lastClick < 400) {  // ダブルクリックの検出
    cameraZ -= 100;
  }
  lastClick = currentTime;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();

  for (let i = 0; i < 400; i++) {
    stairList.push(TWO_PI * (i / 100));
  }
}

function draw() {
  background(10, 10, 10);
  ambientLight(60, 60, 100);
  directionalLight(255, 255, 255, 0, -1, -1);

  if (mouseIsPressed) {
    camYRotation += (mouseX - pmouseX) * 0.005;
    camXRotation += (mouseY - pmouseY) * 0.005;
  }

  rotateX(camXRotation);
  rotateY(camYRotation);
  translate(0, -200, 0);

  const stairHeight = 4;
  const stairRadius = 200;

  timeSinceLastStair += deltaTime;

  if (timeSinceLastStair >= stairInterval) {
    if (stairList.length < maxStairs) {
      stairList.unshift(stairList[0] - TWO_PI / 100);
    } else {
      let lastStairAngle = stairList.pop();
      stairList.unshift(lastStairAngle - TWO_PI / 100);
    }
    timeSinceLastStair = 0;
  }

  for (let i = 0; i < stairList.length; i++) {
    let angle = stairList[i];
    let x = cos(angle) * stairRadius;
    let y = i * stairHeight;
    let z = sin(angle) * stairRadius;
    let colorNoise = random(-10, 10);
    let boxNoise = random(-1, 1);
    push();
    translate(x, y, z);
    rotateY(-angle);
    fill(10 + colorNoise, 120 + colorNoise, 180 + colorNoise, 120 + colorNoise);
    noStroke();
    box(30 + boxNoise, 10 + boxNoise, 10 + boxNoise);
    pop();
  }

  cameraZ += stairHeight * (2 * deltaTime / 1000);
  camera(0, 50, cameraZ + 500, 0, 0, cameraZ, 0, 1, 0);
}