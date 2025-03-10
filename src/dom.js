import createElement from "./createElement";
import { format } from "date-fns";
import { clearInputs, hideAllTaskElements, showTaskElements, hideTaskElements, updateRenderDate, addPriorityColor } from "./domHelpers";

const projectDialog = document.querySelector("#project-dialog");
const projectNav = document.querySelector("#project-nav");
const taskDialog = document.querySelector("#task-dialog");
const selectProject = document.querySelector("#select-project");
const editTaskDialog = document.querySelector("#edit-task-dialog");
const projectDeleteDialog = document.querySelector("#project-delete-dialog");
let projectId;
let taskId;
let today;

export function eventListeners(addProjectFn, deleteProjectFn, addTaskFn, deleteTaskFn, arr, editTaskFn){

    updateToday();

    Array.from(document.querySelectorAll(".date-input")).
        forEach(item => item.setAttribute("min", today));

    document.querySelector("#show-project-dialog").addEventListener("click", function() {
        projectDialog.showModal();
    })

    document.querySelector("#project-cancel-btn").addEventListener("click", function(event) {
        event.preventDefault();
        projectDialog.close();
    })

    document.querySelector("#show-task-dialog").addEventListener("click", function() {
        taskDialog.showModal();
        renderProjectOptions(arr);
    })

    document.querySelector("#task-cancel-btn").addEventListener("click", function(event) {
        event.preventDefault();
        taskDialog.close();
    })

    document.querySelector("#project-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.querySelector("#project-title");
        const description = document.querySelector("#project-description");
        addProjectFn(title.value, description.value);
        clearInputs( [title, description] );
        renderProjectNav(arr, updateProjectElements);
        projectDialog.close();
        renderTasks(arr[arr.length - 1], updateTaskElements);
    })

    document.querySelector("#task-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.querySelector("#task-title");
        const description = document.querySelector("#task-description");
        const dueDate = document.querySelector("#task-due-date");
        const priority = document.querySelector("input[name='priority']:checked");
        const note = document.querySelector("#task-note");
        const index = +selectProject.selectedIndex;
        addTaskFn(arr[index].tasks, title.value, description.value, dueDate.value, priority.value, note.value);
        renderTasks(arr[index], updateTaskElements);
        clearInputs( [title, description, dueDate, note] );
        document.querySelector("#medium").checked = "true";
        taskDialog.close();
    })

    document.querySelector("#edit-task-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.querySelector("#edit-task-title");
        const description = document.querySelector("#edit-task-description");
        const dueDate = document.querySelector("#edit-task-due-date");
        const priority = document.querySelector("input[name='edit-priority']:checked");
        const note = document.querySelector("#edit-task-note");

        editTaskFn(projectId, taskId, title.value, description.value, dueDate.value, priority.value, note.value);
        renderTasks(arr[projectId], updateTaskElements);
        clearInputs([title, description, dueDate, note]);
        document.querySelector("#edit-medium").checked = "true";
        editTaskDialog.close();
    })

    document.querySelector("#edit-task-cancel-btn").addEventListener("click", function(event) {
        event.preventDefault();
        editTaskDialog.close();
    })

    renderProjectNav(arr, updateProjectElements);
    renderTasks(arr[0], updateTaskElements);

    function showProjectDeleteDialog(event) {
        projectId = +event.target.dataset.deleteProject;
        document.querySelector("#project-delete-confirm").
            textContent = `Are you sure you want to delete ${arr[projectId].title} project?\r\nAll task in project will be deleted`;
        projectDeleteDialog.showModal();
    }

    document.querySelector("#project-delete-confirm-cancel").addEventListener("click", function(event)  {
        event.preventDefault();
        projectDeleteDialog.close();
    });

    document.querySelector("#project-delete-confirm-yes").addEventListener("click", deleteProject);

    function deleteProject(event) {
        event.preventDefault();
        const index = projectId;
        deleteProjectFn(index);
        renderProjectNav(arr, updateProjectElements);
        renderTasks(arr[arr.length - 1], updateTaskElements);
        projectDeleteDialog.close();
    }

    function switchProject(event) {
        Array.from(document.querySelectorAll(".project-title")).
            forEach(item => item.style.backgroundColor = "transparent");

        const index = +event.target.dataset.projectTitle;
        event.target.style.backgroundColor = "var(--background-color)";
        renderTasks(arr[index], updateTaskElements);
    }

    function updateProjectElements() {
        Array.from(document.querySelectorAll(".project-delete-btn")).
            forEach(item => item.addEventListener("click", showProjectDeleteDialog));
        Array.from(document.querySelectorAll(".project-title")).
            forEach(item => item.addEventListener("click", switchProject));
    }

    function deleteTask(event) {
        const projectIndex = +event.target.dataset.taskDeleteProject;
        const index = +event.target.dataset.taskDelete;
        deleteTaskFn(projectIndex, index);
        renderTasks(arr[projectIndex], updateTaskElements);
    }

    function updateTaskElements() {
        Array.from(document.querySelectorAll(".task-delete-btn")).
            forEach(item => item.addEventListener("click", deleteTask));
        Array.from(document.querySelectorAll(".task-expand-btn")).
            forEach(item => item.addEventListener("click", taskToggleView));
        Array.from(document.querySelectorAll(".task-edit-btn")).
            forEach(item => item.addEventListener("click", showEditTaskDialog));
    }

    function taskToggleView(event) {
        const index = +event.target.dataset.expandIndex; 
        if(event.target.textContent === "▼") {
            showTaskElements(index);
            event.target.textContent = "⏏"
            return;
        }
        else {
            hideTaskElements(index);
            event.target.textContent = "▼"
        }
    }

    function showEditTaskDialog(event) {
        projectId = +event.target.dataset.taskEditProject;
        taskId = +event.target.dataset.taskEdit;
        document.querySelector("#edit-task-title").value = arr[projectId].tasks[taskId].title;
        document.querySelector("#edit-task-description").value = arr[projectId].tasks[taskId].description;
        document.querySelector("#edit-task-note").value = arr[projectId].tasks[taskId].note;
        document.querySelector("#edit-task-due-date").value = arr[projectId].tasks[taskId].dueDate;
        editTaskDialog.showModal();
    }
}

