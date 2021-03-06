import React, { Component } from 'react';
import '../App.css';
import { browserHistory } from 'react-router'
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {Column} from 'simple-flexbox'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Error from '@material-ui/icons/Error'
import config from './config'
class onboard extends Component{
    constructor(){
        super()
        this.state = {
            isdone: false,
            empty: false
        }
        this._onboard = this._onboard.bind(this)
    }

    _onboard(){
        let r = null
        let email = document.getElementById('email').value
        let pass =  document.getElementById('password').value
        let company = document.getElementById('company').value
        let name = document.getElementById('name').value
        if(email==''||pass==''||company==''||name==''){
          this.setState({empty:true})
          return
        }
        axios.post(config.base+'/regcomp',  {email:email, password:pass, compname:company, name:name})
        .then(res=>{
          if(res.data.status!=='fail'){
            console.log(res.data)
            r = res.data
            this.setState({isdone:true})}

        }).catch(err=>console.log(err))
    }

    render(){
    return  <div style={{minHeight:'100vh', background:'linear-gradient(120deg, #43b8ff 50%, #ff6043 50%)', margin:'0px'}}>
    <IconButton color="#fff" onClick={ browserHistory.goBack }>
      <ArrowBack />
    </IconButton>
     <Card  style={{width:"30%", marginLeft:'35%'}}>
      <CardContent>
      <h1 style={{textAlign:'center', fontSize:'250%'}} className="logo"><span style={{color:'#43b8ff'}}>OnBo</span><span style={{color:'#ff6043'}}>ard</span></h1>
      <form>
            <Column horizontal="center">
            <TextField
            id = "name"
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
            id = "company"
            label ="Company Name"
            type="text"
            margin="normal"
            variant="outlined"
            name="compname"
            />            
            </Column>
      </form>  
      </CardContent>
      <CardActions>
      {!this.state.isdone &&
      <Button onClick={this._onboard} style={{height:'50%', marginLeft:'20%', marginRight:'20%', background: 'linear-gradient(to right bottom, #00e676, #5df2d6)', borderRadius:'25px', marginBottom:'3%', width:'150%'}}>
                <h3 style={{color:'#fff', margin:'0px'}}>Lets Go!</h3>
            </Button>}
            {
                this.state.empty &&
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
        {this.state.isdone &&
        <h3
        style={{color:'#fff', background:'#34ef45', paddingRight:'3%', paddingLeft:'3%'}}
          >
          Head to Login
          </h3>
        }
      </CardActions>
     </Card>
  </div>
    }
}
export default onboard;