import React, {Component} from 'react'
import { Row, Column } from 'simple-flexbox'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import {Add} from '@material-ui/icons';
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
class create extends Component{
    constructor(){
        super()
        this.state={
            users:[],
            role:''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event){
        console.log("badhiya")
        this.setState({ [event.target.name]: event.target.value });
        axios.post('http://192.168.43.78:4000/team', {role:String(event.target.value), company: this.props.data.company})
        .then(res=>{
            this.setState({users:[...this.state.users,...res.data]})
        }).catch(err=>console.log(err))
    }

    addgroup(user){
        console.log(user)
        let team = document.getElementById('team').value;
        axios.post('http://192.168.43.78:4000/addgroup', {gname:team, uid:this.props.data._id, gid: team })
        .then(res=>{this.setState({users:this.state.users.splice(this.state.users.indexOf(user), 1)});console.log(res)})
        .catch(err=>console.log(err))
    }

    render(){
        return (
            <Column style={{marginLeft:'40%', width:'100vh'}}>
                <h1 >Create Team</h1>
                <Row>
                <TextField
                id="team"
                label="Team Name"
                type="text"
                name="team"
                margin="normal"
                variant="outlined"
                />
                <InputLabel htmlFor="role" style={{marginRight:'15px', marginTop:'30px'}}>Role</InputLabel>
                <Select
                value={this.state.role}
                onChange={this.handleChange}                
                input={
                <OutlinedInput
                name="role"
                id="role"
                style={{minWidth:'180px'}}
              />
            }
          >
            <MenuItem value={'backend'}>Backend</MenuItem>
            <MenuItem value={'frontend'}>Frontend</MenuItem>
            <MenuItem value={'architect'}>Architect</MenuItem>
            <MenuItem value={'qa'}>QA</MenuItem>
          </Select>
                </Row>
                {this.state.users.length>0 &&
                    this.state.users.map(item=>
                        <Paper style={{marginRight:'20%', marginBottom:'3%', marginTop:'2%'}}  elevation={4}>
                        <Row horizontal="center">
                        <h3>{item.name}</h3>
                        <Button style={{color:'#22ff34'}} value={item} onClick={()=>this.addgroup(item)}><Add/></Button>
                        </Row>
                        </Paper>
                    )
                }
                </Column>
        ) 
    }
}
const mapStateToProps = state => ({
    ...state
  });
export default connect(mapStateToProps)(create);