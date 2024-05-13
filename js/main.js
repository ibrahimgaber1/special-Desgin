//main colo change
let maincolors = localStorage.getItem("color_option");
if (maincolors !== null) {
  document.documentElement.style.setProperty("--main-color", maincolors);

  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === maincolors) {
      element.classList.add("active");
    }
  });
}

//Setting Box
document.querySelector(".fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
};

//main color change

const colorsLi = document.querySelectorAll(".color-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

//random background
let backgroundOption = true;
let backgroundIntervale;
let backgroundLocalStorage = localStorage.getItem("background_option");
if (backgroundLocalStorage !== null) {
  if (backgroundLocalStorage === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  //remove active class
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalStorage === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}
const randomBgEl = document.querySelectorAll(".random-background span");

randomBgEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeBg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundIntervale);
      localStorage.setItem("background_option", false);
    }
  });
});

let landingPage = document.querySelector(".landing-page");
let imageArray = ["01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg"];

function randomizeBg() {
  if (backgroundOption === true) {
    backgroundIntervale = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imageArray.length);
      landingPage.style.backgroundImage =
        'url("images/' + imageArray[randomNumber] + '")';
    }, 1000);
  }
}

randomizeBg();

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // btgyb l section l fo2 l ourskills 3la tol
  let skillsOffsetTop = ourSkills.offsetTop;
  //btgbly l height bta3 l section dah bl padding wl margin w kol 7aga
  let skillsOuterHeight = ourSkills.offsetHeight;
  //height bta3 l window nafsha
  let windowHeight = this.innerHeight;
  // l goz2 l enta 3amltlo scroll 5las
  let windowScrollTop = this.scrollY; //pageYOffset

  // console.log(skillsOuterHeight);

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//creat popup

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //creat overlay element
    let overlay = document.createElement("div");
    //add overlay class
    overlay.className = "popup-overlay";
    //apend overlay to body
    document.body.appendChild(overlay);
    //creat popup box
    let popupBox = document.createElement("div");
    //class name
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //creat heading
      let imgHeading = document.createElement("h3");
      //creat heading text
      let imgText = document.createTextNode(img.alt);
      //apppend text to h3
      imgHeading.appendChild(imgText);
      //append image heading to popup
      popupBox.appendChild(imgHeading);
    }

    // creat image
    let popupImage = document.createElement("img");
    //image src
    popupImage.src = img.src;
    //add image to popup box
    popupBox.appendChild(popupImage);
    //append popupbox to body
    document.body.appendChild(popupBox);
    // creat span to close
    let closeButton = document.createElement("span");
    //text to close button
    let closeText = document.createTextNode("x");
    // appen text to button
    closeButton.appendChild(closeText);
    //class name for close button
    closeButton.className = "close-button";
    //add close button to the popup
    popupBox.appendChild(closeButton);
  });
});

//close popup

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    document.querySelector(".popup-overlay").remove();
    document.querySelector(".popup-box").remove();
  }
});

//Select All bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//Select All links
const allLinks = document.querySelectorAll(".list a");

function scrollTo(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollTo(allLinks);
scrollTo(allBullets);

//Handle Active Function
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

//bullets
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsSpan = document.querySelectorAll(".bullet-option span");
let bulletLocalStorage = localStorage.getItem("bullets_option");

if (bulletLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullet-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullet-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

//Reset button
document.querySelector(".reset-option").onclick = () => {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  //reload window
  window.location.reload();
};

//toggle menu
let tlinks = document.querySelector(".list");
let toggleBtn = document.querySelector(".toggle-menu");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};

tlinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});
