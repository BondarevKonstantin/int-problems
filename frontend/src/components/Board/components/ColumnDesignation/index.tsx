import styled from '@emotion/styled'

import { HEX_SIZE } from 'constants/boardConstants'

interface ColumnDesignationStyle {
  idx: number
  getHorizontalOffset: (HEX_SIZE: number) => number
  getVerticalOffset: (HEX_SIZE: number) => number
}

const ColumnDesignation = styled.p<ColumnDesignationStyle>(
  ({ idx, getHorizontalOffset, getVerticalOffset }) => {
    return {
      position: 'absolute',
      fontSize: 24,
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      left: idx * getHorizontalOffset(HEX_SIZE) + 52.5,
      top: idx % 2 === 0 ? getVerticalOffset(HEX_SIZE) - 40 : -40,
    }
  }
)

export default ColumnDesignation
