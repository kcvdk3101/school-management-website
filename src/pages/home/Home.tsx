import React from 'react'
import {Container, Box} from '@mui/material';

type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
    </Container>
  )
}

export default Home