const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk73ZML3j_k-kaJ_omZooIqObQXgqSi4XhTQh2_1mt42h4H9GLIVevw_3jwa401PD7yw/exec";

let pages;
let currentPage = 0;

document.addEventListener("DOMContentLoaded", () => {
  pages = document.querySelectorAll(".page");
});

/* NAVIGATION */
function showPage(index) {
  pages.forEach(p => p.classList.remove("active"));
  pages[index].classList.add("active");
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

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
    alert("Enter your name");
    return;
  }

  let formData = new FormData();
  formData.append("name", name);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  alert("Submitted ✅");
}
