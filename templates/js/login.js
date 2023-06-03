function getMsg() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  if (msg) {
    document.getElementById("msgBox").innerHTML = `${msg}`;
  }
  else{
    document.getElementById("msgBox").classList.add(d-none);
  }
}
function login() {}
