const main = document.querySelector(".grid");
const img_x = document.querySelector(".img_x");
const img_o = document.querySelector(".img_o");
const draw = document.querySelector(".draw");
const score = document.querySelector(".score");
const button = document.querySelector(".btn");
const x_score = document.querySelector(".x_score");
const o_score = document.querySelector(".o_score");
const player1score = document.querySelector(".player1score");
const player2score = document.querySelector(".player2score");
const winLine = document.querySelector(".winLine");
const cross = `
      <div class="cross">
        <div class="bar" id="bar1"></div>
        <div class="bar" id="bar2"></div>
      </div>
      `;
const circle = `<div class="circle">
        <svg>
          <circle cx="50%" cy="50%" r="23" />
        </svg>
      </div>`;
let count = 0;
let p1 = 0;
let p2 = 0;
let turn = true;
let gameOn = true;
let won = false;
addAnimation(x_score, "active");

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const winLineConfig = [
  {
    top: "16.65%",
    left: "",
    transform: "translateY(-50%)",
    transformOrigin: "",
  },
  {
    top: "49.95%",
    left: "",
    transform: "translateY(-50%)",
    transformOrigin: "",
  },
  {
    top: "83.25%",
    left: "",
    transform: "translateY(-50%)",
    transformOrigin: "",
  },
  {
    left: "18.9%",
    top: "",
    transformOrigin: "top left",
    transform: "rotate(90deg)",
  },
  {
    left: "52.5%",
    top: "",
    transformOrigin: "top left",
    transform: "rotate(90deg)",
  },
  {
    left: "86.9%",
    top: "",
    transformOrigin: "top left",
    transform: "rotate(90deg)",
  },
  {
    top: "14%",
    left: "16.6%",
    width: "120%",
    transformOrigin: "top left",
    transform: "rotate(45deg)",
  },
  {
    top: "16.9%",
    left: "86%",
    transformOrigin: "top left",
    transform: "rotate(135deg)",
  },
];

let state = new Array(9).fill(null);

function play(cell, index) {
  if (cell.innerHTML !== "") return;
  count++;
  state[index] = turn;
  if (turn) {
    cell.innerHTML = cross;
    removeAnimation(x_score, "active");
    addAnimation(o_score, "active");
  } else {
    cell.innerHTML = circle;
    removeAnimation(o_score, "active");
    addAnimation(x_score, "active");
  }
  const [won, position] = checkState();
  if (won) {
    gameOn = false;
    main.classList.remove("shrinkOut");
    main.classList.add("shrinkIn");
    button.style.display = "block";
    winLine.style.display = "block";
    const winLineStyle = winLineConfig[position];
    for (const prop in winLineStyle) {
      winLine.style[prop] = winLineStyle[prop];
    }
    if (turn) {
      p1++;
      img_x.classList.add("shrinkOut");
      img_x.style.display = "block";
      player1score.innerHTML = p1;
    } else {
      p2++;
      img_o.classList.add("shrinkOut");
      img_o.style.display = "block";

      player2score.innerHTML = p2;
    }
  }
  if (count === 9 && !won) {
    gameOn = false;
    main.classList.remove("shrinkOut");
    main.classList.add("shrinkIn");
    draw.classList.add("shrinkOut");
    draw.style.display = "block";
    button.style.display = "block";
  }
  turn = !turn;
}

function checkState() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    if (
      state[combination[0] - 1] === turn &&
      state[combination[1] - 1] === turn &&
      state[combination[2] - 1] === turn
    )
      return [true, i];
  }
  return [false, -1];
}

for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.addEventListener("mousedown", (e) => {
    if (!gameOn) return;
    play(cell, i);
  });
  cell.id = `x${i}`;
  cell.className = "cells";
  main.appendChild(cell);
}

button.addEventListener("mousedown", () => {
  reset();
});

function addAnimation(element, animation) {
  element.classList.add(animation);
}

function removeAnimation(element, animation) {
  element.classList.remove(animation);
}

function reset() {
  gameOn = true;
  count = 0;
  state = new Array(9).fill(null);
  const cells = document.querySelectorAll(".cells");
  winLine.style.display = "none";
  addAnimation(x_score, "active");
  removeAnimation(o_score, "active");

  for (let i = 0; i < 9; i++) {
    cells[i].innerHTML = "";
  }

  removeAnimation(img_o, "shrinkOut");
  removeAnimation(img_x, "shrinkOut");
  removeAnimation(draw, "shrinkOut");

  addAnimation(img_o, "shrinkIn");
  addAnimation(img_x, "shrinkIn");
  addAnimation(draw, "shrinkIn");

  removeAnimation(main, "shrinkIn");
  addAnimation(main, "shrinkOut");
  button.style.display = "none";
}
