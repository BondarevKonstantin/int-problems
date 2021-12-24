export type PieceType = 'P' | 'In' | 'Df' | 'Lb' | 'Ag' | 'Dm'
export type PromotionType = 'Df' | 'Lb' | 'Ag' | 'Dm'
export type SupportType = 'Df' | 'Lb' | 'Ag' | 'Dm'
export type PieceColor = 'white' | 'black'

export type Piece = {
  type: PieceType
  color: PieceColor
}

export type HexCoord = {
  row: number
  column: number
}

type PieceLocation = {
  piece: Piece
  location: HexCoord
}

export type MoveFlag = {
  isCapture?: boolean
  isPromotion?: boolean
  isSupport?: boolean
  isSwap?: boolean
}

export type MoveOptions = {
  promoteTo?: PromotionType
  supportTransform?: boolean
}

export type MoveResult = {
  from: HexCoord
  to: HexCoord
  piece: Piece
  hex: Designation
  flags: MoveFlag
  options?: MoveOptions
}

type ColumnA = 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7'
type ColumnB = 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6'
type ColumnC = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7'
type ColumnD = 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6'
type ColumnE = 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7'
type ColumnF = 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6'
type ColumnG = 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7'
type ColumnH = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type ColumnI = 'i1' | 'i2' | 'i3' | 'i4' | 'i5' | 'i6' | 'i7'

export type Designation =
  | ColumnA
  | ColumnB
  | ColumnC
  | ColumnD
  | ColumnE
  | ColumnF
  | ColumnG
  | ColumnH
  | ColumnI

type HexType = Piece | null | false
type Row = HexType[]
type Board = Row[]

type PieceSIPChar = 'o' | 'g' | 'n' | 'i' | 'e' | 'r'
type CharSerialization = { [key: string]: PieceSIPChar }
type CharDefinition = { [key: string]: PieceType }

