import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import { CardContent, CardActionArea, Button } from '@material-ui/core';
import openSocket from "socket.io-client";
import {connect} from 'react-redux'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Send from '@material-ui/icons/Send';

 //socket for web socket bi-derectional communication

class chat extends Component{
    constructor(){
        super()
        this.state = {
            messages:[],
            socket : null
        }
        this.sendmsg = this.sendmsg.bind(this)
    }
    sendmsg(){
        let d = new Date();
        let msg = document.getElementById('msg').value
        this.setState({messages:[...this.state.messages, msg]})
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
        await this.setState({socket:openSocket("http://192.168.43.78:4000/")})
        if(this.props.data.group.length>0){
        axios.post('http://192.168.43.78:4000/group', {gid:this.props.data.group[0].gid, company:this.props.data.company}).
        then(res=>{
            console.log(res)
            res.data.map(u=>{
            var rr = { message:u.message , handle:u.from }
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
            <Card raised="true" style={{width:'950px', marginBottom:'4%', marginTop:'2%'}}>
                <CardContent style={{overflowY:'scroll', height:'80vh'}}>
                    {
                        this.state.messages.map(m =>
                           <div style={{border:'1px solid #555', borderRadius:'8px'}}> <h2 style={{padding:'20px'}}>{m.message}</h2>
                            <p>{m.handle}</p></div>
                        )
                    }
                </CardContent>
                <CardActionArea style={{bottom:'0', left:'0', height:'15vh',}}>
                    <div style={{ width:'950px', background:'#4a148c', bottom:'0', border:'1px solid #000', height:'15vh', position:'fixed'}}>
                    <TextField  InputLabelProps={{style: { color: '#8e24aa' }}} style={{background:'#fff', width:'80%', marginLeft:'3%', borderRadius:"10px"}}  multiline margin="normal" variant="filled" label="Message" type="text" id="msg"/>
                    <Fab onClick={()=>this.sendmsg()} style={{background:'#00bfa5', margin:'17px'}}>
                    <Send style={{color:'#fff'}}/>
                    </Fab>
                    </div>
                </CardActionArea>
            </Card>
            </div>)
    }
}
const mapStateToProps = state => ({
    ...state
  });
export default connect(mapStateToProps)(chat);