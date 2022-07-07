import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import api from "../../utils/api"
import FormLayout from "../crud/form/form-layout"
import InputFile from "../crud/input-file/input-file"
import InputLabel from "../crud/input-label/input-lalbel"
import IAlbum from "../../types/IAlbum"
import SelectLabel from "../crud/select-label/select-label"
interface IProps {
  typeForm: "create" | "update"
}

function AudioForm({ typeForm }: IProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [album, setAlbum] = useState("")
  const [albumLists, setAlbumLists] = useState<IAlbum[] | []>()
  const [isAlbumLoading, setIsAlbumLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [previewData, setPreviewData] = useState("")
  const [file, setFile] = useState()

  useEffect(() => {
    if (typeForm === "update") {
      setIsLoading(true)
      api.Audio.get(router.query.id as string)
        .then((res) => {
          const { name, albumId } = res.data.audio
          setName(name)
          setAlbum(albumId)
        })
        .catch((error) => {
          router.push("/audio")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [typeForm])

  useEffect(() => {
    api.Album.getNotPaginate()
      .then((res) => {
        const { albums } = res.data
        if (!albums) {
          toast("กรุณาเพิ่มอัลบั้มก่อนทำรายการ")
          router.push("/album/create")
        }
        if (typeForm === "create") {
          setAlbum(albums[0].id)
        }
        setAlbumLists(albums)
      })
      .finally(() => {
        setIsAlbumLoading(false)
      })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!file) {
      toast.error("กรุณาเพิ่มไฟล์เสียง")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("albumId", album)
    formData.append("source", file)
    setIsLoading(true)
    setIsSubmit(true)
    if (typeForm === "create") {
      api.Audio.create(formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/audio")
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        })
        .finally(() => {
          setIsSubmit(false)
          setIsLoading(false)
        })
    } else {
      api.Audio.update(router.query.id as string, formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/audio")
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
    <FormLayout title='เสียง'>
      <Flex
        as='form'
        onSubmit={handleSubmit}
        width='100%'
        justifyContent='center'
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box minWidth={{ base: "100%", md: "500px" }} padding='15px'>
          <SelectLabel
            label='ชุดเสียง'
            name='role'
            isLoading={isAlbumLoading || isLoading}
            options={albumLists?.map((album) => ({
              label: album.name,
              value: album.id,
            }))}
            value={album}
            onChange={(event) => {
              setAlbum(event.target.value)
            }}
          />

          <InputFile
            label='ไฟล์เสียง'
            name='audio'
            setFile={setFile}
            file={file}
            previewData={previewData}
            setPreviewData={setPreviewData}
          />

          <InputLabel
            label='ชื่อเสียง'
            name='name'
            onChange={(event) => setName(event.target.value)}
            value={name}
            isLoading={isLoading}
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
            <Link href='/audio'>
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

export default AudioForm
