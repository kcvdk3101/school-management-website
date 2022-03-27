import { Button } from '@mui/material'
import React, { ReactElement } from 'react'

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
  sz?: 'small' | 'medium' | 'large' | undefined
  label: string | ReactElement
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
    <Button
      fullWidth
      size={sz}
      color={color}
      variant={variant}
      onClick={handleOnClick}
    >
      {label}
    </Button>
  )
}

export default CustomButon
