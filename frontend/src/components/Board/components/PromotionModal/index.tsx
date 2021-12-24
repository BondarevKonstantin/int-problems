import { Modal, Box, ModalOverlay, ModalContent } from '@chakra-ui/react'
import { getPieceImg } from 'components/Board/utils/getPieceImg'

import {
  PieceColor,
  PromotionType,
  Designation,
  MoveOptions,
} from 'intellector'

interface PromotionModalProps {
  isOpened: boolean
  close: () => void
  color: PieceColor
  move: { from: Designation; to: Designation }
  promote: (
    from: Designation,
    to: Designation,
    options?: MoveOptions
  ) => boolean
  resetBoardFlags: () => void
}

const modalBoxStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  textAlign: 'center' as 'center',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  outline: 'none',
  borderRadius: '15px',
  boxShadow: 24,
  p: 4,
}

const promotionSelectionContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '2rem',
}

const pieceContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: '3px solid #dddddd',
  width: '15%',
  borderRadius: '15px',
}

const PromotionModal = ({
  isOpened,
  close,
  color,
  promote,
  move,
  resetBoardFlags,
}: PromotionModalProps) => {
  const PROGRESSOR_PROMOTIONS: PromotionType[] = ['Ag', 'Df', 'Dm', 'Lb']

  const handlePromotion = (pieceToPromote: PromotionType) => {
    promote(move.from, move.to, { promoteTo: pieceToPromote })
    resetBoardFlags()
    close()
  }

  return (
    <Modal isOpen={isOpened} onClose={close} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent p={7}>
        <Box as="h4" fontWeight="bold" fontSize="3xl" textAlign="center">
          Выберите фигуру для продвижения
        </Box>
        <Box sx={promotionSelectionContainerStyle}>
          {PROGRESSOR_PROMOTIONS.map((promotionPiece) => {
            return (
              <Box
                key={promotionPiece}
                sx={pieceContainerStyle}
                onClick={() => handlePromotion(promotionPiece)}
              >
                <img
                  src={getPieceImg({ type: promotionPiece, color })}
                  alt="sdfsdf"
                />
              </Box>
            )
          })}
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default PromotionModal
