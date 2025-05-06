import TodoCard from './TodoCard';
import Pagination from './Pagination';
import { PaginatedResponse } from '../../config/api';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
  status?: string;
}

interface TodoListProps {
  todos: PaginatedResponse<Todo>;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  loadingId: string | null;
  deletingId: string | null;
  currentPage: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export default function TodoList({
  todos,
  onComplete,
  onDelete,
  onEdit,
  loadingId,
  deletingId,
  currentPage,
  limit,
  onPageChange,
  onLimitChange,
}: TodoListProps) {
  if (!todos?.data || todos.data.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No tasks available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {todos.data.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.status === 'completed'}
            onComplete={onComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            loading={loadingId === todo.id || deletingId === todo.id}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={todos.totalPages || 1}
        limit={limit}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
} 