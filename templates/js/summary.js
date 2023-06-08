async function initSummary() {
  loadUserLogin();
  // let name = userlogin[0]['name'];
  document.getElementById('contentSection').innerHTML = getSummarySection();
  document.getElementById('headlineDiv').innerHTML += getSummaryHeadlineDiv();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryinnerContent();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryGreeting();
}

function getSummarySection() {
  return /*html*/`
    <div id="summarySection" class="summarySection">
      <div id="headlineDiv" class="d-flex headlineDiv">
      </div>
      <div id="contentAndGreeting" class="d-flex">
      </div>
    </div>
`;
}
function getSummaryHeadlineDiv() {
  return /*html*/`
        
          <h1 id="summaryHeadline" class="summaryHeadline">Summary</h1>
          <p id="nutshelltext" class="">Everything in a nutshell!</p>
        
  `
}
function getSummaryinnerContent() {
  return /*html*/`
            <div id="innerContentSummary" class="">
            <div id="taskSection" class="d-flex">
              <div id="inBoard" class="taskbox">
                <div id="tasknumber1" class="tasknumber">5</div>
                <p class="tasktext">Tasks in Board</p>
              </div>
              <div id="inProgress" class="taskbox">
                <div id="tasknumber2" class="tasknumber">5</div>
                <p class="tasktext">Tasks in Progress</p>
              </div>
              <div id="awaitingFeedback" class="taskbox">
                <div id="tasknumber3" class="tasknumber">5</div>
                <p class="tasktext">Awaiting Feedback</p>
              </div>
            </div>

            <div id="newsAndDate" class="newsAndDate">
              <div id="news" class="news">
                <img src="../../img/urgent.png" alt="" />
                <div id="newsNumberAndText">
                  <b id="newsNumber" class="newsNumber">1</b><br />
                  Urgent
                </div>
              </div>
              <div id="date" class="date">
                <b id="insertDate">xxx.xx.xxxx</b> <br />
                Upcoming Deadline
              </div>
            </div>

            <div id="personalTasks" class="personalTasks d-flex">
              <div id="toDo" class="personalTaskBox toDobg">
                <div id="toDoNumberAndText" class="marginLeft25">
                  <b id="toDoNumber" class="toDoNumber">1</b><br />
                  To Do
                </div>
              </div>

              <div id="done" class="personalTaskBox donebg">
                <div id="doneNumberAndText" class="marginLeft25">
                  <b id="doneNumber" class="doneNumber">1</b><br />
                  Done
                </div>
              </div>
            </div>
          </div>
  `
}
function getSummaryGreeting() {
  return /*html*/`
            <div id="greeting" class="d-flex center greeting">
            <p class="">Good Morning </p>
          </div>
  `
}