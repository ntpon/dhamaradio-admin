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
import IAlbum from "../../types/IAlbum"
interface IProps {
  lists: IAlbum[]
  isLoading?: boolean
  setUpdateIsActive: (updateIsActive: { id: string; isActive: boolean }) => void
  setUpdateIsRecommend: (updateIsRecommend: {
    id: string
    isRecommend: boolean
  }) => void
  setDelete: (id: string) => void
}
function AlbumTable({
  lists,
  isLoading = false,
  setUpdateIsActive,
  setUpdateIsRecommend,
  setDelete,
}: IProps) {
  if (isLoading) return <Loading height='auto' />
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ชื่อชุดเสียง</Th>
            <Th>ชื่อพระอาจารย์</Th>
            <Th>วันที่แก้ไข</Th>
            <Th>แนะนำ</Th>
            <Th>สถานะ</Th>
            <Th>จัดการ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lists.map((album, index) => (
            <Tr key={album.id}>
              <Td>{`${album.name}`}</Td>
              <Td>{`${album.priest.fullName}`}</Td>
              <Td>{formatDate(new Date(album.updatedAt))}</Td>
              <Td>
                <Switch
                  isChecked={album.isRecommend}
                  onChange={() => {
                    setUpdateIsRecommend({
                      id: album.id,
                      isRecommend: !album.isRecommend,
                    })
                  }}
                />
              </Td>
              <Td>
                <Switch
                  isChecked={album.isActive}
                  onChange={() => {
                    setUpdateIsActive({
                      id: album.id,
                      isActive: !album.isActive,
                    })
                  }}
                />
              </Td>
              <Td>
                <Link href={`/album/${album.id}/edit`}>
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
                    setDelete(album.id)
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

export default AlbumTable
