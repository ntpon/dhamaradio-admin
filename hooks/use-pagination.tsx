import { useRouter } from "next/router"
import { useState } from "react"

function usePagination() {
  const router = useRouter()
  // const pageValue = router.query.page || 1
  const [pageValue, setPageValue] = useState(1)
  const handlePageChange = async (pageNumber: number) => {
    // router.push(`/member?page=${pageNumber}`)
    setPageValue(pageNumber)
  }

  return { pageValue: Number(pageValue), handlePageChange }
}
export default usePagination
