import styled from '@emotion/styled'
import { HEX_BORDER } from 'constants/boardConstants'

import { Piece } from 'intellector'

interface HexCellInnerProps {
  size: number
  coord: {
    column: number
    row: number
  }
  piece: Piece | null
}

const StyledHexCell = styled.div<Pick<HexCellInnerProps, 'size' | 'coord'>>(
  ({ size, coord }) => {
    const clipPath = `polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`
    const centralRowsMarkupCondition =
      coord.column % 2 === 0 && coord.row % 3 === 0

    const baseBorderMarkupCondition =
      coord.column % 2 === 1 && (coord.row - 1) % 3 === 0

    return {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      width: size - HEX_BORDER + 'px',
      height: size * 0.9 - HEX_BORDER + 'px',
      backgroundColor:
        centralRowsMarkupCondition || baseBorderMarkupCondition
          ? '#d18b47'
          : '#ffcf9f',
      clipPath,
    }
  }
)

const HexCellInner: React.FC<HexCellInnerProps> = ({ size, coord, piece }) => {
  return (
    <StyledHexCell coord={coord} size={size}>
      <p style={{ position: 'absolute', top: '20%', left: '10%' }}>
        {coord.column % 2 === 0 ? 7 - coord.row : 6 - coord.row}
      </p>
    </StyledHexCell>
  )
}

export default HexCellInner
