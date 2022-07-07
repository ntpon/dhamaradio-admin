import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { FormEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import IMember from "../../types/IMember"
import IRole from "../../types/IRole"
import api from "../../utils/api"
import FormLayout from "../crud/form/form-layout"
import InputImage from "../crud/input-image/input-image"
import InputLabel from "../crud/input-label/input-lalbel"
import InputPassword from "../crud/input-password/input-password"
import SelectLabel from "../crud/select-label/select-label"

interface IProps {
  typeForm: "create" | "update"
}

function MemberForm({ typeForm }: IProps) {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRoleLoading, setIsRoleLoading] = useState(true)
  const [isSubmit, setIsSubmit] = useState(false)
  const [roleLists, setRoleLists] = useState<IRole[] | []>()
  const [role, setRole] = useState("1")
  const [file, setFile] = useState()

  useEffect(() => {
    if (typeForm === "update") {
      setIsLoading(true)
      api.Member.get(router.query.id as string)
        .then((res) => {
          const { firstName, lastName, email, roleId, avatar } = res.data.user
          setFirstName(firstName)
          setLastName(lastName)
          setEmail(email)
          setRole(roleId)
          setPreviewUrl(avatar)
        })
        .catch((error) => {
          router.push("/member")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [typeForm])

  useEffect(() => {
    api.Role.getNotPaginate()
      .then((res) => {
        // check role
        const { roles } = res.data
        if (!roles) {
          toast("กรุณาเพิ่มสิทธิการเข้าใช้งานก่อนทำรายการ")
          router.push("/role/create")
        }
        setRoleLists(res.data.roles)
        if (typeForm === "create") {
          setRole(roles[0].id)
        }
      })
      .finally(() => {
        setIsRoleLoading(false)
      })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน")
      return
    }
    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("password", password)
    console.log(role)
    formData.append("roleId", role)
    if (file) {
      formData.append("avatar", file)
    }
    setIsLoading(true)
    setIsSubmit(true)
    if (typeForm === "create") {
      api.Member.create(formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/member")
        })
        .catch((error) => {
          toast.error(error.response.data.error)
        })
        .finally(() => {
          setIsSubmit(false)
          setIsLoading(false)
        })
    } else {
      api.Member.update(router.query.id as string, formData)
        .then((res) => {
          toast.success(res.data.message)
          router.push("/member")
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
    <FormLayout title='สมาชิก'>
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
          <SelectLabel
            label='บทบาท'
            name='role'
            isLoading={isRoleLoading || isLoading}
            options={roleLists?.map((role) => ({
              label: role.name,
              value: role.id,
            }))}
            value={role}
            onChange={(event) => {
              setRole(event.target.value)
            }}
          />
          <InputLabel
            label='ชื่อจริง'
            name='firstName'
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            isLoading={isLoading}
          />
          <InputLabel
            isLoading={isLoading}
            label='นามสกุล'
            name='lastName'
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
          <InputLabel
            isLoading={isLoading}
            label='อีเมล'
            name='email'
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          {typeForm === "create" ? (
            <>
              <InputPassword
                isLoading={isLoading}
                label='รหัสผ่าน'
                name='password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              <InputPassword
                isLoading={isLoading}
                label='ยืนยันรหัสผ่าน'
                name='confirmPassword'
                onChange={(event) => setConfirmPassword(event.target.value)}
                value={confirmPassword}
              />
            </>
          ) : null}

          <ButtonGroup marginTop='20px' display='flex' justifyContent='center'>
            <Button
              colorScheme='teal'
              variant='solid'
              type='submit'
              isLoading={isSubmit}
            >
              บันทึกข้อมูล
            </Button>
            <Link href='/member'>
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

export default MemberForm
