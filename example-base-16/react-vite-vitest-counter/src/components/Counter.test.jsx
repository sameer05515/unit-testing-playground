import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Counter from './Counter'

describe('Counter', () => {
  it('should render with default value 0', () => {
    render(<Counter />)

    expect(screen.getByTestId('count-value')).toHaveTextContent('0')
  })

  it('should render with the supplied initial value', () => {
    render(<Counter initialValue={10} />)

    expect(screen.getByTestId('count-value')).toHaveTextContent('10')
  })

  it('should increment the counter', () => {
    render(<Counter />)

    fireEvent.click(screen.getByRole('button', { name: 'Increment' }))

    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })

  it('should decrement the counter', () => {
    render(<Counter />)

    fireEvent.click(screen.getByRole('button', { name: 'Decrement' }))

    expect(screen.getByTestId('count-value')).toHaveTextContent('-1')
  })

  it('should increment multiple times', () => {
    render(<Counter />)

    const incrementButton = screen.getByRole('button', { name: 'Increment' })

    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)

    expect(screen.getByTestId('count-value')).toHaveTextContent('3')
  })

  it('should decrement multiple times', () => {
    render(<Counter initialValue={5} />)

    const decrementButton = screen.getByRole('button', { name: 'Decrement' })

    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)

    expect(screen.getByTestId('count-value')).toHaveTextContent('3')
  })

  it('should reset to the initial value', () => {
    render(<Counter initialValue={10} />)

    fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
    fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))

    expect(screen.getByTestId('count-value')).toHaveTextContent('10')
  })

  it('should support increment and decrement together', () => {
    render(<Counter />)

    fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
    fireEvent.click(screen.getByRole('button', { name: 'Increment' }))
    fireEvent.click(screen.getByRole('button', { name: 'Decrement' }))

    expect(screen.getByTestId('count-value')).toHaveTextContent('1')
  })
})
