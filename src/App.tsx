import { useState } from "react";
import styles from "./App.module.scss";

type TodoItem = {
  id: number;
  task: string;
  completed: boolean;
};

type TodoList = TodoItem[];

function App(): TodoList{

  const [todoList, setTodoList] = useState<TodoList>([{id:1, task: 'do smth', completed: false}]);
  const [taskInput, setTaskInput] = useState<TodoItem>({ id: 0, task: '', completed: false });

  const handleAddTodo = () => {
    if (taskInput.task.trim() === '') return;
    const newTodo: TodoItem = {
      id: Date.now(),
      task: taskInput.task,
      completed: false
    };
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    setTaskInput({ id: 0, task: '', completed: false });
  };
  


  return (
    <main className={`${styles.readingZone} ${styles.flowContainer}`}>
      <h1>todo list</h1>

      <form name="addTodo" className={styles.addTodoForm}>
        <h2>create todo</h2>
        <div className={styles.formControl}>
          <label htmlFor="todo-description">description</label>
          <input
            type="text"
            id="todo-description"
            value={taskInput.task}
            name="description"
            onChange={e => setTaskInput({...taskInput, task: e.target.value})}
          />
        </div>
        {console.log(todoList)}
        <button type="button" onClick={handleAddTodo} className={styles.buttonPrimary}>➕ Add</button>
      </form>
     


      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{ todo.task}</li>
        ))}



        <li className={styles.todoItem}>
          <input type="checkbox" id="todo1-checkbox" checked />
          <label htmlFor="todo1-checkbox">Create a new project with vite</label>
        </li>
        <li className={styles.todoItem}>
          <input type="checkbox" id="todo2-checkbox" checked />
          <label htmlFor="todo2-checkbox">npm install</label>
        </li>
        <li className={styles.todoItem}>
          <input type="checkbox" id="todo3-checkbox" checked />
          <label htmlFor="todo3-checkbox">npm run dev</label>
        </li>
        <li className={styles.todoItem}>
          <input type="checkbox" id="todo4-checkbox" />
          <label htmlFor="todo4-checkbox">Develop my app</label>
        </li>
      </ul>
      <menu className={styles.filtersMenu}>
        <li>All</li>
        <li><a href="#">Open</a></li>
        <li><a href="#">Done</a></li>
      </menu>
    </main>
  );
}

export default App;
