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
window.addEventListener("load", () =>{
  // preload
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() =>{
      document.querySelector(".preloader").style.display = "none";
  }, 600)
})


//styling for the create blog page
/* check how many characters counter */
/* check how many characters counter */
let textArea = document.getElementById("textbox");

let characterCounter = document.getElementById("charCount");

const maxNumOfChars = 500;

const countCharacters = () => { 
    let numOfEnteredChars = textArea.value.length;
  counter = numOfEnteredChars;
    characterCounter.textContent = numOfEnteredChars + "/500";
  
    if (counter>400) { 
      characterCounter.style.color="red";
    } 
}

textArea.addEventListener("input", countCharacters);


/* fix textarea re-size */
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height =                        (element.scrollHeight)+"px";
}