import React, {Component} from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import InfoBox from'./InfoBox.js';
import MapControlBox from './MapControlBox.js'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import * as L from 'leaflet';
import {font_size} from './system_functions.js' 
var parse = require('wellknown')

export default class MainMenu extends Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  setSelectedPlace=(event,value)=>{
    if (value==null){
      var bounds=L.latLngBounds([[70, 50], [50,70]])
      this.props.setSelectedPlace(bounds, null)
    }
    if (value!==null && value!==undefined){
      var feature = L.geoJson(parse(value.polygon_geom.toString()))
      var bounds=feature.getBounds()
      console.log(value)
      this.props.setSelectedPlace(bounds, value)
      this.props.setZoomLvl()
      this.props.setListOfEventsForPlace(value.id, value.name_rus)
  }  
        
    }

getMuiTheme = (vh) => createMuiTheme({
    overrides: {

        MuiInputBase: {
          root: {
            fontSize: font_size(vh, 1.8),
          }
        },
        MuiAutocomplete:{
          inputRoot:{
            '&[class*="MuiOutlinedInput-root"]':{
              padding:0,
              height:font_size(vh, 5),
              '& $input': {
                  padding: '0',
                },
              '& $endAdornment': {
                  right: font_size(vh, 1),
                  top:font_size(vh, 0.5)
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
              height: font_size(vh, 5)
            
          }
        },
        
        MuiFormControl:{
          root:{            
              height: font_size(vh, 5)
            
          }
        },
        MuiFormLabel:{
          root:{
            fontSize: font_size(vh, 1.8)
          }
        },
        MuiInputLabel:{
          outlined:{
            transform:'translate(1vh, 1.6vh) scale(1)'
          }
        },
        MuiSvgIcon:{
          root:{
            height:font_size(vh, 3),
            width:font_size(vh, 3)
          }
        }

    }
  })
  
  returnAutocList=(vh)=>{
    if (this.props.placesData!==null&&this.props.placesData!==undefined){
      return <Card style={{padding:font_size(vh, 1.3)+' 0.5vw '+font_size(vh, 0.5)+' 0.5vw'}}>
              <MuiThemeProvider theme={this.getMuiTheme(vh)}>
                <Autocomplete style={{height:font_size(vh, 5)}}   
                    value={this.props.selectedPlace}              
                    noOptionsText='Нет совпадений'
                    options={this.props.placesData.data.places}
                    getOptionLabel={option => option.name_rus} 
                    autoHighlight={true}
                    onChange={(event,value)=>{this.setSelectedPlace(event,value)}}
                    renderInput={params => (
                      <TextField {...params} label='Выберите место' variant="outlined" fullWidth />
                    )}
                  />
              </MuiThemeProvider>
            </Card>
    }
  }
    render(){
      const vh = window.innerHeight;
      return(
        <div className='left-menu'>
          <InfoBox/>
          <br/>
          {this.returnAutocList(vh)}
          <br/>
          <MapControlBox onRegionsBorders={(value)=>this.props.onRegionsBorders(value)} regionsBordersActive={this.props.regionsBordersActive}/>
          
        </div>
        )
    }
}