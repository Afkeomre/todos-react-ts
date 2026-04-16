import type { Todo, TodoActionById } from '../../types/data';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

interface TodoListProps {
  items: Todo[];
  removeTodo: TodoActionById;
  toggleCompleted: TodoActionById;
}

const TodoList = ({ items, removeTodo, toggleCompleted }: TodoListProps) => {
  return (
    <div className={styles.todos}>
      {items.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          removeTodo={removeTodo}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </div>
  );
};

export default TodoList;
