import { useState } from 'react';
import type { Todo } from '../types/data';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
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
    <div className={styles.wrapper}>
      <Header />
      <main>
        <Container>
          <TodoForm addTodo={addTodo} />
          {todos.length > 0 ? (
            <TodoList
              items={todos}
              removeTodo={removeTodo}
              toggleCompleted={toggleCompleted}
            />
          ) : (
            <p className={styles.empty}>There are no todos yet</p>
          )}
        </Container>
      </main>
    </div>
  );
};

export default App;
