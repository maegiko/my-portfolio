let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav ul li a");
const goTopBtn = document.querySelector(".scroll-top");
const nav_links = document.querySelectorAll(".navbar a");
const skills = document.querySelectorAll(".progress_percent");
const animatedSkills = document.querySelectorAll(
  ".html, .css, .javascript, .python, .C, .latex, .maple, .english, .cantonese"
);

// This code here displays the go to top button only if 600px have been
// scrolled
window.addEventListener("scroll", checkHeight);

function checkHeight() {
  if (window.scrollY > 600) {
    goTopBtn.style.display = "flex";
  } else {
    goTopBtn.style.display = "none";
  }
}

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        nav_links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  {
    threshold: 0.6,
  }
);

sections.forEach((section) => observer.observe(section));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.7,
  }
);

animatedSkills.forEach((el) => skillObserver.observe(el));

const contentObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        obs.unobserve(entry.target); // Only trigger once
      }
    });
  },
  {
    threshold: 0.3,
  }
);

const content = document.querySelectorAll(
  ".heading, .bar, .timeline, .projects-container, .contact-form, .social, .list, .copyright, .hey-there, .home-img, .home-second, .header"
);

content.forEach((el) => contentObserver.observe(el));

// Tic Tac Toe
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 🎯 Modified to return the winning combo instead of just "X" or "O"
function checkWinner() {
  for (let combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo; // Return the winning combination
    }
  }
  if (!board.includes("")) return "draw";
  return null;
}

const winSound = new Audio("sounds/mixkit-achievement-bell-600.wav");
winSound.volume = 0.2;

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.color = "#e74833";

  const result = checkWinner();

  if (Array.isArray(result)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    statusText.style.color = "#e74833";
    winSound.play();
    gameActive = false;

    result.forEach(i => {
      cells[i].classList.add("winning-cell");
    });

  } else if (result === "draw") {
    statusText.textContent = "It's a draw!";
    statusText.style.color = "#e74833";
    winSound.play();
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.color = "#e74833";
    cell.classList.remove("winning-cell");
  });

  statusText.textContent = `Player ${currentPlayer}'s turn`;
  statusText.style.color = "#fff";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

