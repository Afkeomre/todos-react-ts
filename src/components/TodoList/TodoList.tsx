import type { Todo, TodoActionById } from '../../types/data';
import TodoItem from '../TodoItem/TodoItem';

interface TodoListProps {
  items: Todo[];
  removeTodo: TodoActionById;
  toggleCompleted: TodoActionById;
}

const TodoList = ({ items, removeTodo, toggleCompleted }: TodoListProps) => {
  return (
    <div>
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
