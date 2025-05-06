import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoCard from '../TodoCard'

describe('TodoCard', () => {
  const mockProps = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    onComplete: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    loading: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders todo card with correct content', () => {
    render(<TodoCard {...mockProps} />)
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('handles complete action', async () => {
    render(<TodoCard {...mockProps} />)
    
    const completeButton = screen.getByRole('button', { name: 'Done' })
    await userEvent.click(completeButton)

    expect(mockProps.onComplete).toHaveBeenCalledWith('1')
  })

  it('handles delete action', async () => {
    render(<TodoCard {...mockProps} />)
    
    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    await userEvent.click(deleteButton)

    expect(mockProps.onDelete).toHaveBeenCalledWith('1')
  })

  it('handles edit mode correctly', async () => {
    render(<TodoCard {...mockProps} />)
    
    // Enter edit mode
    const editButton = screen.getByRole('button', { name: 'Edit' })
    await userEvent.click(editButton)

    // Check if input fields are present
    const titleInput = screen.getByDisplayValue('Test Todo')
    const descriptionInput = screen.getByDisplayValue('Test Description')
    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()

    // Edit the content
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Updated Todo')
    await userEvent.clear(descriptionInput)
    await userEvent.type(descriptionInput, 'Updated Description')

    // Save changes
    const saveButton = screen.getByRole('button', { name: 'Save' })
    await userEvent.click(saveButton)

    expect(mockProps.onEdit).toHaveBeenCalledWith('1', 'Updated Todo', 'Updated Description')
  })

  it('shows completed state correctly', () => {
    render(<TodoCard {...mockProps} completed={true} />)
    
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeDisabled()
  })

  it('disables buttons when loading', () => {
    render(<TodoCard {...mockProps} loading={true} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })
}) 