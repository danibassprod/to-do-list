import { userProjects, validationChecks } from "./logic.js";
import { getCurrentProjects } from "./logic.js";
import Icon from './img/icons/edit.svg';
import Icon2 from './img/icons/remove.svg';

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
    },
    currentDisplay: {
        project: null,
        todo: null
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

    removeRenderedProjectContent: function(){
        while (DOMElements.todosDisplayFieldset.childNodes.length > 0) {
            if (typeof DOMElements.todosDisplayFieldset.childNodes[0] !== 'undefined') {
                DOMElements.todosDisplayFieldset.childNodes[0].remove();
            }
         }
    },

    renderProjectContent: function(){

        DOMHandler.removeRenderedProjectContent()

        for (let key in getCurrentProjects()){
            
          if (removeSpacesFromText(getCurrentProjects()[key].title) === removeSpacesFromText(this.childNodes[0].textContent)) {

            // Stores current working project on currentDisplay obj

            DOMElements.currentDisplay.project = [key][0];
            // console.log(DOMElements.currentDisplay.project)
            
                const legend = document.createElement('legend');
                legend.textContent = getCurrentProjects()[key].title;

                // Creates To dos and renders them

                getCurrentProjects()[key].todos.forEach(function(todo){
                    const todoDiv = document.createElement('div')
                    todoDiv.classList.add('todo', `pri-${todo.priority}`)

                    const title = document.createElement('p');
                    const strong = document.createElement('strong');
                    strong.textContent = `${todo.title}`;
                    title.appendChild(strong)

                    const date = document.createElement('p');
                    date.textContent = `${todo.dueDate}`;

                    const priority = document.createElement('p');
                    priority.textContent = `${todo.priority.toUpperCase()}`;

                    const viewEditBtnContainer = document.createElement('div');
                    viewEditBtnContainer.classList.add('view-edit-btn');

                    // Creates view btn

                    const viewBtn = document.createElement('button');
                    viewBtn.classList.add('view');
                    viewBtn.setAttribute('type', 'button');

                    const viewBtnImg = new Image();
                    viewBtnImg.src = Icon;
                    viewBtn.appendChild(viewBtnImg);

                    const viewBtn2 = document.createElement('button');
                    viewBtn2.classList.add('edit');
                    viewBtn2.setAttribute('type', 'button')

                    const viewBtnImg2 = new Image();
                    viewBtnImg2.src = Icon2;
                    viewBtn2.appendChild(viewBtnImg2);

                    viewEditBtnContainer.appendChild(viewBtn)
                    viewEditBtnContainer.appendChild(viewBtn2)
                    
                    todoDiv.appendChild(title);
                    todoDiv.appendChild(date);
                    todoDiv.appendChild(priority);
                    todoDiv.appendChild(viewEditBtnContainer);

                    DOMElements.todosDisplayFieldset.appendChild(todoDiv);  
                })
                    
                DOMElements.todosDisplayFieldset.appendChild(legend);
                DOMHandler.showTodoInfo();
          }
        }

        DOMElements.todosDisplay.showModal()
    },

    addProjectTodoList: function(){

        if (validationChecks.checkNewProject() === 0) return 

        const option = document.createElement('option')
        option.textContent = DOMElements.forms.projectInputs.title.value
        option.classList.add('project-opt')
        option.setAttribute('value', DOMElements.forms.projectInputs.title.value)
        DOMElements.forms.todoInputs.projectList.appendChild(option)
    },

    showTodoInfo: function(){
        document.querySelectorAll('.todo').forEach(todo => todo.addEventListener('click', function(){
            // console.log(getCurrentProjects()[DOMElements.currentDisplay.project].todos)
        }))
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
    DOMHandler.addProjectTodoList();
    DOMHandler.projectEventListenerHandler();
});

DOMElements.buttons.closeBtn.addEventListener('click', function(){ DOMElements.todosDisplay.close(); })

DOMHandler.projectEventListenerHandler();

DOMElements.forms.projectInputs.title.value = 'default';