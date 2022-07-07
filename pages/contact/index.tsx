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
import IContact from "../../types/IContact"
import RoleTable from "../../components/role/role-table"
import ContactTable from "../../components/contact/contact-table"
function RoleIndex() {
  const [roles, setContacts] = useState<{
    totalPage: number
    rows: IContact[]
  }>({
    totalPage: 0,
    rows: [],
  })
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchData, setIsFetchData] = useState(true)

  const [updateIsReply, setUpdateReply] = useState<{
    id: string
    isReply: boolean
  } | null>(null)

  const { handlePageChange, pageValue } = usePagination()

  const [deleteData, setDeleteData] = useState<string | null>(null)

  useEffect(() => {
    setIsFetchData(true)
  }, [pageValue])

  useEffect(() => {
    if (isFetchData) {
      api.Contact.getAll(pageValue, search)
        .then((res) => {
          const { contacts, totalPage } = res.data
          setContacts({ rows: contacts, totalPage })
        })
        .finally(() => {
          setIsFetchData(false)
        })
    }
  }, [isFetchData])

  const handleUpdateIsReply = () => {
    if (updateIsReply) {
      setIsLoading(true)
      api.Contact.update(updateIsReply.id, {
        isReply: updateIsReply.isReply,
      })
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
      setUpdateReply(null)
    }
  }

  const handleDeleteData = () => {
    if (deleteData) {
      setIsLoading(true)
      api.Contact.delete(deleteData)
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
    <PageLayout titleText='ข้อความ'>
      <FilterLayout title='ข้อความ'>
        <Search
          placeholderText='ค้นหาข้อความด้วยหัวข้อ, ชื่อ นามสกุล, อีเมล'
          onSearchSubmit={handleSearchSubmit}
          search={search}
          setSearch={setSearch}
        />
      </FilterLayout>
      <ListLayout isLoading={isLoading || isFetchData}>
        {roles.rows.length > 0 ? (
          <>
            <ContactTable
              lists={roles.rows}
              setUpdateReply={setUpdateReply}
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

        {updateIsReply && (
          <ConfirmModal
            title='ยืนยันการเปลี่ยนสถานะ'
            isOpen={!!updateIsReply}
            onClose={() => {
              setUpdateReply(null)
            }}
            onConfirm={handleUpdateIsReply}
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
