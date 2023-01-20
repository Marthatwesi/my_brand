CKEDITOR.replace('editor1');
CKEDITOR.replace('editor2');
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

const okBtn = document.querySelector(".ok")
okBtn.addEventListener("click", ()=>{
  location.reload()
})

const okBtn1 = document.querySelector(".ok1")
okBtn1.addEventListener("click", ()=>{
  location.reload()
})
// //styling for the create blog page
// /* check how many characters counter */
// /* check how many characters counter */
const newBlog = document.querySelector(".create")
const popUp = document.querySelector(".pop-up")
const editTitle = document.querySelector("#editT")
const editImage = document.querySelector("#editI")
const imgTag = document.querySelector(".imgTag")
const selector = document.querySelector(".imagePop")
const selectorEdit = document.querySelector("#imagePop")
const editDialog = document.querySelector("#blogSection")
const imageFile = document.querySelector("#iArticle")
const loader = document.querySelector(".loader")
const alertMess = document.querySelector(".alert")

imageFile.addEventListener("change", (event) => {
  console.log(imageFile);
  if (event.target.files.length > 0) {
    let src = URL.createObjectURL(event.target.files[0]);
    editImage.src = src;
    editImage.style.display = "block";
  }
});



newBlog.addEventListener("click", () => {
  popUp.showModal()
})

fetch("https://backend-nymm.onrender.com/articles").then((res) => {
  return res.json()
}).then(data => {
  let n = 1
  const body = document.querySelector("tbody")
  for (let i = 0; i < data.length; i++) {
    const dateObj = new Date(data[i].created_on);
    const hour = dateObj.getUTCHours();
    const minute = dateObj.getUTCMinutes();
    let timeFormat;

    if (minute < 10) {
      timeFormat = "0" + minute
    } else {
      timeFormat = minute
    }
    const postTime = hour + ":" + timeFormat

    const dateNow = fetchDate(data[i].created_on)

    // row.innerHTML = `<span class="none">${data[i]._id}</span>
    // <td>${n}</td>
    // <td>${data[i].title}</td>
    // <td>${dateNow}</td>
    // <td>${postTime}</td>
    // <td><button>Edit</button></td>
    // <td><button class="deleteBtn">Delete</button></td>
    // <td><button>View</button></td>`

    const row = document.createElement("tr");
    const spanid = document.createElement("span");
    spanid.className = "none"
    const td = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    btn3.innerText = "View";
    btn3.addEventListener("click", () => {
      window.location.href = "./blog1.html?id=" + spanid.innerText
    })
    btn2.innerText = "Delete";
    btn2.className = "deleteBtn";
    btn1.innerText = "Edit";
    td4.appendChild(btn1);
    td5.appendChild(btn2);
    td6.appendChild(btn3);
    spanid.innerText = data[i]._id;
    td.innerText = n;
    td1.innerText = data[i].title;
    td2.innerText = dateNow;
    td3.innerText = postTime;
    row.appendChild(spanid);
    row.appendChild(td);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
    row.appendChild(td6);
    body.appendChild(row);
    body.append(row)
    n++

//loading the content in the edit dialog
    btn1.addEventListener("click", () => {
      let updateArticle = document.querySelector(".pop-up2")
      sessionStorage.setItem("id", spanid.innerText)
      updateArticle.showModal()
      fetch("https://backend-nymm.onrender.com/articles/" + spanid.innerText).then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data)
        CKEDITOR.instances.editor2.setData(data.content, () => {
          this.updateElement();
        });
        editTitle.value = data.title
        editImage.setAttribute("src", data.image)
        editImage.style.display = "block";
        selectorEdit.style.display = "block";
      })

    })

    // let deleteBtn = document.querySelector(".deleteBtn") 
    let index = btn2.parentElement.parentElement.firstElementChild
    btn2.addEventListener("click", () => {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
      };
      fetch("https://backend-nymm.onrender.com/articles/" + index.innerText, options).then((res) => {
        if (res.status == 200) {
          location.reload()
        }
      })
    })
  }
})
  
const updateDialog = document.querySelector(".alert1")


