import { Result } from '@zxing/library'
import { ReactElement, useEffect, useState } from 'react'

type CounterProps = {
  result?: Result
}

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