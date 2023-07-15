import { useEffect, useRef, useState } from 'react'

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : initialValue
  })

  const isUpdatingRef = useRef(true)

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // console.log('')
      if (
        event.key === key &&
        event.newValue !== null &&
        !isUpdatingRef.current
      ) {
        setValue(JSON.parse(event.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  const setValueInLocalStorage: SetValue<T> = (
    newValue: T | ((prevValue: T) => T)
  ) => {
    setValue(prevValue => {
      const result =
        typeof newValue === 'function'
          ? (newValue as Function)(prevValue)
          : newValue
      isUpdatingRef.current = true
      localStorage.setItem(key, JSON.stringify(result))
      isUpdatingRef.current = false
      return result
    })
  }

  return [value, setValueInLocalStorage]
}

export default useLocalStorage
