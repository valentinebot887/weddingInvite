const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxlG-07faxRINSticO7yFvIjjFg60T-1xvfehTYBF2_H1gOQcbnmQvuI1mabJDXTCfQ/exec";

let currentPage = 0;
const pages = document.querySelectorAll(".page");

function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
}

function prevPage() {
  pages[currentPage].classList.remove("active");
  currentPage--;
  pages[currentPage].classList.add("active");
}

function submitRSVP() {
  let formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("guests", document.getElementById("guests").value);
  formData.append("status", document.getElementById("status").value);

  fetch(SCRIPT_URL, { method: "POST", body: formData })
  .then(() => alert("✅ Submitted Successfully"))
  .catch(() => alert("❌ Failed"));
}

const PIN = "06122026";

function checkAdmin() {
  if (document.getElementById("pin").value === PIN) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadGuests();
  } else {
    alert("Wrong PIN");
  }
}

function loadGuests() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      let html = "";
      for (let i = 1; i < data.length; i++) {
        html += `<p>${data[i][0]} (${data[i][1]}) - ${data[i][2]}</p>`;
      }
      document.getElementById("guestList").innerHTML = html;
    });
}

/* TIMER */
setInterval(() => {
  let diff = new Date("Dec 6, 2026") - new Date();

  document.getElementById("days").innerText = Math.floor(diff/86400000);
  document.getElementById("hours").innerText = Math.floor(diff/3600000 % 24);
  document.getElementById("minutes").innerText = Math.floor(diff/60000 % 60);
  document.getElementById("seconds").innerText = Math.floor(diff/1000 % 60);
}, 1000);
