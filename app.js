const userButton = document.querySelector("#toggle-menu");
const navElement = document.querySelector("#navigation-menu");
const bellIcon = document.querySelector("#toggle-notf");
const alertBox = document.querySelector("#notif-menu");
const trialExtension = document.querySelector(".trial-extension");
const closeTrial = document.querySelector(".close-trial");
const openMenu = document.querySelector("#open-menu");
// const setupGuide = document.querySelector("#setup-guide");
const angleToggleIcon = document.querySelector(".angle-toggle_icon");
const storeSetup = document.querySelector(".store-setup");
const headers = document.querySelectorAll(".header");
const incrementSpan = document.querySelector(".increment");
const updateStoreButtons = document.querySelectorAll(".update-store");
const progressElement = document.querySelector(".progress > div");

//Toggle navElement
const toggleNav = () => {
  navElement.classList.toggle("open");
  storeSetup.style.height = "6.2rem";
  alertBox.classList.remove("show");
  alertBox.setAttribute("aria-expanded", false);

  const expanded = userButton.getAttribute("aria-expanded") === "true" || false;
  userButton.setAttribute("aria-expanded", !expanded);

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
  userButton.setAttribute("aria-expanded", false);
});

//Toggle alert notification
bellIcon.addEventListener("click", () => {
  alertBox.classList.toggle("show");

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

  const expanded = openMenu.getAttribute("aria-expanded") === "true" || false;
  openMenu.setAttribute("aria-expanded", !expanded);
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

const updateStoreStatus = document.querySelector("#update-store-status");
const handleButton = (button) => {
  const updateStoreBtns = button
    .closest(".content-body")
    .querySelector(".update-store-btn");
  const spinner = button.closest(".content-body").querySelector(".spinner");
  const checked = button.closest(".content-body").querySelector(".checked");

  updateStoreBtns.classList.add("hidden");
  spinner.classList.remove("hidden");
  checked.classList.add("hidden");

  updateStoreBtns.ariaLabel = "loading";

  setTimeout(() => {
    spinner.classList.add("hidden");
    checked.classList.remove("hidden");

    button.ariaLabel = button.ariaLabel.replace("as not done", "as done");
  }, 800);

  updateStoreBtns.ariaLabel = "success";
};

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

      handleButton(button);
      button.setAttribute("data-clicked", "true");
    }
  });
});
