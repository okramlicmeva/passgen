document.addEventListener("DOMContentLoaded", ()=>{


checkifLoggedIn()


})


async function checkifLoggedIn(){



const token = localStorage.getItem("token")
if (token){
  document.getElementById("navBar").classList.add("display:none");
  document.querySelector(".randombuttons").style.display = "block";

  const res= await fetch("http://localhost:3000/api/auth/check", {
method:"POST",
headers:{"Authorization" : `Bearer ${token}`}
});

const user = await res.json();

if(user) {
const usersProfile = document.querySelector(".profile");
usersProfile.innerHTML = `Hi, ${user.name}`;

  // const ime = document.createElement("div");
  // ime.classList.add("userName");
  // ime.innerText = `Hi, ${user.name}`;
  // document.getElementById("navBar").appendChild(ime);
}


}

}


async function LogOut(){
  localStorage.removeItem("token");
  window.location.href="login.html";
}