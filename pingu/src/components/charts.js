import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CanvasJSReact from './canvasjs-2.3.1/canvasjs.react';
import CardContent  from '@material-ui/core/CardContent';
import {Row, Column} from 'simple-flexbox'
import axios from 'axios'
import qs from 'qs'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component{
    constructor(){
        super()
        this.state={
            fwords:[]
        }
    }
    componentDidMount(){
        console.log(this.props)
        axios.post('http://192.168.43.78:5000/count', qs.stringify({gid:this.props.gid, company:this.props.company}),{headers:{'Content-Type' : 'application/x-www-form-urlencoded'}})
        .then((res)=>{
            console.log("res:", res)
            this.setState({fwords:res.data.words})
        }).catch(
            err=> console.log(err)
        )
    }
    render(){
        const options = {
			animationEnabled: true,
			title: {
				text: ""
			},
			subtitles: [{
				text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Positive", y: 35 },
					{ name: "Negative", y: 17 },
					{ name: "Neutral", y: 7 }
				]
			}]
		}
        return (
            <div>
                {//all  charts - sentiment, message frequency, frequent words 
                }
                <Card raised="true" style={{margin:'2%', borderRadius:'8px'}}>
                <CardContent>
                <h1 style={{textAlign:'center'}}>Sentiment Analysis</h1>
                <CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			    />
                </CardContent>
                </Card>
                <Row style={{marginBottom:'4%'}}>
                <Card raised="true" style={{width:'100%', marginLeft:'2%', marginRight:'3%', borderRadius:'8px', height:'350px'}}>
                <CardContent>
                <h1 style={{textAlign:'center'}}>Messaging Counts</h1>
                </CardContent>
                </Card>
                <Card raised="true" style={{width:'100%', marginRight:'2%', marginLeft:'3%', borderRadius:'8px', height:'350px'}}>
                <CardContent>

                <h1 style={{textAlign:'center'}}>Frequent Words</h1>
                {
                    this.state.fwords.map(i=>(
                        <Chip
                        avatar={<Avatar style={{backgroundColor:"#7b1fa2", color:'#fff'}}>{i[0]}</Avatar>}
                        style={{marginTop:'16px', backgroundColor:'#d500f9', color:'#fff', fontSize:'150%'}}
                         key={i[1]}
                         label={i[1]}
                         />
                    ))
                }
                </CardContent>
                </Card>
                </Row>
                </div>
        )
    }
}
export default Charts;