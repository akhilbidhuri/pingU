import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import {Column} from 'simple-flexbox'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import axios from 'axios'

class adduser extends Component{
    constructor(){
        super()
    }

    adduser(){
        let comp = document.getElementById('company').value
        let email = document.getElementById('email').value
        let pass = document.getElementById('password').value
        let role = document.getElementById('role').value
        let type = document.getElementById('type').value
        axios.post('http://172.16.20.100:4000/reguser', {company:comp, email:email, password:pass, role:role, type:type})
        .then(res=>{console.log(res)})
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <div>
                <Card raised="true" style={{borderTop:'4px solid #8e24aa', width:'550px', height:'600px', marginLeft:'30%', marginTop:'6%'}}>
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
            id="email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            />
            <TextField
            id="password"
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
            <TextField
            id = "type"
            label ="Type"
            type="text"
            margin="normal"
            variant="outlined"
            name="type"
            />
            <Button onClick={this.addUser} style={{background:'#00c853', color:'#fff', fontSize:'130%', fontWeight:'480', width:'40%', height:'20%'}}>
                Add
            </Button>            
            </Column>
                </CardContent>
                </Card>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
  });
export default connect(mapStateToProps)(adduser);