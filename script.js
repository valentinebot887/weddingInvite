let currentPage = 0;
const pages = document.querySelectorAll(".page");

function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
}

// Countdown
const weddingDate = new Date("Dec 6, 2026").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("countdown").innerHTML =
    "⏳ " + days + " Days Remaining";
}, 1000);

// Guests
const friends = [
  "Shruti Chirag","Shaiviiiii Apoorva Sakshi","Parul Vanya Hunar",
  "Gauri plus pati","Mehak Siddhika Sur","Rohan Dwij Utsav",
  "Dhanashree Aishwarya","Abhilash Smit Arman","Locals",
  "Kumkum Bhumika Neelam","Saddam Sumeet","Ruchita Asha",
  "Suraj Atharv","Krishan Mohit","Rohit Utkarsh","Shreyash Manish",
  "Vivek","Swaroop","Shubh Avantika Megha","Yash Shivam Kshitij",
  "Gattu Choti","Shivani pati","Heena plus husband","Bittu plus husband",
  "Suraj wife baby","Darshan wife baby","Pritha Abhik","Prashant Keerti"
];

const family = [
  "Pawan Mammu","Manish Mammu","Chintu Mammu","Fufa Ji","Aman Chachu",
  "Annu didi","Pusha","Vivek uncle","Meena aunty","Das aunty",
  "Priyanka aunty","Anjali aunty","Lab ji aunty","Anku","Pallavi aunty",
  "Kalyan uncle","Jayant uncle","Sunil uncle","Jyoti aunty"
];

function renderGuests() {
  const fDiv = document.getElementById("friendsList");
  const famDiv = document.getElementById("familyList");

  fDiv.innerHTML = "";
  famDiv.innerHTML = "";

  friends.forEach((name, i) => {
    const checked = localStorage.getItem("f_"+i) === "true";
    fDiv.innerHTML += `
      <label>
        <input type="checkbox" ${checked ? "checked" : ""} 
        onchange="localStorage.setItem('f_${i}', this.checked)">
        ${name}
      </label>`;
  });

  family.forEach((name, i) => {
    const checked = localStorage.getItem("fam_"+i) === "true";
    famDiv.innerHTML += `
      <label>
        <input type="checkbox" ${checked ? "checked" : ""} 
        onchange="localStorage.setItem('fam_${i}', this.checked)">
        ${name}
      </label>`;
  });
}

function saveGuests() {
  alert("Saved Successfully ✅");
}

window.onload = renderGuests;
