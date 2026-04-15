export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoActionById = (id: number) => void;
