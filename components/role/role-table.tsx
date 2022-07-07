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
import IRole from "../../types/IRole"
interface IProps {
  lists: IRole[]
  isLoading?: boolean
  setUpdateIsActive: (updateIsActive: { id: string; isActive: boolean }) => void
  setDelete: (id: string) => void
}
function RoleTable({
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
            <Th>ชื่อ Role</Th>
            <Th>รายละเอียด</Th>
            <Th>วันที่แก้ไข</Th>
            <Th>สถานะ</Th>
            <Th>จัดการ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lists.map((role, index) => (
            <Tr key={role.id}>
              <Td>{`${role.name}`}</Td>
              <Td>{`${role.description}`}</Td>
              <Td>{formatDate(new Date(role.updatedAt))}</Td>
              <Td>
                <Switch
                  isChecked={role.isActive}
                  onChange={() => {
                    setUpdateIsActive({
                      id: role.id,
                      isActive: !role.isActive,
                    })
                  }}
                />
              </Td>
              <Td>
                <Link href={`/role/${role.id}/edit`}>
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
                    setDelete(role.id)
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

export default RoleTable
