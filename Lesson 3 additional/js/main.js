const score = document.querySelector(".score");
const startEasy = document.querySelector(".start-easy");
const startMedium = document.querySelector(".start-medium");
const startHard = document.querySelector(".start-hard");
const gameArea = document.querySelector(".gameArea");
const car = document.createElement("div");
const music = document.createElement("audio");
car.classList.add("car");

startEasy.addEventListener("click", startGameE);
startMedium.addEventListener("click", startGameM);
startHard.addEventListener("click", startGameH);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3
};

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGameE() {
  startGame();
}
function startGameM() {
  setting.speed = 12;
  setting.traffic = 2;
  startGame();
}
function startGameH() {
  setting.speed = 18;
  setting.traffic = 1.5;
  startGame();
}

function startGame() {
  startEasy.classList.add("hide");
  startMedium.classList.add("hide");
  startHard.classList.add("hide");
  gameArea.innerHTML = "";

  for (let i = 0; i < getQuantityElements(90); i++) {
    const line = document.createElement("div");
    line.y = i * 90;
    line.classList.add("line");
    line.style.top = i * 90 + "px";
    gameArea.appendChild(line);
  }
  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.top = i + "px";
    enemy.style.left =
      Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    enemy.y = -100 * setting.traffic * (i + 1);
    gameArea.appendChild(enemy);
  }

  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2 + "px";
  car.style.bottom = "10px";
  car.style.top = "auto";
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  music.setAttribute("autoplay", true);
  music.setAttribute("src", "assets/audio.mp3");
  requestAnimationFrame(playGame);
}

function playGame() {
  console.log("Play Game");
  if (setting.start === true) {
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }
    if (
      keys.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight
    ) {
      setting.y += setting.speed * 2;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";
    requestAnimationFrame(playGame);
    moveRoad();
    moveEnemy();
    setting.score += setting.speed;
    score.innerHTML = "SCORE <br>" + setting.score;
  }
}

function moveRoad() {
  let lines = document.querySelectorAll(".line");
  lines.forEach(function(line) {
    line.y += setting.speed;
    line.style.top = line.y + "px";
    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function(item) {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if (
      carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.left <= enemyRect.right &&
      carRect.bottom >= enemyRect.top
    ) {
      setting.start = false;
      startEasy.classList.remove("hide");
      startMedium.classList.remove("hide");
      startHard.classList.remove("hide");
      startEasy.style.top = score.offsetHeight + "px";
      startMedium.style.top = score.offsetHeight + 80 + "px";
      startHard.style.top = score.offsetHeight + 160 + "px";
    }

    item.y += setting.speed / 2;
    item.style.top = item.y + "px";
    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left =
        Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    }
  });
}

function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
}

function scoreSave() {
  //
}
