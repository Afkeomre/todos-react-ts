import { useState } from 'react';
import type { Todo } from '../types/data';
import TodoList from '../components/TodoList/TodoList';
import TodoForm from '../components/TodoForm/TodoForm';
import styles from './App.module.css';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (value: string) => {
    setTodos([...todos, { id: Date.now(), title: value, completed: false }]);
  };

  const removeTodo = (id: number) => {
    const filtered = todos.filter((t) => t.id !== id);
    setTodos(filtered);
  };

  const toggleCompleted = (id: number) => {
    const changed = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    setTodos(changed);
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        items={todos}
        removeTodo={removeTodo}
        toggleCompleted={toggleCompleted}
      />
    </div>
  );
};

export default App;
