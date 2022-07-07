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
import IRole from "../../types/IRole"
import RoleTable from "../../components/role/role-table"
function RoleIndex() {
  const [roles, setRoles] = useState<{
    totalPage: number
    rows: IRole[]
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
      api.Role.getAll(pageValue, search)
        .then((res) => {
          const { roles, totalPage } = res.data
          setRoles({ rows: roles, totalPage })
        })
        .finally(() => {
          setIsFetchData(false)
        })
    }
  }, [isFetchData])

  const handleUpdateIsActive = () => {
    if (updateIsActive) {
      setIsLoading(true)
      api.Role.updateIsActive(updateIsActive.id, updateIsActive.isActive)
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
      api.Role.delete(deleteData)
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
    <PageLayout titleText='บทบาท'>
      <FilterLayout title='บทบาท'>
        <Search
          placeholderText='ค้นหาบทบาทด้วยชื่อ, รายละเอียด'
          onSearchSubmit={handleSearchSubmit}
          search={search}
          setSearch={setSearch}
        />
        <Link href='/role/create'>
          <Button
            marginLeft='5px'
            leftIcon={<AddIcon />}
            colorScheme='teal'
            variant='solid'
          >
            เพิ่มบทบาท
          </Button>
        </Link>
      </FilterLayout>
      <ListLayout isLoading={isLoading || isFetchData}>
        {roles.rows.length > 0 ? (
          <>
            <RoleTable
              lists={roles.rows}
              setUpdateIsActive={setUpdateIsActive}
              setDelete={setDeleteData}
            />
            <Pagination
              page={pageValue}
              onPageChange={handlePageChange}
              totalPages={roles.totalPage}
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

export default RoleIndex
