//LOCAL STORAGE FUNCTIONS
const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const getLocalStorage = (key) => {
  let storage =
    localStorage.getItem(key) === null
      ? []
      : JSON.parse(localStorage.getItem(key));
  return storage;
};

//MMAIN
let lightMode = true;
let setTheme = getLocalStorage("theme");
let setLightDark = getLocalStorage("lightMode");
let body = document.querySelector("body");
body.className = `${setTheme} ${setLightDark}`;

//LIGHT DARK THEMES
const lightDark = document.querySelector(".lightDark");
const light = document.querySelector(".lightDark .fa-sun");
const dark = document.querySelector(".lightDark .fa-moon");
setLocalStorage("display", "");
setLocalStorage("dontDisplay", "no-display");

const display = getLocalStorage("display");
const dontDisplay = getLocalStorage("dontDisplay");

window.addEventListener("DOMContentLoaded", () => {
  if (setLightDark === "dark") {
    light.id = display;
    dark.id = dontDisplay;
  } else {
    light.id = dontDisplay;
    dark.id = display;
  }
});

lightDark.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-solid")) {
    lightMode = !lightMode;
    if (lightMode) {
      setLocalStorage("lightMode", "light");
      setLightDark = getLocalStorage("lightMode");
      body.className = `${setTheme} ${setLightDark}`;
      light.id = dontDisplay;
      dark.id = display;
    } else {
      setLocalStorage("lightMode", "dark");
      setLightDark = getLocalStorage("lightMode");
      body.className = `${setTheme} ${setLightDark}`;
      light.id = display;
      dark.id = dontDisplay;
    }
  }
});

//COLOR THEMES
const navTheme = document.querySelector("#themes");
const themeContainer = document.querySelector(".nav-themes");
const themes = document.querySelectorAll(".theme");

const themeClasses = [
  {
    theme: themes[0],
    class: "violet-theme",
  },
  {
    theme: themes[1],
    class: "peach-theme",
  },
  {
    theme: themes[2],
    class: "",
  },
];

const showThemes = () => {
  arrowIcon.className =
    arrowIcon.className === "fa-solid fa-arrow-down"
      ? "fa-solid fa-arrow-up"
      : "fa-solid fa-arrow-down";
  if (arrowIcon.className === "fa-solid fa-arrow-up") {
    themeContainer.style.display = "block";
  } else {
    themeContainer.style.display = "none";
  }
};

const changeTheme = (theme) => {
  themeContainer.style.display = "none";
  arrowIcon.className = "fa-solid fa-arrow-down";
  let currentTheme = themeClasses.find(
    (themeClass) => themeClass.theme === theme
  );
  setLocalStorage("theme", currentTheme.class);
  setTheme = getLocalStorage("theme");
  body.className = `${setTheme} ${setLightDark}`;
};

themes.forEach((theme) => {
  theme.addEventListener("click", () => changeTheme(theme));
});
navTheme.addEventListener("click", showThemes);
