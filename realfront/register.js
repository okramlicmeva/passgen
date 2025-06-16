document.querySelector(".registerForm").addEventListener("submit", async (e)=>{
e.preventDefault();

const user= {
  name:document.querySelector("#name").value,
  email:document.querySelector("#emailReg").value,
  password:document.querySelector("#password").value, 
  country:document.querySelector("#country").value
}


const res = await fetch("http://localhost:3000/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify(user)
})

//original
// if(res.ok){
//   alert("uspesna registracija");
// } else {
//   alert("registration failed");
// }

if(res.ok){
  alert("uspesna registracija");
} else {
  alreadyRegisterd();
}



})

function alreadyRegisterd(a){

const accessBox = document.querySelector('body');
const floatingNotification = document.createElement("div");
floatingNotification.className = "topNotification";
floatingNotification.innerHTML = "<p>" + "user already exists" + "</p>";
accessBox.appendChild(floatingNotification);

setTimeout(() => {
  floatingNotification.remove()
}, 3000);

}

//ok radi, registration page radi, dodao ga je kao poslednji record sa hashovanom sifrom 
// odradi jos login, logout 
// prosli failed project -> hdd2 -> tamo mi je bukvalno gotov dashboard, menu za generisanje sifre sa generate new sifrom i cookies za cuvanje kao u cart-u. 



///looooogin strana na jednom mestu










  document.querySelector(".loginForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    const email = document.querySelector("#email").value;
  const password = document.querySelector("#logpassword").value;
  const name = document.querySelector("#name").value;
    
    
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email, password, name})
    })
    
    const data = await res.json();
   
    
    if(res.ok){
      localStorage.setItem("token", data.token);
      console.log("uspesan login");
      alert("uspesan login");
      window.location.href="index.html";
    } else {
      
      console.log("Login faiiled:", data.message);
      alert("failed brother" + data.message);
    }
    
    
    
    })