const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk73ZML3j_k-kaJ_omZooIqObQXgqSi4XhTQh2_1mt42h4H9GLIVevw_3jwa401PD7yw/exec";

let currentPage = 0;
const pages = document.querySelectorAll(".page");

/* 💌 ENVELOPE OPEN */
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.querySelector(".envelope-body");

  if (envelope) {
    envelope.addEventListener("click", () => {
      envelope.classList.add("envelope-open");

      setTimeout(() => {
        document.getElementById("envelope").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
      }, 1200);
    });
  }
});

/* 📄 NAVIGATION */
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

/* ✅ RSVP (FINAL WORKING VERSION) */
function submitRSVP() {
  let name = document.getElementById("name").value.trim();
  let guests = document.getElementById("guests").value || "1";
  let status = document.getElementById("status").value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  let formData = new FormData();
  formData.append("name", name);
  formData.append("guests", guests);
  formData.append("status", status);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  // Instant success (no waiting for response due to no-cors)
  alert("✅ Thank you! Your response has been recorded.");

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("guests").value = "";
}

/* 🔐 ADMIN LOGIN */
const PIN = "06122026";

function checkAdmin() {
  let enteredPin = document.getElementById("pin").value;

  if (enteredPin === PIN) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadGuests();
  } else {
    alert("❌ Wrong PIN");
  }
}

/* 📊 LOAD GUEST DATA */
function loadGuests() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      let html = "";

      // Skip header row (index 0)
      for (let i = 1; i < data.length; i++) {
        html += `<p>👤 ${data[i][0]} (${data[i][1]}) - ${data[i][2]}</p>`;
      }

      document.getElementById("guestList").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("guestList").innerHTML = "⚠️ Unable to load data";
    });
}

/* ⏳ WEDDING TIMER */
const weddingDate = new Date("Dec 6, 2026 00:00:00").getTime();

setInterval(() => {
  let now = new Date().getTime();
  let diff = weddingDate - now;

  if (diff < 0) return;

  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((diff / (1000 * 60)) % 60);
  let seconds = Math.floor((diff / 1000) % 60);

  if (document.getElementById("days")) {
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }
}, 1000);