let editForm = new FormData()
editDialog.addEventListener("submit", (e) => {
e.preventDefault()
loader.showModal()
editForm.append("title", editTitle.value)
editForm.append("content",CKEDITOR.instances.editor2.getData())
editForm.append("image", imageFile.files[0])
// alert(editTitle.value)
// alert(CKEDITOR.instances.editor2.getData())
// alert(imageFile.files[0])

const options = {
  method: "PATCH",
  headers: {
    // "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  },
  body: editForm
};
fetch("https://backend-nymm.onrender.com/articles/"+sessionStorage.getItem("id"), options).then((res) => {
  loader.close()
if(res.status == 200){
updateDialog.showModal()
return res.json()

}
}).then((data)=>{
   alert(data.keys())
})
})


const articleDialog = document.querySelector("#mailSection")
const articleTitle = document.querySelector(".tArticle")
const articleImage = document.querySelector(".iArticle")
const articleContent = CKEDITOR.instances.editor1
const errorTitle = document.querySelector(".error-title")
const errorImage = document.querySelector(".error-image")
const errorContent = document.querySelector(".error-content")


// const fr = new FileReader();
//     fr.readAsDataURL(pimg.files[0]);
//     fr.addEventListener("load", () => {
//       const url = fr.result;
//     })


articleImage.addEventListener("change", (event) => {
  if (event.target.files.length > 0) {
    let imgsource = URL.createObjectURL(event.target.files[0]);
    imgTag.src = imgsource;
    imgTag.style.display = "block";
    selector.style.display = "block";
  }
})

const formData = new FormData();
let regLetters = /[A-Za-z]/g;
articleDialog.addEventListener("submit", (e) => {
  e.preventDefault()
  checkTitle(articleTitle.value)
  checkImage(articleImage.value)
  checkContent(articleContent.getData())
  if (checkTitle(articleTitle.value) && checkImage(articleImage.value)) {
    loader.showModal()
    console.log(articleImage.files[0])
    formData.append("title", articleTitle.value);
    formData.append("content", articleContent.getData());
    formData.append("image", articleImage.files[0]);
    const options = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: formData
    };
    fetch("https://backend-nymm.onrender.com/articles", options).then((res) => {
      loader.close()
      if (res.status == 200) {
        alertMess.showModal()
        // location.reload()
      }
    })

  }
})
articleTitle.addEventListener("input", () => {
  checkTitle(articleTitle.value)
})
const checkTitle = (title) => {
  if (title == "" || title == null) {
    errorTitle.innerText = "Invalid"
    errorTitle.style.visibility = "visible";
    errorTitle.style.color = "red";
  } else if (title.length < 3) {
    errorTitle.innerText = "Invalid"
    errorTitle.style.visibility = "visible";
    errorTitle.style.color = "red";
  } else if (title.length > 50) {
    errorTitle.innerText = "Invalid"
    errorTitle.style.visibility = "visible";
    errorTitle.style.color = "red";
  } else if (title.match(regLetters) == null) {
    errorTitle.innerText = "invalid"
    errorTitle.style.visibility = "visible";
    errorTitle.style.color = "red";
  } else if (title.match(regLetters).length < title.length - title.length / 3) {
    errorTitle.innerText = "Not valid"
    errorTitle.style.color = "red";
    errorTitle.style.visibility = "visible";
  } else {
    errorTitle.innerText = "Valid"
    errorTitle.style.color = "green";
    errorTitle.style.visibility = "visible";
    return true;
  }
};

const checkImage = (img) => {
  let start = img.indexOf(".");
  let imgExtension = img.substring(start + 1, img.length);
  if (img == "" || img == null) {
    errorImage.style.color = "red";
    errorImage.style.visibility = "visible";
    errorImage.innerText = "Please provide an image";
  } else if (checkImgExtension(imgExtension) == false) {
    errorImage.style.visibility = "visible";
    errorImage.style.color = "red";
    errorImage.innerText = "That was not an image";
  } else {
    errorImage.style.visibility = "hidden";
    return true;
  }
};

const checkImgExtension = (ext) => {
  if (
    ext === "jpg" ||
    ext === "png" ||
    ext === "webp" ||
    ext === "tiff" ||
    ext === "jpeg"
  ) {
    return true;
  } else {
    return false;
  }
};

const checkContent = (content) => {
  if (content == "" || content == null) {
    errorContent.style.visibility = "visible";
    errorContent.style.color = "red";
    errorContent.innerText = "Please fill in the content";
  } else if (content.match(regLetters) == null) {
    errorContent.style.visibility = "visible";
    errorContent.style.color = "red";
    errorContent.innerText = "Your content is not valid";
  } else if (content.match(regLetters).length < content.length - content.length / 3) {
    errorContent.style.visibility = "visible";
    errorContent.style.color = "red";
    errorContent.innerText = "Your title should consist of more alphabetical characters";
  } else if (content.length < 100) {
    errorContent.style.visibility = "visible";
    errorContent.style.color = "red";
    errorContent.innerText = "Your content doesn't reach 100 characters";
  } else if (content.length >= 100) {
    errorContent.style.visibility = "hidden";
    return true;
  } else {
    errorContent.style.visibility = "hidden";
    return true;
  }

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
      m = "01";
      break;
    case 2:
      m = "02";
      break;
    case 3:
      m = "03";
      break;
    case 4:
      m = "04";
      break;
    case 5:
      m = "05";
      break;
    case 6:
      m = "06";
      break;
    case 7:
      m = "07";
      break;
    case 8:
      m = "08";
      break;
    case 9:
      m = "09";
      break;
    case 10:
      m = "10";
      break;
    case 11:
      m = "11";
      break;
    case 12:
      m = "12";
      break;
    default:
      m = "Null";
      break;
  }
  return day + "-" + m + "-" + date.getFullYear();
}