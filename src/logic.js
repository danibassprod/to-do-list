class CreateToDo {
    constructor(title = 'No title provided.', desc = 'No description provided', date = 'No date provided.', dueDate = 'No due date provided.', priority = 0) {
        this.title = title,
        this.desc = desc,
        this.date = date,
        this.dueDate = dueDate,
        this.priority = priority
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