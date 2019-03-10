import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import '../App.css'
import {Row} from 'simple-flexbox'
import { Group } from '@material-ui/icons';
import {Timeline} from '@material-ui/icons'
import {Add} from '@material-ui/icons'
import {GroupAdd} from '@material-ui/icons'
import { Link, withRouter, browserHistory } from 'react-router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { connect } from "react-redux";

class app extends Component{
    constructor(){
        super()
        this.state={
            teams:[], 
            teamsview: false
        }
        this.toggleteams = this.toggleteams.bind(this)
    }
    toggleteams(){
        this.setState({teamsview: !this.state.teamsview})
    }
    componentDidMount(){
        if(this.props.data.length==0){
            browserHistory.push('/login')
        }
        console.log("type of user:", this.props)
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
                <AppBar position="static" style={{position:'fixed', background:"#8e24aa" }}>
                 <Toolbar>
                 <Typography variant="h4" color="inherit" noWrap className="logo" style={{ fontWeight:'800' }}>
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
                <div style={{position:'fixed', minHeight:'100vh', width:'17%', background:'#8e24aa', borderTop:'2px solid #6a1b9a', boxShadow:'8px 0 5px -5px #aaa', marginTop:'60px'}}>
                <div style={{paddingTop:'20px'}}>
                </div>
                <Typography onClick={this.toggleteams} variant="p" noWrap className="listcontents" style={{ marginBottom:'30px', fontWeight:'540', color:'#fff', textAlign:'center',marginRight:'20%', marginLeft:'20%', borderRadius:'10px', cursor:'pointer' }}>
                    <Group style={{color:'#fff', marginTop:'1%'}}/>Teams
                    {this.state.teamsview &&
                    <List component="div" disablePadding>
                        {
                        this.props.data.group.map(item=>
                        <Link to={"/chat"} style={{ textDecoration: 'none'}}><ListItem button >
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText inset  primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>{item.gname}</Typography>} />
                        </ListItem></Link>)
                        }
                    </List>}
                </Typography>
                {this.props.data.type=="manager"&&
                <Link to={"/dashboard"} style={{ textDecoration: 'none'}}>
                <Typography variant="p" noWrap className="listcontents" style={{ marginBottom:'30px', fontWeight:'540', color:'#fff', textAlign:'center',marginRight:'20%', marginLeft:'20%', borderRadius:'10px' }}>
                    <Timeline style={{color:'#fff', marginTop:'1%'}}/>Dashboard
                </Typography>
                </Link>
                }
                {this.props.data.type=="manager"&&
                <Link to={"/create"} style={{ textDecoration: 'none'}}>
                <Typography variant="p" noWrap className="listcontents" style={{marginBottom:'30px', fontWeight:'540', color:'#fff', textAlign:'center',marginRight:'20%', marginLeft:'20%', borderRadius:'10px' }}>
                    <GroupAdd style={{color:'#fff', marginTop:'1%'}}/>Create Team
                </Typography>
                </Link>
                }
                {this.props.data.type=="hr"&&
                <Link to={"/adduser"} style={{ textDecoration: 'none'}}>
                <Typography variant="p" noWrap className="listcontents" style={{marginBottom:'30px', fontWeight:'540', color:'#fff', textAlign:'center',marginRight:'20%', marginLeft:'20%', borderRadius:'10px' }}>
                    <Add style={{color:'#fff', marginTop:'1%'}}/>Add User
                </Typography>
                </Link>
                }
                </div>
                {
                    <div style={{marginLeft:'23%', marginTop:'5%'}}>
                        {
                            this.props.children
                        }
                    </div>
                    
                }
                </Row>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    ...state
  });
export default connect(mapStateToProps)(app);