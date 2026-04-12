let currentPage = 0;
const pages = document.querySelectorAll(".page");

// ENTER FIX
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

// ✅ NEW RSVP (NO REDIRECT)
function submitRSVP() {
  let name = document.getElementById("name").value;

  if (name === "") {
    alert("Please enter your name");
    return;
  }

  document.getElementById("successMsg").innerHTML =
    "✅ Thank you " + name + "! Your response is recorded.";

  // Save locally
  localStorage.setItem(name, "confirmed");
}
