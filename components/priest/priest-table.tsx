import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
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
import IPriest from "../../types/IPriest"
interface IProps {
  lists: IPriest[]
  isLoading?: boolean
  setUpdateIsActive: (updateIsActive: { id: string; isActive: boolean }) => void
  setDelete: (id: string) => void
}
function PriestTable({
  lists,
  isLoading = false,
  setUpdateIsActive,
  setDelete,
}: IProps) {
  if (isLoading) return <Loading height='auto' />
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ชื่อพระอาจารย์</Th>
            <Th>วันที่แก้ไข</Th>
            <Th>สถานะ</Th>
            <Th>จัดการ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lists.map((priest, index) => (
            <Tr key={priest.id}>
              <Td>{`${priest.fullName}`}</Td>
              <Td>{formatDate(new Date(priest.updatedAt))}</Td>
              <Td>
                <Switch
                  isChecked={priest.isActive}
                  onChange={() => {
                    setUpdateIsActive({
                      id: priest.id,
                      isActive: !priest.isActive,
                    })
                  }}
                />
              </Td>
              <Td>
                <Link href={`/priest/${priest.id}/edit`}>
                  <IconButton
                    icon={<EditIcon color='blue.500' />}
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
                    setDelete(priest.id)
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

export default PriestTable
