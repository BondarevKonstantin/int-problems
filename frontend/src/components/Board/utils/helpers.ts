import { HEX_BORDER } from 'constants/boardConstants'

export const getHorizontalOffset = (hexSize: number) => {
  return (hexSize / 4) * 3 - HEX_BORDER / 2
}

export const getVerticalOffset = (hexSize: number) => {
  return (Math.sqrt(3) / 4) * hexSize + HEX_BORDER / 8
}

export const getImgNode = (target: HTMLElement) =>
  target.tagName === 'IMG' ? target : target.querySelector('img')

export const getCurrentTraslateValue = (evtTarget: HTMLElement) => {
  const transformValue = getComputedStyle(evtTarget)
    .getPropertyValue('transform')
    .split(', ')

  let y = transformValue[transformValue.length - 1]
  y = y.slice(0, y.length - 1)
  const x = transformValue[transformValue.length - 2]
  return {
    x: Number(x),
    y: Number(y),
  }
}
