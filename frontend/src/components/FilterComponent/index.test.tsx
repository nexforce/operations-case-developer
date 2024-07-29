import React from 'react'
import { render, screen } from '@testing-library/react'
import FilterComponent from './index'

jest.mock('../../services/InventoryService')

describe('FilterComponent', () => {
  const mockOnFilter = jest.fn()
  const mockProps = { onFilter: mockOnFilter }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders filter component with initial state', () => {
    render(<FilterComponent {...mockProps} />)
    
    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByText('R$1')).toBeInTheDocument()
    expect(screen.getByText('R$0')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Filtrar' })).toBeInTheDocument()
  })

})
