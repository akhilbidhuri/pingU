import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CanvasJSReact from './canvasjs-2.3.1/canvasjs.react';
import CardContent  from '@material-ui/core/CardContent';
import {Row} from 'simple-flexbox'
import axios from 'axios'
import qs from 'qs'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import config from './config'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component{
    constructor(){
        super()
        this.state={
            fwords:[]
        }
        this.generateDataPoints = this.generateDataPoints.bind(this);

    }
    componentDidMount(){
        console.log("bidhuri khauf",this.props)
        axios.post(config.ml+'/count', qs.stringify({gid:this.props.gid, company:this.props.company}),{headers:{'Content-Type' : 'application/x-www-form-urlencoded'}})
        .then((res)=>{
            console.log("res:", res)
            this.setState({fwords:res.data.words})
        }).catch(
            err=> console.log(err)
        )
    }
    generateDataPoints(noOfDps) {
		var xVal = 1, yVal = 0;
		var dps = [];
		for(var i = 0; i < noOfDps; i++) {
			yVal = yVal +  Math.round(5 + Math.random() *(10));
			dps.push({x: xVal,y: yVal});	
			xVal++;
		}
		return dps;
	}
    render(){
		const options1 = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			title: {
				text: "Try Zooming and Panning"
			},
			axisY: {
				includeZero: false
			},
			data: [{
				type: "area",
				dataPoints: this.generateDataPoints(500)
			}]
		}

        const options = {
			animationEnabled: true,
			title: {
				text: ""
			},
			subtitles: [{
				text: (this.props.senti[0]/(this.props.senti[0]+this.props.senti[1]+this.props.senti[2]))*100+"% Positive",
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
					{ name: "Positive", y: (this.props.senti[0]/(this.props.senti[0]+this.props.senti[1]+this.props.senti[2]))*100 },
					{ name: "Negative", y: (this.props.senti[1]/(this.props.senti[0]+this.props.senti[1]+this.props.senti[2]))*100 },
					{ name: "Neutral", y: (this.props.senti[2]/(this.props.senti[0]+this.props.senti[1]+this.props.senti[2]))*100 }
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
                <CanvasJSChart options = {options1} 
				/* onRef={ref => this.chart = ref} */
			    />
                </CardContent>
                </Card>
                <Card raised="true" style={{width:'100%', marginRight:'2%', marginLeft:'3%', borderRadius:'8px', height:'350px'}}>
                <CardContent>

                <h1 style={{textAlign:'center'}}>Frequent Words</h1>
                {this.state.fwords != undefined &&
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