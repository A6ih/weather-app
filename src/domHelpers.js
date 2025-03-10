import { format, isToday, isTomorrow, isPast, isYesterday} from "date-fns";

export function clearInputs(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].value = "";
    }
}

export function hideAllTaskElements() {
    Array.from(document.querySelectorAll(".task-description")).
        forEach(item => item.style.display = "none");
    Array.from(document.querySelectorAll(".task-note")).
        forEach(item => item.style.display = "none");
    Array.from(document.querySelectorAll(".task-btn-container")).
        forEach(item => item.style.display = "none");
}

export function showTaskElements(index) { 
    const description = document.querySelectorAll(".task-description");
    const notes = document.querySelectorAll(".task-note");
    const BtnContainer = document.querySelectorAll(".task-btn-container");
    description[index].style.display = "block";
    notes[index].style.display = "block";
    BtnContainer[index].style.display = "flex";
}

export function hideTaskElements(index) {
    const description = document.querySelectorAll(".task-description");
    const notes = document.querySelectorAll(".task-note");
    const BtnContainer = document.querySelectorAll(".task-btn-container");
    description[index].style.display = "none";
    notes[index].style.display = "none";
    BtnContainer[index].style.display = "none";
}

export function updateRenderDate(date) {
    if (isToday(new Date(date))) {
        return "Today";
    }
    else if(isTomorrow(new Date(date))) {
        return "Tomorrow";
    }
    else if(isYesterday(new Date(date))) {
        return "Expired Yesterday"
    }
    else if(isPast(new Date(date))) {
        return `Expired on ${format(new Date(date), "dd MMMM yyyy")}`;
    }
    else {
        return format(new Date(date), "dd MMMM yyyy");
    }
}

export function addPriorityColor(div, element) {
    if(element.textContent === "Priority: High") {
        div.style.borderColor = "var(--red-color)";
        element.style.textShadow = "0 0 2px var(--red-color)"
    }
    else if(element.textContent === "Priority: Medium") {
        div.style.borderColor = "var(--yellow-color)";
        element.style.textShadow = "0 0 2px var(--yellow-color)"
    }
}