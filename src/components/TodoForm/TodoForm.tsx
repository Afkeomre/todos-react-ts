import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';

interface TodoFormProps {
  addTodo: (value: string) => void;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!value) return;

    addTodo(value);
    setValue('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} value={value} onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
