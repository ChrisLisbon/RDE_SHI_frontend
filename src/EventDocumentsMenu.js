import React, {Component} from 'react';
import EventDocumentCards from './EventDocumentCards.js'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EventCheckbox from './EventCheckbox.js';
import Typography from '@material-ui/core/Typography';

import EventTabsDocMedia from './EventTabsDocMedia.js'
import {font_size, map_height} from './system_functions.js' 

export default class EventDocumentsMenu extends Component{
  constructor(props){
    super(props)
    this.state = {
     
    }
  }

 createDamagedZonesCheck=(eventData, vh)=>{
            var allCards=eventData.damaged_zones.map((damaged_zones) => {
              var name = damaged_zones.description_rus
              var id = damaged_zones.id
              var categ='damaged_zones'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:font_size(vh, 1.8)}}><b>Поврежденные территории:</b></Typography>)
              allCards.push(<br/>)
            }
            return allCards
 }

 createVectorCheck=(eventData, vh)=>{
            var allCards=eventData.misc_vector_data.map((misc_vector_data) => {
              var name = misc_vector_data.name_rus
              var id = misc_vector_data.id
              var categ='misc_vector_data'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:font_size(vh, 1.8)}}><b>Векторные слои:</b></Typography>)
              allCards.push(<br/>)
            }
            return allCards
 }
 createRasterCheck=(eventData, vh)=>{

            var allCards=eventData.misc_raster_data.map((misc_raster_data) => {
              var name = misc_raster_data.name_rus
              var id = misc_raster_data.id
              var categ='misc_raster_data'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography  variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:font_size(vh, 1.8)}}><b>Растровые слои:</b></Typography>)
              allCards.push(<br/>)
            }
            return allCards
 }
createRemSensCheck=(eventData, vh)=>{

            var allCards=eventData.remote_sensing_data.map((remote_sensing_data) => {
              var name = remote_sensing_data.description_rus
              var id = remote_sensing_data.id
              var categ='remote_sensing_data'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography  variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:font_size(vh, 1.8)}}><b>Изображения дистанционного зондирования:</b></Typography>)
              allCards.push(<br/>)
            }
            return allCards
 } 
createStationsCheck=()=>{
            var name='Станции наблюдения'
            var id = 0
            var categ='stations'
            return <div><EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/><br/></div>
}

    render(){
      const eventData=this.props.eventData
      const vh = window.innerHeight
      return(
        <div style={{height: map_height(vh), width: '25%', float: 'left'}}>
        <Paper style={{height: '50%',  background: '#97C8B3'}}>
          <Paper style={{maxHeight: '100%', height:'100%',  width:'100%', overflow: 'auto', background: '#ffffff'}}>
          <br/>
          <Typography  variant="body1" component="p" style={{margin: '1vh 0 0 0', color: "#000000", textAlign: 'center', fontSize:font_size(vh, 1.8)}}><b>УПРАВЛЕНИЕ КАРТОЙ:</b></Typography>
              {this.createStationsCheck(eventData)}
          
              {this.createDamagedZonesCheck(eventData)}
             
              {this.createRemSensCheck(eventData)}
          
              {this.createVectorCheck(eventData)}
          
              {this.createRasterCheck(eventData)}


          </Paper>
         </Paper>
        
        <EventTabsDocMedia eventData={eventData}/>
        
          
        </div>
        )
    }
}


