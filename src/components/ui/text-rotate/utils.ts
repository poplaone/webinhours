
export const splitIntoCharacters = (text: string): string[] => {
  // Check if Intl.Segmenter is available
  if (typeof Intl !== "undefined" && 'Segmenter' in Intl) {
    const segmenter = new (Intl as any).Segmenter("en", { granularity: "grapheme" })
    return Array.from(segmenter.segment(text), ({ segment }: any) => segment)
  }
  // Fallback for browsers that don't support Intl.Segmenter
  return Array.from(text)
}
