const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk73ZML3j_k-kaJ_omZooIqObQXgqSi4XhTQh2_1mt42h4H9GLIVevw_3jwa401PD7yw/exec";

let pages = [];
let currentPage = 0;

document.addEventListener("DOMContentLoaded", () => {
  pages = document.querySelectorAll(".page");
  showPage(0);
});

/* SHOW PAGE */
function showPage(index) {
  pages.forEach(page => page.classList.remove("active"));
  pages[index].classList.add("active");
}

/* NEXT */
function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

/* PREVIOUS */
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

/* RSVP */
function submitRSVP() {
  let name = document.getElementById("name").value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  let formData = new FormData();
  formData.append("name", name);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  alert("✅ RSVP Submitted!");
}

/* ADMIN */
function checkAdmin() {
  let pin = document.getElementById("pin").value;

  if (pin === "06122026") {
    alert("Admin Access Granted");
  } else {
    alert("Wrong PIN");
  }
}
