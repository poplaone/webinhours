
export const getStaggerDelay = (
  index: number,
  totalChars: number,
  staggerFrom: "first" | "last" | "center" | number | "random",
  staggerDuration: number
) => {
  const total = totalChars
  if (staggerFrom === "first") return index * staggerDuration
  if (staggerFrom === "last") return (total - 1 - index) * staggerDuration
  if (staggerFrom === "center") {
    const center = Math.floor(total / 2)
    return Math.abs(center - index) * staggerDuration
  }
  if (staggerFrom === "random") {
    const randomIndex = Math.floor(Math.random() * total)
    return Math.abs(randomIndex - index) * staggerDuration
  }
  return Math.abs(staggerFrom - index) * staggerDuration
}
