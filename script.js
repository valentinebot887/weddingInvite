let currentPage = 0;
const pages = document.querySelectorAll(".page");

/* ENTER */
function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

/* NAV */
function nextPage() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.remove("active");
    currentPage++;
    pages[currentPage].classList.add("active");
  }
}

function prevPage() {
  if (currentPage > 0) {
    pages[currentPage].classList.remove("active");
    currentPage--;
    pages[currentPage].classList.add("active");
  }
}

/* RSVP */
function submitRSVP() {
  let name = document.getElementById("name").value;
  let guests = document.getElementById("guests").value || "1";
  let status = document.getElementById("status").value;

  if (name === "") {
    alert("Enter name");
    return;
  }

  document.getElementById("successMsg").innerHTML = "⏳ Sending...";

  fetch("https://script.google.com/macros/s/AKfycbxxxlG-07faxRINSticO7yFvIjjFg60T-1xvfehTYBF2_H1gOQcbnmQvuI1mabJDXTCfQ/exec", {
    method: "POST",
    body: JSON.stringify({ name, guests, status })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("successMsg").innerHTML =
      "✅ Thank you " + name + "!";
  })
  .catch(() => {
    document.getElementById("successMsg").innerHTML =
      "❌ Submission failed";
  });
}

/* COUNTDOWN */
const weddingDate = new Date("Dec 6, 2026").getTime();

setInterval(() => {
  let now = new Date().getTime();
  let diff = weddingDate - now;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));

  let el = document.getElementById("countdown");
  if (el) {
    el.innerHTML = "⏳ " + days + " days to go!";
  }
}, 1000);

/* 🌸 PETALS */
const petals = document.querySelector(".petals");
for (let i = 0; i < 25; i++) {
  let p = document.createElement("span");
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = (5 + Math.random() * 5) + "s";
  petals.appendChild(p);
}

/* 💖 HEARTS */
const hearts = document.querySelector(".hearts");
for (let i = 0; i < 15; i++) {
  let h = document.createElement("span");
  h.innerHTML = "❤";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = (6 + Math.random() * 4) + "s";
  hearts.appendChild(h);
}
