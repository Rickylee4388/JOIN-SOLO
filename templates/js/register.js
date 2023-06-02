let users =[];

async function signUp(){
    signUpbtn.disabled = true;
    users.push({
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    })


}

function resetForm(){
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    signUpbtn.disabled = false;
}