let currentPage = 0;
const pages = document.querySelectorAll(".page");

// ENTER
function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

// NAVIGATION
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

// RSVP → GOOGLE SHEET
function submitRSVP() {
  let name = document.getElementById("name").value;
  let guests = document.getElementById("guests").value;
  let status = document.getElementById("status").value;

  if (name === "") {
    alert("Enter name");
    return;
  }

  document.getElementById("successMsg").innerHTML = "⏳ Sending...";

  fetch("https://script.google.com/macros/s/AKfycby20e0-nKYEhg-SZsqkmhxRe7isac_zHsFwsijZqBpME2nMjlRf_hM11WyH5TO2IlKgWQ/exec", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      guests: guests,
      status: status
    })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("successMsg").innerHTML =
      "✅ Thank you " + name + "!";

    document.getElementById("name").value = "";
    document.getElementById("guests").value = "";
  })
  .catch(() => {
    document.getElementById("successMsg").innerHTML =
      "❌ Error submitting";
  });
}

// 🔐 ADMIN PIN
const ADMIN_PIN = "1234"; // change this

function checkAdmin() {
  let pin = document.getElementById("adminPin").value;

  if (pin === ADMIN_PIN) {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";

    loadDashboard();
  } else {
    alert("Wrong PIN ❌");
  }
}

// 📊 LOAD DASHBOARD
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
