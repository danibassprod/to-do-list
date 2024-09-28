import './css/reset.css';
import './css/style.css';
import { CreateProject, CreateToDo, userProjects } from './logic';

userProjects.default = new CreateProject('Default Project', 'Project for test purposes')

userProjects.default.todos.push(new CreateToDo(
    'test title',
    'test desc',
    '31-12 -1231',
    '42-31-1351',
    'high',
    'default',
    'no'
))