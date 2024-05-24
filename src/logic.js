class CreateToDo {
    constructor(title = 'No title provided.', desc = 'No description provided', date = new Date().getFullYear(), dueDate = 'No due date provided.', priority = 0, completed = false, project) {
        this.title = title,
        this.desc = desc,
        this.date = date,
        this.dueDate = dueDate,
        this.priority = priority,
        this.completed = completed,
        this.project = project
    }
}

class CreateProject {
    constructor(title, desc) {
        this.title = title,
        this.desc = desc,
        this.todos = []
    }
}

export { CreateProject, CreateToDo } 