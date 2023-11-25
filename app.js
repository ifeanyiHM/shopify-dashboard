const userButton = document.querySelector("#toggle-menu");
const navElement = document.querySelector("#navigation-menu");
const bellIcon = document.querySelector(".bell-notf");
const alertBox = document.querySelector("#notif-menu");
const trialExtension = document.querySelector(".trial-extension");
const closeTrial = document.querySelector(".close-trial");
const openMenu = document.querySelector(".open-menu");
const one = document.querySelector(".one");
const angleToggleIcon = document.querySelector(".angle-toggle_icon");
const storeSetup = document.querySelector(".store-setup");
const headers = document.querySelectorAll(".header");
const incrementSpan = document.querySelector(".increment");
const updateStoreButtons = document.querySelectorAll(".update-store");
const progressElement = document.querySelector(".progress > div");

//Toggle navElement
const toggleNav = () => {
  navElement.classList.toggle("open");
  alertBox.classList.remove("open");
  storeSetup.style.height = "6.2rem";

  const expanded = navElement.getAttribute("aria-expanded") === "true" || false;
  navElement.setAttribute("aria-expanded", !expanded);

  if (!expanded) {
    const firstLink = navElement.querySelector("a");
    if (firstLink) firstLink.focus();
  }
};

userButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleNav();
});

//Navigate navElement witht keyboard
navElement.addEventListener("keydown", (e) => {
  const links = navElement.querySelectorAll("a");
  const curIndex = Array.from(links).indexOf(document.activeElement);

  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = e.key === "ArrowDown" ? 1 : -1;
    const nextElement = (curIndex + nextIndex + links.length) % links.length;
    links[nextElement].focus();
  }
});

//close navElement when document is clicked
document.addEventListener("click", (e) => {
  const target = e.target;
  !navElement.contains(target) && navElement.classList.remove("open");
});

//Toggle alert notification
bellIcon.addEventListener("click", () => {
  alertBox.classList.toggle("open");
  navElement.classList.remove("open");

  const expanded = alertBox.getAttribute("aria-expanded") === "true" || false;
  alertBox.setAttribute("aria-expanded", !expanded);
});

//exit free trial notification
closeTrial.addEventListener("click", () => {
  trialExtension.style.display = "none";
});

//Toggle main element
const arrowUpUrl = "https://crushingit.tech/hackathon-assets/icon-arrow-up.svg";
const arrowDownUrl =
  "https://crushingit.tech/hackathon-assets/icon-arrow-down.svg";

openMenu.addEventListener("click", () => {
  if (!storeSetup.style.height || storeSetup.style.height === "26.4rem") {
    angleToggleIcon.src = arrowUpUrl;
    storeSetup.style.height = "6.2rem";
  } else {
    angleToggleIcon.src = arrowDownUrl;
    storeSetup.style.height = "26.4rem";
  }
});

//Accordion features for each menu

function toggleAccordion(header) {
  const parentLi = header.closest("li");
  const menu = parentLi.querySelector(".cl-menu");
  const contentImage = parentLi.querySelector(".content-image");

  parentLi.parentElement
    .querySelectorAll(".cl-menu.show-menu, .cl, .content-image.show-menu")
    .forEach(function (element) {
      element.classList.remove("show-menu", "cl");
    });

  menu.classList.toggle("show-menu");
  parentLi.classList.toggle("cl");
  contentImage.classList.toggle("show-menu");
}

headers.forEach((header) => {
  header.addEventListener("click", function () {
    toggleAccordion(this);
  });
});

//update progress bar width and increment
updateStoreButtons.forEach((button) => {
  let progressWidth = 0;
  button.addEventListener("click", () => {
    if (button.getAttribute("data-clicked") !== "true") {
      let currentValue = parseInt(incrementSpan.textContent);
      currentValue++;
      incrementSpan.textContent = currentValue;

      progressWidth = 0.9 * currentValue;
      progressElement.style.width = `${progressWidth}rem`;

      button.setAttribute("data-clicked", "true");
    }
    button.classList.add("btn-checked");
  });
});
