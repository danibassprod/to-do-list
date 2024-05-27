import { userProjects } from "./index.js";
import { DOMElements } from "./dom.js";

class CreateToDo {
    constructor(title = 'No title provided.', desc = 'No description provided', date = new Date().getFullYear(), dueDate, priority, project, completed) {
        this.title = title,
        this.desc = desc,
        this.date = date,
        this.dueDate = dueDate,
        this.priority = priority,
        this.project = project,
        this.completed = completed
    }
}

class CreateProject {
    constructor(title, desc) {
        this.title = title,
        this.desc = desc,
        this.todos = []
    }
}

export const validationChecks = {
    checkNewProject: function(){
        if ((DOMElements.forms.projectInputs.title.value === '' && DOMElements.forms.projectInputs.desc.value === '') || (DOMElements.forms.projectInputs.title.value.length < 5 || DOMElements.forms.projectInputs.desc.value.length < 5)) return 0
    },
    checkNewTodo: function(){
        if ((DOMElements.forms.todoInputs.title.value === '' && DOMElements.forms.todoInputs.desc.value === '') || (DOMElements.forms.todoInputs.title.value.length < 3 || DOMElements.forms.todoInputs.desc.value.length < 5)) return 0
        if (DOMElements.forms.todoInputs.dueDate.value === '') return 0
        if (DOMElements.forms.todoInputs.project.value === '') return 0
    },
}

DOMElements.buttons.submit.project.addEventListener('click', () => { 

    if (validationChecks.checkNewProject() === 0) return

    userProjects[DOMElements.forms.projectInputs.title.value] = new CreateProject(
        DOMElements.forms.projectInputs.title.value,
        DOMElements.forms.projectInputs.desc.value
    );

    console.log(userProjects);
});

DOMElements.buttons.submit.todo.addEventListener('click', function(){

    if (validationChecks.checkNewTodo() === 0) return

    userProjects.defaultProject.todos.push(new CreateToDo(
        DOMElements.forms.todoInputs.title.value,
        DOMElements.forms.todoInputs.desc.value,
        new Date().getFullYear(),
        DOMElements.forms.todoInputs.dueDate.value,
        DOMElements.forms.todoInputs.priority.value,
        DOMElements.forms.todoInputs.project.value,
        DOMElements.forms.todoInputs.completed.value
    ))
});

export { CreateProject, CreateToDo } 