console.log("js");

const clearbtn = document.getElementById("clearbtn")
const inputValue = document.getElementById("inputValue")
const addBtn = document.getElementById("addBtn")
const form = document.getElementById("form")
const tasklistBox = document.querySelector(".task-list")
let task = JSON.parse(localStorage.getItem("todoJS")) || []
displayTask();


form.addEventListener("submit", function (e) {
    e.preventDefault();   // stop page refresh

    // getting user text
    const userText = inputValue.value.trim();

    const isValid = userText && !task.some(ele => ele.text === userText);

    if (isValid) {
        task.push({ text: userText, checked: false });
        localStorage.setItem("todoJS", JSON.stringify(task))
        displayTask();
    }
    inputValue.value = "";
});



// displaying tasks
function displayTask() {

    tasklistBox.innerHTML = "";
    task.forEach((curEle) => {
        let itemLi = document.createElement("li")
        itemLi.classList.add("task-item")
        itemLi.innerHTML = `
        <span class="task-text">${curEle.text}</span>
        <div class="task-actions">
        <button class="check-btn">✔</button>
        <button class="delete-btn">✖</button>
        </div>
        `
        let textSpan = itemLi.querySelector(".task-text");

        if (curEle.checked) {
            textSpan.classList.add("checked");
        }
        tasklistBox.appendChild(itemLi)
    })
}


// delete item
tasklistBox.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete-btn")) {

        let deleteTask = e.target.closest(".task-item");  // li
        let taskText = deleteTask.querySelector(".task-text").innerText;

        task = task.filter(ele => ele.text !== taskText);
        localStorage.setItem("todoJS", JSON.stringify(task))


        displayTask();
    }
});


// delete all
document.querySelector(".clearbtn").addEventListener("click", (e) => {
    task = []
    localStorage.setItem("todoJS", JSON.stringify(task))
    displayTask()
})


// cheched item
tasklistBox.addEventListener("click", (e) => {

    if (e.target.classList.contains("check-btn")) {
        let checkTask = e.target.closest(".task-item").querySelector(".task-text").innerText;

        task = task.map((curEle) => {
            if (curEle.text === checkTask) {
                return { ...curEle, checked: !curEle.checked }
            }
            return curEle
        })
        localStorage.setItem("todoJS", JSON.stringify(task));
        displayTask();
    }
});