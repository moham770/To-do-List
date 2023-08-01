let taskInpt = document.getElementById("task-inpt");
let add = document.getElementById("add");
let taskInner = document.getElementById("inertast");
let Update = document.getElementById("Update");
let deleteAllTasks = document.getElementById("deleteAllTasks");
let completeAreaAll = document.getElementById("completeAreaAll");
let deleteAllComplete = document.getElementById("deleteAllComplete");
let overlayContainer = document.getElementById("overlay-container");
let cancelWarnnig = document.getElementById("cancel-warnnig");
let acceptWarnning = document.getElementById("acceptWarnning");
let overlayAdd = document.getElementById("overlay-add");
let accept = document.getElementById("accept");
let overlayComplete = document.getElementById("overlay-complete");
let iamNotSure = document.getElementById("iamNotSure");
let iamSure = document.getElementById("iamSure");


console.log(accept)
let temp;
let mode = "add";
let taskFinish;
// todo:///////////////////////////////////////////////////////////////////////////

let tasks;
if (localStorage.messions != null) {
  tasks = JSON.parse(localStorage.messions);
} else {
  tasks = [];
}
// todo:///////////////////////////////////////////////////////////////////////////

add.onclick = function () {
    if(taskInpt.value !=""){
        let todo = {
    task: taskInpt.value,
  };

//   console.log(tasks);

  if (mode == "add") {
    tasks.push(todo);
    displayTasks();
    localStorage.setItem("messions", JSON.stringify(tasks));
  } else {
    tasks[temp] = todo;
    add.innerHTML = `<span class="plus me-2">+</span> Add`;
    mode = "add";
  }
  localStorage.setItem("messions", JSON.stringify(tasks));
  clearInput();
  displayTasks();
    }else{
        overlayAdd.classList.remove("d-none")
    }
};
accept.addEventListener("click",()=>{
    overlayAdd.classList.add("d-none")

})

// todo:///////////////////////////////////////////////////////////////////////////
function clearInput() {
  taskInpt.value = "";
}

// todo:///////////////////////////////////////////////////////////////////////////
function displayTasks() {
  let AreaTask = "";
  for (let i = 0; i < tasks.length; i++) {
    AreaTask += `
        <div class="task-content d-flex justify-content-between align-items-center px-3 mb-3">      
        <p class="text-warning margin-0">${i+1} - ${tasks[i].task}</p>
        <div class="buttons">
            <div class="btn me-2" id="success" onclick="successTask(${i})">Success</div>
            <div class="btn" id="Update" onclick="updateData(${i})">Update</div>
            
        </div>
        
    </div>
        `;
  }
  taskInner.innerHTML = AreaTask;
  if (tasks.length > 0) {
    deleteAllTasks.classList.remove("d-none");
    deleteAllTasks.innerHTML = `Delete All (${tasks.length})`;
  } else {
    deleteAllTasks.classList.add("d-none");
  }
}
displayTasks();
// todo:///////////////////////////////////////////////////////////////////////////

function updateData(i) {
  taskInpt.value = tasks[i].task;
//   console.log("hi");
  mode = "update";
  temp = i;
  add.innerHTML = "Update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// todo:///////////////////////////////////////////////////////////////////////////
deleteAllTasks.addEventListener("click",()=>{
    overlayContainer.classList.remove("d-none")
} )

acceptWarnning.onclick =function (){
    deleteTsks()
    overlayContainer.classList.add("d-none")

}
cancelWarnnig.addEventListener("click",()=>{
    
    overlayContainer.classList.add("d-none")
})

function deleteTsks(){
    tasks.splice(0);
  localStorage.removeItem("messions");
  displayTasks();
}
// todo:///////////////////////////////////////////////////////////////////////////

let completeArray;
if (localStorage.complete != null) {
  completeArray = JSON.parse(localStorage.complete);
} else {
  completeArray = [];
}
function successTask(i) {
  let mession = {
    done: tasks[i].task,
  };
  completeArray.push(mession);
  localStorage.setItem("complete", JSON.stringify(completeArray));
    tasks.splice(i,1).task
    localStorage.setItem("messions", JSON.stringify(tasks));
    displayTasks()
  displayComplete();
  
}

// todo:///////////////////////////////////////////////////////////////////////////
function displayComplete() {
  let completeInner=""
  for (let i = 0; i < completeArray.length; i++) {
    completeInner += `<div class="complete d-flex justify-content-between align-items-center px-3" ">
        <p class="text-warning"> ${i+1} - ${completeArray[i].done}</p>
        <div class="complete-icon">
        <i class="fa-solid fa-check text-success fa-2x"></i>
         </div>
                </div>
          
                `;
  }

  completeAreaAll.innerHTML = completeInner;
  if (completeArray.length > 0) {
    deleteAllComplete.classList.remove("d-none");
    deleteAllComplete.innerHTML = `Delete All (${completeArray.length})`;
  } else {
    deleteAllComplete.classList.add("d-none");
  }
}
displayComplete();
// todo:///////////////////////////////////////////////////////////////////////////
deleteAllComplete.addEventListener("click", () => {
    overlayComplete.classList.remove("d-none")
});

iamSure.onclick = function (){
    deleteComplete()
    overlayComplete.classList.add("d-none")
} 
iamNotSure.addEventListener("click",()=>{
    overlayComplete.classList.add("d-none")

})

function deleteComplete(){
    completeArray.splice(0);
  localStorage.removeItem("complete");
  displayComplete();
}
