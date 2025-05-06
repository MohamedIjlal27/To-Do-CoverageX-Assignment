'use client';

import { useState } from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

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

  const handleAddTodo = (title: string, description: string) => {
    setLoading(true);
    try {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title,
        description,
        completed: false
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTodo = (id: string) => {
    setCompletingId(id);
    try {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      );
    } catch (error) {
      console.error('Failed to complete todo:', error);
    } finally {
      setCompletingId(null);
    }
  };

  const handleDeleteTodo = (id: string) => {
    try {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <main className="min-h-screen bg-white py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl p-8">
        <div className="flex gap-8">
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-6">Add a Task</h1>
            <TodoForm onSubmit={handleAddTodo} loading={loading} />
          </div>
          <div className="w-px bg-gray-300 mx-2" />
          <div className="flex-1 flex flex-col justify-start">
            <TodoList
              todos={todos}
              onComplete={handleCompleteTodo}
              onDelete={handleDeleteTodo}
              loadingId={completingId}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 