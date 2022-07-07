import { FormControl, FormLabel, Select, Skeleton } from "@chakra-ui/react"
import React, { ChangeEvent } from "react"
interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  value: string
  options?: { label: string; value: string }[]
  onChange(event: ChangeEvent<HTMLSelectElement>): void
  isLoading?: boolean
}
function SelectLabel({
  label,
  name,
  onChange,
  value,
  options = [],
  required,
  isLoading = false,
  ...props
}: IProps) {
  return (
    <FormControl mt={2}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {isLoading ? (
        <Skeleton height='30px' />
      ) : (
        <Select
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      )}
    </FormControl>
  )
}

export default SelectLabel
