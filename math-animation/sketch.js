// IT3 Final Drill: Math-Based Animation in p5.js
// Math: dotX = orbitCenterX + orbitRadius * cos(orbitAngleRadians)
//       dotY = orbitCenterY + orbitRadius * sin(orbitAngleRadians)

let orbitCenterX;
let orbitCenterY;
let orbitRadius = 180; // distance from center to dot
let orbitAngleRadians = 0; // current angle in radians
let angularSpeed = 0.02; // angle increase per frame
let dotDiameter = 32;
let isPaused = false;

function setup() {
  createCanvas(600, 600);
  frameRate(60);

  orbitCenterX = width / 2;
  orbitCenterY = height / 2;

  textSize(16);
  textAlign(LEFT, TOP);
}

function draw() {
  background(240, 244, 255);

  noFill();
  stroke(170, 180, 210);
  strokeWeight(2);
  circle(orbitCenterX, orbitCenterY, orbitRadius * 2);

  noStroke();
  fill(80, 90, 120);
  circle(orbitCenterX, orbitCenterY, 12);

  // cos(angle) = horizontal fraction of the radius (-1 to 1)
  // sin(angle) = vertical fraction of the radius (-1 to 1)
  // Multiplying by orbitRadius turns those fractions into pixels.
  let dotX = orbitCenterX + orbitRadius * cos(orbitAngleRadians);
  let dotY = orbitCenterY + orbitRadius * sin(orbitAngleRadians);

  stroke(255, 120, 120);
  strokeWeight(2);
  line(orbitCenterX, orbitCenterY, dotX, dotY);

  noStroke();
  fill(255, 80, 80);
  circle(dotX, dotY, dotDiameter);

  // Adding angularSpeed every frame makes the angle grow over time
  // Keep the angle between 0 and TWO_PI so it does not grow forever
  if (!isPaused) {
    orbitAngleRadians += angularSpeed;

    if (orbitAngleRadians > TWO_PI) {
      orbitAngleRadians -= TWO_PI;
    }
  }

  noStroke();
  fill(20, 30, 60);
  textSize(16);
  text("CONTROLS:", 12, 10);
  text("SPACE or CLICK : Pause / Resume", 12, 30);
  text("UP / DOWN      : Bigger / Smaller orbit (radius)", 12, 50);
  text("LEFT / RIGHT   : Slower / Faster orbit (speed)", 12, 70);
  text("Mouse wheel    : Bigger / Smaller orbit", 12, 90);

  let angleDegrees = degrees(orbitAngleRadians);
  textSize(15);
  text("Angle: " + angleDegrees.toFixed(0) + " degrees (" + orbitAngleRadians.toFixed(2) + " rad)", 12, 120);
  text("Radius: " + orbitRadius + " px    Speed: " + angularSpeed.toFixed(3) + " rad/frame", 12, 140);
  text("Dot position: (" + dotX.toFixed(0) + ", " + dotY.toFixed(0) + ")", 12, 160);
  if (isPaused) {
    text("PAUSED", 12, 180);
  }
}

function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;
    return false;
  }
  if (keyCode === UP_ARROW) {
    orbitRadius += 10;
  }
  if (keyCode === DOWN_ARROW) {
    orbitRadius -= 10;
  }
  if (keyCode === RIGHT_ARROW) {
    angularSpeed += 0.005;
  }
  if (keyCode === LEFT_ARROW) {
    angularSpeed -= 0.005;
  }

  orbitRadius = constrain(orbitRadius, 50, 270);
  angularSpeed = constrain(angularSpeed, 0.005, 0.08);
}

function mousePressed() {
  isPaused = !isPaused;
}

function mouseWheel(event) {
  orbitRadius -= event.delta * 0.2;
  orbitRadius = constrain(orbitRadius, 50, 270);
  return false;
}
