const loader = document.querySelector(".loader")




const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input");


const incorrect = document.querySelector(".incorrect")
incorrect.style.visibility = "hidden"
const errorTxt = document.querySelector("#showE");
const errorTxt2 = document.querySelector("#showP");

const validCreds = ()=>{
  errorTxt.style.visibility = "hidden"
  errorTxt2.style.visibility = "hidden"
}


form.onsubmit = (e)=>{
  e.preventDefault(); //preventing form submitting
  //if email and password is blank then add shake class in it else call specified function
  const checkEmail = (eInput.value == "") ? eField.classList.add("shake", "error") : true;
  const checkPass = (pInput.value == "") ? pField.classList.add("shake", "error") : true;

  setTimeout(()=>{ //remove shake class after 500ms
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  if(checkEmail == true && checkPass == true){
    loader.showModal()
    const credentials = {
      email:eInput.value,
      password:pInput.value
    }
    validCreds();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    };
    fetch("https://backend-nymm.onrender.com/user/login", options).then((res)=> {
      loader.close()
    if(res.status == 200){
      incorrect.style.visibility = "hidden"
      validCreds();
      window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
    }else if(res.status == 400){
      incorrect.style.visibility = "visible"
      pField.classList.remove("valid");
      pField.classList.add("error");
      // alert("Wrong credentials, Try again")
    }
    return res.json()
    }).then((data) => {
      localStorage.setItem("token",data.UserToken)
    }
    )
  }

  // eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  // pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup

  // function checkEmail(){ //checkEmail function
  //   // let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
  //   // if(!eInput.value.match(pattern)){ //if pattern not matched then add error and remove valid class
  //   //   eField.classList.add("error");
  //   //   eField.classList.remove("valid");
  //  let errorTxt = eField.querySelector(".error-txt");
  //   //   //if email value is not empty then show please enter valid email else show Email can't be blank
  //  (eInput.value != "") ? errorTxt.innerText = "Enter a your email" : errorTxt.innerText = "Enter a your password";
  //   // }
  //   // else{ //if pattern matched then remove error and add valid class
  //   //   eField.classList.remove("error");
  //   //   eField.classList.add("valid");
  //   // }
  
  //  if(eInput.value == null){
  //    eField.classList.add("error");
  //    eField.classList.remove("valid");
  //    errorTxt.innerText = "Please enter your Email"
  //  }else{
  //   eField.classList.remove("error");
  //   eField.classList.add("valid");
  //  }
  // }
  

  // function checkPass(){ //checkPass function
  //   // if(pInput.value == ""){ //if pass is empty then add error and remove valid class
  //   //   pField.classList.add("error");
  //   //   pField.classList.remove("valid");
  //   // }
  //   // else{ //if pass is empty then remove error and add valid class
  //   //   pField.classList.remove("error");
  //   //   pField.classList.add("valid");
  //   // }
  // }

  //if eField and pField doesn't contains error class that mean user filled details properly
  // if(!eField.classList.contains("error") && !pField.classList.contains("error")){
    
    
  // }
}

