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
import IMember from "../../types/IMember"
import { formatDate } from "../../utils/formatter"
import Loading from "../loading/loading"
interface IProps {
  members: IMember[]
  isLoading?: boolean
  setUpdateIsActive: (updateIsActive: { id: string; isActive: boolean }) => void
  setDeleteMember: (id: string) => void
}
function MemberTable({
  members,
  isLoading = false,
  setUpdateIsActive,
  setDeleteMember,
}: IProps) {
  if (isLoading) return <Loading height='auto' />
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ชื่อสมาชิก</Th>
            <Th>อีเมล</Th>
            <Th>วันที่สมัคร</Th>
            <Th>สถานะ</Th>
            <Th>จัดการ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {members.map((member, index) => (
            <Tr key={member.id}>
              <Td>{`${member.firstName} ${member.lastName}`}</Td>
              <Td>{member.email}</Td>
              <Td>{formatDate(new Date(member.createdAt))}</Td>
              <Td>
                <Switch
                  isChecked={member.isActive}
                  onChange={() => {
                    setUpdateIsActive({
                      id: member.id,
                      isActive: !member.isActive,
                    })
                  }}
                />
              </Td>
              <Td>
                <Link href={`/member/${member.id}/edit`}>
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
                    setDeleteMember(member.id)
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

export default MemberTable
