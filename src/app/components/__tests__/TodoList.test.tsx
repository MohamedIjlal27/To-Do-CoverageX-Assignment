import { render, screen } from '@testing-library/react'
import TodoList from '../TodoList'
import { PaginatedResponse } from '../../../config/api'

describe('TodoList', () => {
  const mockTodos: PaginatedResponse<any> = {
    data: [
      {
        id: '1',
        title: 'Test Todo 1',
        description: 'Test Description 1',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Test Todo 2',
        description: 'Test Description 2',
        status: 'completed'
      }
    ],
    total: 2,
    totalPages: 2,
    currentPage: 1
  }

  const mockProps = {
    todos: mockTodos,
    onComplete: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    loadingId: null,
    deletingId: null,
    currentPage: 1,
    limit: 10,
    onPageChange: jest.fn(),
    onLimitChange: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders list of todos correctly', () => {
    render(<TodoList {...mockProps} />)
    
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument()
    expect(screen.getByText('Test Description 1')).toBeInTheDocument()
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument()
    expect(screen.getByText('Test Description 2')).toBeInTheDocument()
  })

  it('shows empty state when no todos', () => {
    const emptyTodos: PaginatedResponse<any> = {
      ...mockTodos,
      data: []
    }
    render(<TodoList {...mockProps} todos={emptyTodos} />)
    
    expect(screen.getByText('No tasks available')).toBeInTheDocument()
  })

  it('passes correct loading state to TodoCard', () => {
    render(<TodoList {...mockProps} loadingId="1" />)
    
    const todoCards = screen.getAllByRole('button', { name: /Done|Edit|Delete/ })
    todoCards.forEach(button => {
      if (button.closest('[data-testid="todo-1"]')) {
        expect(button).toBeDisabled()
      }
    })
  })

  it('passes correct deleting state to TodoCard', () => {
    render(<TodoList {...mockProps} deletingId="2" />)
    
    const todoCards = screen.getAllByRole('button', { name: /Done|Edit|Delete/ })
    todoCards.forEach(button => {
      if (button.closest('[data-testid="todo-2"]')) {
        expect(button).toBeDisabled()
      }
    })
  })

  it('renders pagination component', () => {
    render(<TodoList {...mockProps} />)
    
    expect(screen.getByLabelText('Show:')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
}) 