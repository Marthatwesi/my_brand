const loader = document.querySelector(".loader")
const form = document.querySelector("form");
nField = form.querySelector(".name"),
nInput = nField.querySelector("input"),
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"),
pInput = pField.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing form submitting
  //if email and password is blank then add shake class in it else call specified function
  (nInput.value == "") ? nField.classList.add("shake", "error") : checkName();
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();

  setTimeout(()=>{ //remove shake class after 500ms
    nField.classList.remove("shake");
    eField.classList.remove("shake");
    pField.classList.remove("shake");
  }, 500);

  nInput.onkeyup = ()=>{checkName();}//calling checkName function on name input keyup
  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup

  //if eField and pField doesn't contains error class that mean user filled details properly
  if(!nField.classList.contains("error") && !eField.classList.contains("error") && !pField.classList.contains("error")){
    loader.showModal()
    const credentials = {
      name:nInput.value,
      email:eInput.value,
      password:pInput.value
      
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    };
    fetch("https://backend-nymm.onrender.com/user/signup", options).then((res)=> {
      loader.close()
    if(res.status == 200){
  
  
      window.location.href = form.getAttribute("action");    //redirecting user to the specified url which is inside action attribute of form tag
    }else if(res.status == 409){
      alert("Account already exists, Try again")
    }
    })
  }

}

function checkName(){ //checkName function
  if(nInput.value == ""){ //if name is empty then add error and remove valid class
    nField.classList.add("error");
    nField.classList.remove("valid");
  }else if(nInput.value < 6 ){
    nField.classList.add("error");
    nField.classList.remove("valid");
  }else{ //if pass is empty then remove error and add valid class
    nField.classList.remove("error");
    nField.classList.add("valid");
  }
}

function checkEmail(){ //checkEmail function
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //pattern for validate email
  if(!eInput.value.match(pattern)){ //if pattern not matched then add error and remove valid class
    eField.classList.add("error");
    eField.classList.remove("valid");
    let errorTxt = eField.querySelector(".error-txt");
    //if email value is not empty then show please enter valid email else show Email can't be blank
    (eInput.value != "") ? errorTxt.innerText = "Enter a correct email" : errorTxt.innerText = "Enter a correct password";
  }else{ //if pattern matched then remove error and add valid class
    eField.classList.remove("error");
    eField.classList.add("valid");
  }
}

function checkPass(){ //checkPass function
  if(pInput.value == ""){ //if pass is empty then add error and remove valid class
    pField.classList.add("error");
    pField.classList.remove("valid");
  }else if(pInput.value < 6 ){
    pField.classList.add("error");
    pField.classList.remove("valid");
  }else{ //if pass is empty then remove error and add valid class
    pField.classList.remove("error");
    pField.classList.add("valid");
  }
}

