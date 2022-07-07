import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../../utils/api"
import FormLayout from "../crud/form/form-layout"
import InputImage from "../crud/input-image/input-image"
import InputLabel from "../crud/input-label/input-lalbel"
import InputTextArea from "../crud/input-textarea/input-textarea"

interface IProps {
  typeForm: "create" | "update"
}

function PriestForm({ typeForm }: IProps) {
  const router = useRouter()

  const [fullName, setFullName] = useState("")
  const [description, setDescription] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [file, setFile] = useState()

  useEffect(() => {
    if (typeForm === "update") {
      setIsLoading(true)
      api.Priest.get(router.query.id as string)
        .then((res) => {
          const { fullName, description, avatar } = res.data.priest
          setFullName(fullName)
          setDescription(description)
          setPreviewUrl(avatar)
        })
        .catch((error) => {
          router.push("/priest")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [typeForm])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("fullName", fullName)
    formData.append("description", description)
    if (file) {
      formData.append("avatar", file)
    }
    setIsLoading(true)
    setIsSubmit(true)
    if (typeForm === "create") {
      api.Priest.create(formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/priest")
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        })
        .finally(() => {
          setIsSubmit(false)
          setIsLoading(false)
        })
    } else {
      api.Priest.update(router.query.id as string, formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/priest")
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
    <FormLayout title='พระอาจารย์'>
      <Flex
        as='form'
        onSubmit={handleSubmit}
        width='100%'
        justifyContent='center'
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box minWidth={{ base: "100%", md: "300px" }} padding='15px'>
          <InputImage
            setFile={setFile}
            file={file}
            setPreviewUrl={setPreviewUrl}
            previewUrl={previewUrl}
            isLoading={isLoading}
          />
        </Box>
        <Box minWidth={{ base: "100%", md: "500px" }} padding='15px'>
          <InputLabel
            label='ชื่อพระอาจารย์'
            name='fullName'
            onChange={(event) => setFullName(event.target.value)}
            value={fullName}
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
            <Link href='/priest'>
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

export default PriestForm
