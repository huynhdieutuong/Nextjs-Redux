import { useEffect, useRef } from 'react'

const useOuterClick = (callback: () => void) => {
  const innerRef = useRef<HTMLElement>()

  useEffect(() => {
    const handleClick = (e: any) => {
      if (innerRef.current && !innerRef.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return innerRef
}

export default useOuterClick
