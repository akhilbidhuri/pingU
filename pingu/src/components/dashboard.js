import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Row, Column} from 'simple-flexbox'
import '../App.css'
import { Item } from 'semantic-ui-react';

const stats = [
    {name:'Total messages'},{name:'Total Members'},{name:'Active users'}
]

class dashboard extends Component{

    render(){
        return (
            <div>
                {
                    // for sentiment
                }
                <Row horizontal="center">    
                {stats.map((item, i)=>
                <Card key={i} style={{margin:'2%', borderRadius:'8px'}} raised="true">
                    <CardMedia width="200px" height="200px"/>
                    <CardContent>
                        <Column horizontal="center">
                            <h3 className="logo">{item.name}</h3>
                        </Column>
                    </CardContent>
                </Card>   
                )}
                </Row>      
            </div>
        )
    }
}

export default dashboard;