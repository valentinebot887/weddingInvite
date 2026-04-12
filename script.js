let currentPage = 0;
const pages = document.querySelectorAll(".page");

/* ENTER SITE */
function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

/* NAVIGATION */
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

/* RSVP (FIXED) */
function submitRSVP() {
  let name = document.getElementById("name").value;
  let guests = document.getElementById("guests").value || "1";
  let status = document.getElementById("status").value;

  if (name === "") {
    alert("Please enter your name");
    return;
  }

  let formData = new FormData();
  formData.append("name", name);
  formData.append("guests", guests);
  formData.append("status", status);

  document.getElementById("successMsg").innerHTML = "⏳ Sending...";

  fetch("https://script.google.com/macros/s/AKfycbxxxlG-07faxRINSticO7yFvIjjFg60T-1xvfehTYBF2_H1gOQcbnmQvuI1mabJDXTCfQ/exec", {
    method: "POST",
    body: formData
  })
  .then(() => {
    document.getElementById("successMsg").innerHTML =
      "✅ Thank you, " + name + "!";
      
    // clear inputs
    document.getElementById("name").value = "";
    document.getElementById("guests").value = "";
  })
  .catch((err) => {
    console.error(err);
    document.getElementById("successMsg").innerHTML =
      "❌ Submission failed. Try again.";
  });
}

/* COUNTDOWN TIMER */
const weddingDate = new Date("Dec 6, 2026 00:00:00").getTime();

setInterval(() => {
  let now = new Date().getTime();
  let diff = weddingDate - now;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((diff / (1000 * 60)) % 60);
  let seconds = Math.floor((diff / 1000) % 60);

  // Safe update (only if elements exist)
  if (document.getElementById("days")) {
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }

}, 1000);

/* 🌸 PETALS ANIMATION */
const petalsContainer = document.querySelector(".petals");

if (petalsContainer) {
  for (let i = 0; i < 25; i++) {
    let petal = document.createElement("span");

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (5 + Math.random() * 5) + "s";
    petal.style.opacity = Math.random();

    petalsContainer.appendChild(petal);
  }
}

/* 💖 HEARTS ANIMATION */
const heartsContainer = document.querySelector(".hearts");

if (heartsContainer) {
  for (let i = 0; i < 15; i++) {
    let heart = document.createElement("span");

    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (6 + Math.random() * 4) + "s";
    heart.style.opacity = Math.random();

    heartsContainer.appendChild(heart);
  }
}
