import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import { CardContent, CardActionArea, Button } from '@material-ui/core';
import openSocket from "socket.io-client";
import {connect} from 'react-redux'
import axios from 'axios'
const socket = openSocket("http://172.16.20.100:4000/");

class chat extends Component{
    constructor(){
        super()
        this.state = {
            messages:[]
        }
        this.sendmsg = this.sendmsg.bind(this)
    }
    sendmsg(){
        let msg = document.getElementById('msg').value
        socket.emit('chat',{message:msg, handle:this.props.data.name})
    }
    componentDidMount(){
        if(this.props.data.group.length>0){
        axios.post('http://172.16.20.100:4000/group', {gid:this.props.data.group[0].gid, company:this.props.data.company}).
        then(res=>{
            res.forEach(i=>{
            console.log(i)
                //let d = { i['message'] , i['from'] }
            //this.setState({messages:[...this.state.messages, ]}))
        })}).catch(err=>console.log(err))}
        socket.on("chat", message => {
            // console.log the message for posterity
            console.log(message);
             // trigger the callback passed in when
            // our App component calls connect
            this.setState({messages:[...this.state.messages, message]});
           
            })
    }
    render(){
        return (<div>
            <Card raised="true" style={{width:'950px', height:'550px', marginBottom:'4%', marginTop:'2%'}}>
                <CardContent>
                    {
                        this.state.messages.map(m =>
                           <div style={{}}> <h2 style={{padding:'20px'}}>{m.message}</h2>
                            <p>{m.handle}</p></div>
                        )
                    }
                </CardContent>
                <CardActionArea>
                    <div style={{width:'100%', background:'#4a148c', bottom:'0', border:'1px solid #000'}}>
                   { 
                    }
                    <input type="text" id="msg"/><Button onClick={this.sendmsg}>Go</Button>
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