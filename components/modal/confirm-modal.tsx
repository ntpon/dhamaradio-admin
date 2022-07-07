import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

interface IProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
}

function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "กรุณายืนยัน",
  description = "คลิกที่ยืนยันเพื่อดำเนินการต่อ",
}: IProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            ยกเลิก
          </Button>
          <Button colorScheme='blue' onClick={onConfirm}>
            ยืนยัน
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
