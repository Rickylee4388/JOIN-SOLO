let index = localStorage.getItem('index');

/**
 * loads popUp message email
 */
function popUpMessageEmail() {
    document.getElementById('buttonAnimationEmail').classList.remove('d-none');
}

/**
 * loads popUp message password
 */
function popUpMessagePw() {
    document.getElementById('buttonAnimationPw').classList.remove('d-none');
}

/**
 * resets password and creates new
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
 * leads back to login page
 */
async function backToLogin() {
    popUpMessageEmail();
    await setNewPassword();
    setTimeout(function () {
        window.location.href = "login.html";
    }, 1800);
}

/**
 * 
 * @param {string} email 
 * @returns email index which needs new password
 */
function resetUserPassword(email) {

    let i = userLogin.findIndex(function (a) {
        return a.email === email;
    });
    console.log(i);
    return i;

}

/**
 * sets new password and saves it
 */
async function setNewPassword() {
    let password = document.getElementById('resetPassword').value;
    let passwordRepeat = document.getElementById('repeatPassword').value;
    if (password === passwordRepeat) {
        userLogin[index]['password'] = password;
        await setItem("userLogin", JSON.stringify(userLogin));
    }
}
