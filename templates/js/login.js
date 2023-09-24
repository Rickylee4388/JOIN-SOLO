/**
 * loads message from url
 */
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

/**
 * leads To SignUp
 */
function leadToSignUp() {
  window.location.href = "signUp.html";
}
/**
 * leads To index
 */
function guestLogIn() {
  window.location.replace("../../index.html");
}

/**
 * login for user and lead to main page
 */
async function login() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );
  localStorage.setItem('currentEmail', email.value);
  console.log(user);
  if (user) {
    console.log("user gefunden");
    window.location.replace("../../index.html");
  } else {
    document.getElementById("msgBox").innerHTML = `Email oder Passwort nicht korrekt!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}

