const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzk73ZML3j_k-kaJ_omZooIqObQXgqSi4XhTQh2_1mt42h4H9GLIVevw_3jwa401PD7yw/exec";

let currentPage = 0;
let pages = [];

document.addEventListener("DOMContentLoaded", () => {

  pages = document.querySelectorAll(".page");

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
  let formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("guests", document.getElementById("guests").value);
  formData.append("status", document.getElementById("status").value);

  fetch(SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  });

  alert("✅ Submitted!");
}
