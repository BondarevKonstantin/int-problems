import Ag_B from 'assets/pieces/Aggressor_black.svg'
import Ag_W from 'assets/pieces/Aggressor_white.svg'
import Df_B from 'assets/pieces/Defensor_black.svg'
import Df_W from 'assets/pieces/Defensor_white.svg'
import Dm_B from 'assets/pieces/Dominator_black.svg'
import Dm_W from 'assets/pieces/Dominator_white.svg'
import In_B from 'assets/pieces/Intellector_black.svg'
import In_W from 'assets/pieces/Intellector_white.svg'
import Lb_B from 'assets/pieces/Liberator_black.svg'
import Lb_W from 'assets/pieces/Liberator_white.svg'
import P_B from 'assets/pieces/Progressor_black.svg'
import P_W from 'assets/pieces/Progressor_white.svg'

import { Piece, PieceType, PieceColor } from 'intellector'

interface PieceSrcType {
  piece: PieceType
  color: PieceColor
  src: string
}

export const pieceSrc: PieceSrcType[] = [
  {
    piece: 'Ag',
    color: 'black',
    src: Ag_B,
  },
  {
    piece: 'Ag',
    color: 'white',
    src: Ag_W,
  },
  {
    piece: 'Df',
    color: 'black',
    src: Df_B,
  },
  {
    piece: 'Df',
    color: 'white',
    src: Df_W,
  },
  {
    piece: 'Dm',
    color: 'black',
    src: Dm_B,
  },
  {
    piece: 'Dm',
    color: 'white',
    src: Dm_W,
  },
  {
    piece: 'In',
    color: 'black',
    src: In_B,
  },
  {
    piece: 'In',
    color: 'white',
    src: In_W,
  },
  {
    piece: 'Lb',
    color: 'black',
    src: Lb_B,
  },
  {
    piece: 'Lb',
    color: 'white',
    src: Lb_W,
  },
  {
    piece: 'P',
    color: 'black',
    src: P_B,
  },
  {
    piece: 'P',
    color: 'white',
    src: P_W,
  },
]

export const getPieceImg = (piece: Piece) => {
  const assignedPiece = pieceSrc.find(
    (pieceFromData) =>
      pieceFromData.piece === piece.type && pieceFromData.color === piece.color
  )

  return assignedPiece?.src
}
