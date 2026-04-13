const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk73ZML3j_k-kaJ_omZooIqObQXgqSi4XhTQh2_1mt42h4H9GLIVevw_3jwa401PD7yw/exec";

let pages = [];
let currentPage = 0;

/* INIT AFTER DOM LOAD */
document.addEventListener("DOMContentLoaded", () => {
  pages = document.querySelectorAll(".page");

  // Safety check
  if (pages.length === 0) {
    console.error("No pages found!");
    return;
  }

  showPage(0); // Always start from first page
});

/* SHOW PAGE */
function showPage(index) {
  pages.forEach(page => {
    page.classList.remove("active");
  });

  if (pages[index]) {
    pages[index].classList.add("active");
  }
}

/* NEXT PAGE */
function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

/* PREVIOUS PAGE */
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

/* RSVP FUNCTION */
function submitRSVP() {
  let nameInput = document.getElementById("name");
  let guestsInput = document.getElementById("guests");

  let name = nameInput ? nameInput.value.trim() : "";
  let guests = guestsInput ? guestsInput.value : "1";

  if (!name) {
    alert("Please enter your name");
    return;
  }

  let formData = new FormData();
  formData.append("name", name);
  formData.append("guests", guests);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  alert("✅ Thank you! RSVP submitted.");

  // Clear fields safely
  if (nameInput) nameInput.value = "";
  if (guestsInput) guestsInput.value = "";
}

/* ADMIN LOGIN */
function checkAdmin() {
  let pinInput = document.getElementById("pin");

  if (!pinInput) return;

  let pin = pinInput.value;

  if (pin === "06122026") {
    alert("Admin access granted ✅");
  } else {
    alert("Wrong PIN ❌");
  }
}
