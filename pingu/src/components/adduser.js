import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import {Column} from 'simple-flexbox'
import Button from '@material-ui/core/Button'
class adduser extends Component{


    render(){
        return (
            <div>
                <Card raised="true" style={{borderTop:'4px solid #8e24aa', width:'550px', height:'500px', marginLeft:'30%', marginTop:'10%'}}>
                <CardContent>
                    <h1>Add User</h1>
                    <Column horizontal="center">
            <TextField
            id = "company"
            label ="Name"
            type="text"
            margin="normal"
            variant="outlined"
            name="name"
            />
            <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            />
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            />
            <TextField
            id = "role"
            label ="Role"
            type="text"
            margin="normal"
            variant="outlined"
            name="role"
            />
            <Button style={{background:'#00c853', color:'#fff', fontSize:'130%', fontWeight:'480', width:'40%', height:'20%'}}>
                Add
            </Button>            
            </Column>
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default adduser;