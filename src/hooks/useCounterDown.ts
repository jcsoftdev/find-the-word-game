import { useCallback, useEffect, useRef } from 'react'
import { useLocalStorage } from '.'
import { COUNTER_DOWN } from '../utils/consts'
import useIsFocused from './useIsFocused'

const useCounterDown = ({
  initialValue,
  key
}: {
  initialValue: number
  key?: string
}) => {
  const [counter, setCounter] = useLocalStorage<number>(
    key || COUNTER_DOWN,
    initialValue
  )
  const isFocused = useIsFocused()

  const domain = useRef<string>(Math.random().toString(36).substring(2, 15))

  const [ownerOfEvent, setOwnerOfEvent] = useLocalStorage<string>(
    'owner',
    domain.current
  )

  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (isFocused && ownerOfEvent !== domain.current) {
      setOwnerOfEvent(domain.current)
    }
  }, [isFocused])

  const getMinutesAndSeconds = (): string => {
    const minutes = Math.floor(counter / 60)
    const seconds = counter - minutes * 60

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  useEffect(() => {
    if (ownerOfEvent === domain.current) {
      intervalRef.current = window.setInterval(() => {
        if (counter <= 0) {
          clearInterval(intervalRef.current)
          return
        }
        setCounter((prev: number) => {
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [counter, ownerOfEvent, setCounter])

  const resetCounter = useCallback(
    (timer: number) => {
      const newValue = timer
      setCounter(newValue)
    },
    [initialValue, setCounter]
  )

  return {
    counter,
    getMinutesAndSeconds,
    resetCounter
  }
}

export default useCounterDown
