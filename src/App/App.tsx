import { useEffect, useState } from 'react';
import type { Todo } from '../types/data';
import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import TodoList from '../components/TodoList/TodoList';
import TodoForm from '../components/TodoForm/TodoForm';
import styles from './App.module.css';

const API_URL = import.meta.env.VITE_SUPABASE_API_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const getHeaders = () => ({
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
});

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}?order=id.asc`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to load todos: ${response.status}`);
      }

      const data = (await response.json()) as Todo[];
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    setError(null);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          ...getHeaders(),
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          title,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }

      const data = (await response.json()) as Todo[];
      const createdTodo = data[0];

      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const removeTodo = async (id: number) => {
    setError(null);

    try {
      const response = await fetch(`${API_URL}?id=eq.${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  const toggleCompleted = async (id: number) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    setError(null);

    const updatedCompleted = !todo.completed;

    try {
      const response = await fetch(`${API_URL}?id=eq.${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          completed: updatedCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status}`);
      }

      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === id ? { ...item, completed: updatedCompleted } : item,
        ),
      );
    } catch (err) {
      setError('Failed to update the todo completion status');
      console.error(err);
    }
  };

  useEffect(() => {
    void loadTodos();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <Container>
          <TodoForm addTodo={addTodo} />

          {isLoading && <p className={styles.empty}>Loading...</p>}

          {error && <p className={styles.error}>{error}</p>}

          {!isLoading && todos.length > 0 && (
            <TodoList
              items={todos}
              removeTodo={removeTodo}
              toggleCompleted={toggleCompleted}
            />
          )}

          {!isLoading && !error && todos.length === 0 && (
            <p className={styles.empty}>There are no todos yet</p>
          )}
        </Container>
      </main>
    </div>
  );
};

export default App;
