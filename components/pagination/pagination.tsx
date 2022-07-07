import { Box, Button, Flex } from "@chakra-ui/react"
import { useState } from "react"
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi"
type PaginationProps = {
  page: number
  totalPages: number
  limitPageNumber?: number
  onPageChange: (page: number) => void
}
function Pagination({
  page,
  totalPages,
  limitPageNumber = 5,
  onPageChange,
}: PaginationProps) {
  const [maxPageNumber, setMaxPageNumber] = useState(limitPageNumber)
  const [minPageNumber, setMinPageNumber] = useState(0)

  const pages = Array.from(Array(totalPages).keys())

  const handleNextPage = () => {
    onPageChange(page + 1)
    console.log(page + 1 + " > " + maxPageNumber)
    if (page + 1 > maxPageNumber) {
      console.log("setData")
      setMaxPageNumber(maxPageNumber + limitPageNumber)
      setMinPageNumber(minPageNumber + limitPageNumber)
    }
  }

  const handlePrevPage = () => {
    onPageChange(page - 1)
    if ((page - 1) % limitPageNumber === 0) {
      setMaxPageNumber(maxPageNumber - limitPageNumber)
      setMinPageNumber(minPageNumber - limitPageNumber)
    }
  }

  if (totalPages === 1) return null
  console.log("min" + minPageNumber)
  console.log("max" + maxPageNumber)

  return (
    <Flex justifyContent='flex-end' marginTop='15px'>
      <Flex>
        <Button
          marginRight='5px'
          onClick={handlePrevPage}
          style={page === 1 ? { display: "none" } : { display: "initial" }}
        >
          ก่อนหน้า
        </Button>
        {page > maxPageNumber && (
          <Button
            marginX='5px'
            onClick={handlePrevPage}
            style={page === 1 ? { display: "none" } : { display: "initial" }}
          >
            &hellip;
          </Button>
        )}
        {pages.map((p) => {
          if (p < maxPageNumber && p + 1 > minPageNumber) {
            return (
              <Button
                marginX='3px'
                bg={p + 1 === page ? "teal.500" : "gray.100"}
                color={p + 1 === page ? "white" : "black"}
                _hover={{ bg: "teal.600", color: "white" }}
                _active={{ bg: "teal.600", color: "white" }}
                key={p}
                onClick={() => onPageChange(p + 1)}
              >
                {p + 1}
              </Button>
            )
          } else {
            return null
          }
        })}
        {pages.length > maxPageNumber && <Button>&hellip;</Button>}
        <Button
          onClick={handleNextPage}
          style={
            page === totalPages ? { display: "none" } : { display: "initial" }
          }
          marginLeft='5px'
        >
          ถัดไป
        </Button>
      </Flex>
    </Flex>
  )
}

export default Pagination
