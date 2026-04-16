import type { Todo, TodoActionById } from '../../types/data';
import TrashIcon from '../../assets/icons/trash-icon.svg?react';
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
    <div className={styles.item}>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleCompleted(id)}
        />
        <span />
      </label>
      <span className={completed ? styles.completed : ''}>{title}</span>
      <button className={styles.delete} onClick={() => removeTodo(id)}>
        <TrashIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default TodoItem;
