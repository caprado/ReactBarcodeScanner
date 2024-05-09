import { Result } from '@zxing/library'
import { ReactElement, useEffect, useState } from 'react'

/**
 * Props for the Counter component.
 */
type CounterProps = {
  /** The result from the scanner. If provided, increments the count each time it changes. */
  result?: Result
}

/**
 * A component that displays a count of detected results.
 * It increments the count every time a new result is provided.
 * 
 * @param {CounterProps} props - The properties passed to the Counter component.
 * @returns {ReactElement} - The rendered element displaying the current count.
 */
const Counter = ({ result }: CounterProps): ReactElement => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (result === undefined) {
      return
    }
    setCount(prevCount => prevCount + 1)
  }, [result])

  return (
    <div
      style={{
        top: 0,
        right: 5,
        zIndex: 1,
        fontSize: 28,
        color: '#FFFFFF',
        position: 'absolute'
      }}
    >
      {count}
    </div>
  )
}

export default Counter