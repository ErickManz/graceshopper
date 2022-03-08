import React from 'react'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

/**
 * COMPONENT
 */
const Home = props => {
  const username = useSelector(state => state.auth.username)

  return (
    <Container maxWidth="sm">

      <Typography component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontFamily: 'Syne'}}>Welcome, {username}</Typography>
    </Container>
  )
}

export default Home