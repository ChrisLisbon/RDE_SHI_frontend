import React, {Component} from 'react';
import NewMap from './Map.js'
import './App.css'
import MainMenu from './Main-left-menu.js'
import Header from './Header.js'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,red } from '@material-ui/core/colors';
import * as L from 'leaflet';


import {API_settings} from './server_settings.js'
import {VectorDataListGet} from './request_functions.js'
var parse = require('wellknown')

async function firstDataGet(state)
	{
		if (state==false){
			let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/places');
			let data = await response.json()
			return data	
			
		}
	}
async function getListOfEventsForPlace(placeId)
			{
				let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events?places_id=['+placeId+']');
				let data = await response.json()
				return data				
			}

export default class App extends Component{
	constructor(props){
		super(props)
		this.state = {
		placesData: null,    
		vectorData:null,    
		firstDataGetState: false,

		regionsBordersActive:false,

		bounds:L.latLngBounds([[70, 50], [50,70]]),
		selectedPlace:null,
		zoomLvl:0,

		placeDialogOpen:false,
		dialogContent:'waiting',
		placeEvents:null,
		placeName: '',
	}}

	clearEventTableData=()=>{
		this.setState((prevState) => {
						return {placeEvents: null,
								placeName: ''}
					
						})
	}

	setListOfEventsForPlace=(placeId, placeName)=>{
		console.log(placeId)
		this.setWaitingDialogContent()
		this.dialogOpen()
		getListOfEventsForPlace(placeId).then(data=>

							this.setState((prevState) => {
							return {placeEvents: data,
									placeName: placeName,
									dialogContent:'table'}
					
						}))
	}

	setWaitingDialogContent=()=>{
		this.setState((prevState) => {
						return {dialogContent:'waiting'}
				
					})
	}

	dialogOpen = ()=>{
		this.setState((prevState) => {
						return {placeDialogOpen:true}
			
					})

	}

	dialogClose = () =>{
		this.setState((prevState) => {
						return {placeDialogOpen:false}
				
					})
	}

	setSelectedPlace=(bounds, placesObj)=>{   
		    	console.log('set extent')
		        this.setState((prevState) => {
		          return {bounds: bounds,
		          		  selectedPlace: placesObj}
		        
		          });
		        

        
    }
    handleZoom=(zoomLvl)=>{
    	this.setState((prevState) => {
		          return {zoomLvl: zoomLvl,
						  bounds:null}
		        
		          })
    }

    setZoomLvl=()=>{
    	console.log('set zoom')
		this.setState((prevState) => {
						return {zoomLvl:9}
				
					})
	}

	onRegionsBorders=(value)=>{
		this.setState((prevState) => {
					return {regionsBordersActive: value}
			
				})
	}


	returnMap=()=>{
		if (this.state.placesData==null){
			return	<Card style={{height: '93vh'}}>
				  <CardContent >
                    <div style={{display: 'flex', justifyContent:"center", margin: '30% 0 0'}}>
                    <CircularProgress style={{color: green[500]}}/>
                    </div>
                    <Typography color="inherit" align='center' gutterBottom>
                      Загрузка данных...
                    </Typography>
                  </CardContent>
                </Card>
		}
		else {
			return <NewMap bounds={this.state.bounds} setSelectedPlace={(bounds, placesObj)=>{this.setSelectedPlace(bounds, placesObj)}}
							zoomLvl={this.state.zoomLvl}
							setZoomLvl={()=>this.setZoomLvl()}
							handleZoom={(zoomLvl)=>this.handleZoom(zoomLvl)}
							isDialogOpen={this.state.placeDialogOpen}
							dialogOpen={()=>{this.dialogOpen()}}
							dialogClose={()=>{this.dialogClose()}}
							dialogContent={this.state.dialogContent}
							setWaitingDialogContent={()=>{this.setWaitingDialogContent()}}
							setListOfEventsForPlace={(placeId, placeName)=>{this.setListOfEventsForPlace(placeId, placeName)}}
							placeEvents={this.state.placeEvents}
							placeName={this.state.placeName}
							clearEventTableData={()=>{this.clearEventTableData()}}
							regions_borders={this.state.regionsBordersActive} 
							vectorData={this.state.vectorData} placesData={this.state.placesData} 
							setEventData={(event_id)=>this.props.setEventData(event_id)}/>
		}
	}

		render(){			

		if (this.state.firstDataGetState==false){	
		firstDataGet(this.state.firstDataGetState).then(data=>
					this.setState((prevState) => {
					return {placesData: data,
							firstDataGetState: true}
			
				}))
		VectorDataListGet(2).then(data=>
					this.setState((prevState) => {
					return {vectorData: data}
			
				}))
			}
			return(
				<div>
					<Header/>
					<MainMenu setSelectedPlace={(bounds, placesObj)=>this.setSelectedPlace(bounds, placesObj)} 
							  setZoomLvl={()=>this.setZoomLvl()}
							  selectedPlace={this.state.selectedPlace}
							  setListOfEventsForPlace={(placeId, placeName)=>{this.setListOfEventsForPlace(placeId, placeName)}}
							  placesData={this.state.placesData} onRegionsBorders={(value)=>this.onRegionsBorders(value)}
							  regionsBordersActive={this.state.regionsBordersActive}/>
					{this.returnMap()}

				</div>
				)

		}
}