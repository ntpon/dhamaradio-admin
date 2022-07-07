import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"

interface IProps {
  placeholderText?: string
  search: string
  setSearch: (search: string) => void
  onSearchSubmit: () => void
}
function Search({
  placeholderText = "ค้นหาด้วยข้อมูล...",
  search,
  setSearch,
  onSearchSubmit,
}: IProps) {
  const [isClear, setIsClear] = useState(false)
  useEffect(() => {
    if (isClear && !search) {
      onSearchSubmit()
      setIsClear(false)
    }
  }, [isClear, search, onSearchSubmit])
  return (
    <Flex flex={3} marginRight='15px'>
      <Box
        width='100%'
        as='form'
        onSubmit={(e: FormEvent) => {
          e.preventDefault()
          onSearchSubmit()
        }}
      >
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input
            type='tel'
            placeholder={placeholderText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value)
            }}
            value={search}
          />
        </InputGroup>
      </Box>
      <Box marginLeft='5px'>
        <Button
          onClick={() => {
            setSearch("")
            setIsClear(true)
          }}
        >
          คืนค่าเริ่มต้น
        </Button>
      </Box>
    </Flex>
  )
}

export default Search
