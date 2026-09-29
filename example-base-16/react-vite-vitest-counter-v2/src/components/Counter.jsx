import { useState } from 'react'

function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount(value => value + 1)
  const decrement = () => setCount(value => value - 1)
  const reset = () => setCount(initialValue)

  return (
    <section aria-label="Counter">
      <h2>Counter</h2>

      <p>
        Current count: <output aria-label="Current count">{count}</output>
      </p>

      <div className="buttons">
        <button type="button" onClick={decrement} aria-label="Decrease count">
          Decrement
        </button>

        <button type="button" onClick={reset} aria-label="Reset count">
          Reset
        </button>

        <button type="button" onClick={increment} aria-label="Increase count">
          Increment
        </button>
      </div>
    </section>
  )
}

export default Counter
