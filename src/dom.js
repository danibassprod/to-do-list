import { validationChecks } from "./logic.js";
import { getCurrentProjects } from "./logic.js";

export const DOMElements = {
    container: document.querySelector('#container'),
    projects: document.querySelectorAll('.project'),
    todosDisplay: document.querySelector('#projectDisplay'),
    todosDisplayFieldset: document.querySelector('#projectDisplay').childNodes[0].childNodes[0],
    buttons: {
        newProject: document.querySelector('#nproject'),
        newTodo: document.querySelector('#ntodo'),
        cancelBtns: document.querySelectorAll('.cancel'),
        submit: {
            project: document.querySelector('.send-project'),
            todo: document.querySelector('.send-todo')
        },
        closeBtn: document.querySelector('.todo-close-btn')
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
            projectList: document.querySelector('#project'),
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
            projectContainer.classList.add(removeSpacesFromText(DOMElements.forms.projectInputs.title.value));

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

    projectEventListenerHandler: function(){
        document.querySelectorAll('.project').forEach(project => project.removeEventListener('click', DOMHandler.renderProjectContent))

        document.querySelectorAll('.project').forEach(project => project.addEventListener('click', DOMHandler.renderProjectContent))
    },

    removeProjectContent: function(){
        while (DOMElements.todosDisplayFieldset.childNodes.length > 0) {
            if (typeof DOMElements.todosDisplayFieldset.childNodes[0] !== 'undefined') {
                DOMElements.todosDisplayFieldset.childNodes[0].remove()
            }
         }
    },

    renderProjectContent: function(){

        DOMHandler.removeProjectContent()

        for (let key in getCurrentProjects()){
            
          if (removeSpacesFromText(getCurrentProjects()[key].title) === removeSpacesFromText(this.childNodes[0].textContent)) {
                
          }
        }   
    },

    addProjectTodoList: function(){

        if (validationChecks.checkNewProject() === 0) return 

        const option = document.createElement('option')
        option.textContent = DOMElements.forms.projectInputs.title.value
        option.classList.add('project-opt')
        option.setAttribute('value', DOMElements.forms.todoInputs.title.value)
        DOMElements.forms.todoInputs.projectList.appendChild(option)
    }
}

export function removeSpacesFromText (string){
    return string.toString().split('').filter(char => char === ' ' ? false : true).join('')
}

DOMElements.buttons.newProject.addEventListener('click', () => { DOMElements.forms.projectDialog.showModal(); });

DOMElements.buttons.newTodo.addEventListener('click', () => { DOMElements.forms.todoDialog.showModal(); });

DOMElements.buttons.cancelBtns.forEach(btn => btn.addEventListener('click', () => {
    DOMElements.forms.projectDialog.close();
    DOMElements.forms.todoDialog.close();
}));

DOMElements.buttons.submit.project.addEventListener('click', () => { 
    DOMHandler.render.project();
    DOMHandler.addProjectTodoList()
    DOMHandler.projectEventListenerHandler()
});

DOMElements.buttons.closeBtn.addEventListener('click', function(){ DOMElements.todosDisplay.close(); })

DOMHandler.projectEventListenerHandler()