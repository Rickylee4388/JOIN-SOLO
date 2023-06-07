let test123 = [];

let userLogin = [];
async function loadUserLogin() {
  let users = JSON.parse(await getItem("userLogin"));
  userLogin = users;
}
async function signUp() {
  signUpbtn.disabled = true;
  userLogin.push({
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });

  setItem("userLogin", JSON.stringify(userLogin));
  resetForm();
  window.location.href = "login.html?msg=Du hast dich erfolgreich registriert";
}
function backToLogin() {
  window.location.href = "login.html";
}
function resetForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpbtn.disabled = false;
}

function resetPassword(){
  window.location.href = "resetPassword.html";
}
