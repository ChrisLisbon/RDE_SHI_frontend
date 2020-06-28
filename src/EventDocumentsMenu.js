import React, {Component} from 'react';
import EventDocumentCards from './EventDocumentCards.js'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EventCheckbox from './EventCheckbox.js';
import Typography from '@material-ui/core/Typography';

import EventTabsDocMedia from './EventTabsDocMedia.js'

export default class EventDocumentsMenu extends Component{
  constructor(props){
    super(props)
    this.state = {
     
    }
  }

 createDamagedZonesCheck=(eventData)=>{
            var allCards=eventData.damaged_zones.map((damaged_zones) => {
              var name = damaged_zones.description_rus
              var id = damaged_zones.id
              var categ='damaged_zones'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:'1.8vh'}}><b>Поврежденные территории:</b></Typography>)
            }
            return allCards
 }

 createVectorCheck=(eventData)=>{
            var allCards=eventData.misc_vector_data.map((misc_vector_data) => {
              var name = misc_vector_data.name_rus
              var id = misc_vector_data.id
              var categ='misc_vector_data'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:'1.8vh'}}><b>Векторные слои:</b></Typography>)
            }
            return allCards
 }
 createRasterCheck=(eventData)=>{

            var allCards=eventData.misc_raster_data.map((misc_raster_data) => {
              var name = misc_raster_data.name_rus
              var id = misc_raster_data.id
              var categ='misc_raster_data'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography  variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:'1.8vh'}}><b>Растровые слои:</b></Typography>)
            }
            return allCards
 }
createRemSensCheck=(eventData)=>{

            var allCards=eventData.remote_sensing_data.map((remote_sensing_data) => {
              var name = remote_sensing_data.description_rus
              var id = remote_sensing_data.id
              var categ='remote_sensing_data'
              return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
                
            })
            if (allCards.length!==0){
              allCards.unshift(<Typography  variant="body1" component="p" style={{margin: 'auto', color: " #333333", textAlign: 'center', fontSize:'1.8vh'}}><b>Изображения дистанционного зондирования:</b></Typography>)
            }
            return allCards
 } 
createStationsCheck=()=>{
            var name='Станции наблюдения'
            var id = 0
            var categ='stations'
            return <EventCheckbox name={name} id ={id} categ={categ} setCheckedLayers={(name, id, categ)=>this.props.setCheckedLayers(name, id, categ)}/>
}

    render(){
      const eventData=this.props.eventData

      return(
        <div className='event-documents-menu'>
        <Paper style={{height: '50%',  background: '#97C8B3'}}>
          <Paper style={{maxHeight: '100%', height:'100%',  width:'100%', overflow: 'auto', background: '#ffffff'}}>
          <br/>
          <Typography  variant="body1" component="p" style={{margin: '1vh 0 0 0', color: "#000000", textAlign: 'center', fontSize:'1.8vh'}}><b>УПРАВЛЕНИЕ КАРТОЙ:</b></Typography>
              {this.createStationsCheck(eventData)}
          <br/>
              {this.createDamagedZonesCheck(eventData)}
          <br/>    
              {this.createRemSensCheck(eventData)}
          <br/>
          
              {this.createVectorCheck(eventData)}
          <br/>
          
              {this.createRasterCheck(eventData)}


          </Paper>
         </Paper>
        
        <EventTabsDocMedia eventData={eventData}/>
        
          
        </div>
        )
    }
}


