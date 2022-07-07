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
import React, { useState } from "react"
import { formatDate } from "../../utils/formatter"
import Loading from "../loading/loading"
import IAudio from "../../types/IAudio"
import { IoIosMusicalNotes } from "react-icons/io"
import ReactAudioPlayer from "react-audio-player"
interface IProps {
  lists: IAudio[]
  isLoading?: boolean
  setUpdateIsActive: (updateIsActive: { id: string; isActive: boolean }) => void
  setDelete: (id: string) => void
}
function AudioTable({
  lists,
  isLoading = false,
  setUpdateIsActive,
  setDelete,
}: IProps) {
  const [audioFile, setAudioFile] = useState("")
  const playAudio = (sound: string) => {
    setAudioFile(sound)
  }

  if (isLoading) return <Loading height='auto' />

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>ชื่อเสียง</Th>
            <Th>ชื่อชุดเสียง</Th>
            <Th>ชื่อพระอาจารย์</Th>
            <Th>วันที่แก้ไข</Th>
            <Th>สถานะ</Th>
            <Th>จัดการ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lists.map((audio, index) => (
            <Tr key={audio.id}>
              <Td>{`${audio.name}`}</Td>
              <Td>{`${audio.album.name}`}</Td>
              <Td>{`${audio.album.priest.fullName}`}</Td>
              <Td>{formatDate(new Date(audio.updatedAt))}</Td>
              <Td>
                <Switch
                  isChecked={audio.isActive}
                  onChange={() => {
                    setUpdateIsActive({
                      id: audio.id,
                      isActive: !audio.isActive,
                    })
                  }}
                />
              </Td>
              <Td>
                {/* Play Song */}
                <IconButton
                  icon={<IoIosMusicalNotes />}
                  aria-label='Play Audio'
                  variant='ghost'
                  color='gray.500'
                  size='sm'
                  onClick={() => {
                    playAudio(audio.source)
                  }}
                />
                <Link href={`/audio/${audio.id}/edit`}>
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
                    setDelete(audio.id)
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ReactAudioPlayer
        src={audioFile}
        autoPlay
        controls
        style={{ display: "none" }}
      />
    </TableContainer>
  )
}

export default AudioTable
