import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import '../App.css'
import Dashboard from './dashboard'
import {Row} from 'simple-flexbox'
import { Group } from '@material-ui/icons';

class app extends Component{
    constructor(){
        super()
        this.state={
            teams:[]
        }
    }

    render(){
        return (
            <div>
                <style>{
                    `
                    .listcontents:hover{
                        fontWeight: 580;
                        background: #6a1b9a;

                    }
                    `}
                </style>
                <AppBar position="static" style={{ background:"#8e24aa" }}>
                 <Toolbar>
                 <Typography variant="h4" color="inherit" noWrap className="logo" style={{ fontWeight:'500' }}>
                    <span style={{ color: '#43b8ff' }}>pin</span><span style={{color:'#ff6043'}}>gU</span>
                 </Typography>
                 <div style={{flexGrow: '1'}}></div>
                 <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon style={{color:"#fff"}}/>
                    </Badge>
                 </IconButton>
                 <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    style={{marginRight:'2%'}}
                >
                    <AccountCircle style={{color:"#fff"}}/>
                </IconButton>
                 </Toolbar>
                </AppBar>
                <Row>
                <div style={{minHeight:'100vh', width:'13%', background:'#8e24aa', borderTop:'2px solid #6a1b9a'}}>
                <Typography variant="h6" noWrap className="listcontents" style={{ fontWeight:'540', color:'#fff', textAlign:'center',marginRight:'20%', marginLeft:'20%', borderRadius:'10px' }}>
                    <Group style={{color:'#fff', marginTop:'1%'}}/>Teams
                </Typography>
                </div>
                {
                    <Dashboard/>
                }
                </Row>
            </div>
        )
    }
}

export default app;