

const newCom = document.querySelector(".newComment")
const commentInput = document.querySelector("#comment-message")
const commentError = document.querySelector(".com-error")
let regLetters = /[A-Za-z]/g;

commentInput.addEventListener("input", ()=>{
checkComment(commentInput.value)
})
newCom.addEventListener("submit", (e)=>{
 e.preventDefault()
 if(!localStorage.getItem("token")){
alert("please log in")
 }else{
  checkComment(commentInput.value)
 if(checkComment(commentInput.value)){
  let id = location.href.split("=")[1]
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({comment:commentInput.value})
  };
  fetch("https://backend-nymm.onrender.com/articles/"+id+"/comment", options).then((res) => {
if(res.status == 200){
  location.reload()
}
  })
 }
 }
 
})
const checkComment = (comment) => {
  if (comment == "" || comment == null) {
    commentError.style.visibility = "visible";
    commentError.style.color = "red";
    commentError.innerText = "Please fill in the comment";
  } else if (comment.match(regLetters) == null) {
    commentError.style.visibility = "visible";
    commentError.style.color = "red";
    commentError.innerText = "Your comment is not valid";
  } else if (comment.match(regLetters).length < comment.length - comment.length / 3) {
    commentError.style.visibility = "visible";
    commentError.style.color = "red";
    commentError.innerText = "Your comment should consist of more alphabetical characters";
  } else if (comment.length < 5) {
    commentError.style.visibility = "visible";
    commentError.style.color = "red";
    commentError.innerText = "Your comment is too short";
  } else if (comment.length >= 5) {
    commentError.style.color = "green";
    commentError.innerText = "Valid"
    commentError.style.visibility = "visible";
    return true;
  } else {
    commentError.style.visibility = "hidden";
    return true;
  }

}

















const blogTitle = document.querySelector(".post__header")
const blogContent = document.querySelector(".post__text")
const blogImage = document.querySelector(".blog-banner-img")
const blogTime = document.querySelector(".post__time")
const id = location.href.split("=")[1]
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};
fetch("https://backend-nymm.onrender.com/articles/" + id, options).then((res) => res.json()).then((data) => {
  const dateNow = fetchDate(data.created_on)
  blogTitle.innerText = data.title
  blogContent.innerHTML = data.content
  blogImage.src = data.image
  blogTime.innerText = dateNow
})


const token = localStorage.getItem("token")
const data1 = parseJwt(token)
const commentsHolder = document.querySelector(".comment-section")
const author = document.querySelector(".post__category")
const n = document.querySelector(".userName")
console.log(data1)
fetch("https://backend-nymm.onrender.com/articles/" + id + "/comment", options).then((res) => res.json()).then((data) => {
  console.log(data)
  for (let i = 0; i <= data.length; i++) {
    if ("Martha Twesigye" == author.innerText) {
      const comment = document.createElement("li")
      comment.className = "comment author-comment"
      comment.innerHTML = `<div class="info">
        <a class ="userName" href="#">${data[i].name}</a>
      
      </div>
      <a class="avatar" href="#">
        <img src="./img/avatar.jpg" width="35" alt="Profile Avatar" title="Anie Silverston" />
      </a>
      
      <p>${data[i].comment}</p>`
      commentsHolder.append(comment)
    } else {
      const comment = document.createElement("li")
      comment.className = "comment user-comment"
      comment.innerHTML = `<div class="info">
      <a class ="userName" href="#">${data[i].name}</a>
     
    </div>
    <a class="avatar" href="#">
      <img src="./img/avatar.jpg" width="35" alt="Profile Avatar" title="Anie Silverston" />
    </a>
    
    <p>${data[i].comment}</p>`
      commentsHolder.append(comment)
    }

  }
})

const c = document.querySelector(".comment")
if (n.innerText == author.innerText) {
  c.className = "comment author-comment"
} else {
  c.className = "comment user-comment"
}

function setAuthor(name) {
  let n = name.split(" ")
  let finalName = n[0] + "." + n[1].substring(0, 1)
  return finalName;

}
console.log(setAuthor("Martha.T"))


function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
    .atob(base64)
    .split("")
    .map(function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    })
    .join("")
  );

  return JSON.parse(jsonPayload);
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