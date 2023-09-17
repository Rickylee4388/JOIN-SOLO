/**
 * gets message from URL
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
 * leads to signUp page
 */
function leadToSignUp() {
  window.location.href = "signUp.html";
}

/**
 * leads to geustLogin page without login
 */
function guestLogIn() {
  window.location.replace("https://gruppenarbeit-join-578.developerakademie.net/Join/index.html");
}


/**
 * starts login to mainPage
 */
async function login() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );
  setTimeout(() => {
    localStorage.setItem('currentEmail', email.value);
  }, "1000");
  
  console.log(user);
  if (user) {
    console.log("user gefunden");
    window.location.replace("https://gruppenarbeit-join-578.developerakademie.net/Join/index.html");
  } else {
    document.getElementById("msgBox").innerHTML = `Email oder Passwort nicht korrekt!`;
    document.getElementById("msgBoxDiv").classList.remove("d-none");
  }
}

