'use client';

import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { createTask, getAllTasks, editTask, deleteTask, completeTask } from '../../config/api';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed?: boolean;
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTodo = async (title: string, description: string) => {
    setLoading(true);
    try {
      await createTask(title, description);
      const data = await getAllTasks();
      setTodos(data);
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTodo = async (id: string) => {
    setCompletingId(id);
    try {
      await completeTask(id);
      const data = await getAllTasks();
      setTodos(data);
    } catch (error) {
      console.error('Failed to complete todo:', error);
    } finally {
      setCompletingId(null);
    }
  };

  const handleEditTodo = async (id: string, title: string, description: string) => {
    try {
      await editTask(id, title, description);
      const data = await getAllTasks();
      setTodos(data);
    } catch (error) {
      console.error('Failed to edit todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteTask(id);
      // Optimistically update the UI
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
      // If deletion fails, refresh the list to ensure consistency
      const data = await getAllTasks();
      setTodos(data);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="fixed top-0 left-0 w-80 h-screen bg-gray-50 p-6 border-r border-gray-200 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Add a Task</h1>
        <TodoForm onSubmit={handleAddTodo} loading={loading} />
      </div>
      <div className="ml-80 px-8">
        <div className="max-w-4xl mx-auto">
          <TodoList
            todos={todos}
            onComplete={handleCompleteTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            loadingId={completingId}
            deletingId={deletingId}
          />
        </div>
      </div>
    </main>
  );
} 