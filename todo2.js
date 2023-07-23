let task  = document.getElementById("input-task");
let priority = document.getElementById("priority");
let due_date_time = document.getElementById("datetimeInput");
let cate = document.getElementById("input-category");
let subtask = document.getElementById("input-subtask");
let tag = document.getElementById("input-tag");
let subtasks=[];
let tags=[];
let tasks = [];
let tasksDone =[];
let priorityList = [];
let dueDateList =[];
let filter =[];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveSubTasks() {
  localStorage.setItem("subtasks", JSON.stringify(subtasks));
}
function saveTags() {
  localStorage.setItem("tags", JSON.stringify(tags));
}

function addSubtask(){
  if(subtask.value === ''){
    alert("Enter valid input!!!");
    return;
  }
  else{
    let newsubtask = {
      text : subtask.value,
    };
    subtasks.push(newsubtask);
   }
  subtask.value = '';
  saveSubTasks();
  displaySubtasks();
}

function addTag(){
  if(tag.value === ''){
    alert("Enter valid input!!!");
    return;
  }
  else{
    let newtag = {
      text : tag.value,
    };
    tags.push(newtag);
  }
  tag.value = '';
  saveTags();
  displayTags();
}

function displaySubtasks(){
  let subtasksAdded = document.getElementById("subtasksAdded");
  subtasksAdded.innerHTML ="";
  for( let i=0; i<subtasks.length;i++){
    console.log('abcd')

    let newtaskdiv = document.createElement("div");
    newtaskdiv.classList.add('subtask');
    newtaskdiv.innerHTML = "";
    subtasksAdded.appendChild(newtaskdiv);

    let newtasktext = document.createElement('p');
    newtasktext.innerHTML = subtasks[i].text;
    newtasktext.classList.add('subtask-text');
    newtaskdiv.appendChild(newtasktext);
    
  }
}

function displayTags(){
  let tagsAdded = document.getElementById("tags-added");
  tagsAdded.innerHTML ="";
  for( let i=0; i<tags.length;i++){
    console.log('abcd')

    let newtaskdiv = document.createElement("div");
    newtaskdiv.classList.add('tag');
    newtaskdiv.innerHTML = "";
    tagsAdded.appendChild(newtaskdiv);

    let newtasktext = document.createElement('p');
    newtasktext.innerHTML = tags[i].text;
    newtasktext.classList.add('tag-text');
    newtaskdiv.appendChild(newtasktext);
    
  }
}



function addTask(){
  let newtask = {
    text : "",
    due : "",
    category : "",
    prio : "",
    sub : [],
    tag:[],
  }
  if(task.value === ''){
    alert("Invalid input!!!");
    return;
  }
  else{
    newtask.text = task.value;
  }
  
  newtask.prio = priority.value;
  if(due_date_time.value === ''){
    alert("add due date and time !!!!");
    return;
  }
  else{
    newtask.due = due_date_time.value;
  }
  
  if(cate.value === '')
  {
    alert("Enter category");
    return;
  }
  else{
    newtask.category = cate.value;
  }

  newtask.sub = subtasks.slice();
  newtask.tag = tags.slice();
  tags =[];
  subtasks = [];
  tasks.push(newtask);
  task.value = '';  
  cate.value = '';
  due_date_time.value = '';
  displaySubtasks();
  displayTags();
  saveTasks();
  displayTodoTasks();
}


