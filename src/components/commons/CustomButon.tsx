import { Button, SxProps, Theme } from '@mui/material'
import React, { ReactElement } from 'react'

type CustomButonProps = {
  color: 'inherit' | 'secondary' | 'primary' | 'success' | 'error' | 'info' | 'warning' | undefined
  variant: 'text' | 'contained' | 'outlined' | undefined
  label: string | ReactElement
  type: 'button' | 'submit'
  sx?: SxProps<Theme> | undefined
  sz?: 'small' | 'medium' | 'large' | undefined
  handleOnClick?: () => void
}

const CustomButon: React.FC<CustomButonProps> = ({
  color,
  variant,
  sz,
  label,
  type,
  sx,
  handleOnClick,
}) => {
  return (
    <Button
      fullWidth
      size={sz}
      color={color}
      variant={variant}
      onClick={handleOnClick}
      sx={sx}
      type={type}
    >
      {label}
    </Button>
  )
}

export default CustomButon
