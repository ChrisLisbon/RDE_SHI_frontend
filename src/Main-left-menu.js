import React, {Component} from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import InfoBox from'./InfoBox.js';
import MapControlBox from './MapControlBox.js'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import * as L from 'leaflet';
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

getMuiTheme = () => createMuiTheme({
    overrides: {

        MuiInputBase: {
          root: {
            fontSize: '1.8vh',
          }
        },
        MuiAutocomplete:{
          inputRoot:{
            '&[class*="MuiOutlinedInput-root"]':{
              padding:0,
              height:'5vh',
              '& $input': {
                  padding: '0',
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
        }

    }
  })

  returnAutocList=()=>{
    if (this.props.placesData!==null&&this.props.placesData!==undefined){
      return <Card style={{padding:'1.3vh 0.5vw 0.5vh 0.5vw '}}>
              <MuiThemeProvider theme={this.getMuiTheme()}>
                <Autocomplete style={{height:'5vh'}}   
                    value={this.props.selectedPlace}              
                    noOptionsText='Нет совпадений'
                    options={this.props.placesData.data.places}
                    getOptionLabel={option => option.description_rus} 
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
      return(
        <div className='left-menu'>
          <InfoBox/>
          <br/>
          {this.returnAutocList()}
          <br/>
          <MapControlBox onRegionsBorders={(value)=>this.props.onRegionsBorders(value)} regionsBordersActive={this.props.regionsBordersActive}/>
          
        </div>
        )
    }
}