
document.addEventListener("DOMContentLoaded", ()=>{


  randomPasswords()
  //ovako ce prilikom loadinga uvek da mi pokrene skriptu i ona ce biti vidljiva odma' 
  
  })



const genNew = document.querySelector(".genNew");
const displayPassword = document.querySelector(".pass");

genNew.addEventListener("click", randomPasswords);


function randomPasswords() {
 const random = (Math.random()+1).toString(36).substring(2);
  displayPassword.textContent = random;
}


//tostic


const toast = document.querySelector(".copy");
let test;
let html;
let message;
toast.addEventListener("click", jumpOut);

function taosgenerator() {
  if(!html) {
    html = document.createElement("div");
    html.classList.add("jump");
    document.body.appendChild(html);
  }
}

function jumpOut() {
  taosgenerator()


  message = document.createElement("div");
  message.addEventListener("click", disappear)
  message.classList.add("jumpOut");
  message.innerHTML = "Password has been saved";
  
  html.appendChild(message); // uzmi toster i ubaci poruku
  

setTimeout(() => {
  message.remove();

  if (html.children.length === 0) {
    html.remove();
    html = null;
  }
},5000);

}


function disappear(a) {
  a.target.remove();
  message = null;
  if(html.children.length === 0) {
    html.remove();
    html="";
  }
  };


let copy = document.querySelector(".copy");

copy.addEventListener("click", cookie);

function cookie() {
const pass = document.querySelector(".pass").textContent; //ne moze value jer je content u p-u
const usersName = document.querySelector(".profile").textContent;
let now = new Date();
now.setTime(now.getTime()+ 1000*60*60*24);
let expireTime = now.toUTCString();

const cookieValue = "password=" + pass + ",username=" + usersName + ",expires=" + expireTime;
document.cookie = "userData=" + cookieValue + "; expires=" + expireTime + "; path=/";
console.log(document.cookie)
console.log(pass, usersName);
}