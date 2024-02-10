import { useState } from "react";
import styles from "./App.module.scss";

type TodoItem = {
  id: number;
  task: string;
  completed: boolean;
};

type TodoList = TodoItem[];

function App(): TodoList{

  const [todoList, setTodoList] = useState<TodoList>([]);
  
  const [taskInput, setTaskInput] = useState<TodoItem>({ id: 0, task: '', completed: false });

  const [filter, setFilter] = useState<string>('All');

  const handleFilter = (filterValue: string) => {
    setFilter(filterValue);
  }

  const filteredTodoList = todoList.filter(todo => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Open') {
      return !todo.completed;
    } else if (filter === 'Done') {
      return todo.completed;
    }
    return true;
  })

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

  const handleTodoToggle = (id: number) => {
    setTodoList(prevTodoList => prevTodoList.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    );
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
        <button type="button" onClick={handleAddTodo} className={styles.buttonPrimary}>➕ Add</button>
      </form>
     
      <ul>
        {filteredTodoList.map(todo => (
          <li className={styles.todoItem} key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleTodoToggle(todo.id)}
            /> 
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
          </li>
        ))}

      </ul>
      <menu className={styles.filtersMenu}>
        <li>
          <button onClick={()=> handleFilter('All')}>All</button>
        </li>
        <li>
          <button onClick={()=> handleFilter('Open')}>Open</button>
        </li>
        <li>
          <button onClick={()=> handleFilter('Done')}>Done</button>
        </li>
      </menu>
    </main>
  );
}

export default App;
