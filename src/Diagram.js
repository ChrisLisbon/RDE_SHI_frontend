import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import pattern from 'patternomaly';
import {draw, generate} from 'patternomaly'
import * as zoom from 'chartjs-plugin-zoom'


export default class Diagram extends Component {

	constructor (props) {
		super(props);
		this.state = {
			
		}
	}
	graphData=(array)=>{
		console.log(array)
		var data = array[1]
		var lables = array[0]
		var label = array [2]
		return {
				labels: lables, 
				datasets:[
				{
					label: label,
					fill: false,
					borderColor: 'red',
					data: data
				},
				
				]
				}
	}
		render (){
			const vh = window.innerHeight * 0.01;
			const px=vh*1.5
			
		return(	
				

					<div style={{width:"98%", height:"37.92vh", margin:"2vh 1% 1vh"}}>
						<Line  width={null} height={null} 
						options= {{ responsive: true,
									maintainAspectRatio: false,
									legend:    {display: false},
									scales: {
										        yAxes: [{
										            ticks: {
										                fontSize: px
										            }
										        }],
										        xAxes: [{
										            ticks: {
										                fontSize: px
										            }
										        }]
										    },
									plugins: {
									          zoom: {
									            zoom: {
									              enabled: true,
									              
									              speed: 0.1,
									          },
									              
									            pan:{
									              enabled: true,
									              
									              speed: 0.1,
									            }
									          }
									          } 
								}} 
						data={this.graphData(this.props.data)} />
					</div>
					
			
			)
		
	}
}

