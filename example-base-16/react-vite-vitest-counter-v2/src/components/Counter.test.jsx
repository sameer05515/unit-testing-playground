import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter V2', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('renders the default count as 0', () => {
    render(<Counter />)

    expect(screen.getByRole('heading', { name: 'Counter' })).toBeInTheDocument()
    expect(screen.getByRole('status')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Increase count' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Decrease count' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset count' })).toBeInTheDocument()
    expect(screen.getByLabelText('Current count')).toHaveTextContent('0')
  })

  it.each([
    [0],
    [5],
    [10],
    [-5],
    [100]
  ])('renders supplied initial value %s', (initialValue) => {
    render(<Counter initialValue={initialValue} />)

    expect(screen.getByLabelText('Current count')).toHaveTextContent(
      String(initialValue)
    )
  })

  it('increments using userEvent', async () => {
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: 'Increase count' }))

    expect(screen.getByLabelText('Current count')).toHaveTextContent('1')
  })

  it('decrements using userEvent', async () => {
    render(<Counter />)

    await user.click(screen.getByRole('button', { name: 'Decrease count' }))

    expect(screen.getByLabelText('Current count')).toHaveTextContent('-1')
  })

  it('increments multiple times', async () => {
    render(<Counter />)

    const button = screen.getByRole('button', { name: 'Increase count' })

    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(screen.getByLabelText('Current count')).toHaveTextContent('3')
  })

  it('decrements multiple times', async () => {
    render(<Counter initialValue={10} />)

    const button = screen.getByRole('button', { name: 'Decrease count' })

    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(screen.getByLabelText('Current count')).toHaveTextContent('7')
  })

  it('resets to the original initial value', async () => {
    render(<Counter initialValue={10} />)

    await user.click(screen.getByRole('button', { name: 'Increase count' }))
    await user.click(screen.getByRole('button', { name: 'Increase count' }))
    await user.click(screen.getByRole('button', { name: 'Reset count' }))

    expect(screen.getByLabelText('Current count')).toHaveTextContent('10')
  })

  it('supports increment and decrement together', async () => {
    render(<Counter initialValue={5} />)

    await user.click(screen.getByRole('button', { name: 'Increase count' }))
    await user.click(screen.getByRole('button', { name: 'Increase count' }))
    await user.click(screen.getByRole('button', { name: 'Decrease count' }))

    expect(screen.getByLabelText('Current count')).toHaveTextContent('6')
  })

  it('can return to zero', async () => {
    render(<Counter initialValue={2} />)

    await user.click(screen.getByRole('button', { name: 'Decrease count' }))
    await user.click(screen.getByRole('button', { name: 'Decrease count' }))

    expect(screen.getByLabelText('Current count')).toHaveTextContent('0')
  })

  it('can go below zero', async () => {
    render(<Counter />)

    const button = screen.getByRole('button', { name: 'Decrease count' })

    await user.click(button)
    await user.click(button)
    await user.click(button)

    expect(screen.getByLabelText('Current count')).toHaveTextContent('-3')
  })
})
