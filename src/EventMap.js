import React, {Component} from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Tooltip, GeoJSON, ImageOverlay, CircleMarker, Polyline} from 'react-leaflet';
import PanelBottom from './PanelBottom.js'
import MiniMap from 'leaflet-minimap';
import "leaflet-mouse-position";
import "leaflet-measure"

import {ObservationStationsTypesListGet} from './request_functions.js'

require('../node_modules/leaflet-measure/dist/leaflet-measure.css');

var moment = require('moment');
moment().format();

var parse = require('wellknown')

async function GetVectorAsJson(link){
	let response = await fetch('http://'+link);
        let data = await response.json()
        return data
}
class EventMap extends Component{
	constructor(props){
		super(props)
		
		this.state = {
		lat:  59.685614, 
		lng: 33.292193,
		zoom: 8,
		vectorDataGet:false,
		vectorJson:{},
		styles_get: false,
		styles: null,
		setMiniMap:false,
	}
}

setMiniMap = ()=>{
	var map=this.map.leafletElement
	L.control.mousePosition({prefix:"ш., д.:", emptyString: " ", position:"bottomright", numDigits:4}).addTo(map);
	var osm2 = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution:'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
	var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, minimized:true }).addTo(map);		
	var measureControl = new L.Control.Measure({ position: 'bottomright', activeColor: 'red', completedColor:'red', primaryLengthUnit:'meters', secondaryLengthUnit: "kilometers", thousandsSep:' ', units:{sqkmeters: {
																																																	                 	factor: 0.000001,
																																																	                 	display: 'Sq kilometers',
																																																	                 	decimals: 3}},
																																																	 primaryAreaUnit:"sqmeters", 
																																																	 secondaryAreaUnit:"sqkmeters"
  });
	measureControl.addTo(map);
}

addJsonToStateList=(id, data)=>{
	var dic=this.state.vectorJson
	dic[id]=data
	this.setState((prevState) => {
					return {vectorJson: dic}
			
				})
}

newactiveStationsLayer=(eventData, activeStationsLayer)=>{
		if (activeStationsLayer==true){
			console.log(eventData)
			
			var a=eventData.observation_stations.map((observation_stations) => {
								var lat = observation_stations.lat
								var lon = observation_stations.lon
								var color = null
								var opacity = null

								if (this.state.styles!==null){
								this.state.styles.forEach((el)=>{
									if (el.id==observation_stations.type_id){
										const style=JSON.parse(el.leaflet_style)
										color=style.color
										opacity=style.opacity
										
									}
								})}
								
								var stationId = observation_stations.id
								var stationType= observation_stations.type
								var stationObj=observation_stations
								return 	<CircleMarker pane='markerPane' center={[lat, lon]} color={color} opacity={opacity} onClick={ (e) => this.props.setClickedStationId(stationObj, stationId, stationType, e) }>
	 											<Tooltip direction="right" offset={[-8, -2]} opacity={1}>
	    												<span>{observation_stations.name_rus}</span>
	    												<br/>
	    												<span>{observation_stations.type}</span>
	    												<br/>
	    												<span>id={observation_stations.id}</span>
	  							  				</Tooltip>
	            						</CircleMarker>            		
	      
	     	   	    })
	       	return a
	}
	else{		
		return null
	}}

activeDamagedZonesLayers=(eventData, activeDamagedZonesLayers)=>{
	
	
	var keys =[]
	for (var key in activeDamagedZonesLayers){
		
		if (activeDamagedZonesLayers[key]==true){
			keys.push(key)
		}
	}	

	var layers = eventData.damaged_zones.map((damaged_zones) =>{
		for (var i in keys){
			if (keys[i]==damaged_zones.id){
				var id=damaged_zones.id
				var description_rus=damaged_zones.description_rus
				var type=damaged_zones.type
				var area=damaged_zones.area
				var cost_rub=damaged_zones.cost_rub
				
				var start_date=moment(damaged_zones.start_date, 'DDMMYYYYTHHmmss').format('DD.MM.YYYY HH:mm')
				var end_date=moment(damaged_zones.end_date, 'DDMMYYYYTHHmmss').format('DD.MM.YYYY HH:mm')

				var extent = parse(damaged_zones.geom)
				const style=JSON.parse(damaged_zones.leaflet_style)
				
				console.log(extent)
				return <GeoJSON  key = {id}  data = {extent} style={style}>
							<Popup maxWidth="500">
								<b>Описание:</b> {description_rus}<br/> 
								<b>Тип:</b> {type}<br/>
								<b>Площадь:</b> {area} км<br/>
								<b>Ущерб:</b> {cost_rub} рублей<br/>
								<b>Актуальность:</b> {start_date} - {end_date}<br/>
							</Popup>
						</GeoJSON>
			}
		}
	})
return layers
}

