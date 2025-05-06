const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export interface PaginationParams {
  limit: number;
  page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function createTask(title: string, description: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
}

export async function getAllTasks({ limit, page }: PaginationParams): Promise<PaginatedResponse<any>> {
  const response = await fetch(`${API_BASE_URL}/tasks/list?limit=${limit}&page=${page}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  const data = await response.json();
  return {
    data: data,
    total: data.length,
    totalPages: Math.ceil(data.length / limit),
    currentPage: page
  };
}

export async function getTaskById(id: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/view/${id}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return response.json();
}

export async function editTask(id: string, title: string, description: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/edit/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  });
  if (!response.ok) {
    throw new Error('Failed to edit task');
  }
  return response.json();
}

export async function completeTask(id: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/complete/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to complete task');
  }
  return response.json();
}

export async function deleteTask(id: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/remove/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return response.json();
} 