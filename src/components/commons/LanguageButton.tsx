import React, { useState, useRef, useEffect } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

type LanguageButtonProps = {}

const languages = [
  {
    key: 'vn',
    value: 'Tiếng Việt',
  },
  {
    key: 'gb',
    value: 'United Kingdom',
  },
]
const LanguageButton: React.FC<LanguageButtonProps> = () => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState('vn')

  useEffect(() => {
    let lang = localStorage.getItem('cft-language')
    if (!lang) return
    // if (lang === 'vn') {
    //   setLanguage('vn')
    // } else {
    // }
    setLanguage(lang)
    i18n.changeLanguage(lang)
  }, [i18n])

  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleMenuItemClick = (key: string, index: number) => {
    localStorage.setItem('cft-language', key)
    i18n.changeLanguage(key)
    setLanguage(key)
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  return (
    <Box sx={{ mr: 1, display: 'flex', justifyContent: 'center' }}>
      <ButtonGroup variant='contained' ref={anchorRef}>
        <Button onClick={handleToggle}>
          <img
            loading='lazy'
            width='20'
            src={`https://flagcdn.com/w20/${language}.png`}
            alt='flag'
          />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {languages.map((language, index) => (
                    <MenuItem
                      key={index}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(language.key, index)}
                    >
                      {language.value}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}

export default LanguageButton
