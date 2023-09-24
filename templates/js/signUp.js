let test123 = [];
let userLogin = [];

/**
 * inits loginpage
 */
async function initLogin(){
  await loadUserLogin();
  await getMsg();
}

/**
 * loads user from backend
 */
async function loadUserLogin() {
  let users = JSON.parse(await getItem("userLogin"));
  userLogin = users;
}

/**
 * signs up new registered users
 */
async function signUp() {
  signUpbtn.disabled = true;
  userLogin.push({
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });
  await setItem("userLogin", JSON.stringify(userLogin));
  resetForm();
  window.location.href = "login.html?msg=Du hast dich erfolgreich registriert";
}

/**
 * leads back to login
 */
function goBackToLogin() {
 window.location.href = "login.html";
} 

/**
 * resets form
 */
function resetForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpbtn.disabled = false;
}



