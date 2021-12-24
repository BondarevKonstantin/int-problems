import { useState } from 'react'
import { useModal } from 'hooks/useModal'

import ColumnDesignation from './components/ColumnDesignation'
import HexCell from './components/HexCell'
import PromotionModal from './components/PromotionModal'
import SupportModal from './components/SupportModal'

import {
  getHorizontalOffset,
  getImgNode,
  getVerticalOffset,
} from './utils/helpers'
import { playAudio } from './utils/playAudio'

import {
  BOARD_COLUMNS,
  BOARD_COLUMNS_DESIGNATION,
  BOARD_ROWS,
  HEX_SIZE,
} from 'constants/boardConstants'

import IntellectorPosition, { Designation, MoveResult } from 'intellector'

const position = IntellectorPosition('w^o_r`igehnig!HnRrVrYrkror')

const Board: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [selectedHex, setSelectedHex] = useState<Designation | null>(null)
  const [clickedHex, setClickedHex] = useState<Designation | null>(null)

  const [moveMarks, setMoveMarks] = useState<MoveResult[]>([])
  const [promotionMoveData, setPromotionMoveData] = useState<{
    from: Designation
    to: Designation
  } | null>(null)
  const [supportMoveData, setSupportMoveData] = useState<{
    from: Designation
    to: Designation
  } | null>(null)
  const [draggedTarget, setDraggedTarget] = useState<HTMLElement | null>(null)
  const [startCoordValue, setStartCoordValue] = useState<Coord>({
    x: null,
    y: null,
  })

  const {
    isOpened: promotionModalOpened,
    open: openPromotionModal,
    close: closePromotionModal,
  } = useModal()

  const {
    isOpened: supportModalOpened,
    open: openSupportModal,
    close: closeSupportModal,
  } = useModal()

  const resetBoardFlags = () => {
    setMoveMarks([])
    setSelectedHex(null)
    setClickedHex(null)
  }

  const dropPiece = (from: Designation, to: Designation) => {
    const pieceCaptured = position.getPieceFromHex(to)
    if (position.move(from, to, undefined, true)) {
      if (pieceCaptured) {
        playAudio('Capture')
      } else {
        playAudio('Move')
      }
      if (position.isPromotion(from, to)) {
        setPromotionMoveData({ from, to })
        openPromotionModal()
        return
      }
      if (position.isSupport(from, to)) {
        setSupportMoveData({ from, to })
        openSupportModal()
        return
      }

      position.move(from, to)
      resetBoardFlags()
    }
  }

  const onHexClick = (hex: Designation) => {
    if (clickedHex && clickedHex === hex) {
      resetBoardFlags()
      return
    }
    if (!clickedHex && position.getPieceFromHex(hex)) {
      setClickedHex(hex)
    }
  }

  const onDragStart = (
    target: HTMLElement,
    hex: Designation,
    clientX: number,
    clientY: number
  ) => {
    if (selectedHex && selectedHex !== hex) {
      dropPiece(selectedHex, hex)
      setSelectedHex(null)
      setClickedHex(null)
      setMoveMarks([])
      return
    }
    if (position.getPieceFromHex(hex)) {
      const possibleMoves = position.possibleMoves(hex)
      const imgTarget = getImgNode(target)
      setIsDragging(true)
      setSelectedHex(hex)
      setDraggedTarget(imgTarget)
      setMoveMarks(possibleMoves)
      setStartCoordValue({ x: clientX, y: clientY })

      if (imgTarget) {
        imgTarget.style.zIndex = '1000'
      }
    }
  }

  const onDragging = (clientX: number, clientY: number) => {
    const { x: startX, y: startY } = startCoordValue
    if (!(startX && startY)) return
    const newX = clientX - startX
    const newY = clientY - startY
    if (draggedTarget) {
      draggedTarget.style.transform = `translate(${newX}px, ${newY}px)`
    }
  }

  const onDragEnd = (hex: Designation) => {
    if (isDragging && selectedHex && selectedHex !== hex) {
      dropPiece(selectedHex, hex)
    }
    setIsDragging(false)
    if (draggedTarget) {
      draggedTarget.style.transform = 'none'
      draggedTarget.style.zIndex = '0'
    }
  }

  const renderedHexes = BOARD_ROWS.map((row) => {
    const secondColumnMargin = getVerticalOffset(HEX_SIZE) * 2 * row

    return BOARD_COLUMNS.map((column) => {
      // Hex cells on the last row on every 2 columns must not be displayed
      if (row === 6 && column % 2 === 1) {
        return null
      }
      const adaptedColumn = BOARD_COLUMNS_DESIGNATION[column]
      const adaptedRow = column % 2 === 0 ? 7 - row : 6 - row
      const hexLabel = adaptedColumn + adaptedRow
      const cellPiece = position.getPieceFromHex(hexLabel as Designation)

      return (
        <>
          <HexCell
            key={hexLabel}
            x={getHorizontalOffset(HEX_SIZE) * column}
            // Every 2x + 1 row must be 0.5 height lower
            y={
              column % 2 === 0
                ? secondColumnMargin
                : secondColumnMargin + getVerticalOffset(HEX_SIZE)
            }
            coord={{ row, column }}
            hex={hexLabel as Designation}
            definedPiece={cellPiece ? cellPiece : undefined}
            markSettings={moveMarks.find((mark) => mark.hex === hexLabel)}
            onHexClick={onHexClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        </>
      )
    })
  })

  const renderedDesignation = BOARD_COLUMNS_DESIGNATION.map(
    (columnSign, idx) => {
      const designationProps = {
        idx,
        getHorizontalOffset,
        getVerticalOffset,
      }
      return (
        <ColumnDesignation key={`column-${columnSign}`} {...designationProps}>
          {columnSign.toUpperCase()}
        </ColumnDesignation>
      )
    }
  )

  return (
    <>
      <div
        className="board-main"
        style={{
          msUserSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          width: (HEX_SIZE - 4) * 5 + (HEX_SIZE / 2) * 4,
        }}
        onMouseMove={
          isDragging
            ? (evt) => {
                onDragging(evt.clientX, evt.clientY)
              }
            : undefined
        }
      >
        <div
          className="board-hexes"
          // Hex height takes 90% of hex size, and there are 7 hexes in a column
          style={{
            position: 'relative',
            height: HEX_SIZE * 0.88 * 7,
          }}
        >
          {renderedHexes}
        </div>
        <div
          className="board-designation"
          style={{
            position: 'relative',
            width: (HEX_SIZE - 4) * 5 + (HEX_SIZE / 2) * 4,
            height: HEX_SIZE / 2,
          }}
        >
          {renderedDesignation}
        </div>
      </div>
      <PromotionModal
        isOpened={promotionModalOpened}
        close={closePromotionModal}
        color={position.getColor()}
        promote={position.move}
        move={promotionMoveData!}
        resetBoardFlags={resetBoardFlags}
      />
      <SupportModal
        isOpened={supportModalOpened}
        close={closeSupportModal}
        support={position.move}
        move={supportMoveData!}
        resetBoardFlags={resetBoardFlags}
      />
    </>
  )
}

export default Board
