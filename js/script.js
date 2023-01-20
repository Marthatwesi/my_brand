//Nav hamburgerburger selections

const burger = document.querySelector("#burger-menu");
const ul = document.querySelector("nav ul");
const nav = document.querySelector("nav");
const loader = document.querySelector(".loader")
const okBtn = document.querySelector(".okBtn")

okBtn.addEventListener("click", ()=>{
  location.reload()
})
burger.addEventListener("click", () => {
    ul.classList.toggle("show");
  });

  const msgSent = document.querySelector(".msgSent")
  // Close hamburger menu when a link is clicked

// Select nav links
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((link) =>
  link.addEventListener("click", () => {
    ul.classList.remove("show");
  })
);

const sendMessage = document.getElementById("form")


const admin = document.querySelector(".adminLink")
console.log(admin)
admin.addEventListener("click", (e) => {
  e.preventDefault()
  fetch("https://backend-nymm.onrender.com/messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
  }).then(res =>{
    if(res.status == 200){
      window.open("./dashboard.html")
    }else{
      window.open("./index.html")
    }
  })

})



//js for the article section 
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
fetch("https://backend-nymm.onrender.com/articles", options).then((res)=> res.json()).then((articles)=> {
  for(let i=0; i<=articles.length; i++){
const dateNow = fetchDate(articles[i].created_on)
const articleHolder = document.querySelector(".blog-card-group")
const articlediv = document.createElement("div");
const card = document.createElement("div")  ;
card.className = "blog-card";
const id = document.createElement("span")
id.style.display = "none"
id.innerText = articles[i]._id
card.appendChild(id)
const cardBanner = document.createElement("div");
cardBanner.className = "blog-card-banner";
const img = document.createElement("img");
cardBanner.appendChild(img);
img.className = "blog-banner-img";
const contentWrapper = document.createElement("div");
contentWrapper.className = "blog-content-wrapper";
const wrapperflex = document.createElement("div");
const profilewrapper = document.createElement("div");
const wrapper = document.createElement("div");
const imgsrc = document.createElement("img");
imgsrc.src = "img/PHOTO-2021-07-22-23-30-20.jpg"
imgsrc.style.width = "50px";
profilewrapper.appendChild(imgsrc);
const btopic = document.createElement("button");
btopic.innerText = "Tech Insights"
contentWrapper.appendChild(btopic);
btopic.className = "blog-topic text-tiny";
const h3 = document.createElement("h3");
const a = document.createElement("a");
a.href = "./blog1.html?id=" + articles[i]._id;
a.className = "h3";
a.innerText = articles[i].title;
h3.appendChild(a);
const p = document.createElement("p");
p.innerHTML = articles[i].content;
wrapperflex.appendChild(profilewrapper);
img.src = articles[i].image;
img.style.width = "250"
p.className = "blog-text";
wrapperflex.className = "wrapper-flex";
profilewrapper.className = "profile-wrapper";
wrapper.className = "wrapper";
const a1 = document.createElement("a");
a1.className = "h4";
a1.innerText = "M. Twesigye";
wrapper.appendChild(a1);
const p1 = document.createElement("p");
p1.className = "text-sm";
// p1.innerText = dateNow;
const ion = document.createElement("ion-icon");
ion.name = "heart-outline";
const small = document.createElement("small");
small.className = "like";
small.innerText = articles[i].likes.numberLikes
const span = document.createElement("span");
span.className = "separator";
const time =document.createElement("time")
// time.datetime="2022-01-17"
time.innerText = dateNow
p1.appendChild(time)
p1.appendChild(span);
p1.appendChild(ion);
p1.appendChild(small);
wrapper.appendChild(p1)
wrapperflex.appendChild(wrapper);
contentWrapper.appendChild(h3)
contentWrapper.appendChild(p)
contentWrapper.appendChild(wrapperflex)
card.appendChild(cardBanner)
card.appendChild(contentWrapper)
articlediv.appendChild(card)
articleHolder.appendChild(articlediv)


ion.addEventListener("click",()=>{
  // console.log(id.innerText)
  const blogId = id.innerText
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
  };
  fetch("https://backend-nymm.onrender.com/articles/"+blogId+"/likes", options).then((res)=> res.json()).then((articles)=> { 
    small.innerText = articles.liked.likes.numberLikes

  })
})

    // const oneArticle = document.createElement("div")
    // oneArticle.className = "blog-card"
    // oneArticle.innerHTML= `
    // <div class="blog-card-banner">
    //   <img src=${articles[i].image} alt="robot"
    //     width="250" class="blog-banner-img">
    // </div>
    // <div class="blog-content-wrapper">
    //   <button class="blog-topic text-tiny">Tech Insights</button>
    //   <h3>
    //     <a href="./blog1.html?id=${articles[i]._id}" class="h3">
    //      ${articles[i].title}
    //     </a>
    //   </h3>
    //   <p class="blog-text">
    //   ${articles[i].content}
    //   </p>
    //   <div class="wrapper-flex">
    //     <div class="profile-wrapper">
    //       <img src="./img/PHOTO-2021-07-22-23-30-20.jpg" alt="MT" width="50">
    //     </div>
    //     <div class="wrapper">
    //       <a href="#" class="h4">M.Twesigye</a>
    //       <p class="text-sm">
    //        ${dateNow}
    //         <span class="separator"></span>
    //         <ion-icon name="heart-outline"></ion-icon>
    //         <small class="like">${articles[i].likes.numberLikes}</small>
    //       </p>
    //     </div>
    //   </div>
    // </div>`
    // articleHolder.appendChild(oneArticle)
  }
})


