const tasksListElement = document.querySelector("#tasks-list") as HTMLUListElement;
const taskTitleInputElement = document.querySelector("#title-input") as HTMLInputElement;
const taskDescriptionInputElement = document.querySelector("#description-input") as HTMLTextAreaElement;
const createTaskBtnElement = document.querySelector("#create-task-btn") as HTMLButtonElement;

class TaskManager {
    tasks: Task[] = [];

    init() {
        // Escuta o evento de clique no botão de criação da tarefa
        createTaskBtnElement.onclick = () => {
            const title = taskTitleInputElement.value;
            const description = taskDescriptionInputElement.value;

            this.addTask(title, description);
        };

        // Escuta o evento marcar/desmarcar o checkbox da tarefa
        tasksListElement.addEventListener("change", (e) => {
            const checkBoxInput = e.target as HTMLInputElement;

            const taskId = checkBoxInput.parentElement?.dataset.id;

            if (!taskId) return;

            this.toggleTaskStatus(taskId);
        });
    }

    getTask(id: string) {
        return this.tasks.find((task) => task.id === id);
    }

    getTaskElement(id: string) {
        return tasksListElement.querySelector(`li[data-id="${id}"]`);
    }

    toggleTaskStatus(id: string) {
        const task = taskManager.getTask(id);

        if (!task) return;

        task.toggleTaskStatus();

        this.getTaskElement(id)?.classList.toggle("done");
    }

    addTask(title: string, description: string) {
        const task = new Task(title, description);
        this.tasks.push(task);

        tasksListElement.innerHTML += task.getHTML();
    }
}

class Task {
    id: string;
    title: string;
    description: string;
    isDone: boolean;
    creationDate: Date;

    constructor(title: string, description: string) {
        const date = new Date();

        this.id = `${title.toLowerCase().replace(" ", "-")}.${date.toISOString()}`;
        this.title = title;
        this.description = description;
        this.isDone = false;
        this.creationDate = date;
    }

    toggleTaskStatus() {
        this.isDone = !this.isDone;
    }

    getHTML() {
        return `<li data-id="${this.id}">
            <div>
                <span>${this.creationDate.toLocaleString()}</span>
                <h3>${this.title}</h3>
                <p>${this.description}</p>
            </div>
        
            <input type="checkbox" />
        </li>
    `;
    }
}

const taskManager = new TaskManager();
taskManager.init();
