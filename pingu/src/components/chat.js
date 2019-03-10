import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import { CardContent, CardActionArea } from '@material-ui/core';
class chat extends Component{
    constructor(){
        super()
        this.state = {}
    }

    render(){
        return (<div>
            <Card raised="true" style={{width:'950px', height:'550px', marginBottom:'4%', marginTop:'2%'}}>
                <CardContent>
                </CardContent>
                <CardActionArea>
                    <div style={{width:'100%', background:'#4a148c', bottom:'0'}}>
                        
                    </div>
                </CardActionArea>
            </Card>
            </div>)
    }
}

export default chat;