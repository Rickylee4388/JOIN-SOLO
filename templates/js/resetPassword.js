let index = localStorage.getItem('index');

/**
 * show popup message email
 */
function popUpMessageEmail() {
    document.getElementById('buttonAnimationEmail').classList.remove('d-none');
}

/**
 * show popup message password
 */
function popUpMessagePw() {
    document.getElementById('buttonAnimationPw').classList.remove('d-none');
}

/**
 * resets password 
 */
function resetPassword() {
    let email = document.getElementById('forgotPwEmail').value;
    popUpMessagePw();
    i = resetUserPassword(email);
    setTimeout(function () {
        window.location.href = "resetPassword.html";
    }, 1800);
    localStorage.setItem('index', i);
}

/**
 * leads back to login
 */
async function backToLogin() {
    popUpMessageEmail();
    await setNewPassword();
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1800);
}

/**
 * finds user by email
 * @param {string} email 
 * @returns user index
 */
function resetUserPassword(email) {
    let i = userLogin.findIndex(function (a) {
        return a.email === email;
    });
    console.log(i);
    return i;
}

/**
 * saves new password
 */
async function setNewPassword() {
    let password = document.getElementById('resetPassword').value;
    let passwordRepeat = document.getElementById('repeatPassword').value;
    if (password === passwordRepeat) {
        userLogin[index]['password'] = password;
        await setItem("userLogin", JSON.stringify(userLogin));
    }
}
