import React, {Component, useRef, useEffect} from 'react';
import * as L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Tooltip, GeoJSON, ImageOverlay, CircleMarker, Polyline, withLeaflet} from 'react-leaflet';
import MiniMap from 'leaflet-minimap';
import "leaflet-mouse-position";

import "leaflet-polylinedecorator"
//<PolylineDecorator patterns={arrow} positions={polyline} weight="2"/>

import AlertDialog from './PlaceTableDialog.js'

import {API_settings} from './server_settings.js'
import {map_height} from './system_functions.js'
require('../node_modules/leaflet-minimap/dist/Control.MiniMap.min.css');

var parse = require('wellknown')

async function GetVectorAsJson(link){
	let response = await fetch('http://'+link);
        let data = await response.json()
        return data
}

const map_width=(vh)=>{
	if (vh>=920){
        return '80vw'
    }
    if (vh<920){
      return '78.5vw'
    }
}	

class NewMap extends Component{
	constructor(props){
		super(props)
		
		this.state = {
		lat: 65, 
		lng: 65,
		zoom: 4,
		dialogOpen: false,
		placeEvents:null,
		placeName: '',
		dialogContent:'waiting',
		vectorDataGet:false,
		
		regions_borders_data:null,
		setMiniMap:false,
	}
}

handleZoom = ()=>{
	var zoomLvl=String(this.map && this.map.leafletElement.getZoom());
	this.props.handleZoom(zoomLvl)
			
				
}

setMiniMap = ()=>{
	var map=this.map.leafletElement
	var osm2 = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution:'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
	var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true }).addTo(map);		
	L.control.mousePosition({prefix:"ш., д.:", emptyString: " "}).addTo(map);
}

returnRegionsBorders=()=>{
	if (this.state.regions_borders_data!==null&&this.props.regions_borders==true){
		return <GeoJSON  key = {Math.random()} data = {this.state.regions_borders_data} style={{fillColor:'red',
																								weight: 0.5,}}/>
	}
}
getVectorsAsJson=()=>{
	if (this.props.vectorData!==undefined && this.props.vectorData!==null&&this.state.vectorDataGet==false){
		console.log(this.props.vectorData)
		const array=this.props.vectorData.data.misc_vector_data
		array.forEach((el)=>{
			console.log()
			if (el.id==2){
				console.log(el.geojson_for_map)
				GetVectorAsJson(el.geojson_for_map).then(data=>this.setState((prevState) => {
						return {regions_borders_data: data}
				
					}))
				
			}
		})
		this.setState((prevState) => {
						return {vectorDataGet: true}
				
					})
	}
}
		render(){
			const vh = window.innerHeight;
			if (this.map!==undefined && this.state.setMiniMap==false){
				this.setMiniMap()
				this.setState((prevState) => {
						return {setMiniMap: true}
				
					})
			}
			this.getVectorsAsJson()
			const position = [this.state.lat, this.state.lng];
			const placesData = this.props.placesData	
			const polyline=[[57, -19], [60, -12]];
			const PolylineDecorator = withLeaflet(props => {
  const polyRef = useRef();
  useEffect(() => {
    const polyline = polyRef.current.leafletElement; //get native Leaflet polyline
    const { map } = polyRef.current.props.leaflet; //get native Leaflet map

    L.polylineDecorator(polyline, {

        patterns : props.patterns
    }).addTo(map);
  }, []);
  return <Polyline ref={polyRef} {...props} />;
});
			const arrow = [
    {
      offset: "55%",
      repeat: '0',
      symbol: L.Symbol.arrowHead({
        pixelSize: 10,
        polygon: true,
        pathOptions: { stroke: true, weight: 1, color: "black", fill: true, fillOpacity: 1 , opacity:1, }
      })
    }
  ];
			

						return(
					<div>
						
						<Map style={{height: map_height(vh), width: map_width(vh), float: 'right', margin: '0 0 0 0', display: 'block', zIndex: 3}} bounds={this.props.bounds} onZoom={this.handleZoom} ref={(ref) => {this.map = ref}}>
						    
						    <TileLayer 
						      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						    />
						{placesData.data.places.map((places) => {
							var pointcoords=places.point_geom.toString().slice(6,-1).split(' ')
							var placeId=places.id
							var placeName=places.name_rus
							var feature = L.geoJson(parse(places.polygon_geom.toString()))
							var bounds=feature.getBounds()							
            				return 	<CircleMarker color='#6666ff'  pane='markerPane' center={[parseFloat(pointcoords[1]), parseFloat(pointcoords[0])]} onClick = {()=> {this.props.setSelectedPlace(bounds, places); this.props.setZoomLvl(); this.props.setListOfEventsForPlace(placeId,placeName)}}>
            				  <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
    								<span>{places.name_rus}</span>
  							  </Tooltip>
            				</CircleMarker>
              					
              					            	    })
              			}
				   		{placesData.data.places.map((places) => {
							var polygonCoords=places.polygon_geom.toString()
							
							if (this.props.zoomLvl>8){
								return <GeoJSON  key = {Math.random()} data = {parse(polygonCoords)} fillColor='#ff9933' fillOpacity={0.3} color='#ff9933' weight={2}/>
							}

						})
							
						}
						
						{this.returnRegionsBorders()}
				   		</Map>
				   		<AlertDialog content={this.props.dialogContent} open={this.props.isDialogOpen} dialogClose={()=>this.props.dialogClose()} 
				   					 dialogOpen={()=>this.props.dialogOpen()}
				   		 			 tableData={this.props.placeEvents} tableName={this.props.placeName} clearEventTableData={()=>this.props.clearEventTableData()}
				   		 			 setEventData={(event_id)=>this.props.setEventData(event_id)}
				   		/>
				   		
				    </div>
				)
		}
}

export default NewMap;