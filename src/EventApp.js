import React, {Component} from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Header from './Header.js'
import EventMap from './EventMap.js'
import EventDocumentsMenu from './EventDocumentsMenu.js'
import DiagramCard from './DiagramCard.js'
import EventMediaMenu from './EventMediaMenu'
import PanelBottom from './PanelBottom.js'
import EventMediaButton from './EventMediaButton'
import EventMediaDialog from'./EventMediaDialog'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green,red } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import {API_settings} from './server_settings.js'

async function firstEventDataGet(event_id)
		{
			
				let response = await fetch('http://'+API_settings.host+':'+API_settings.port+'/api/events?event_id=['+ event_id+']');
				let data = await response.json()
				return data
				
			}
		
export default class EventApp extends Component{
	constructor(props){
		super(props)

		this.state = {
			dialogOpen:false,
			eventData: null, 
			firstDataGetState: false,
			clickedStationId: null,
			clickedStationType: null,
			activeDamagedZonesLayers:{},
			activeVectorLayers: {},
			activeRasterLayers: {},
			activeRSLayers: {},
			activeStationsLayer: true,
			panelOpen: true,
			clickedStationObj:null,
			center:[0,0]
		}


	}


getMuiTheme2 = () => createMuiTheme({
    overrides: {

        
        MuiAutocomplete:{
          inputRoot:{
            '&[class*="MuiOutlinedInput-root"]':{
              padding:0,
              height:'5vh',
              '& $input': {
                  padding: '0',
                  fontSize: '1.8vh',
                },
              '& $endAdornment': {
                  right: '1vh',
                  top:'0.5vh'
                },
            },
            endAdornment:{
              top:0
            }
           
          }
        },
        MuiOutlinedInput:{
          input:{
            padding:0
          }
        },
        PrivateNotchedOutline:{
          root:{
              height: '5vh'
            
          }
        },
        
        MuiFormControl:{
          root:{            
              height: '5vh'
            
          }
        },
        MuiFormLabel:{
          root:{
            fontSize:'1.8vh'
          }
        },
        MuiInputLabel:{
          outlined:{
            transform:'translate(1vh, 1.6vh) scale(1)'
          }
        },
        MuiSvgIcon:{
          root:{
            height:'3vh',
            width:'3vh'
          }
        },
        MuiInputBase: {
          root: {
            fontSize: '1.8vh',
          },
          input:{
          	fontSize: '1.8vh',
          }
        },

    }
  })



	handleDrawerOpen = () => {
    this.setState((prevState) => {
		          return {panelOpen:true}

  });}

  handleDrawerClose = () => {
   this.setState((prevState) => {
		          return {panelOpen:false}
   });}

	dialogOpen = ()=>{
		  this.setState((prevState) => {
		          return {dialogOpen:true}
      
        })

  }
  dialogClose = () =>{
    this.setState((prevState) => {
            return {dialogOpen:false}
        
          })


  }
	setClickedStationId=(stationObj, id,type, e)=>{
		console.log(id)
		console.log(type)
		console.log(stationObj)
		this.setState((prevState) => {
					return {clickedStationObj:stationObj,
							center:[stationObj.lat-0.015, stationObj.lon],
							clickedStationId: id, 
							clickedStationType: type,
							panelOpen: true}})
							
	}

	setClickedStationIdAutoc=(event, value)=>{
		if (value!==null){
			const stationObj=value
			const id=value.id
			const type=value.type
			this.setClickedStationId(stationObj, id,type, event)
		}
		
	}

	setIdEventData=(state)=>{
		if (state==false){
			var path= window.location.href
			var event_id=path.split('#')[1]
			firstEventDataGet(event_id).then(data=>
						this.setState((prevState) => {
						return {eventData: data.data.events[0],
								eventId_:data.data.events[0].id,
							    firstDataGetState: true}
				
					}))
			
		}
	}

