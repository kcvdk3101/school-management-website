import { Button } from '@mui/material'
import React from 'react'

type CustomButonProps = {
  color:
    | 'inherit'
    | 'secondary'
    | 'primary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined
  variant: 'text' | 'contained' | 'outlined' | undefined
  sz: 'small' | 'medium' | 'large' | undefined
  label: string
  handleOnClick: () => void
}

const CustomButon: React.FC<CustomButonProps> = ({
  color,
  variant,
  sz,
  label,
  handleOnClick,
}) => {
  return (
    <Button size={sz} color={color} variant={variant} onClick={handleOnClick}>
      {label}
    </Button>
  )
}

export default CustomButon
