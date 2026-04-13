const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk73ZML3j_k-kaJ_omZooIqObQXgqSi4XhTQh2_1mt42h4H9GLIVevw_3jwa401PD7yw/exec";

let currentPage = 0;
let pages = [];

/* INIT AFTER DOM */
document.addEventListener("DOMContentLoaded", () => {

  pages = document.querySelectorAll(".page");

  /* ENVELOPE */
  const envelope = document.querySelector(".envelope-body");

  envelope.addEventListener("click", () => {
    envelope.classList.add("envelope-open");

    setTimeout(() => {
      document.getElementById("envelope").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    }, 1200);
  });

});

/* NAVIGATION */
function nextPage() {
  if (currentPage >= pages.length - 1) return;

  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
}

function prevPage() {
  if (currentPage <= 0) return;

  pages[currentPage].classList.remove("active");
  currentPage--;
  pages[currentPage].classList.add("active");
}

/* RSVP */
function submitRSVP() {
  let name = document.getElementById("name").value.trim();
  let guests = document.getElementById("guests").value || "1";
  let status = document.getElementById("status").value;

  if (!name) {
    alert("Enter your name");
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

  alert("✅ Submitted!");
}

/* ADMIN */
const PIN = "06122026";

function checkAdmin() {
  if (document.getElementById("pin").value === PIN) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Wrong PIN");
  }
}

/* SAFE TIMER */
setInterval(() => {
  if (!document.getElementById("days")) return;

  let diff = new Date("Dec 6, 2026") - new Date();

  document.getElementById("days").innerText = Math.floor(diff/86400000);
  document.getElementById("hours").innerText = Math.floor(diff/3600000 % 24);
  document.getElementById("minutes").innerText = Math.floor(diff/60000 % 60);
  document.getElementById("seconds").innerText = Math.floor(diff/1000 % 60);
}, 1000);
