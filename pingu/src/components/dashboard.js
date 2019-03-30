import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Row, Column} from 'simple-flexbox'
import '../App.css'
import Charts from './charts'
import {connect} from 'react-redux'
import axios from 'axios'
import config from './config'
import qs from 'qs'
const stats = [
    {name:'Total messages', num: 0},{name:'Total Members', num:0},{name:'Active users', num:0}
]

class dashboard extends Component{
    constructor(){
        super()
        this.state={
            numbers: null,
            senti: null
        }

    }
    async componentDidMount(){
        axios.post(config.ml+"/groupdetails",qs.stringify({gid:this.props.data.group[0].gid, company:this.props.data.company}))
        .then(
            r=>{
                console.log("-------",r.data.results.total)
                this.setState({numbers:[r.data.results.total, r.data.results.member, 2]})
                for(let i =0;i<stats.length;i++){
                    stats[i].num = this.state.numbers[i];
                    console.log('-------xx--',stats[i])
                }
            }
        )
        .catch(
            e=>
            console.log(e)
            )
            axios.post(config.ml+"/senticount",qs.stringify({gid:this.props.data.group[0].gid, company:this.props.data.company}))
            .then(
                r=>{
                    this.setState({senti:[r.data.results.positive, r.data.results.negative, r.data.results.neutral]})
                }
            )
            .catch(
                e=>
                console.log(e)
                )            
    }
    render(){
    
        return (
            <div>
                {
                    // for sentiment
                }
                <Row horizontal="center">    
                {this.state.numbers!== null &&
                    stats.map((item, i)=>
                <Card key={i} style={{margin:'2%', borderRadius:'8px', width:'300px', height:'160px'}} raised="true">
                    <CardContent>
                        {console.log(item.num)}
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
                {this.props.data.group !== undefined && this.state.senti &&
                <Charts senti={this.state.senti} gid={this.props.data.group[0].gid} company={this.props.data.company}/>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    ...state
  });
export default connect(mapStateToProps)(dashboard);