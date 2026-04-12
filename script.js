let currentPage = 0;
const pages = document.querySelectorAll(".page");

// ENTER SITE
function enterSite() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
}

// NEXT PAGE
function nextPage() {
  pages[currentPage].classList.remove("active");
  currentPage++;
  pages[currentPage].classList.add("active");
}

// PREVIOUS PAGE
function prevPage() {
  pages[currentPage].classList.remove("active");
  currentPage--;
  pages[currentPage].classList.add("active");
}

// ✅ RSVP TO GOOGLE SHEET
function submitRSVP() {
  let name = document.getElementById("name").value;
  let guests = document.getElementById("guests").value;
  let status = document.getElementById("status").value;

  if (name === "") {
    alert("Please enter your name");
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
  .then(data => {
    document.getElementById("successMsg").innerHTML =
      "✅ Thank you " + name + "! Your response is recorded.";

    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("guests").value = "";
  })
  .catch(err => {
    document.getElementById("successMsg").innerHTML =
      "❌ Failed to submit. Try again.";
  });
}
