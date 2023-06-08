let currentUser = [];

function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    document.getElementById("msgBox").innerHTML = `${msg}`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  } else {
    document.getElementById("msgBoxDiv").classList.remove("d-flex");
  }
}

function leadToSignUp() {
  window.location.href = "signUp.html";
}
function guestLogIn() {
  window.location.replace("/../index.html");
}

async function login() {

  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );

  console.log(user);
  if (user) {
    console.log("user gefunden");
    
    currentUser = [''];
    currentUser = user['name'];
    await setItem("currentUser", JSON.stringify(currentUser));
    window.location.replace("/../index.html");
  } else {
    alert("Email oder Passwort nicht korrekt!");
  }

}
