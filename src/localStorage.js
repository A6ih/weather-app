export default function saveToLocalStorage(array) {
    localStorage.setItem("localApp", JSON.stringify(array));
}

export function getFromLocalStorage() {
    if(localStorage.length === 0) {
        saveToLocalStorage([{"title":"My Project","description":"The default project.","tasks":[{"title":"Complete the Todo App","description":"Complete the Todo App from the odin project","dueDate":"2025-02-10","priority":"High","note":"Learn from your mistakes","id":0,"projectId":0},{"title":"Start learning React","description":"Start learning react after completing the Javascript section","dueDate":"2025-03-01","priority":"Medium","note":"Do not Rush","id":1,"projectId":0},{"title":"Complete FullStack course","description":"Complete the FullStack course from The Odin Project","dueDate":"2025-05-15","priority":"Low","note":"Understand all the concepts well","id":2,"projectId":0}],"id":0}]);
    }
    return JSON.parse(localStorage.getItem("localApp"));
}