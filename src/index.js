import './css/reset.css';
import './css/style.css';
import { CreateProject, CreateToDo } from './logic';

const userProjects = {};

userProjects.defaultProject = new CreateProject(
    'Default Project', 
    'You can use this project to test this app!'
);

userProjects.defaultProject.todos.push(new CreateToDo(
    'Practice 15 minutes a day typing', 
    'Use resources like Typing Club', 
    new Date().getFullYear(), 
    2025, 
    3)
);

console.log(userProjects);