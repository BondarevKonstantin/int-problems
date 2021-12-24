import { useCallback, useState } from 'react'

export function useModal() {
  const [isOpened, setIsOpened] = useState(false)

  const open = useCallback(() => {
    setIsOpened(true)
  }, [])

  const close = useCallback(() => {
    setIsOpened(false)
  }, [])

  return { open, close, isOpened, setIsOpened }
}
