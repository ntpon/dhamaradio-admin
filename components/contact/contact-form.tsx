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
  typeForm: "create" | "update" | "show"
}

function ContactForm({ typeForm }: IProps) {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("")
  const [phone, setPhone] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (typeForm === "update" || typeForm === "show") {
      setIsLoading(true)
      api.Contact.get(router.query.id as string)
        .then((res) => {
          const { title, description, email, phone, fullName } =
            res.data.contact
          setTitle(title)
          setDescription(description)
          setEmail(email)
          setPhone(phone)
          setFullName(fullName)
          setDescription(description)
        })
        .catch((error) => {
          router.push("/contact")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [typeForm])

  return (
    <FormLayout title='ข้อความ'>
      <Flex
        // as='form'
        // onSubmit={handleSubmit}
        width='100%'
        justifyContent='center'
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box minWidth={{ base: "100%", md: "500px" }} padding='15px'>
          <InputLabel
            label='ชื่อ-นามสกุล ผู้ติดต่อ'
            name='name'
            value={fullName}
            isLoading={isLoading}
            disabled={typeForm === "show"}
          />
          <InputLabel
            label='อีเมล์'
            name='email'
            value={email}
            isLoading={isLoading}
            disabled={typeForm === "show"}
          />
          {phone && (
            <InputLabel
              label='เบอร์โทรศัพท์'
              name='phone'
              value={phone}
              isLoading={isLoading}
              disabled={typeForm === "show"}
            />
          )}

          <ButtonGroup marginTop='20px' display='flex' justifyContent='center'>
            <Link href='/contact'>
              <Button variant='solid' disabled={isLoading}>
                ย้อนกลับ
              </Button>
            </Link>
          </ButtonGroup>
        </Box>
        <Box minWidth={{ base: "100%", md: "500px" }} padding='15px'>
          <InputLabel
            label='หัวข้อ'
            name='title'
            value={title}
            isLoading={isLoading}
            disabled={typeForm === "show"}
          />
          <InputTextArea
            isLoading={isLoading}
            label='รายละเอียด'
            name='description'
            value={description}
            disabled={typeForm === "show"}
            rows={5}
          />
        </Box>
      </Flex>
    </FormLayout>
  )
}

export default ContactForm
