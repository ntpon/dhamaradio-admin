import {
  FormControl,
  FormLabel,
  Input,
  Skeleton,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react"
import React, { ChangeEvent } from "react"
interface IProps extends TextareaProps {
  label: string
  name: string
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  isLoading?: boolean
  disabled?: boolean
}
function InputTextArea({
  label,
  name,
  onChange,
  value,
  isLoading = false,
  size,
  disabled = false,
  ...props
}: IProps) {
  return (
    <FormControl mt={2}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {isLoading ? (
        <Skeleton height='30px' />
      ) : (
        <Textarea
          placeholder='เพิ่มรายละเอียด'
          size={size}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      )}
    </FormControl>
  )
}

export default InputTextArea
