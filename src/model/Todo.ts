// A Todo entity interface

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
