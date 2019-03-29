import React, {Component} from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import {Column} from 'simple-flexbox'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux';
import axios from 'axios'
import Error from '@material-ui/icons/Error'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import config from './config'
class adduser extends Component{
    constructor(){
        super()
        this.state={
            empty: false,
            added: false
        }
        this.adduser = this.adduser.bind(this)
    }

    adduser(){
        console.log("aa gaya")
        let name = document.getElementById('name').value
        let email = document.getElementById('email').value
        let pass = document.getElementById('password').value
        let role = document.getElementById('role').value
        let type = document.getElementById('type').value
        if (name=='' || email=='' ||pass=='' ||role=='' ||type==''){
                this.setState({empty:true})
                return
        }
        axios.post(config.base+'/reguser', {name: name, company:this.props.data.company, email:email, password:pass, role:role, type:type})
        .then(res=>{console.log(res);this.setState({added:true});
        document.getElementById('name').reset();
        document.getElementById('email').reset();
        document.getElementById('password').reset();
        document.getElementById('role').reset();
        document.getElementById('type').reset();
    })
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
            id = "name"
            label ="Name"
            type="text"
            margin="normal"
            name="name"
            variant="outlined"
            required
            />
            <TextField
            id="email"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            required
            />
            <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            required
            />
            <TextField
            id = "role"
            label ="Role"
            type="text"
            margin="normal"
            variant="outlined"
            name="role"
            required
            />
            <TextField
            id = "type"
            label ="Type"
            type="text"
            margin="normal"
            variant="outlined"
            name="type"
            required
            />
            <Button onClick={this.adduser} style={{background:'#00c853', color:'#fff', fontSize:'130%', fontWeight:'480', width:'40%', height:'20%'}}>
                Add
            </Button>            
            {this.state.empty &&
            <Chip
             style={{marginTop:'2%'}}
              avatar={
            <Avatar>
            <Error />
            </Avatar>
            }
            label="Enter all Fields"
            onDelete={()=>{
                this.setState({empty:false})
            }}
            color="secondary"
            />

        }
        {this.state.added &&
            <Chip
             style={{marginTop:'2%', backgroundColor:'#34ef45', color:'#fff'}}
              avatar={
            <Avatar>
            <Error />
            </Avatar>
            }
            label="Employee Added"
            onDelete={()=>{
                this.setState({added:false})
            }}
            />

        } 
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