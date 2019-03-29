import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import { CardContent, CardActionArea, Button } from '@material-ui/core';
import openSocket from "socket.io-client";
import {connect} from 'react-redux'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';
import Assignment from '@material-ui/icons/Assignment'
import config from './config'
import qs from 'qs'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

class chat extends Component{
    constructor(){
        super()
        this.state = {
            messages:[],
            summary:[],
            socket : null,
            open: false
        }
        this.sendmsg = this.sendmsg.bind(this)
        this.summarize = this.summarize.bind(this)
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    summarize(){
        axios.post(config.ml+'/summarize',qs.stringify({gid: this.props.data.group[0].gid, company:this.props.data.company}))
        .then(r=>{
            console.log(r.data)
            this.setState({summary:r.data.results})
            this.handleClickOpen()
        })
        .catch(err=>console.log(err))
    }
    sendmsg(){
        let d = new Date();
        let msg = document.getElementById('msg').value
        this.setState({messages:[...this.state.messages]})
        this.state.socket.emit('chat',{gid: this.props.data.group[0].gid, message:msg, handle:this.props.data.name, time:{
            date: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear(),
            hrs: d.getHours(),
            min: d.getMinutes(),
            sec: d.getMinutes()
        }})
    }
    async componentDidMount(){
        console.log("goto")
        await this.setState({socket:openSocket(config.base)})
        if(this.props.data.group.length>0){
        axios.post(config.base+'/group', {gid:this.props.data.group[0].gid, company:this.props.data.company}).
        then(res=>{
            console.log(res)
            res.data.map(u=>{
            var rr = { message:u.message , handle:u.from, time: u.time }
            this.setState({messages:[...this.state.messages, rr]})
        })}).catch(err=>console.log(err))}
        this.state.socket.on("chat", message => {
            // console.log the message for posterity
            console.log('gugu',message);
             // trigger the callback passed in when
            // our App component calls connect
            this.setState({messages:[...this.state.messages, message]});
            })
    }
    render(){
        return (<div>
            <Card raised="true" style={{width:'1000px', marginBottom:'4%', marginTop:'2%', borderRadius:'18px'}}>
                <CardContent style={{ minHeight:'57vh'}}>
                    {
                        this.state.messages.map(m =>
                           <div style={{boxShadow:'0 0px 6px 1px  #ddd', borderRadius:'16px',marginBottom:'15px'}}> <h2 style={{padding:'20px'}}>{m.message}</h2>
                            <p style={{paddingLeft:'20px'}}>{m.handle}</p>
                            <span><h6 style={{paddingLeft:'20px', paddingBottom:'10px'}}>
                            {m.time.hrs}:{m.time.min}:{m.time.sec}
                            {'  '}
                            {m.time.date}/{m.time.month}/{m.time.year}
                            </h6>
                            </span>
                            </div>
                        )
                    }
                </CardContent>
                <CardActionArea style={{bottom:'0', left:'0', height:'15vh',}}>
                    <div style={{ width:'1000px', background:'#4a148c', bottom:'0', border:'1px solid #000', height:'15vh', position:'fixed'}}>
                    <TextField  InputLabelProps={{style: { color: '#8e24aa' }}} style={{background:'#fff', width:'80%', marginLeft:'3%', borderRadius:"10px"}}  multiline margin="normal" variant="filled" label="Message" type="text" id="msg"/>
                    <Fab onClick={()=>this.sendmsg()} style={{background:'#00bfa5', margin:'17px'}}>
                    <Send style={{color:'#fff'}}/>
                    </Fab>
                    <Fab onClick={()=>this.summarize()} style={{background:'#304ffe'}}>
                    <Assignment style={{color:'#fff'}}/>
                    </Fab>
                    </div>
                </CardActionArea>
            </Card>
            <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Summary"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                    {this.state.summary}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
            </div>)
    }
}
const mapStateToProps = state => ({
    ...state
  });
export default connect(mapStateToProps)(chat);