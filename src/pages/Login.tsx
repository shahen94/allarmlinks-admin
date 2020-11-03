import React, { ReactElement } from 'react'
import TextField from '@material-ui/core/TextField'

export default function Login(): ReactElement {
    return (
        <div>
            <TextField 
                label="Username"    
            />
            <TextField 
                label="Password"
                type="password"
            />

        </div>
    )
}
