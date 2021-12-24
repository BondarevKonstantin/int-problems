import {
  Modal,
  Box,
  Button,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react'

import { Designation, MoveOptions } from 'intellector'

interface SupportModalProps {
  isOpened: boolean
  close: () => void
  move: { from: Designation; to: Designation }
  support: (
    from: Designation,
    to: Designation,
    options?: MoveOptions
  ) => boolean
  resetBoardFlags: () => void
}

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '2rem',
}

const SupportModal: React.FC<SupportModalProps> = ({
  isOpened,
  close,
  support,
  move,
  resetBoardFlags,
}) => {
  const handleSupport = (promote: boolean) => {
    support(move.from, move.to, { supportTransform: promote })
    resetBoardFlags()
    close()
  }

  return (
    <Modal isOpen={isOpened} onClose={close} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent p={7}>
        <Box as="h4" fontWeight="bold" fontSize="3xl" textAlign="center">
          Превратить во взятую фигуру?
        </Box>
        <Box sx={buttonRowStyle}>
          <Button
            size="lg"
            colorScheme="red"
            variant="solid"
            style={{ width: '25%' }}
            onClick={() => handleSupport(true)}
          >
            Да
          </Button>
          <Button
            size="lg"
            colorScheme="red"
            variant="solid"
            style={{ width: '25%' }}
            onClick={() => handleSupport(false)}
          >
            Нет
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default SupportModal
