import { FormControl, FormLabel, Input, Skeleton } from "@chakra-ui/react"
import React, { ChangeEvent } from "react"
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  value?: string
  isLoading?: boolean
  disabled?: boolean
}
function InputLabel({
  label,
  name,
  onChange,
  value,
  type,
  required,
  disabled = false,
  isLoading = false,
}: IProps) {
  return (
    <FormControl mt={2}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {isLoading ? (
        <Skeleton height='30px' />
      ) : (
        <Input
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          required={required}
          placeholder={`เพิ่ม${label}`}
          disabled={disabled}
        />
      )}
    </FormControl>
  )
}

export default InputLabel
