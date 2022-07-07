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
import PriestTable from "../../components/priest/priest-table"
import IPriest from "../../types/IPriest"
function PriestIndex() {
  const [priests, setPriests] = useState<{
    totalPage: number
    rows: IPriest[]
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
      api.Priest.getAll(pageValue, search)
        .then((res) => {
          const { priests, totalPage } = res.data
          setPriests({ rows: priests, totalPage })
        })
        .finally(() => {
          setIsFetchData(false)
        })
    }
  }, [isFetchData])

  const handleUpdateIsActive = () => {
    if (updateIsActive) {
      setIsLoading(true)
      api.Priest.updateIsActive(updateIsActive.id, updateIsActive.isActive)
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
      api.Priest.delete(deleteData)
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
    <PageLayout titleText='พระอาจารย์'>
      <FilterLayout title='พระอาจารย์'>
        <Search
          placeholderText='ค้นหาพระอาจารย์ด้วย ชื่อ, นามสกุล'
          onSearchSubmit={handleSearchSubmit}
          search={search}
          setSearch={setSearch}
        />
        <Link href='/priest/create'>
          <Button
            marginLeft='5px'
            leftIcon={<AddIcon />}
            colorScheme='teal'
            variant='solid'
          >
            เพิ่มพระอาจารย์
          </Button>
        </Link>
      </FilterLayout>
      <ListLayout isLoading={isLoading || isFetchData}>
        {priests.rows.length > 0 ? (
          <>
            <PriestTable
              lists={priests.rows}
              setUpdateIsActive={setUpdateIsActive}
              setDelete={setDeleteData}
            />
            <Pagination
              page={pageValue}
              onPageChange={handlePageChange}
              totalPages={priests.totalPage}
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

export default PriestIndex
