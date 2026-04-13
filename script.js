const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk73ZML3j_k-kaJ_omZooIqObQXgqSi4XhTQh2_1mt42h4H9GLIVevw_3jwa401PD7yw/exec";

let currentPage = 0;
const pages = document.querySelectorAll(".page");

/* 💌 ENVELOPE */
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

/* ✅ NAVIGATION FIXED */
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

/* ✅ RSVP WORKING */
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

  alert("✅ Submitted successfully!");

  document.getElementById("name").value = "";
  document.getElementById("guests").value = "";
}

/* 🔐 ADMIN */
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

/* 📊 LOAD GUESTS */
function loadGuests() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      let html = "";

      for (let i = 1; i < data.length; i++) {
        html += `<p>👤 ${data[i][0]} (${data[i][1]}) - ${data[i][2]}</p>`;
      }

      document.getElementById("guestList").innerHTML = html;
    })
    .catch(() => {
      document.getElementById("guestList").innerHTML = "⚠️ Unable to load data";
    });
}

/* ✅ TIMER FIX (NO CRASH) */
setInterval(() => {
  let daysEl = document.getElementById("days");

  // ONLY run if timer exists
  if (!daysEl) return;

  let diff = new Date("Dec 6, 2026") - new Date();

  let days = Math.floor(diff / 86400000);
  let hours = Math.floor((diff / 3600000) % 24);
  let minutes = Math.floor((diff / 60000) % 60);
  let seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

}, 1000);
