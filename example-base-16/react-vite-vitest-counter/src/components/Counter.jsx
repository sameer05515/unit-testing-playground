import { useState } from 'react'

function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue)

  const increment = () => setCount(value => value + 1)
  const decrement = () => setCount(value => value - 1)
  const reset = () => setCount(initialValue)

  return (
    <section aria-label="Counter">
      <p>
        Count: <span data-testid="count-value">{count}</span>
      </p>

      <div className="buttons">
        <button type="button" onClick={decrement}>
          Decrement
        </button>

        <button type="button" onClick={reset}>
          Reset
        </button>

        <button type="button" onClick={increment}>
          Increment
        </button>
      </div>
    </section>
  )
}

export default Counter
