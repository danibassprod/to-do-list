export const DOMElements = {
    container: document.querySelector('#container'),
    projects: document.querySelectorAll('.project'),
    buttons: {
        newProject: document.querySelector('#nproject'),
        newTodo: document.querySelector('#ntodo'),
        cancelBtns: document.querySelectorAll('.cancel')
    },
    forms: {
        todoDialog: document.querySelector('#newTodo'),
        projectDialog: document.querySelector('#newProject')
    }
};

DOMElements.buttons.newProject.addEventListener('click', function(){
    console.log(2);
});

DOMElements.buttons.newTodo.addEventListener('click', function(){
    DOMElements.forms.todoDialog.showModal();
});

DOMElements.buttons.cancelBtns.forEach(btn => btn.addEventListener('click', function(){
    DOMElements.forms.projectDialog.close();
    DOMElements.forms.todoDialog.close();
}))