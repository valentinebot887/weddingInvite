let pages;
let currentPage = 0;

document.addEventListener("DOMContentLoaded", () => {
  pages = document.querySelectorAll(".page");
  showPage(0);
});

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

function submitRSVP() {
  alert("Submitted ✅");
}

function checkAdmin() {
  if (document.getElementById("pin").value === "06122026") {
    alert("Admin Access");
  } else {
    alert("Wrong PIN");
  }
}
