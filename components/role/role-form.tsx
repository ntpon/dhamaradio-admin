import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../../utils/api"
import FormLayout from "../crud/form/form-layout"
import InputLabel from "../crud/input-label/input-lalbel"
import InputTextArea from "../crud/input-textarea/input-textarea"

interface IProps {
  typeForm: "create" | "update"
}

function RoleForm({ typeForm }: IProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (typeForm === "update") {
      setIsLoading(true)
      api.Role.get(router.query.id as string)
        .then((res) => {
          const { name, description } = res.data.role
          setName(name)
          setDescription(description)
        })
        .catch((error) => {
          router.push("/role")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [typeForm])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = {
      name,
      description,
    }
    setIsLoading(true)
    setIsSubmit(true)
    if (typeForm === "create") {
      api.Role.create(formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/role")
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        })
        .finally(() => {
          setIsSubmit(false)
          setIsLoading(false)
        })
    } else {
      api.Role.update(router.query.id as string, formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/role")
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        })
        .finally(() => {
          setIsSubmit(false)
          setIsLoading(false)
        })
    }
  }
  return (
    <FormLayout title='บทบาท'>
      <Flex
        as='form'
        onSubmit={handleSubmit}
        width='100%'
        justifyContent='center'
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box minWidth={{ base: "100%", md: "500px" }} padding='15px'>
          <InputLabel
            label='ชื่อบทบาท'
            name='name'
            onChange={(event) => setName(event.target.value)}
            value={name}
            isLoading={isLoading}
          />

          <InputTextArea
            isLoading={isLoading}
            label='รายละเอียด'
            name='description'
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <ButtonGroup marginTop='20px' display='flex' justifyContent='center'>
            <Button
              colorScheme='teal'
              variant='solid'
              type='submit'
              isLoading={isSubmit}
            >
              บันทึกข้อมูล
            </Button>
            <Link href='/role'>
              <Button variant='solid' disabled={isSubmit}>
                ย้อนกลับ
              </Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Flex>
    </FormLayout>
  )
}

export default RoleForm
