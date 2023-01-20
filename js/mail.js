const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    },

  };

  fetch("https://backend-nymm.onrender.com/messages", options).then((res)=> {
return res.json()
  }).then(data=>{
    console.log(data)
    const messages = document.querySelector(".messages")
    console.log(messages)
    function readMessage(i){ 
const div = document.createElement("div")
div.className = "message"
div.innerHTML = `
<input type="checkbox" />
<span class="sender">${data.message[i].name}</span>
<span class="date">${data.message[i].created_on}</span>
<span class="title">${data.message[i].message}</span>`
     
  return div
    }
    
    console.log(readMessage(0))

for(let i=0; i<data.message.length; i++){
 const message = readMessage(i)
messages.append(message) 
console.log("looped")
}
  })