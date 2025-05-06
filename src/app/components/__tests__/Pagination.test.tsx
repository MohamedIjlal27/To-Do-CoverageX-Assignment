import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from '../Pagination'

describe('Pagination', () => {
  const mockProps = {
    currentPage: 1,
    totalPages: 5,
    limit: 10,
    onPageChange: jest.fn(),
    onLimitChange: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders limit selector correctly', () => {
    render(<Pagination {...mockProps} />)
    
    expect(screen.getByLabelText('Show:')).toBeInTheDocument()
    expect(screen.getByText('entries')).toBeInTheDocument()
  })

  it('shows correct limit options', () => {
    render(<Pagination {...mockProps} />)
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('10')
    
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(4)
    expect(options[0]).toHaveValue('5')
    expect(options[1]).toHaveValue('10')
    expect(options[2]).toHaveValue('20')
    expect(options[3]).toHaveValue('50')
  })

  it('handles limit change', async () => {
    render(<Pagination {...mockProps} />)
    
    const select = screen.getByRole('combobox')
    await userEvent.selectOptions(select, '20')

    expect(mockProps.onLimitChange).toHaveBeenCalledWith(20)
  })
}) 