//Contact Form validation
function validateName() {

  var name = document.getElementById('contact-name').value;

  if(name.length < 1) {

    producePrompt('Name is required', 'name-error' , 'red')
    return false;

}

if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {

    producePrompt('First and last name, please.','name-error', 'red');
    return false;

}

producePrompt('Valid', 'name-error', 'green');
return true;

}

function validateEmail() {

var email = document.getElementById('contact-email').value;

if(email.length == 0) {

producePrompt('Email Invalid','email-error', 'red');
return false;

}

if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {

producePrompt('Email Invalid', 'email-error', 'red');
return false;

}

producePrompt('Valid', 'email-error', 'green');
return true;

}

function validateMessage() {
var message = document.getElementById('contact-message').value;
var required = 20;
var left = required - message.length;

if (left > 0) {
producePrompt(left + ' or more characters required','message-error','red');
return false;
}

producePrompt('Valid', 'message-error', 'green');
return true;

}

sendMessage.addEventListener("submit",(e)=>{
  e.preventDefault()
  function validateForm() {
  if (!validateName() ||!validateEmail() || !validateMessage()) {

  jsShow('submit-error');
  producePrompt('Please fix errors to submit.', 'submit-error', 'red');
  setTimeout(function(){jsHide('submit-error');}, 2000);
  return false;
  }
  else {
    loader.showModal()
    const cName = document.querySelector('#contact-name')
    const cEmail = document.querySelector('#contact-email')
    const cMessage = document.querySelector('#contact-message')
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:cName.value,
        email:cEmail.value,
        message:cMessage.value
      })
    };
  
    fetch("https://backend-nymm.onrender.com/messages", options).then((res)=> {
      loader.close()
    if(res.status == 200){
      msgSent.showModal()
    }
    })
  }
  }
  validateForm()
})

function jsShow(id) {
document.getElementById(id).style.display = 'block';
}

function jsHide(id) {
document.getElementById(id).style.display = 'none';
}

function producePrompt(message, promptLocation, color) {

document.getElementById(promptLocation).innerHTML = message;
document.getElementById(promptLocation).style.color = color;

}


function fetchDate(d) {
  let date = new Date(d);
  let day = "";
  let value = date.getMonth() + 1;
  if (date.getDate() < 10) {
    day = "0" + date.getDate();
  } else {
    day = date.getDate();
  }
  switch (value) {
    case 1:
      m = "Jan";
      break;
    case 2:
      m = "Feb";
      break;
    case 3:
      m = "March";
      break;
    case 4:
      m = "April";
      break;
    case 5:
      m = "May";
      break;
    case 6:
      m = "June";
      break;
    case 7:
      m = "July";
      break;
    case 8:
      m = "Aug";
      break;
    case 9:
      m = "Sept";
      break;
    case 10:
      m = "Oct";
      break;
    case 11:
      m = "Nov";
      break;
    case 12:
      m = "Dec";
      break;
    default:
      m = "Null";
      break;
  }
  return m + "  " + day + " ," + date.getFullYear();
}

// form.addEventListener("submit",validateForm)
