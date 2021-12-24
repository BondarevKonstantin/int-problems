import { MoveFlag, PieceType } from 'intellector'

export const getBorderColorByFlag = (flags: MoveFlag) => {
  if (flags.isCapture) return '10px solid rgba(176, 16, 48, 60%)'
  if (flags.isSwap) return '10px solid rgba(16, 48, 176, 60%)'
}

export const getPieceOffset = (type: PieceType | undefined) => {
  if (!type) return
  switch (type) {
    case 'P':
      return { x: 25, y: 20 }
    case 'Ag':
      return { x: 28, y: 20 }
    case 'Df':
      return { x: 29, y: 17 }
    case 'Lb':
      return { x: 25, y: 16 }
    case 'Dm':
      return { x: 28, y: 17 }
    case 'In':
      return { x: 30, y: 17 }
  }
}