activeVectorLayers=(eventData, activeVectorLayers)=>{
	
	
	var keys =[]
	for (var key in activeVectorLayers){
		
		if (activeVectorLayers[key]==true){
			keys.push(key)
		}
	}
	

	var layers = eventData.misc_vector_data.map((misc_vector_data) =>{
		for (var i in keys){
			if (keys[i]==misc_vector_data.id){
				var id=misc_vector_data.id
				var extent = this.state.vectorJson[id]
				console.log(extent)
				return <GeoJSON  key = {Math.random()} data = {extent} />
			}
		}
	})
return layers
}

activeRasterLayers = (eventData, activeRasterLayers)=>{
	var keys =[]
	for (var key in activeRasterLayers){
		
		if (activeRasterLayers[key]==true){
			keys.push(key)
		}
	}
	var layers = eventData.misc_raster_data.map((misc_raster_data) =>{
		for (var i in keys){
			if (keys[i]==misc_raster_data.id){
				var x_min = JSON.parse(misc_raster_data.image_for_map_extent).x_min
				var y_min = JSON.parse(misc_raster_data.image_for_map_extent).y_min
				var x_max = JSON.parse(misc_raster_data.image_for_map_extent).x_max
				var y_max = JSON.parse(misc_raster_data.image_for_map_extent).y_max
				var image = 'http://'+misc_raster_data.image_for_map
				return <ImageOverlay
			            bounds={[[x_min, y_min], [x_max, y_max]]}
			            url= {image}
			          />
			}
		}
	})
return layers
}
activeRSLayers = (eventData, activeRSLayers)=>{
	var keys =[]
	for (var key in activeRSLayers){
		
		if (activeRSLayers[key]==true){
			keys.push(key)
		}
	}
	var layers = eventData.remote_sensing_data.map((remote_sensing_data) =>{
		for (var i in keys){

			if (keys[i]==remote_sensing_data.id){
				var x_min = JSON.parse(remote_sensing_data.image_for_map_extent).x_min
				var y_min = JSON.parse(remote_sensing_data.image_for_map_extent).y_min
				var x_max = JSON.parse(remote_sensing_data.image_for_map_extent).x_max
				var y_max = JSON.parse(remote_sensing_data.image_for_map_extent).y_max
				var image = 'http://'+remote_sensing_data.image_for_map
				
				return <ImageOverlay
			            bounds={[[x_min, y_min], [x_max, y_max]]}
			            url= {image}
			          />
			}
		}
	})
return layers
}
		render(){
			if (this.map!==undefined && this.state.setMiniMap==false){
				this.setMiniMap()
				this.setState((prevState) => {
						return {setMiniMap: true}
				
					})
			}
			if (this.state.styles_get==false){
				ObservationStationsTypesListGet().then(data=>{this.setState((prevState) => {
					return {styles: data.data.types,
							styles_get:true}
			
				})})
			}

			
			const eventData=this.props.eventData

			var feature = L.geoJson(parse(eventData.places[0].polygon_geom.toString()))
			var bounds=feature.getBounds()

			const activeDamagedZonesLayers=this.props.activeDamagedZonesLayers
			const activeVectorLayers=this.props.activeVectorLayers
			const activeRasterLayers=this.props.activeRasterLayers
			const activeRSLayers=this.props.activeRSLayers
			const activeStationsLayer=this.props.activeStationsLayer
			if (this.state.vectorDataGet==false){
				eventData.misc_vector_data.forEach(element=>{
					const link=element.geojson_for_map
					const id=element.id
					GetVectorAsJson(link).then(data=>this.addJsonToStateList(id, data))
					this.setState((prevState) => {return {vectorDataGet: true}})
				}) 
			}

			return(
					<div>
						
						<Map className='event-map'  center={this.props.center} zoom={13} bounds={bounds} ref={(ref) => {this.map = ref}}>
						    <TileLayer
						      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						    />

						{this.newactiveStationsLayer(eventData, activeStationsLayer)}
						{this.activeDamagedZonesLayers(eventData, activeDamagedZonesLayers)}
						{this.activeVectorLayers(eventData, activeVectorLayers)}
						{this.activeRasterLayers(eventData, activeRasterLayers)}
						{this.activeRSLayers(eventData, activeRSLayers)}
				   		</Map>
				    </div>
				)
		}
}
export default EventMap;