import { MoveFlag, PieceType } from 'intellector'

export const getBorderColorByFlag = (flags: MoveFlag) => {
  if (flags.isCapture) return '10px solid rgba(176, 16, 48, 60%)'
  if (flags.isSwap) return '10px solid rgba(16, 48, 176, 60%)'
}

export const getPieceOffset = (
  hexSize: number,
  type: PieceType | undefined
) => {
  if (!type) return
  switch (type) {
    case 'P':
      return { x: hexSize * 0.25, y: hexSize * 0.2 }
    case 'Ag':
      return { x: hexSize * 0.28, y: hexSize * 0.2 }
    case 'Df':
      return { x: hexSize * 0.29, y: hexSize * 0.17 }
    case 'Lb':
      return { x: hexSize * 0.25, y: hexSize * 0.16 }
    case 'Dm':
      return { x: hexSize * 0.28, y: hexSize * 0.17 }
    case 'In':
      return { x: hexSize * 0.3, y: hexSize * 0.17 }
  }
}
