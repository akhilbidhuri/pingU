import React, { Component } from 'react';
import '../App.css';
import { browserHistory } from 'react-router'
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { Column } from 'simple-flexbox';
import Button from '@material-ui/core/Button'
import action  from '../action'
import { connect } from "react-redux";
import axios from 'axios'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Error from '@material-ui/icons/Error'
import config from './config'
class login extends Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            empty: false
        }
    }

     _login =() =>{
        console.log("yaha aa gaya")
        let email = document.getElementById('email').value
        let pass = document.getElementById('password').value
        if(email=='' || pass==''){
            this.setState({empty:true})
            return
        }
        console.log(email, pass)
        axios.post(config.base+'/login', {email:email, password:pass})
        .then((res)=>{
            if(res.data.status !== "fail"){
            console.log("result:",res.data)
            this.props.action(res.data.results)
            if(res.data.results.type==="hr"){
                browserHistory.push('/adduser')
            }
            else if(res.data.results.type==="manager"){
                browserHistory.push('/dashboard')
            }
            else{
                browserHistory.push('/chat')
            }}

        }).catch(err=>{console.log(err)})
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
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
            />
            </Column>
        </form>
        </CardContent>
        <CardActions>
            <Button onClick={this._login} style={{height:'50%', marginLeft:'20%', marginRight:'20%', background: 'linear-gradient(to right bottom, #00e676, #5df2d6)', borderRadius:'25px', marginBottom:'3%', width:'150%'}} >
                <h3 style={{color:'#fff', margin:'0px'}}>Lets Go!</h3 >
            </Button>
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
        </CardActions>
       </Card>
    </div>
    }
}

const mapStateToProps = state => ({
    ...state
  });
  const mapDispatchToProps = dispatch => ({
    action: (payload) => dispatch(action(payload))
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(login);