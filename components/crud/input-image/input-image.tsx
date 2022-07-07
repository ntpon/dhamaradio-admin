import { Avatar, Box, Button, Flex, Skeleton } from "@chakra-ui/react"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
interface IProps {
  file: any
  previewUrl: string
  setPreviewUrl: (url: string) => void
  isLoading?: boolean
  setFile: (file: any) => void
  imageType?: "avatar" | "cover"
}
function InputImage({
  setFile,
  file,
  setPreviewUrl,
  previewUrl,
  isLoading = false,
  imageType = "avatar",
}: IProps) {
  const fileRef = useRef<any>()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        setPreviewUrl(fileReader.result)
      }
    }
    fileReader.readAsDataURL(file)
  }, [file])
  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile
    if (event.target.files && event.target.files.length > 0) {
      pickedFile = event.target.files[0] as any
      //   check file audio
      if (pickedFile.type !== "image/png" && pickedFile.type !== "image/jpeg") {
        toast.error("File type is not supported")
      }
      setFile(pickedFile)
    }
  }
  return (
    <Flex flexDirection='column' alignItems='center'>
      <Box>
        {isLoading ? (
          <Skeleton>
            <Avatar
              size='2xl'
              borderRadius={imageType === "cover" ? 0 : "full"}
            />
          </Skeleton>
        ) : (
          <Avatar
            size='2xl'
            src={previewUrl}
            borderRadius={imageType === "cover" ? 0 : "full"}
          />
        )}
        <input
          type='file'
          style={{ display: "none" }}
          onChange={pickedHandler}
          ref={fileRef}
        />
      </Box>
      <Box marginTop='15px'>
        <Button
          colorScheme='teal'
          variant='solid'
          onClick={() => fileRef.current.click()}
        >
          เปลี่ยนรูปภาพ
        </Button>
      </Box>
    </Flex>
  )
}

export default InputImage
