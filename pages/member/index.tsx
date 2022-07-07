import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import PageLayout from "../../components/layout/page-layout"
import Empty from "../../components/empty/empty"
import api from "../../utils/api"
import IMember from "../../types/IMember"
import ConfirmModal from "../../components/modal/confirm-modal"
import MemberTable from "../../components/member/memeber-table"
import Pagination from "../../components/pagination/pagination"
import usePagination from "../../hooks/use-pagination"
import Search from "../../components/search/search"
import FilterLayout from "../../components/crud/filter/filter-layout"
import ListLayout from "../../components/crud/list/list-layout"
import { Box, Button } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import Link from "next/link"
function MemberIndex() {
  const [members, setMembers] = useState<{
    totalPage: number
    rows: IMember[]
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

  const [deleteMember, setDeleteMember] = useState<string | null>(null)

  useEffect(() => {
    setIsFetchData(true)
  }, [pageValue])

  useEffect(() => {
    if (isFetchData) {
      api.Member.getAll(pageValue, search)
        .then((res) => {
          const { users, totalPage } = res.data
          setMembers({ rows: users, totalPage })
        })
        .finally(() => {
          setIsFetchData(false)
        })
    }
  }, [isFetchData])

  const handleUpdateIsActive = () => {
    if (updateIsActive) {
      setIsLoading(true)
      api.Member.updateIsActive(updateIsActive.id, updateIsActive.isActive)
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

  const handleDeleteMember = () => {
    if (deleteMember) {
      setIsLoading(true)
      api.Member.delete(deleteMember)
        .then((res) => {
          setDeleteMember(null)
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
    }
  }

  const handleSearchSubmit = () => {
    if (!search) {
      handlePageChange(1)
    }
    setIsFetchData(true)
  }

  return (
    <PageLayout titleText='สมาชิก'>
      <FilterLayout title='สมาชิก'>
        <Search
          placeholderText='ค้นหาสมาชิกตาม ชื่อ, นามสกุล'
          onSearchSubmit={handleSearchSubmit}
          search={search}
          setSearch={setSearch}
        />
        <Link href='/member/create'>
          <Button
            marginLeft='5px'
            leftIcon={<AddIcon />}
            colorScheme='teal'
            variant='solid'
          >
            เพิ่มสมาชิก
          </Button>
        </Link>
      </FilterLayout>
      <ListLayout isLoading={isLoading || isFetchData}>
        {members.rows.length > 0 ? (
          <>
            <MemberTable
              members={members.rows}
              setUpdateIsActive={setUpdateIsActive}
              setDeleteMember={setDeleteMember}
            />
            <Pagination
              page={pageValue}
              onPageChange={handlePageChange}
              totalPages={members.totalPage}
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
        {deleteMember && (
          <ConfirmModal
            isOpen={!!deleteMember}
            onClose={() => {
              setDeleteMember(null)
            }}
            onConfirm={handleDeleteMember}
            title='ยืนยันการลบข้อมูล'
          />
        )}
      </ListLayout>
    </PageLayout>
  )
}

export default MemberIndex
