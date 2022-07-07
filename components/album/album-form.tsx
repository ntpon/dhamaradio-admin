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
import SelectLabel from "../crud/select-label/select-label"
import IPriest from "../../types/IPriest"
interface IProps {
  typeForm: "create" | "update"
}

function AlbumForm({ typeForm }: IProps) {
  const router = useRouter()

  const [name, setAlbum] = useState("")
  const [description, setDescription] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isPriestLoading, setIsPriestLoading] = useState(true)
  const [priest, setPriest] = useState("")
  const [priestLists, setPriestLists] = useState<IPriest[] | []>()
  const [file, setFile] = useState()

  useEffect(() => {
    if (typeForm === "update") {
      setIsLoading(true)
      api.Album.get(router.query.id as string)
        .then((res) => {
          const { name, description, coverImage, priestId } = res.data.album
          setAlbum(name)
          setDescription(description)
          setPreviewUrl(coverImage)
          setPriest(priestId)
        })
        .catch((error) => {
          router.push("/album")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [typeForm])

  useEffect(() => {
    api.Priest.getNotPaginate()
      .then((res) => {
        // setIsPriestLoading(res.data.roles)
        const { priests } = res.data
        if (!priests) {
          toast("กรุณาเพิ่มพระอาจารย์ก่อนทำรายการ")
          router.push("/priest")
        }
        setPriestLists(res.data.priests)
        if (typeForm === "create") {
          setPriest(priests[0].id)
        }
      })
      .finally(() => {
        setIsPriestLoading(false)
      })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("priestId", priest)
    if (file) {
      formData.append("coverImage", file)
    }

    if (file) {
      formData.append("avatar", file)
    }
    setIsLoading(true)
    setIsSubmit(true)
    if (typeForm === "create") {
      api.Album.create(formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/album")
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        })
        .finally(() => {
          setIsSubmit(false)
          setIsLoading(false)
        })
    } else {
      api.Album.update(router.query.id as string, formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/album")
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
    <FormLayout title='ชุดเสียง'>
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
            imageType='cover'
          />
        </Box>
        <Box minWidth={{ base: "100%", md: "500px" }} padding='15px'>
          <InputLabel
            label='ชื่อชุดเสียง'
            name='name'
            onChange={(event) => setAlbum(event.target.value)}
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
          <SelectLabel
            label='พระอาจารย์'
            name='role'
            isLoading={isPriestLoading || isLoading}
            options={priestLists?.map((priest) => ({
              label: priest.fullName,
              value: priest.id,
            }))}
            value={priest}
            onChange={(event) => {
              setPriest(event.target.value)
            }}
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
            <Link href='/album'>
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

export default AlbumForm
