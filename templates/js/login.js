function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    //Test overlay nachricht//

    // document.getElementById('overlaySection').innerHTML = `<img class="overlayAddContactSuccess" src="/../img/newContactSuccess.svg">`;
    // document.getElementById('overlaySection').classList.remove('d-none')
    //   setTimeout(function () {
    //       document.getElementById('overlaySection').classList.add('d-none');
    //   }, 1400);
    // }

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
  window.location.href = "summary.html";
}

function login() {
  let email = document.getElementById("loginEmail");
  let password = document.getElementById("loginPassword");
  let user = userLogin.find(
    (u) => u.email == email.value && u.password == password.value
  );

  console.log(user);
  if (user) {
    console.log("user gefunden");
    window.location.href = "summary.html";
  } else {
    alert("Email oder Passwort nicht korrekt!");
  }
}
