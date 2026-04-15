import type { Todo, TodoActionById } from '../../types/data';
import styles from './TodoItem.module.css';

interface TodoItemProps extends Todo {
  removeTodo: TodoActionById;
  toggleCompleted: TodoActionById;
}

const TodoItem = ({
  id,
  title,
  completed,
  removeTodo,
  toggleCompleted,
}: TodoItemProps) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleCompleted(id)}
      />
      <span className={styles.title}>{title}</span>
      <button className={styles.button} onClick={() => removeTodo(id)}>
        x
      </button>
    </div>
  );
};

export default TodoItem;
