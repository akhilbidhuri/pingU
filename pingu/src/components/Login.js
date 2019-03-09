import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import '../App.css';
import Grid from '@material-ui/core/Grid';
import { browserHistory } from 'react-router'
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Column } from 'simple-flexbox';

class login extends Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password:''
        }
    }

    render(){
    return <div style={{minHeight:'100vh', background:'linear-gradient(120deg, #43b8ff 50%, #ff6043 50%)', margin:'0px'}}>
      <IconButton color="#fff" onClick={ browserHistory.goBack }>
        <ArrowBack />
      </IconButton>
       <Card  style={{width:"30%", marginLeft:'35%'}}>
        <CardContent>
        <h1 style={{textAlign:'center', fontSize:'250%'}} className="logo"><span style={{color:'#43b8ff'}}>Log</span><span style={{color:'#ff6043'}}>in</span></h1>
        <form>
            <Column horizontal="center">
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
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            />
            </Column>
        </form>
        </CardContent>
        <CardActions>
            <Button>
                
            </Button>
        </CardActions>
       </Card>
    </div>
    }
}
export default login;