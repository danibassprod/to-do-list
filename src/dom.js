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
        todoDialog: document.querySelector('#newTodo'),
        todoInputs: {
            title: document.querySelector('.project-title'),
            desc: document.querySelector('.project-desc')
        },
        projectDialog: document.querySelector('#newProject')
    }
};

const DOMHandler = {
    render: {
        project: function(){
            
            // several checks before rendering
            const projectList = document.querySelectorAll('.project');
            if (DOMElements.forms.todoInputs.title.value === '' && DOMElements.forms.todoInputs.desc.value === '') return
            if (DOMElements.forms.todoInputs.title.value.length < 5 || DOMElements.forms.todoInputs.desc.value.length < 5) return

            // rendering
            const projectNumb = projectList.length;
            const projectContainer = document.createElement('div');
            projectContainer.dataset.index = projectNumb;
            projectContainer.classList.add('project');
    
            const h3 = document.createElement('h3')
            h3.textContent = DOMElements.forms.todoInputs.title.value;
    
            const desc = document.createElement('p');
            desc.textContent = DOMElements.forms.todoInputs.desc.value;
    
            projectContainer.appendChild(h3);
            projectContainer.appendChild(desc);
            
            DOMElements.container.appendChild(projectContainer);
            
        }
    },
    remove: {
        
    }
}

DOMElements.buttons.newProject.addEventListener('click', () => { DOMElements.forms.projectDialog.showModal(); });

DOMElements.buttons.newTodo.addEventListener('click', () => { DOMElements.forms.todoDialog.showModal(); });

DOMElements.buttons.cancelBtns.forEach(btn => btn.addEventListener('click', () => {
    DOMElements.forms.projectDialog.close();
    DOMElements.forms.todoDialog.close();
}));

DOMElements.buttons.submit.project.addEventListener('click', () => { DOMHandler.render.project(); });