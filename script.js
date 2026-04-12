let currentPage = 0;
const pages = document.querySelectorAll(".page");

// FIX: ENTER BUTTON
function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

// NEXT
function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
}

// BACK
function prevPage() {
  pages[currentPage].classList.remove("active");
  currentPage--;
  pages[currentPage].classList.add("active");
}

// COUNTDOWN
const weddingDate = new Date("Dec 6, 2026").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const el = document.getElementById("countdown");
  if (el) el.innerHTML = days + " days left 💍";
}, 1000);

// GUEST LIST
function renderGuests() {
  const friendsDiv = document.getElementById("friendsList");
  const familyDiv = document.getElementById("familyList");

  if (!friendsDiv) return;

  friendsDiv.innerHTML = "<h3>Friends</h3>";
  familyDiv.innerHTML = "<h3>Family</h3>";
}

window.onload = renderGuests;

function saveGuests() {
  alert("Saved ✅");
}
