import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react"
import React, { useEffect, useRef } from "react"
import { toast } from "react-toastify"

interface IProps {
  label: string
  name: string
  file: any
  setFile: (file: any) => void
  previewData: string
  setPreviewData: (url: string) => void
  isLoading?: boolean
}

function InputFile({
  label,
  name,
  file,
  setFile,
  previewData,
  setPreviewData,
  isLoading = false,
}: IProps) {
  const fileRef = useRef<any>()
  // useEffect(() => {
  //   if (!file) {
  //     // file to init
  //     setFile(new File([], ""))
  //   }
  // }, [file])
  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile
    console.log(event.target)
    if (event.target.files && event.target.files.length > 0) {
      pickedFile = event.target.files[0] as any
      console.log(pickedFile.type)
      //   check file audio

      if (
        pickedFile.type !== "audio/mpeg" &&
        pickedFile.type !== "audio/mp3" &&
        pickedFile.type !== "audio/wav"
      ) {
        toast.error("File type is not supported")
        return
      }

      setFile(pickedFile)
    }
  }
  return (
    <FormControl mt={2}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <Input
          name={name}
          type='tel'
          placeholder='คลิกเพื่อเลือกไฟล์'
          readOnly
          cursor='pointer'
          onClick={() => fileRef.current.click()}
          value={file ? file.name : ""}
        />
        <input
          type='file'
          style={{ display: "none" }}
          onChange={pickedHandler}
          onClick={(event: any) => {
            event.target.value = null
          }}
          ref={fileRef}
        />
        <InputRightAddon padding='0'>
          <Button
            onClick={() => {
              setFile(null)
            }}
          >
            ยกเลิก
          </Button>
        </InputRightAddon>
      </InputGroup>
    </FormControl>
  )
}

export default InputFile
