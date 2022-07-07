import { EditIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons"
import {
  IconButton,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { formatDate } from "../../utils/formatter"
import Loading from "../loading/loading"
import IContact from "../../types/IContact"
interface IProps {
  lists: IContact[]
  isLoading?: boolean
  setUpdateReply: (updateIsActive: { id: string; isReply: boolean }) => void
  setDelete: (id: string) => void
}
function ContactTable({
  lists,
  isLoading = false,
  setUpdateReply,
  setDelete,
}: IProps) {
  if (isLoading) return <Loading height='auto' />
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>หัวข้อ</Th>
            <Th>รายละเอียด</Th>
            <Th>คุณ</Th>
            <Th>วันที่ส่งข้อความ</Th>
            <Th>ตอบกลับแล้ว</Th>
            <Th>จัดการ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lists.map((contact, index) => (
            <Tr key={contact.id}>
              <Td>{`${contact.title}`}</Td>
              <Td>{`${contact.description}`}</Td>
              <Td>{`${contact.fullName}`}</Td>
              <Td>{formatDate(new Date(contact.createdAt))}</Td>
              <Td>
                <Switch
                  isChecked={contact.isReply}
                  onChange={() => {
                    setUpdateReply({
                      id: contact.id,
                      isReply: !contact.isReply,
                    })
                  }}
                />
              </Td>
              <Td>
                <Link href={`/contact/${contact.id}/show`}>
                  <IconButton
                    icon={<ViewIcon color='blue.500' />}
                    variant='ghost'
                    color='gray.500'
                    size='sm'
                    aria-label='Edit'
                  />
                </Link>
                <IconButton
                  icon={<DeleteIcon color='red.500' />}
                  variant='ghost'
                  color='gray.500'
                  size='sm'
                  aria-label='Delete'
                  onClick={() => {
                    setDelete(contact.id)
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ContactTable
