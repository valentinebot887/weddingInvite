const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxxlG-07faxRINSticO7yFvIjjFg60T-1xvfehTYBF2_H1gOQcbnmQvuI1mabJDXTCfQ/exec";

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

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, guests, status })
  })
  .then(res => res.json())
  .then(() => alert("✅ Submitted Successfully"))
  .catch(() => alert("❌ Failed"));
}

/* ADMIN */
const PIN = "06122026";

function checkAdmin() {
  let pin = document.getElementById("pin").value;

  if (pin === PIN) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadGuests();
  } else {
    alert("Wrong PIN");
  }
}

/* LOAD DATA */
function loadGuests() {
  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      let html = "";

      for (let i = 1; i < data.length; i++) {
        html += `<p>👤 ${data[i][0]} (${data[i][1]}) - ${data[i][2]}</p>`;
      }

      document.getElementById("guestList").innerHTML = html;
    });
}

/* TIMER */
const weddingDate = new Date("Dec 6, 2026").getTime();

setInterval(() => {
  let diff = weddingDate - new Date().getTime();

  document.getElementById("days").innerText = Math.floor(diff/(1000*60*60*24));
  document.getElementById("hours").innerText = Math.floor((diff/(1000*60*60))%24);
  document.getElementById("minutes").innerText = Math.floor((diff/(1000*60))%60);
  document.getElementById("seconds").innerText = Math.floor((diff/1000)%60);
}, 1000);

/* PETALS */
const petals = document.querySelector(".petals");
for (let i = 0; i < 20; i++) {
  let p = document.createElement("span");
  p.style.left = Math.random()*100+"vw";
  p.style.animationDuration = (5+Math.random()*5)+"s";
  petals.appendChild(p);
}

/* HEARTS */
const hearts = document.querySelector(".hearts");
for (let i = 0; i < 10; i++) {
  let h = document.createElement("span");
  h.innerHTML = "❤";
  h.style.left = Math.random()*100+"vw";
  h.style.animationDuration = (6+Math.random()*4)+"s";
  hearts.appendChild(h);
}
