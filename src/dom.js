import { userProjects } from ".";
import { validationChecks } from "./logic";

export const DOMElements = {
    container: document.querySelector('#container'),
    projects: document.querySelectorAll('.project'),
    buttons: {
        newProject: document.querySelector('#nproject'),
        newTodo: document.querySelector('#ntodo'),
        cancelBtns: document.querySelectorAll('.cancel'),
        submit: {
            project: document.querySelector('.send-project'),
            todo: document.querySelector('.send-todo')
        }
    },
    forms: {
        projectDialog: document.querySelector('#newProject'),
        projectInputs: {
            title: document.querySelector('.project-title'),
            desc: document.querySelector('.project-desc')
        },
        todoDialog: document.querySelector('#newTodo'),
        todoInputs: {
            title: document.querySelector('.todo-title'),
            desc: document.querySelector('.todo-desc'),
            dueDate: document.querySelector('.todo-duedate'),
            priority: document.querySelector('#priority'),
            project: document.querySelector('#project'),
            completed: document.querySelector('#completed')
        }
    }
};

const DOMHandler = {
    render: {
        project: function(){

            if (validationChecks.checkNewProject() === 0) return
            // if (validationChecks.checkForDuplicates() === 0) return

            const projectList = document.querySelectorAll('.project');

            const projectNumb = projectList.length;
            const projectContainer = document.createElement('div');
            projectContainer.classList.add('project');
            projectContainer.dataset.index = projectNumb;
    
            const h3 = document.createElement('h3')
            h3.textContent = DOMElements.forms.projectInputs.title.value;
    
            const desc = document.createElement('p');
            desc.textContent = DOMElements.forms.projectInputs.desc.value;
    
            projectContainer.appendChild(h3);
            projectContainer.appendChild(desc);
            
            DOMElements.container.appendChild(projectContainer);
        }
    },

    removeProjectList: function(){
        const currentProjectList = document.querySelectorAll('.project-opt');
        currentProjectList.forEach(project => DOMElements.forms.todoInputs.project.removeChild(project));
    },

    addProjectToList: function(){

    },

    projectContent: function(){},

    remove: function(){}
}

DOMElements.buttons.newProject.addEventListener('click', () => { DOMElements.forms.projectDialog.showModal(); });

DOMElements.buttons.newTodo.addEventListener('click', () => { DOMElements.forms.todoDialog.showModal(); });

DOMElements.buttons.cancelBtns.forEach(btn => btn.addEventListener('click', () => {
    DOMElements.forms.projectDialog.close();
    DOMElements.forms.todoDialog.close();
}));

DOMElements.buttons.submit.project.addEventListener('click', () => { 
    DOMHandler.removeProjectList();
    DOMHandler.render.project();
    DOMHandler.addProjectToList();
});