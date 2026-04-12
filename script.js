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

/* RSVP LOCAL STORAGE */
function submitRSVP() {
  let name = document.getElementById("name").value;
  let guests = document.getElementById("guests").value || "1";
  let status = document.getElementById("status").value;

  let list = JSON.parse(localStorage.getItem("guests") || "[]");

  list.push({ name, guests, status });

  localStorage.setItem("guests", JSON.stringify(list));

  displayGuests();
}

/* DISPLAY GUESTS */
function displayGuests() {
  let list = JSON.parse(localStorage.getItem("guests") || "[]");
  let html = "";

  list.forEach(g => {
    html += `<p>👤 ${g.name} (${g.guests}) - ${g.status}</p>`;
  });

  document.getElementById("guestList").innerHTML = html;
}

displayGuests();

/* TIMER */
const weddingDate = new Date("Dec 6, 2026 00:00:00").getTime();

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
