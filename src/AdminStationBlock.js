import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  box: {


  },
  margin: {
    margin: '0 0 0 0',
    fontSize: 11,
    
  },
  textfield: {
    width: '100%'
    
  },
  textfield2: {
    width: '100%', 
    height: '5vh',
  },

}));

export default function AdminStationBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
      id:null,
      typeId: null,
      type: null,
      descEng: null,
      descRus: null,
      nameEng: null,
      nameRus: null,
      host:null,
      lat:null,
      lon:null,
      elevation:null,
      dangerValues:'[{"description":"Описание", "value": "0"}]',
      });
  
  const returnMenuItemsTypes = () =>{
    const list = []
    const typesList= props.stationTypesList

    for (let i=0; i<typesList.length; i++){
            list.push(<MenuItem key={i} value={typesList[i].id}>{typesList[i].alias_rus}</MenuItem>)
      
    }
    return list
  }

  const setId=(event)=>{
      setState({ ...state, id: event.target.value });
  }
  const setTypeId=(event)=>{
      setState({ ...state, typeId: event.target.value });
  }
  const setHost=(event)=>{
      setState({ ...state, host: event.target.value });
  }
  const setLat=(event)=>{
      setState({ ...state, lat: event.target.value });
  }
  const setLon=(event)=>{
      setState({ ...state, lon: event.target.value });
  }
  const setElevation=(event)=>{
      setState({ ...state, elevation: event.target.value });
  }

  const setDescEng=(event)=>{
      setState({ ...state, descEng: event.target.value });
  }
  const setDescRus=(event)=>{
      setState({ ...state, descRus: event.target.value });
  }
  const setNameEng=(event)=>{
      setState({ ...state, nameEng: event.target.value });
  }
  const setNameRus=(event)=>{
      setState({ ...state, nameRus: event.target.value });
      
  }
  const geometryWKT=(lat, lon)=>{
    return 'POINT('+lat+' '+lon+')'
  }
  const setDangerValues=(event)=>{
      setState({ ...state, dangerValues: event.target.value });
      
  }
  
  const stationsJson=[{
                'id':state.id,
                'type_id':state.typeId,
                'name_rus':state.nameRus,
                'name_eng':state.nameEng,
                'description_rus': state.descRus,
                'description_eng': state.descEng, 
                'host':state.host, 
                'lat': state.lat, 
                'lon': state.lon, 
                'geom': geometryWKT(state.lat, state.lon),
                'elevation': state.elevation, 
                'danger_values':state.dangerValues

  }]

  return (
    <div className={classes.box}>
      <TextField className={classes.textfield} value={state.id} id="id" label="ID" onChange={(event)=>setId(event)}/>
      <TextField className={classes.textfield} value={state.nameRus} id="nameRus" label="Название на русском" onChange={(event)=>setNameRus(event)}/>
      <TextField className={classes.textfield} value={state.nameEng} id="nameEng" label="Название на английском" onChange={(event)=>setNameEng(event)}/>
      <TextField className={classes.textfield} value={state.descRus} id="descRus" label="Описание на русском" onChange={(event)=>setDescRus(event)}/>
      <TextField className={classes.textfield} value={state.descEng} id="descEng" label="Описание на английском" onChange={(event)=>setDescEng(event)}/>
      
      
      
      <TextField className={classes.textfield} value={state.dangerValues} id="dangerValues" label="Опасные уровни" onChange={(event)=>setDangerValues(event)}/>
      <FormControl className={classes.textfield}>
        <InputLabel >Тип станции</InputLabel>
            <Select
                value={state.typeId}
                onChange={(event)=>setTypeId(event)}
              >
              {returnMenuItemsTypes()}
              </Select>
      </FormControl >
      <TextField className={classes.textfield} value={state.host} id="host" label="Host"  onChange={(event)=>setHost(event)}/>
      <TextField className={classes.textfield} value={state.lat} type="number" id="lat" label="Широта"  onChange={(event)=>setLat(event)}/>
      <TextField className={classes.textfield} value={state.lon} type="number" id="lon" label="Долгота"  onChange={(event)=>setLon(event)}/>
      <TextField className={classes.textfield} value={state.elevation} type="number" id="elevation" label="Высота над уровнем моря (м)"  onChange={(event)=>setElevation(event)}/>
      
      <div style={{height: "5vh"}}></div>
      <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
              onClick={()=>props.addNewStation(stationsJson)} 
      >Добавить</Button>     
    </div>
      )
    }