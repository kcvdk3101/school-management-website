import React from 'react'
import { Container, Grid, Box } from '@mui/material'

type SearchFormProps = {}

const SearchForm: React.FC<SearchFormProps> = () => {
  return (
    <Container>
      <Grid container justifyContent='center'>
        {/* Table Booking Route */}
        <Grid item>
          <Box component='form'>
            <Box component='div'>
              <Grid container spacing={3}></Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SearchForm
