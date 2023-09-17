let test123 = [];
let userLogin = [];

/**
 * initializes login
 */
async function initLogin(){
  await loadUserLogin();
  await getMsg();
}

/**
 * loads registrated users
 */
async function loadUserLogin() {
  let users = JSON.parse(await getItem("userLogin"));
  userLogin = users;
}

/**
 * sign up for new user
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
 * leads back to login page
 */
function goBackToLogin() {
 window.location.href = "login.html";
} 

/**
 * resets form - empties fields
 */
function resetForm() {
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpbtn.disabled = false;
}



