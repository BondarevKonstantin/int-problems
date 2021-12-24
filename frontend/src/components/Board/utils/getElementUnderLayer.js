export const getElementUnderLayer = (x, y, elementFlag = 'hex') => {
  let currentElement = null

  const stack = []
  const elementStylesChaching = []

  const recurFind = () => {
    currentElement = document.elementFromPoint(x, y)

    if (currentElement) {
      if (
        currentElement.dataset[elementFlag] ||
        currentElement.tagName === 'HTML'
      ) {
        if (stack.length !== 0) {
          stack.forEach(
            (it, i) => (it.style.display = elementStylesChaching[i])
          )
        }
        return currentElement
      } else {
        elementStylesChaching.push(currentElement.style.display)
        currentElement.style.display = 'none'
        stack.push(currentElement)
        return recurFind()
      }
    }
  }

  return recurFind().dataset[elementFlag]
}
