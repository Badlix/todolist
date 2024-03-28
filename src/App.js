import './styles/App.css';
import './styles/Task.css'
import Task from './Task';
import {useState} from "react";
import { FaRegPlusSquare } from "react-icons/fa";

function App(key, value) {
  const [tasks, setTasks] = useState(getLocalStorage());
  const [newTaskName, setNewTaskName] = useState("");

  function getLocalStorage() {
    let storageTasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = JSON.parse(localStorage.getItem(key));
      storageTasks.push(value);
    }
    return storageTasks;
  }


  function removeTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
    localStorage.removeItem(taskId)
  }

  function addTask() {
    if (newTaskName.length !== 0) {
      let newId = getNewId();
      setTasks([...tasks, { id: newId, name: newTaskName, isDone:false, date:"" }]);
      localStorage.setItem(newId.toString(), JSON.stringify({ id: newId, name: newTaskName, isDone:false, date:new Date() }))
      setNewTaskName(""); // Vide l'input
    }
  }

  function getNewId() {
    let newId = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = parseInt(localStorage.key(i));
      if (key >= newId) {
        newId = key + 1;
      }
    }
    return newId;
  }

  function modifyTask(taskId, newName, newDate) {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, name: newName, date: newDate } : task));
    const value = JSON.parse(localStorage.getItem(taskId))
    localStorage.setItem(taskId, JSON.stringify({ id: taskId, name: newName, isDone:value.isDone, date:newDate }))
  }

  function changeStatus(taskId, newValue) {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone: newValue } : task));
    const value = JSON.parse(localStorage.getItem(taskId))
    localStorage.setItem(taskId, JSON.stringify({ id: taskId, name: value.name, isDone:newValue, date:value.date }))
  }

  return (
      <div className="container">
        <div>
          <input className="task-input" placeholder="Add a task" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)}/>
          <FaRegPlusSquare className="add-icon" onClick={addTask}/>
        </div>
        <h1>Il reste {tasks.filter(task => !task.isDone).length} taches</h1>
        <ul className="task-list">
          {tasks.map((task, i) => (
              <Task
                  key={i}
                  id={task.id}
                  name={task.name}
                  isDone={task.isDone}
                  date={task.date}
                  removeTask={removeTask}
                  modifyTask={modifyTask}
                  changeStatus={changeStatus}
              ></Task>
          ))}
        </ul>
      </div>
  );
}

export default App;
