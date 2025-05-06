'use client';

import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { createTask, getAllTasks, editTask, deleteTask, completeTask, PaginationParams, PaginatedResponse } from '../../config/api';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

const initialPaginationState: PaginationParams = {
  limit: 5,
  page: 1,
};

const initialTodosState: PaginatedResponse<Todo> = {
  data: [],
  total: 0,
  totalPages: 1,
  currentPage: 1,
};

export default function TodoPage() {
  const [todos, setTodos] = useState<PaginatedResponse<Todo>>(initialTodosState);
  const [loading, setLoading] = useState(false);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>(initialPaginationState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllTasks(pagination);
        console.log('API Response:', data);
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setError('Failed to fetch tasks. Please try again.');
        setTodos(initialTodosState);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [pagination]);

  const handleAddTodo = async (title: string, description: string) => {
    setLoading(true);
    try {
      setError(null);
      await createTask(title, description);
      const data = await getAllTasks(pagination);
      console.log('After Add - API Response:', data);
      setTodos(data);
    } catch (error) {
      console.error('Failed to add todo:', error);
      setError('Failed to add task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTodo = async (id: string) => {
    setCompletingId(id);
    try {
      setError(null);
      await completeTask(id);
      const data = await getAllTasks(pagination);
      setTodos(data);
    } catch (error) {
      console.error('Failed to complete todo:', error);
      setError('Failed to complete task. Please try again.');
    } finally {
      setCompletingId(null);
    }
  };

  const handleEditTodo = async (id: string, title: string, description: string) => {
    try {
      setError(null);
      await editTask(id, title, description);
      const data = await getAllTasks(pagination);
      setTodos(data);
    } catch (error) {
      console.error('Failed to edit todo:', error);
      setError('Failed to edit task. Please try again.');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setDeletingId(id);
    try {
      setError(null);
      await deleteTask(id);
      setTodos(prev => ({
        ...prev,
        data: prev.data.filter(todo => todo.id !== id),
        total: prev.total - 1,
      }));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setError('Failed to delete task. Please try again.');
      const data = await getAllTasks(pagination);
      setTodos(data);
    } finally {
      setDeletingId(null);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleLimitChange = (limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="fixed top-0 left-0 w-80 h-screen bg-gray-50 p-6 border-r border-gray-200 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Add a Task</h1>
        <TodoForm onSubmit={handleAddTodo} loading={loading} />
      </div>
      <div className="ml-80 px-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-center py-4 text-gray-500">
              Loading tasks...
            </div>
          ) : (
            <TodoList
              todos={todos}
              onComplete={handleCompleteTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              loadingId={completingId}
              deletingId={deletingId}
              currentPage={pagination.page}
              limit={pagination.limit}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
            />
          )}
        </div>
      </div>
    </main>
  );
} 