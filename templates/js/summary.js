async function initSummary() {
  await loadUserLogin();
  let currentUser = getCurrentUser();
  document.getElementById('contentSection').innerHTML = getSummarySection();
  document.getElementById('headlineDiv').innerHTML += getSummaryHeadlineDiv();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryinnerContent();
  document.getElementById('contentAndGreeting').innerHTML += getSummaryGreeting(currentUser);
  generateTasksInBoard();
  searchTaskInProgress();
  searchUrgentTasks();
  searchAwaitFeedback();
  searchToDo();
  searchDone();
  searchDate();
}

function getCurrentUser() {
  let name;
  let email = localStorage.getItem('currentEmail');
  let index = userLogin.findIndex(function (currentUser) {
    return currentUser.email === email;
  });
  if (email) {
    name = userLogin[index]['name'];
  } else {
    name = 'Guest';
  }
  return name;
}


function getSummarySection() {
  return /*html*/`
    <div id="summarySection" class="summarySection">
      
      <div id="headlineDiv" class="d-flex headlineDiv">
      <div id= "managementText" class="managementText">Kanban Project Management Tool</div>
      </div>
      <div id="contentAndGreeting" class="d-flex contentAndGreeting ">
      </div>
    </div>
`;
}
function getSummaryHeadlineDiv() {
  return /*html*/`
        
          <h1 id="summaryHeadline" class="summaryHeadline">Summary</h1>
          <p id="nutshelltext" class="nutshelltext">Everything in a nutshell!</p>
        
  `
}
function getSummaryinnerContent() {
  return /*html*/`
            <div id="innerContentSummary" class="">
            <div id="taskSection" class="d-flex">
              <div id="inBoard" class="taskbox" onclick="renderBoard()">                              
              </div>
              <div id="inProgress" class="taskbox" onclick="renderBoard()">                               
              </div>
              <div id="awaitingFeedback" class="taskbox" onclick="renderBoard()">                             
              </div>
            </div>
            <div id="newsAndDate" class="newsAndDate" onclick="renderBoard()">
              <div id="news" class="news">                
              </div>
              <div id="date" class="date">
                <b id="insertDate">xxx.xx.xxxx</b> <br />
                Upcoming Deadline
              </div>
            </div>
            <div id="personalTasks" class="personalTasks d-flex">
              <div id="toDo" class="personalTaskBox toDobg" onclick="renderBoard()">
              </div>
              <div id="done" class="personalTaskBox donebg" onclick="renderBoard()">
              </div>
            </div>
          </div>
  `
}

function getSummaryGreeting(currentUser) {
  return /*html*/`
            <div id="greeting" class="d-flex center greeting">
            <p class="">Good Morning <br><b>${currentUser}!<b></p>
          </div>
  `
}

function searchTaskInProgress() {
  let stat = "inProgress";
  let inProgress = newTaskArray.filter(function (a) {
    return a.stat === stat;
  });
  let inProgressTask = inProgress.length;
  generateTasksInProgress(inProgressTask);
}

function searchAwaitFeedback() {
  let stat = "awaitingFeedback";
  let feedback = newTaskArray.filter(function (a) {
    return a.stat === stat;
  });
  let awaitFeedback = feedback.length;
  generateTasksFeedback(awaitFeedback);
}

function searchUrgentTasks() {
  let prio = 'urgent';
  let urgentTasks = newTaskArray.filter(function (a) {
    return a.prio === prio;
  });
  let urgentTask = urgentTasks.length;
  generateTasksUrgent(urgentTask);
}

function searchToDo() {
  let stat = "todo";
  let toDo = newTaskArray.filter(function (a) {
    return a.stat === stat;
  });
  let tasksToDo = toDo.length;
  generateToDo(tasksToDo);
}
function searchDone() {
  let stat = "done";
  let done = newTaskArray.filter(function (a) {
    return a.stat === stat;
  });
  let tasksDone = done.length;
  generateDone(tasksDone);
}


function generateTasksInBoard() {
  let taskInBoard = newTaskArray.length;
  document.getElementById('inBoard').innerHTML = /*html*/`
    <div id="tasknumber1" class="tasknumber">${taskInBoard}</div>
    <p class="tasktext">Tasks in Board</p>`
}
function generateTasksInProgress(inProgressTask) {
  document.getElementById('inProgress').innerHTML = /*html*/`
    <div id="tasknumber2" class="tasknumber">${inProgressTask}</div>
    <p class="tasktext">Tasks in Progress</p>`
}
function generateTasksFeedback(awaitFeedback) {
  document.getElementById('awaitingFeedback').innerHTML = /*html*/`
    <div id="tasknumber3" class="tasknumber">${awaitFeedback}</div>
    <p class="tasktext">Awaiting Feedback</p>`
}
function generateTasksUrgent(urgentTask) {
  document.getElementById('news').innerHTML = /*html*/`
    <img src="../../img/urgent.png" alt="" />
    <div id="newsNumberAndText">
    <b id="newsNumber" class="newsNumber">${urgentTask}</b><br />
    Urgent</div>`
}
function generateToDo(tasksToDo) {
  document.getElementById('toDo').innerHTML = /*html*/`
    <div id="toDoNumberAndText" class="marginLeft25">
    <b id="toDoNumber" class="toDoNumber">${tasksToDo}</b><br />
    To Do
    </div>`
}
function generateDone(tasksDone) {
  document.getElementById('done').innerHTML = /*html*/`
    <div id="doneNumberAndText" class="marginLeft25">
    <b id="doneNumber" class="doneNumber">${tasksDone}</b><br />
    Done
    </div>`
}
function generateDate(earliest) {
  document.getElementById('date').innerHTML = /*html*/`
    <b id="insertDate" class="insertDate">${earliest}</b> <br />
     Upcoming Deadline
    </div>`
}



function searchDate() {
  let earliest = [];
  const minDate =
    newTaskArray.map(element => {
      return element.date;
    });
  earliest = minDate.reduce(function (pre, cur) {
    return Date.parse(pre) > Date.parse(cur) ? cur : pre;
  });
  console.log(earliest);
  generateDate(earliest);

}