function displayTodoTasks(){
  let taskcontainer = document.getElementById("to-do-container");
  taskcontainer.innerHTML ="";
  for( let i=0; i<tasks.length;i++){



    let todoTask = document.createElement("div");
    todoTask.classList.add('to-do-task');
    todoTask.innerHTML = "";
    taskcontainer.appendChild(todoTask);


    let upper = document.createElement('div');
    upper.classList.add('upper');
    upper.innerHTML =  "";
    todoTask.appendChild(upper);

    let newtaskcheckbox = document.createElement('input');
    newtaskcheckbox.type = 'checkbox';
    newtaskcheckbox.classList.add('task-checkbox');
    newtaskcheckbox.setAttribute("id",i);
    newtaskcheckbox.addEventListener('mouseover', function() {
      this.checked = true; // Set the checkbox value to true (checked)
    });
    newtaskcheckbox.addEventListener('mouseout', function() {
      this.checked = false; // Set the checkbox value to true (checked)
    });
    newtaskcheckbox.checked = false;
    newtaskcheckbox.addEventListener('click',taskChecked);
    upper.appendChild(newtaskcheckbox);

    let newtasktext = document.createElement('p');
    newtasktext.innerHTML = tasks[i].text;
    newtasktext.classList.add('task-text');
    upper.appendChild(newtasktext);

    // let datetime = tasks[i].due;

    let datetimetext = document.createElement('p');
    datetimetext.innerHTML = tasks[i].due;
    datetimetext.classList.add('date-time-text');
    upper.appendChild(datetimetext);
    
    let taskPriority = document.createElement('p');
    taskPriority.innerHTML = tasks[i].prio;
    taskPriority.classList.add('priority-text');
    upper.appendChild(taskPriority);

    let newtaskcate = document.createElement('p');
    newtaskcate.innerHTML = tasks[i].category;
    newtaskcate.classList.add('categorey-text');
    upper.appendChild(newtaskcate);

    let newtaskEditbutton = document.createElement('button');
    newtaskEditbutton.innerHTML = "Edit";
    newtaskEditbutton.setAttribute("id",i);
    newtaskEditbutton.classList.add('edit-button');
    newtaskEditbutton.addEventListener('click', editTask)
    upper.appendChild(newtaskEditbutton);

    let newtaskDeletebutton = document.createElement('button');
    newtaskDeletebutton.innerHTML = "Delete";
    newtaskDeletebutton.setAttribute("id",i);
    newtaskDeletebutton.classList.add('delete-button');
    newtaskDeletebutton.addEventListener('click', deleteTask);
    upper.appendChild(newtaskDeletebutton);

    let lower = document.createElement('div');
    lower.innerHTML = "";
    lower.classList.add('lower');
    todoTask.appendChild(lower);

    let subtaskContainer = document.createElement('div');
    subtaskContainer.innerHTML =  "";
    subtaskContainer.classList.add('subtask-section');
    lower.appendChild(subtaskContainer);

    let tagContainer = document.createElement('div');
    tagContainer.innerHTML = "";
    tagContainer.classList.add('tag-section');
    lower.appendChild(tagContainer);

    for(let j=0;j<tasks[i].sub.length;j++){


      let creds = document.createElement('div');
      creds.innerHTML = "";
      creds.classList.add('subtask-creds');
      subtaskContainer.appendChild(creds);


      let newcheckbox = document.createElement('input');
      newcheckbox.type = 'checkbox';
      newcheckbox.classList.add('subtask-checkbox');
      newcheckbox.setAttribute("no",j);
      creds.appendChild(newcheckbox);

      let subtaskText = document.createElement('p');
      subtaskText.innerHTML = tasks[i].sub[j].text;
      subtaskText.classList.add('subtask-para');
      creds.appendChild(subtaskText);


    }
    
    for(let k=0;k<tasks[i].tag.length;k++)
    {
      let tagText = document.createElement('p');
      tagText.innerHTML = tasks[i].tag[k].text;
      tagText.classList.add('tag-para');
      tagContainer.appendChild(tagText);
    }

  }
}
const deleteTask = e => {
  tasks.splice(e.target.id, 1);
  displayTodoTasks();
} 

const taskChecked =e=>{
  let newtask = {
  
    text : tasks[e.target.id].text,
    due : tasks[e.target.id].due,
    category : tasks[e.target.id].category,
    prio : tasks[e.target.id].prio,
    sub : tasks[e.target.id].sub,
    tag:tasks[e.target.id].tag,

  }
  tasksDone.push(newtask);
  displayDoneTasks();
  tasks.splice(e.target.id, 1);
  displayTodoTasks();
}


