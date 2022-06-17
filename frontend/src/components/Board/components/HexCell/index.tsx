import styled from '@emotion/styled'
import { css } from '@emotion/react'
import HexCellInner from './components/HexCellInner'
import {
  HEX_POLY_SHAPE,
  HEX_SIZE,
  BOARD_COLUMNS,
  BOARD_COLUMNS_DESIGNATION,
  BOARD_ROWS,
} from 'constants/boardConstants'

import { Designation, MoveResult, Piece, HexCoord } from 'intellector'
import { getBorderColorByFlag, getPieceOffset } from './utils/helpers'
import { getPieceImg } from 'components/Board/utils/getPieceImg'
import { getElementUnderLayer } from 'components/Board/utils/getElementUnderLayer'
import ColumnDesignation from '../ColumnDesignation'

interface HexCellProps {
  x: number
  y: number
  coord: HexCoord
  hex: Designation
  definedPiece?: Piece
  markSettings: MoveResult | undefined
  onHexClick: (hex: Designation) => void
  onDragStart: (
    target: HTMLElement,
    hex: Designation,
    clientX: number,
    clientY: number
  ) => void
  onDragEnd: (hex: Designation) => void
}

interface HexCellStyle {
  x: number
  y: number
  piece: Piece | undefined
}

const hexCellDynamicStyle = (props: HexCellStyle) => css`
  top: ${props.y}px;
  left: ${props.x}px;
  height: ${HEX_SIZE * 0.9}px;
  width: ${HEX_SIZE}px;
  clip-path: ${HEX_POLY_SHAPE};
  cursor: ${props.piece ? 'pointer' : 'default'};
`

const StyledHexCell = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  ${hexCellDynamicStyle}
`

const markDynamicStyle = ({ flags }: Pick<MoveResult, 'flags'>) => {
  const areSignificantFlags = flags.isCapture || flags.isSwap
  const backgroundColor = areSignificantFlags
    ? 'transparent;'
    : 'background-color: rgba(0, 0, 0, 40%);'
  const border = areSignificantFlags
    ? `border: ${getBorderColorByFlag(flags)};`
    : 'none'
  const size = areSignificantFlags ? HEX_SIZE / 1.25 : HEX_SIZE / 4
  return css`
    width: ${size}px;
    height: ${size}px;
    ${backgroundColor}
    ${border}
  `
}

const StyledMark = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  ${markDynamicStyle}
`

const HexCell: React.FC<HexCellProps> = (props) => {
  const { definedPiece: piece } = props
  const pieceOffset = getPieceOffset(HEX_SIZE, piece?.type)
  return (
    <>
      <StyledHexCell
        x={props.x}
        y={props.y}
        id={props.hex}
        data-hex={props.hex}
        onClick={() => props.onHexClick(props.hex)}
        onMouseDown={({ target, clientX, clientY }) =>
          props.onDragStart(target as HTMLElement, props.hex, clientX, clientY)
        }
        onMouseUp={() => props.onDragEnd(props.hex)}
        piece={piece}
      >
        <HexCellInner
          size={HEX_SIZE}
          coord={props.coord}
          piece={props.definedPiece ?? null}
        />
        {props.markSettings && <StyledMark flags={props.markSettings.flags} />}
      </StyledHexCell>
      {piece && (
        <img
          className={`piece-img ${piece.color}-${piece.type}-img`}
          src={getPieceImg(piece)}
          draggable={false}
          alt={`${piece.type}-${piece.color}`}
          onClick={({ clientX, clientY }) => {
            if (getElementUnderLayer(clientX, clientY) === props.hex) {
              props.onHexClick(props.hex)
            }
          }}
          onMouseDown={({ target, clientX, clientY }) =>
            props.onDragStart(
              target as HTMLElement,
              props.hex,
              clientX,
              clientY
            )
          }
          onMouseUp={({ clientX, clientY }) =>
            props.onDragEnd(getElementUnderLayer(clientX, clientY))
          }
          style={{
            backgroundColor: 'transparent',
            height: piece.type === 'P' ? HEX_SIZE * 0.45 : HEX_SIZE * 0.6,
            position: 'absolute',
            top: props.y + pieceOffset!.y,
            left: props.x + pieceOffset!.x,
            cursor: 'pointer',
          }}
        />
      )}
    </>
  )
}

export default HexCell
