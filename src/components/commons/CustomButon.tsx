import { Button, SxProps, Theme } from '@mui/material'
import React, { ReactElement } from 'react'

type CustomButonProps = {
  color: 'inherit' | 'secondary' | 'primary' | 'success' | 'error' | 'info' | 'warning' | undefined
  variant: 'text' | 'contained' | 'outlined' | undefined
  label: string | ReactElement
  type?: string
  sx?: SxProps<Theme> | undefined
  sz?: 'small' | 'medium' | 'large' | undefined
  handleOnClick?: () => void
}

const CustomButon: React.FC<CustomButonProps> = ({
  color,
  variant,
  sz,
  label,
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
      type='submit'
    >
      {label}
    </Button>
  )
}

export default CustomButon
