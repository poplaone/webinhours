
import { useMemo } from "react"
import { WordObject } from "./types"
import { splitIntoCharacters } from "./utils"

export const useTextElements = (
  texts: string[],
  currentTextIndex: number,
  splitBy: "words" | "characters" | "lines" | string
) => {
  return useMemo(() => {
    const currentText = texts[currentTextIndex]
    if (splitBy === "characters") {
      const text = currentText.split(" ")
      return text.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== text.length - 1,
      }))
    }
    return splitBy === "words"
      ? currentText.split(" ")
      : splitBy === "lines"
        ? currentText.split("\n")
        : currentText.split(splitBy)
  }, [texts, currentTextIndex, splitBy])
}
