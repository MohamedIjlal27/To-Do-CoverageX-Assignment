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
  onEdit: (id: string, title: string, description: string) => void;
  loadingId: string | null;
  deletingId: string | null;
}

export default function TodoList({ todos, onComplete, onDelete, onEdit, loadingId, deletingId }: TodoListProps) {
  return (
    <div className="space-y-6">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
          loading={loadingId === todo.id || deletingId === todo.id}
        />
      ))}
    </div>
  );
} 