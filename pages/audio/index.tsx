import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import PageLayout from "../../components/layout/page-layout"
import Empty from "../../components/empty/empty"
import api from "../../utils/api"
import ConfirmModal from "../../components/modal/confirm-modal"
import Pagination from "../../components/pagination/pagination"
import usePagination from "../../hooks/use-pagination"
import Search from "../../components/search/search"
import FilterLayout from "../../components/crud/filter/filter-layout"
import ListLayout from "../../components/crud/list/list-layout"
import { Box, Button } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import Link from "next/link"
import IAudio from "../../types/IAudio"
import AudioTable from "../../components/audio/audio-table"
function AudioIndex() {
  const [audios, setAudios] = useState<{
    totalPage: number
    rows: IAudio[]
  }>({
    totalPage: 0,
    rows: [],
  })
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchData, setIsFetchData] = useState(true)

  const [updateIsActive, setUpdateIsActive] = useState<{
    id: string
    isActive: boolean
  } | null>(null)

  const { handlePageChange, pageValue } = usePagination()

  const [deleteData, setDeleteData] = useState<string | null>(null)

  useEffect(() => {
    setIsFetchData(true)
  }, [pageValue])

  useEffect(() => {
    if (isFetchData) {
      api.Audio.getAll(pageValue, search)
        .then((res) => {
          const { audios, totalPage } = res.data
          setAudios({ rows: audios, totalPage })
        })
        .finally(() => {
          setIsFetchData(false)
        })
    }
  }, [isFetchData])

  const handleUpdateIsActive = () => {
    if (updateIsActive) {
      setIsLoading(true)
      api.Audio.updateIsActive(updateIsActive.id, updateIsActive.isActive)
        .then((res) => {
          setIsFetchData(true)
          const { message } = res.data
          toast.success(message)
        })
        .catch((err) => {
          const { error } = err.response.data
          toast.error(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
      setUpdateIsActive(null)
    }
  }

  const handleDeleteData = () => {
    if (deleteData) {
      setIsLoading(true)
      api.Audio.delete(deleteData)
        .then((res) => {
          setIsFetchData(true)
          const { message } = res.data
          toast.success(message)
        })
        .catch((err) => {
          const { error } = err.response.data
          toast.error(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
      setDeleteData(null)
    }
  }

  const handleSearchSubmit = () => {
    if (!search) {
      handlePageChange(1)
    }
    setIsFetchData(true)
  }

  return (
    <PageLayout titleText='เสียง'>
      <FilterLayout title='เสียง'>
        <Search
          placeholderText='ค้นหาเสียงด้วย ชื่อเสียง, ชื่ออัลบั้ม'
          onSearchSubmit={handleSearchSubmit}
          search={search}
          setSearch={setSearch}
        />
        <Link href='/audio/create'>
          <Button
            marginLeft='5px'
            leftIcon={<AddIcon />}
            colorScheme='teal'
            variant='solid'
          >
            เพิ่มเสียง
          </Button>
        </Link>
      </FilterLayout>
      <ListLayout isLoading={isFetchData || isLoading}>
        {audios.rows.length > 0 ? (
          <>
            <AudioTable
              lists={audios.rows}
              setUpdateIsActive={setUpdateIsActive}
              setDelete={setDeleteData}
            />
            <Pagination
              page={pageValue}
              onPageChange={handlePageChange}
              totalPages={audios.totalPage}
            />
          </>
        ) : (
          <Empty />
        )}

        {updateIsActive && (
          <ConfirmModal
            title='ยืนยันการเปลี่ยนสถานะ'
            isOpen={!!updateIsActive}
            onClose={() => {
              setUpdateIsActive(null)
            }}
            onConfirm={handleUpdateIsActive}
          />
        )}
        {deleteData && (
          <ConfirmModal
            isOpen={!!deleteData}
            onClose={() => {
              setDeleteData(null)
            }}
            onConfirm={handleDeleteData}
            title='ยืนยันการลบข้อมูล'
          />
        )}
      </ListLayout>
    </PageLayout>
  )
}

export default AudioIndex
