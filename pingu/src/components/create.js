import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Search from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import { Row, Column } from 'simple-flexbox'
class create extends Component{
    constructor(){
        super()
        this.state={
            users:[]
        }
    }
    render(){
        return (
            <Column style={{marginLeft:'40%', width:'100vh'}}>
                <h1 >Create Team</h1>
                <Row>
                <TextField
                style={{borderRadius:'8px'}}
                id="filled-search"
                label="Search Role"
                type="search"
                margin="normal"
                size="large"
                variant="filled"
                color="#8e24aa"
                />
                <Fab style={{ marginTop:'15px', marginLeft:'15px' }} color="secondary" aria-label="Edit">
                    <Search />
                </Fab>
                </Row>
                {
                    this.state.users.map(item=>
                        <h1>{item}</h1>
                    )
                }
                </Column>
        ) 
    }
}

export default create;