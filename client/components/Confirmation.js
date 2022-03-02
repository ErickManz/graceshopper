import React from 'react'

//temporary value for login state
const isLoggedIn = false


export default function Confirmation() {
    return (
        <div classname="container">
            <div className="message">
        Order Confirmed!
    </div>
       {isLoggedIn
        ? <a>View Transactions</a>
        : <a>Create Account to review transactions</a>}
    </div>
        
    )
}