const taskUnChecked =e=>{
  let newtask = {
  
    text : tasksDone[e.target.id].text,
    due : tasksDone[e.target.id].due,
    category : tasksDone[e.target.id].category,
    prio : tasksDone[e.target.id].prio,
    sub : tasksDone[e.target.id].sub,
    tag:tasksDone[e.target.id].tag,

  }
  tasks.push(newtask);
  
  tasksDone.splice(e.target.id, 1);
  displayTodoTasks();
  displayDoneTasks();
}


function displayDoneTasks()
{


  let doneContainer = document.getElementById('done-container');
  doneContainer.innerHTML = '';

  for(let i =0;i<tasksDone.length;i++){

    let doneTask = document.createElement('div');
    doneTask.innerHTML ='';
    doneTask.classList.add("done-task");
    doneContainer.appendChild(doneTask);

    
    let newtaskcheckbox = document.createElement('input');
    newtaskcheckbox.type = 'checkbox';
    newtaskcheckbox.classList.add('task-checkbox');
    newtaskcheckbox.setAttribute("id",i);
    newtaskcheckbox.addEventListener('mouseover', function() {
      this.checked = false; // Set the checkbox value to true (checked)
    });
    newtaskcheckbox.addEventListener('mouseout', function() {
      this.checked = true; // Set the checkbox value to true (checked)
    });
    newtaskcheckbox.checked = true;
    newtaskcheckbox.addEventListener('click',taskUnChecked);
    doneTask.appendChild(newtaskcheckbox);

    let donetaskText = document.createElement('p');
    donetaskText.innerHTML = tasksDone[i].text;
    donetaskText.classList.add('done-task-text');
    doneTask.appendChild(donetaskText);


  }
}

// let priorityList = [];
// let dueDateList =[];
// Sample array of objects with date-time attribute
// const data = [
//   { dateTime: "2023-07-23 10:30:00" },
//   { dateTime: "2023-07-24 09:15:00" },
//   { dateTime: "2023-07-23 14:00:00" },
//   // Add more objects here
// ];

// // Custom comparison function to sort based on date-time
function compareDateTime(a, b) {
  const dateA = new Date(a.due);
  const dateB = new Date(b.due);
  return dateA - dateB;
}

// // Sorting the array using the custom comparison function
// data.sort(compareDateTime);

// // Output the sorted array
// console.log(data);

function sortDuedate(){
  tasks.sort(compareDateTime);
  displayTodoTasks();
}

function comparePriority(a, b) {
  const priorityValues = { high: 3, medium: 2, low: 1 };
  const priorityA = priorityValues[a.prio];
  const priorityB = priorityValues[b.prio];

  return priorityB - priorityA;
}
function sortPriority(){
  tasks.sort(comparePriority);
  displayTodoTasks();
}


const editTask = e => {
  document.getElementById('edit-modal').style.display = 'block';
  editId = e.target.id;
} 
document.querySelector('#close-modal').addEventListener('click', function(e) {
  let editedTask = document.getElementById("editedTask");
  let editedPriority = document.getElementById("editPriority");
  let editedCategory = document.getElementById("editCategory");
  let editedDue = document.getElementById("editDue");
  // console.log(editedTask.value);
  if(editedTask.value === '' || editedDue.value==='' || editedCategory.value == ''){
      alert("Enter a valid value!");
  }
  else{
      for(let i = 0; i < tasks.length; i++){
          // console.log(e.target.id);
          if(i == editId ){
              // console.log(editedTask.value);
              tasks[i].text = editedTask.value;
              tasks[i].due = editedDue.value;
              tasks[i].category = editedCategory.value;
              tasks[i].prio = editedPriority.value;
          }
      }
      editedTask.value = "";
      document.getElementById('edit-modal').style.display = 'none';
      displayTodoTasks();
  }
});  