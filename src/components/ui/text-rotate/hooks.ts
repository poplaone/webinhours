
import { useState, useCallback, useEffect, useImperativeHandle } from "react"
import { TextRotateRef } from "./types"

interface UseTextRotationProps {
  texts: string[]
  loop: boolean
  auto: boolean
  rotationInterval: number
  onNext?: (index: number) => void
}

export const useTextRotation = ({ 
  texts, 
  loop, 
  auto, 
  rotationInterval, 
  onNext 
}: UseTextRotationProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  // Helper function to handle index changes and trigger callback
  const handleIndexChange = useCallback((newIndex: number) => {
    setCurrentTextIndex(newIndex)
    onNext?.(newIndex)
  }, [onNext])

  const next = useCallback(() => {
    const nextIndex = currentTextIndex === texts.length - 1
      ? (loop ? 0 : currentTextIndex)
      : currentTextIndex + 1
    
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex)
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange])

  const previous = useCallback(() => {
    const prevIndex = currentTextIndex === 0
      ? (loop ? texts.length - 1 : currentTextIndex)
      : currentTextIndex - 1
    
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex)
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange])

  const jumpTo = useCallback((index: number) => {
    const validIndex = Math.max(0, Math.min(index, texts.length - 1))
    if (validIndex !== currentTextIndex) {
      handleIndexChange(validIndex)
    }
  }, [texts.length, currentTextIndex, handleIndexChange])

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0)
    }
  }, [currentTextIndex, handleIndexChange])

  useEffect(() => {
    if (!auto) return
    const intervalId = setInterval(next, rotationInterval)
    return () => clearInterval(intervalId)
  }, [next, rotationInterval, auto])

  return {
    currentTextIndex,
    next,
    previous,
    jumpTo,
    reset
  }
}

export const useTextRotateRef = (
  ref: React.Ref<TextRotateRef>,
  controls: {
    next: () => void
    previous: () => void
    jumpTo: (index: number) => void
    reset: () => void
  }
) => {
  useImperativeHandle(ref, () => ({
    next: controls.next,
    previous: controls.previous,
    jumpTo: controls.jumpTo,
    reset: controls.reset,
  }), [controls.next, controls.previous, controls.jumpTo, controls.reset])
}