function renderProjectNav(arr, fn) {
    projectNav.textContent = ""
    for (let i = 0; i < arr.length; i++) {
        const div = createElement("div", "class", "project-container", "");
        const title = createElement("h4", "class", "project-title", arr[i].title);
        title.setAttribute("data-project-title", arr[i].id);
        const deleteBtn = createElement("button", "data-delete-project", arr[i].id, "🗑");
        deleteBtn.setAttribute("class", "project-delete-btn");
        div.appendChild(deleteBtn);
        div.appendChild(title);
        projectNav.appendChild(div);
    }
    fn();
}

function renderTasks(obj, fn) {
    const projectHeader = document.querySelector("#project-header-display");
    const projectDecription = document.querySelector("#project-description-display");
    const taskCardsContainer = document.querySelector("#task-cards-container");

    projectHeader.textContent = "";
    projectDecription.textContent = "";
    taskCardsContainer.textContent = "";

    if(obj === undefined) {
        projectHeader.textContent = "No Projects";
        projectDecription.textContent = "Make a new project to start adding tasks";
        return;
    }

    document.querySelector(`[data-project-title="${obj.id}"]`).style.backgroundColor = "var(--background-color)";
    projectHeader.textContent = obj.title;
    projectDecription.textContent = obj.description;

    const taskArr = obj.tasks;

    if(taskArr.length === 0) {
        taskCardsContainer.textContent = "Add task to view";
        return;
    }

    for(let i = 0; i < taskArr.length; i++) {
        const div =  createElement("div", "class", "task-cards", "");
        const btnsDiv = createElement("div", "class", "task-btn-container", "");
        const deleteBtn = createElement("button", "data-task-delete", taskArr[i].id, "🗑");
        const editBtn = createElement("button", "data-task-edit", taskArr[i].id, "🖍")
        deleteBtn.setAttribute("data-task-delete-project", taskArr[i].projectId);
        deleteBtn.setAttribute("class", "task-delete-btn");
        editBtn.setAttribute("data-task-edit-project", taskArr[i].projectId);
        editBtn.setAttribute("class", "task-edit-btn");
        btnsDiv.appendChild(editBtn);
        btnsDiv.appendChild(deleteBtn);
        const titleDiv = createElement("div", "class", "task-title-div", "");
        const expandBtn = createElement("button", "class", "task-expand-btn", "▼");
        expandBtn.setAttribute("data-expand-index", taskArr[i].id);
        titleDiv.appendChild(createElement("h4", "class", "task-title", taskArr[i].title));
        titleDiv.appendChild(expandBtn);
        const priority = createElement("p", "class", "task-priority", "Priority: " + taskArr[i].priority);
        addPriorityColor(div, priority);
        div.appendChild(titleDiv);
        div.appendChild(createElement("p", "class", "task-description", taskArr[i].description));
        div.appendChild(createElement("p", "class", "task-due-date", "Due Date: " + updateRenderDate(taskArr[i].dueDate)));
        div.appendChild(priority);
        div.appendChild(createElement("hp", "class", "task-note", "Note: " + taskArr[i].note));
        div.appendChild(btnsDiv);
        taskCardsContainer.appendChild(div);
    }
    fn();
    hideAllTaskElements()
}

function renderProjectOptions(arr) {
    selectProject.textContent = "";
    for (let i = 0; i < arr.length; i++) {
        const option = createElement("option", "value", i, arr[i].title);
        selectProject.appendChild(option);
    }
}


function updateToday() {
    today = format(new Date(), "yyyy-LL-dd");
}