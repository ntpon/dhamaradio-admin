import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Skeleton,
} from "@chakra-ui/react"
import React, { ChangeEvent, useState } from "react"
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  isLoading?: boolean
}

function InputPassword({
  label,
  name,
  onChange,
  value,
  isLoading = false,
  ...props
}: IProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormControl mt={2}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {isLoading ? (
        <Skeleton height='30px' />
      ) : (
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={showPassword ? "text" : "password"}
            required
            placeholder={`เพิ่ม${label}`}
            value={value}
            onChange={onChange}
          />
          <InputRightElement width='4.5rem'>
            <Button
              h='1.75rem'
              size='sm'
              onClick={() => {
                setShowPassword((prev) => !prev)
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
    </FormControl>
  )
}

export default InputPassword
