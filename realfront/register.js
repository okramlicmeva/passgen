document.querySelector("#registrationForm").addEventListener("submit", async (e)=>{
e.preventDefault();

const user= {
  name:document.querySelector("#name").value,
  email:document.querySelector("#email").value,
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

if(res.ok){
  alert("uspesna registracija");
} else {
  alert("registration failed");
}



})

//ok radi, registration page radi, dodao ga je kao poslednji record sa hashovanom sifrom 
// odradi jos login, logout 
// prosli failed project -> hdd2 -> tamo mi je bukvalno gotov dashboard, menu za generisanje sifre sa generate new sifrom i cookies za cuvanje kao u cart-u. 
