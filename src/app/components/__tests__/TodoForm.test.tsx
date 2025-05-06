import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoForm from '../TodoForm'

describe('TodoForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders form elements correctly', () => {
    render(<TodoForm onSubmit={mockOnSubmit} loading={false} />)
    
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  it('handles form submission correctly', async () => {
    render(<TodoForm onSubmit={mockOnSubmit} loading={false} />)
    
    const titleInput = screen.getByPlaceholderText('Title')
    const descriptionInput = screen.getByPlaceholderText('Description')
    const submitButton = screen.getByRole('button', { name: 'Add' })

    await userEvent.type(titleInput, 'Test Todo')
    await userEvent.type(descriptionInput, 'Test Description')
    await userEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith('Test Todo', 'Test Description')
    expect(titleInput).toHaveValue('')
    expect(descriptionInput).toHaveValue('')
  })

  it('does not submit when fields are empty', async () => {
    render(<TodoForm onSubmit={mockOnSubmit} loading={false} />)
    
    const submitButton = screen.getByRole('button', { name: 'Add' })
    await userEvent.click(submitButton)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('shows loading state correctly', () => {
    render(<TodoForm onSubmit={mockOnSubmit} loading={true} />)
    
    expect(screen.getByRole('button', { name: 'Adding...' })).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })
}) 