function IntellectorPosition(startSip?: string) {
  // Static index variables

  // const BOARD_HEXES_NUMBER = 63;
  const NUMBER_OF_COLUMNS = 9
  const NUMBER_OF_ROWS = 7
  const RESTRICTED_HEX_INDEXES = [55, 57, 59, 61]
  const PROMOTION_HEX_INDEXES = {
    white: [0, 2, 4, 6, 8],
    black: [54, 56, 58, 60, 62],
  }

  // String variables

  const COLUMN_CHARS = 'abcdefghi'

  const START_SIP = 'wmrniorpeqrresrtiurvoxgzn|g~o!@oAiBgCeDnEeFgGiHoIrKrMrOrQr'

  // Piece char variables

  const charDefinition: CharDefinition = {
    o: 'Dm',
    g: 'Ag',
    n: 'In',
    i: 'Lb',
    e: 'Df',
    r: 'P',
  }

  const charSerialization: CharSerialization = {
    Dm: 'o',
    Ag: 'g',
    In: 'n',
    Lb: 'i',
    Df: 'e',
    P: 'r',
  }

  enum MoveDirection {
    U,
    UL,
    UR,
    D,
    DL,
    DR,
    A_UL,
    A_UR,
    A_R,
    A_L,
    A_DL,
    A_DR,
  }

  const { U, UL, UR, D, DL, DR, A_UL, A_UR, A_L, A_R, A_DL, A_DR } =
    MoveDirection

  const PIECES_DIRECTIONS = {
    PROG_WHITE: [UL, U, UR],
    PROG_BLACK: [DL, D, DR],
    AVG_MOVES: [UL, U, UR, DL, D, DR],
    AGR: [A_UL, A_UR, A_L, A_R, A_DL, A_DR],
  }

  // Changing variables

  let MOVES_NEXT: 'white' | 'black' = 'white'
  let MOVE_COUNTER = 0
  let SIXTY_RULE_COUNTER = 0

  let GAME_OVER = false
  let DRAW = false

  // History arrays

  const moveHistory: MoveResult[] = []

  // Board filling

  const board: Board = []
  for (let i = 0, hexNum = 0; i < NUMBER_OF_ROWS; i++) {
    const row: Row = []
    for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
      if (RESTRICTED_HEX_INDEXES.includes(hexNum)) {
        row.push(false)
      } else {
        row.push(null)
      }
      hexNum++
    }
    board.push(row)
  }

  // Inner functions

  function init() {
    if (startSip) {
      deserialize(startSip)
    } else {
      deserialize(START_SIP)
    }
  }

  function possibleMoves(coord: HexCoord): MoveResult[] {
    const addMove = (
      moveArray: MoveResult[],
      from: HexCoord,
      to: HexCoord,
      movedPiece: Piece
    ) => {
      if (!areProperCoords(from, to)) return
      const supposedPiece = getPieceFromCoord(to)
      const swapFlag =
        (movedPiece.type === 'Df' &&
          supposedPiece &&
          supposedPiece.type === 'In') ||
        (movedPiece.type === 'In' &&
          supposedPiece &&
          supposedPiece.type === 'Df')

      if (
        !swapFlag &&
        supposedPiece &&
        supposedPiece.color === movedPiece.color
      )
        return

      // Check for flags
      const isCapture = Boolean(
        supposedPiece && supposedPiece.color !== MOVES_NEXT
      )
      const isPromotion =
        movedPiece.type === 'P' &&
        PROMOTION_HEX_INDEXES[movedPiece.color].includes(
          getHexIndexFromCoord(to)
        )

      const isSwap = Boolean(swapFlag)
      const isSupport = isCapture && isIntellectorNear(coord)

      const flags = { isCapture, isPromotion, isSwap, isSupport }
      const hex = translateCoordToDesignation(to)

      moveArray.push({ from, to, piece: movedPiece, flags, hex })
    }

    const moves: MoveResult[] = []
    const piece = getPieceFromCoord(coord)

    if (!piece || piece.color !== MOVES_NEXT) {
      return moves
    }

    if (piece.type === 'P') {
      const directions =
        piece.color === 'white'
          ? PIECES_DIRECTIONS.PROG_WHITE
          : PIECES_DIRECTIONS.PROG_BLACK

      for (const direction of directions) {
        const destination = getCoordFromDirection(coord, direction)

        addMove(moves, coord, destination, piece)
      }
    }
    if (piece.type === 'Df') {
      for (const direction of PIECES_DIRECTIONS.AVG_MOVES) {
        const destination = getCoordFromDirection(coord, direction)

        addMove(moves, coord, destination, piece)
      }
    }
    if (piece.type === 'In') {
      for (const direction of PIECES_DIRECTIONS.AVG_MOVES) {
        const destination = getCoordFromDirection(coord, direction)
        const destinationPiece = getPieceFromCoord(destination)

        if (destinationPiece && destinationPiece.color !== piece.color) {
          return []
        }

        addMove(moves, coord, destination, piece)
      }
    }
    if (piece.type === 'Lb') {
      for (const direction of PIECES_DIRECTIONS.AVG_MOVES) {
        const gapDestination = getCoordFromDirectionWithStep(
          coord,
          direction,
          2
        )
        addMove(moves, coord, gapDestination, piece)

        const closeDestination = getCoordFromDirection(coord, direction)
        if (!getPieceFromCoord(closeDestination)) {
          addMove(moves, coord, closeDestination, piece)
        }
      }
    }
    if (piece.type === 'Dm') {
      for (const direction of PIECES_DIRECTIONS.AVG_MOVES) {
        const destinationlist = getRayFromDirection(coord, direction)

        for (const destination of destinationlist) {
          addMove(moves, coord, destination, piece)
        }
      }
    }
    if (piece.type === 'Ag') {
      for (const direction of PIECES_DIRECTIONS.AGR) {
        const destinationlist = getRayFromDirection(coord, direction)

        for (const destination of destinationlist) {
          addMove(moves, coord, destination, piece)
        }
      }
    }
    return moves
  }

  function deserialize(sip: string) {
    const movesNext = sip[0] === 'w' ? 'white' : 'black'
    const piecesLocation = sip.slice(1).split('!')

    const getLocationFromUGL = (loc: string) => {
      // Get cell number, starting from the top-left corner to the right
      const cellLoc = loc.charCodeAt(0) - 64

      const columnNum = cellLoc % 9
      const rowNum = Math.floor(cellLoc / 9)

      return {
        row: rowNum,
        column: columnNum,
      }
    }

    const addPiecesToBoard = (SIPlocations: string[]) => {
      SIPlocations.forEach((SIPlocation, idx) => {
        for (let i = 0; i < SIPlocation.length; i += 2) {
          const [UGLlocation, UGLpiece] = [SIPlocation[i], SIPlocation[i + 1]]
          const pieceType = charDefinition[UGLpiece as PieceSIPChar]
          const pieceColor = idx === 0 ? 'white' : 'black'

          const location = getLocationFromUGL(UGLlocation)

          board[location.row][location.column] = {
            type: pieceType,
            color: pieceColor,
          }
        }
      })
    }

    addPiecesToBoard(piecesLocation)
    MOVES_NEXT = movesNext
    MOVE_COUNTER = 0
    return movesNext
  }

  function serialize() {
    let whitePieceSIP = ''
    let blackPieceSIP = ''

    for (let rowIdx = 0; rowIdx < NUMBER_OF_ROWS; rowIdx++) {
      for (let columnIdx = 0; columnIdx < NUMBER_OF_COLUMNS; columnIdx++) {
        const piece = board[rowIdx][columnIdx]
        if (piece) {
          const locationChar = String.fromCharCode(64 + rowIdx * 9 + columnIdx)
          const pieceChar = charSerialization[piece.type]
          if (piece.color === 'white') {
            whitePieceSIP += locationChar + pieceChar
          } else {
            blackPieceSIP += locationChar + pieceChar
          }
        }
      }
    }

    return MOVES_NEXT[0] + whitePieceSIP + '!' + blackPieceSIP
  }

  function putPieceToCoord(piece: Piece, hex: HexCoord) {
    if (!areProperCoords(hex)) return false
    board[hex.row][hex.column] = piece
    return true
  }

  function removePieceFromCoord(hex: HexCoord) {
    if (!areProperCoords(hex)) return false
    board[hex.row][hex.column] = null
    return true
  }

  function makeMove({ from, to, piece, flags, options }: MoveResult) {
    const departurePiece = getPieceFromCoord(from)
    const destinationPiece = getPieceFromCoord(to)
    moveHistory.push({
      from,
      to,
      hex: translateCoordToDesignation(to),
      piece,
      flags,
      options,
    })

    // Game over checkers

    if (
      destinationPiece &&
      destinationPiece.color !== MOVES_NEXT &&
      destinationPiece.type === 'In'
    ) {
      putPieceToCoord(piece, to)
      removePieceFromCoord(from)
      GAME_OVER = true
      return true
    }

    if (
      departurePiece &&
      departurePiece.type === 'In' &&
      PROMOTION_HEX_INDEXES[departurePiece.color].includes(
        getHexIndexFromCoord(to)
      )
    ) {
      putPieceToCoord(piece, to)
      removePieceFromCoord(from)
      GAME_OVER = true
      return true
    }

    // Draw checkers

    if (
      (departurePiece && departurePiece.type === 'P') ||
      (destinationPiece && destinationPiece.color !== MOVES_NEXT)
    ) {
      SIXTY_RULE_COUNTER = 0
    } else {
      SIXTY_RULE_COUNTER++
    }

    if (SIXTY_RULE_COUNTER >= 60) {
      DRAW = true
    }

    // Flag checkers

    if (flags.isSwap) {
      if (!destinationPiece) return false
      putPieceToCoord(piece, to)
      putPieceToCoord(destinationPiece, from)
      changeColor()
      MOVE_COUNTER++
      return true
    }

    if (options?.promoteTo) {
      putPieceToCoord({ type: options.promoteTo, color: piece.color }, to)
      removePieceFromCoord(from)
      changeColor()
      MOVE_COUNTER++
      return true
    }

    if (!options?.promoteTo && options?.supportTransform) {
      if (!destinationPiece) return false
      if (destinationPiece) {
        putPieceToCoord({ type: destinationPiece.type, color: piece.color }, to)
        removePieceFromCoord(from)
        changeColor()
        MOVE_COUNTER++
        return true
      }
    }

    putPieceToCoord(piece, to)
    removePieceFromCoord(from)
    changeColor()
    MOVE_COUNTER++
    return true
  }

  function getPieceFromCoord(hex: HexCoord) {
    if (!areProperCoords(hex)) return false
    return board[hex.row][hex.column]
  }

  // Helper functions

  function translateDesignationToCoord(designation: Designation): HexCoord {
    const columnChar = designation[0]
    const rowNum = Number(designation[1])

    const column = COLUMN_CHARS.indexOf(columnChar)
    const row = NUMBER_OF_ROWS - rowNum - (column % 2 === 0 ? 0 : 1)

    return { row, column }
  }

  function translateCoordToDesignation(coord: HexCoord): Designation {
    const columnChar = COLUMN_CHARS[coord.column]
    const rowChar =
      NUMBER_OF_ROWS - coord.row - (coord.column % 2 === 1 ? 1 : 0)

    return (columnChar + rowChar) as Designation
  }

  function getHexIndexFromCoord(coord: HexCoord): number {
    return coord.row * NUMBER_OF_COLUMNS + coord.column
  }

  function areProperCoords(...coords: HexCoord[]) {
    for (const coord of coords) {
      if (
        coord.row >= NUMBER_OF_ROWS ||
        coord.column >= NUMBER_OF_COLUMNS ||
        coord.row < 0 ||
        coord.column < 0 ||
        (coord.column % 2 === 1 && coord.row === NUMBER_OF_ROWS - 1)
      ) {
        return false
      }
    }
    return true
  }

  function areCoordsEqual(firstCoord: HexCoord, secondCoord: HexCoord) {
    return (
      firstCoord.column === secondCoord.column &&
      firstCoord.row === secondCoord.row
    )
  }

  function isIntellectorNear(coord: HexCoord): boolean {
    for (const direction of PIECES_DIRECTIONS.AVG_MOVES) {
      const destination = getCoordFromDirection(coord, direction)
      const piece = getPieceFromCoord(destination)

      if (piece && piece.type === 'In' && piece.color === MOVES_NEXT) {
        return true
      }
    }
    return false
  }

  function getMoveDetails(
    availableMoves: MoveResult[],
    coord: HexCoord,
    options?: MoveOptions
  ) {
    const madeMove = availableMoves.find((move) =>
      areCoordsEqual(move.to, coord)
    )

    if (!madeMove) return null

    return { ...madeMove, options }
  }

  function getCoordFromDirection(
    coord: HexCoord,
    direction: MoveDirection
  ): HexCoord {
    const { column, row } = coord
    switch (direction) {
      case U: {
        return { column, row: row - 1 }
      }
      case UL: {
        return { column: column - 1, row: column % 2 === 0 ? row - 1 : row }
      }
      case UR: {
        return { column: column + 1, row: column % 2 === 0 ? row - 1 : row }
      }
      case D: {
        return { column, row: row + 1 }
      }
      case DL: {
        return { column: column - 1, row: column % 2 === 0 ? row : row + 1 }
      }
      case DR: {
        return { column: column + 1, row: column % 2 === 0 ? row : row + 1 }
      }
      case A_UL: {
        return {
          column: column - 1,
          row: column % 2 === 0 ? row - 2 : row - 1,
        }
      }
      case A_UR: {
        return {
          column: column + 1,
          row: column % 2 === 0 ? row - 2 : row - 1,
        }
      }
      case A_DL: {
        return {
          column: column - 1,
          row: column % 2 === 0 ? row + 1 : row + 2,
        }
      }
      case A_DR: {
        return {
          column: column + 1,
          row: column % 2 === 0 ? row + 1 : row + 2,
        }
      }
      case A_L: {
        return { column: column - 2, row }
      }
      case A_R: {
        return { column: column + 2, row }
      }
    }
  }

  function getCoordFromDirectionWithStep(
    initialCoord: HexCoord,
    direction: MoveDirection,
    step: number
  ) {
    let coord: HexCoord = initialCoord
    while (step > 0) {
      coord = getCoordFromDirection(coord, direction)
      step--
    }

    return coord
  }

  function getRayFromDirection(
    initialCoord: HexCoord,
    direction: MoveDirection
  ) {
    const rayHexes: HexCoord[] = []
    let coord = initialCoord

    while (true) {
      const nextHex = getCoordFromDirection(coord, direction)
      if (!areProperCoords(nextHex)) return rayHexes

      rayHexes.push(nextHex)
      if (getPieceFromCoord(nextHex)) return rayHexes
      coord = nextHex
    }
  }

  function changeColor() {
    MOVES_NEXT = MOVES_NEXT === 'white' ? 'black' : 'white'
  }

  function checkPromotion(fromCoord: HexCoord, toCoord: HexCoord) {
    const piece = getPieceFromCoord(fromCoord)
    const destinationHexIndex = getHexIndexFromCoord(toCoord)
    const isPossibleMove = getMoveDetails(possibleMoves(fromCoord), toCoord)

    if (
      piece &&
      piece.type === 'P' &&
      PROMOTION_HEX_INDEXES[piece.color].includes(destinationHexIndex) &&
      isPossibleMove
    ) {
      return true
    }
    return false
  }

  function checkSupport(fromCoord: HexCoord, toCoord: HexCoord) {
    const piece = getPieceFromCoord(fromCoord)
    if (!piece || piece.type === 'P' || piece.type === 'In') return false

    const availableMovesFromSquare = possibleMoves(fromCoord)
    const moveDetails = getMoveDetails(availableMovesFromSquare, toCoord)
    if (moveDetails?.flags.isSupport) {
      return true
    }
    return false
  }

  init()

  // Outer functions

  return {
    load(sip: string) {
      return deserialize(sip)
    },
    reset() {
      deserialize(START_SIP)
    },
    put(piece: Piece, hex: Designation) {
      return putPieceToCoord(piece, translateDesignationToCoord(hex))
    },
    get(hex: Designation) {
      return getPieceFromCoord(translateDesignationToCoord(hex))
    },
    move(
      from: Designation,
      to: Designation,
      options?: MoveOptions,
      fakeMove = false
    ) {
      const availableMovesFromSquare = possibleMoves(
        translateDesignationToCoord(from)
      )

      const moveDetails = getMoveDetails(
        availableMovesFromSquare,
        translateDesignationToCoord(to),
        options
      )

      if (moveDetails) {
        if (fakeMove) {
          return true
        }
        return makeMove(moveDetails)
      } else return false
    },
    sip() {
      return serialize()
    },
    remove(hex: Designation) {
      if (!hex) {
        return false
      }
      return removePieceFromCoord(translateDesignationToCoord(hex))
    },
    getPieceFromHex(hex: Designation) {
      return getPieceFromCoord(translateDesignationToCoord(hex))
    },
    possibleMoves(hex: Designation) {
      return possibleMoves(translateDesignationToCoord(hex))
    },
    getAllPieces() {
      const pieceLocations: PieceLocation[] = []
      for (let rowIdx = 0; rowIdx < NUMBER_OF_ROWS; rowIdx++) {
        for (let columnIdx = 0; columnIdx < NUMBER_OF_COLUMNS; columnIdx++) {
          const piece = board[rowIdx][columnIdx]
          if (piece) {
            pieceLocations.push({
              piece,
              location: { row: rowIdx, column: columnIdx },
            })
          }
        }
      }
      return pieceLocations
    },
    isPromotion(from: Designation, to: Designation) {
      return checkPromotion(
        translateDesignationToCoord(from),
        translateDesignationToCoord(to)
      )
    },
    isSupport(from: Designation, to: Designation) {
      return checkSupport(
        translateDesignationToCoord(from),
        translateDesignationToCoord(to)
      )
    },
    getColor() {
      return MOVES_NEXT
    },
    gameOver() {
      return GAME_OVER
    },
    logBoard() {
      console.log(board)
    },
  }
}

export default IntellectorPosition
