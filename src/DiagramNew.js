import React, {Component} from 'react';
import ReactApexChart from "react-apexcharts";

export default class Diagram extends React.Component {
        constructor(props) {
          super(props);

          this.state = {           
  
          };
        }
        series=(dict)=>{
        	const list=[{
			              name: dict.label,
			              type: 'area',
			              data: dict.Parameter
			            }]
			
        return list
      	}
        options=(dict, px)=> {
          const list = []
          console.log(dict.dangerValues)
          if (dict.Parameter!==undefined){
              
              dict.dangerValues.forEach((el)=>{   
                console.log(el)             
                const oneDict={y: el.value,
                                borderColor: 'red',
                                label: {
                                  borderColor: 'red',
                                  style: {
                                    color: 'black',
                                    background: '#ffb3b3'
                                  },
                                  text: el.description
                                }}
                list.push(oneDict)
                console.log(list)
              })}

        return {
              chart: {
                height:'100%',
                parentHeightOffset: 0,
                width:'95%',
                type: 'line',

              },

              annotations: {
                yaxis: list
              },


              grid: {
              	xaxis: {
				        lines: {
				            show: true
				        }
				    },   
				    yaxis: {
				        lines: {
				            show: true
				        },

				    }, 
              },
              stroke: {
                curve: 'smooth',
                width: 1,
    			dashArray: 0,
              },
              fill: {
                type:'solid',
                opacity: [0.35, 1],
              },
              labels: dict.listLables,
              
              markers: {
                size: 0,
                strokeWidth: 2,
                strokeOpacity:0.5,
                fillOpacity: 1,
                radius: 2,
                hover: {
						      sizeOffset: 3
						    },
                },
              yaxis: 
                {
                  height:'100%',
                  width:'5%',
                  title: {
                    text: dict.label,
                    style: {
				                fontSize: '1.3vh',
				            },
                  },
                  labels: {
				        	
				        	trim:true,
				        	minHeight: undefined,
          					maxHeight: undefined,
				            style: {
				                fontSize: '1.3vh',
				            },
				            hideOverlappingLabels: true,
				        	showDuplicates: false,
				       },
                },
              xaxis: {	width:'100%',
				        labels: {
				        	
				        	offsetX: 4,
				        	hideOverlappingLabels: true,
				        	showDuplicates: false,
				        	trim:true,
				        	minHeight: undefined,
          					maxHeight: undefined,
				            style: {
				                fontSize: px,
				            },
				            
				       },
				        axisBorder: { show: true },
						axisTicks: { show: false },
						tooltip: { enabled: false },

				   },
              tooltip: {
                shared: true,
                intersect: false,
                enabledOnSeries: [0],
                y: {
                  formatter: function (y) {
                    if(typeof y !== "undefined") {
                      return  y.toFixed(0);
                    }
                    return y;
                  }
                }
              },

            }
        }
        render() {
        	const vh = window.innerHeight * 0.01;
			    const px=vh*1.3

          return (
            

      <div style={{width:"98%", height:"37.92vh", margin:"2vh 1% 0", minHeight: 0}}>
  <ReactApexChart options={this.options(this.props.data, px)} series={this.series(this.props.data)} type="line"  height="100%"/>
</div>
          );
        }
      }