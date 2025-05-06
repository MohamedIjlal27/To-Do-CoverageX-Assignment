import TodoCard from './TodoCard';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  loadingId: string | null;
}

export default function TodoList({ todos, onComplete, onDelete, loadingId }: TodoListProps) {
  return (
    <div className="space-y-6">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          onComplete={onComplete}
          onDelete={onDelete}
          loading={loadingId === todo.id}
        />
      ))}
    </div>
  );
} 