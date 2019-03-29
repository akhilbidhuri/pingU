import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Row, Column} from 'simple-flexbox'
import '../App.css'
import Charts from './charts'
import {connect} from 'react-redux'
const stats = [
    {name:'Total messages', num: 0},{name:'Total Members', num:0},{name:'Active users', num:0}
]

class dashboard extends Component{
    constructor(){
        super()
        this.state={
            numbers: [0, 0, 0]
        }
    }
    componentDidMount(){
        for(let i =0;i<stats.length;i++){
            stats[i].num = this.state.numbers[i];
        }       
    }
    render(){
        return (
            <div>
                {
                    // for sentiment
                }
                <Row horizontal="center">    
                {stats.map((item, i)=>
                <Card key={i} style={{margin:'2%', borderRadius:'8px', width:'300px', height:'160px'}} raised="true">
                    <CardContent>
                        <Column horizontal="center">
                        <div style={{width:'250px', height:'100px', background:'#eee', borderRadius:'8px'}}>
                            <h1 style={{fontSize:'400%', textAlign:'center', marginTop:'10%'}}>{item.num}</h1>
                        </div>
                            <h4 className="logo" style={{marginTop:'20px'}}>{item.name}</h4>
                        </Column>
                    </CardContent>
                </Card>   
                )}
                </Row>
                {this.props.data.group !== undefined &&
                <Charts gid={this.props.data.group[0].gid} company={this.props.data.company}/>}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    ...state
  });
export default connect(mapStateToProps)(dashboard);