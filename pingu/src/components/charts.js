import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CanvasJSReact from './canvasjs-2.3.1/canvasjs.react';
import CardContent  from '@material-ui/core/CardContent';
import {Row} from 'simple-flexbox'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Charts extends Component{
    constructor(){
        super()
        this.state={}
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
                </CardContent>
                </Card>
                </Row>
                </div>
        )
    }
}

export default Charts;