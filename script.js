let currentPage = 0;
const pages = document.querySelectorAll(".page");

function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
}

// Countdown
const weddingDate = new Date("Dec 6, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("countdown").innerHTML =
    "⏳ " + days + " Days Remaining";
}, 1000);

// Music
const music = document.getElementById("bgMusic");

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
