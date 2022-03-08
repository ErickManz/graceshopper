import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

// //temporary value for login state
// const isLoggedIn = false


export default function Confirmation() {
    return (
        <Container>
            <Typography sx={{fontFamily: 'Syne'}}>
        Order Confirmed!
    </Typography>
       {/* {isLoggedIn
        ? <a>View Transactions</a>
        : <a>Create Account to review transactions</a>} */}
    </Container>
        
    )
}