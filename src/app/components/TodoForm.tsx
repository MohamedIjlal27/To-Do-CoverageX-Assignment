'use client';

import { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string, description: string) => void;
  loading: boolean;
}

export default function TodoForm({ onSubmit, loading }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-8">
        <label htmlFor="title" className="sr-only">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-lg py-3 px-4 mb-6 text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Title"
          required
        />
        <label htmlFor="description" className="sr-only">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-200 rounded-lg py-3 px-4 mb-6 text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Description"
          rows={4}
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
} 