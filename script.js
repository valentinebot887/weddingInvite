let currentPage = 0;
const pages = document.querySelectorAll(".page");

function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

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

  fetch("https://script.google.com/macros/s/AKfycby20e0-nKYEhg-SZsqkmhxRe7isac_zHsFwsijZqBpME2nMjlRf_hM11WyH5TO2IlKgWQ/exec", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, guests, status })
  })
  .then(() => {
    document.getElementById("successMsg").innerHTML =
      "✅ Thank you " + name;
  })
  .catch(() => {
    document.getElementById("successMsg").innerHTML =
      "❌ Error submitting";
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

/* ADMIN */
const ADMIN_PIN = "06122026";

function checkAdmin() {
  let pin = document.getElementById("adminPin").value;

  if (pin === ADMIN_PIN) {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadDashboard();
  } else {
    alert("Wrong PIN");
  }
}

function loadDashboard() {
  fetch("https://script.google.com/macros/s/AKfycby20e0-nKYEhg-SZsqkmhxRe7isac_zHsFwsijZqBpME2nMjlRf_hM11WyH5TO2IlKgWQ/exec")
    .then(res => res.json())
    .then(data => {
      let html = "";
      let total = data.length - 1;

      document.getElementById("total").innerText = total;

      for (let i = 1; i < data.length; i++) {
        html += `<p>👤 ${data[i][0]} (${data[i][1]}) - ${data[i][2]}</p>`;
      }

      document.getElementById("guestData").innerHTML = html;
    });
}
