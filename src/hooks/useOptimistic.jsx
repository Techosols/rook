import { useState, useRef } from 'react'

// useOptimistic(initialValue)
// - returns [value, applyOptimistic(updateFn), rollback(), commit()]
// - applyOptimistic(fn) updates value immediately and returns a commit callback
// - commit() confirms the optimistic update
// - rollback() restores previous value
export default function useOptimistic(initial) {
  const [value, setValue] = useState(initial)
  const prevRef = useRef(initial)
  const pendingRef = useRef(false)

  const apply = (updater) => {
    if (pendingRef.current) {
      // already pending, do synchronous update
      setValue(v => typeof updater === 'function' ? updater(v) : updater)
      return
    }
    prevRef.current = value
    setValue(v => typeof updater === 'function' ? updater(v) : updater)
    pendingRef.current = true
  }

  const commit = () => {
    pendingRef.current = false
    prevRef.current = value
  }

  const rollback = () => {
    if (pendingRef.current) {
      setValue(prevRef.current)
      pendingRef.current = false
    }
  }

  return [value, apply, commit, rollback]
}