	setCheckedLayers=(name, id, categ)=>{
		console.log('name = '+name);
		var damagedZonesList=this.state.activeDamagedZonesLayers
		var vectorLayerList= this.state.activeVectorLayers;	
		var rasterLayerList= this.state.activeRasterLayers;
		var rSLayerList= this.state.activeRSLayers;
		if(categ=='damaged_zones'){
			if(this.state.activeDamagedZonesLayers[id]==undefined||this.state.activeDamagedZonesLayers[id]==false){
				damagedZonesList[id]=true;
				
				this.setState((prevState) => {
						return {activeDamagedZonesLayers: damagedZonesList}
				
					});				
			}	
			
			else{
				damagedZonesList[id]=false
				this.setState((prevState) => {
						return {activeDamagedZonesLayers: damagedZonesList}
				
					});			
			}
		}
		if(categ=='misc_vector_data'){
			if(this.state.activeVectorLayers[id]==undefined||this.state.activeVectorLayers[id]==false){
				vectorLayerList[id]=true;
				
				this.setState((prevState) => {
						return {activeVectorLayers: vectorLayerList}
				
					});				
			}	
			
			else{
				vectorLayerList[id]=false
				this.setState((prevState) => {
						return {activeVectorLayers: vectorLayerList}
				
					});			
			}
		}
		if (categ=='misc_raster_data'){
			if(this.state.activeRasterLayers[id]==undefined||this.state.activeRasterLayers[id]==false){
				rasterLayerList[id]=true;
				
				this.setState((prevState) => {
						return {activeRasterLayers: rasterLayerList}
				
					});				
			}	
			
			else{
				rasterLayerList[id]=false
				this.setState((prevState) => {
						return {activeRasterLayers: rasterLayerList}
				
					});			
			}
		}
		if (categ=='remote_sensing_data'){
			if(this.state.activeRSLayers[id]==undefined||this.state.activeRSLayers[id]==false){
				rSLayerList[id]=true;
				
				this.setState((prevState) => {
						return {activeRSLayers: rSLayerList}
				
					});				
			}	
			
			else{
				rSLayerList[id]=false
				this.setState((prevState) => {
						return {activeRSLayers: rSLayerList}
				
					});			
			}
		}
		if (categ=='stations'){
			if(this.state.activeStationsLayer==false){
				
				this.setState((prevState) => {
						return {activeStationsLayer: true}
				
					});				
			}	
			
			if(this.state.activeStationsLayer==true){
				
				this.setState((prevState) => {
						return {activeStationsLayer: false}
				
					});			
			}
		}		
		
	}


	returnDocsMenu=(state)=>{
			if (state==true){
				return <EventDocumentsMenu eventData={this.state.eventData} setCheckedLayers={(name, id, categ)=>this.setCheckedLayers(name, id, categ)}/>
			}
	}
	returnEventMap=(state)=>{
			if (state==true){
				return <EventMap eventData={this.state.eventData}  setClickedStationId={(stationObj, id, type, e)=>this.setClickedStationId(stationObj, id,type, e)}
				center={this.state.center}
				activeDamagedZonesLayers={this.state.activeDamagedZonesLayers}
				activeVectorLayers={this.state.activeVectorLayers}
				activeRasterLayers={this.state.activeRasterLayers}
				activeRSLayers={this.state.activeRSLayers}
				activeStationsLayer={this.state.activeStationsLayer}/>
			}
			else{
				return <Card style={{height: '93vh'}}>
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
	}
	returnMediaMenu=(state)=>{
			if (state==true){
				return <EventMediaMenu eventData={this.state.eventData}/>
			}
	}
	returnDiagramCard=(state)=>{
			if (state==true){
				return <DiagramCard eventData={this.state.eventData} clickedStationId={this.state.clickedStationId}
				clickedStationType={this.state.clickedStationType}/>
			}
	}
	returnPanelBottom=(state)=>{
			if (state==true){
					return <PanelBottom eventData={this.state.eventData} clickedStationId={this.state.clickedStationId}
				clickedStationType={this.state.clickedStationType} panelOpen={this.state.panelOpen}
				handleDrawerOpen={()=>this.handleDrawerOpen()} handleDrawerClose={()=>this.handleDrawerClose()}/>
				}
	}

	returnEventMediaDialog=(state)=>{
			if (state==true){
					return <EventMediaDialog open={this.state.dialogOpen} dialogClose={()=>this.dialogClose()} eventData={this.state.eventData}/>
				}
	}
	returnEventMediaButton=(state)=>{
			if (state==true){
					return <EventMediaButton dialogOpen={()=>this.dialogOpen()} />
				}
	}

	returnAutoComp=(state)=>{
			if (state==true){
					return <div style={{display:'inline-block', float:'right', width:'17vw', margin: '1vw '}}>
							<Card style={{padding:'1.3vh 0.5vw 0.5vh 0.5vw ', position: "relative", zIndex:2000}}>
								<MuiThemeProvider theme={this.getMuiTheme2()}>
				                <Autocomplete style={{height:'5vh'}}
				                    value={this.state.clickedStationObj}             
				                    noOptionsText='Нет совпадений'
				                    options={this.state.eventData.observation_stations}
				                    getOptionLabel={option => option.id+' - '+option.name_rus} 
				                    autoHighlight={true}
				                    onChange={(event, value)=>{this.setClickedStationIdAutoc(event, value)}}
				                    renderInput={params => (
				                      <TextField {...params} label='Выберите станцию' variant="outlined"  />
				                    )}
				                  />  
				                  </MuiThemeProvider>                
				              </Card>
				             </div>
				}
	}

		render(){
			if (this.state.eventData!==null){
				document.title = this.state.eventData.name_rus;
			}
			
			if (this.state.firstDataGetState==false){
				this.setIdEventData(this.state.firstDataGetState)
			}


			return(
				<div>
				<Header event_id={this.state.eventId_}/>
				
				{this.returnDocsMenu(this.state.firstDataGetState)}			

				{this.returnEventMap(this.state.firstDataGetState)}

				{this.returnEventMediaButton(this.state.firstDataGetState)}
				{this.returnAutoComp(this.state.firstDataGetState)}		 
							
				{this.returnPanelBottom(this.state.firstDataGetState)}		
				
				
				{this.returnEventMediaDialog(this.state.firstDataGetState)}
				</div>
				)
		}
}