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
import { Button } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import Link from "next/link"
import IAlbum from "../../types/IAlbum"
import AlbumTable from "../../components/album/album-table"
function AlbumIndex() {
  const [albums, setAlbum] = useState<{
    totalPage: number
    rows: IAlbum[]
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

  const [updateIsRecommend, setUpdateIsRecommend] = useState<{
    id: string
    isRecommend: boolean
  } | null>(null)

  const { handlePageChange, pageValue } = usePagination()

  const [deleteData, setDeleteData] = useState<string | null>(null)

  useEffect(() => {
    setIsFetchData(true)
  }, [pageValue])

  useEffect(() => {
    if (isFetchData) {
      api.Album.getAll(pageValue, search)
        .then((res) => {
          const { albums, totalPage } = res.data
          setAlbum({ rows: albums, totalPage })
        })
        .finally(() => {
          setIsFetchData(false)
        })
    }
  }, [isFetchData])

  const handleUpdateIsActive = () => {
    if (updateIsActive) {
      setIsLoading(true)
      api.Album.updateIsActive(updateIsActive.id, updateIsActive.isActive)
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
  const handleUpdateIsRecommend = () => {
    if (updateIsRecommend) {
      setIsLoading(true)
      api.Album.updateIsRecommend(
        updateIsRecommend.id,
        updateIsRecommend.isRecommend
      )
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
      setUpdateIsRecommend(null)
    }
  }

  const handleDeleteData = () => {
    if (deleteData) {
      setIsLoading(true)
      api.Album.delete(deleteData)
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
    <PageLayout titleText='ชุดเสียง'>
      <FilterLayout title='ชุดเสียง'>
        <Search
          placeholderText='ค้นหาชุดเสียงด้วย ชื่อชุดเสียง, ชื่อพระอาจารย์'
          onSearchSubmit={handleSearchSubmit}
          search={search}
          setSearch={setSearch}
        />
        <Link href='/album/create'>
          <Button
            marginLeft='5px'
            leftIcon={<AddIcon />}
            colorScheme='teal'
            variant='solid'
          >
            เพิ่มชุดเสียง
          </Button>
        </Link>
      </FilterLayout>
      <ListLayout isLoading={isLoading || isFetchData}>
        {albums.rows.length > 0 ? (
          <>
            <AlbumTable
              lists={albums.rows}
              setUpdateIsActive={setUpdateIsActive}
              setUpdateIsRecommend={setUpdateIsRecommend}
              setDelete={setDeleteData}
            />
            <Pagination
              page={pageValue}
              onPageChange={handlePageChange}
              totalPages={albums.totalPage}
            />
          </>
        ) : (
          <Empty />
        )}

        {updateIsRecommend && (
          <ConfirmModal
            title='ยืนยันการเปลี่ยนสถานะ'
            isOpen={!!updateIsRecommend}
            onClose={() => {
              setUpdateIsRecommend(null)
            }}
            onConfirm={handleUpdateIsRecommend}
          />
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

export default AlbumIndex
