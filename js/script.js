
// Nav hamburgerburger selections

const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");

burger.addEventListener("click", () => {
    ul.classList.toggle("show");
  });

  // Close hamburger menu when a link is clicked

// Select nav links
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);
// navbar variables

// const navMenuBtn = document.querySelector('.nav-menu-btn');
// const navCloseBtn = document.querySelector('.nav-close-btn');


// navToggle function
// const navToggleFunc = function () { nav.classList.toggle('active'); }

// navMenuBtn.addEventListener('click', navToggleFunc);
// navCloseBtn.addEventListener('click', navToggleFunc);



// theme toggle variables
// const themeBtn = document.querySelectorAll('.theme-btn');


// for (let i = 0; i < themeBtn.length; i++) {

//   themeBtn[i].addEventListener('click', function () {

//     // toggle `light-theme` & `dark-theme` class from `body`
//     // when clicked `theme-btn`
//     document.body.classList.toggle('light-theme');
//     document.body.classList.toggle('dark-theme');

//     for (let i = 0; i < themeBtn.length; i++) {

//       // When the `theme-btn` is clicked,
//       // it toggles classes between `light` & `dark` for all `theme-btn`.
//       themeBtn[i].classList.toggle('light');
//       themeBtn[i].classList.toggle('dark');

//     }

//   })

// }


