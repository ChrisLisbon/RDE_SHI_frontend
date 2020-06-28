import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

import {postNewPlace} from './request_functions.js'

const useStyles = makeStyles(theme => ({
  box: {

    width: '100%',
    
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



export default function AdminPlacesBlock(props){
	const classes = useStyles();
	const [state, setState] = React.useState({
      name_rus:'',
      name_eng:'',
      description_rus:'',
      description_eng:'',
      point_geom:'',
      polygon_geom:'',      

      FileName:' ',
      point_geom_str:'',  
      });


  const placeDataJson=()=>{
    const formData = new FormData();
    formData.append('name_rus', state.name_rus);
    formData.append('name_eng', state.name_eng);
    formData.append('description_rus', state.description_rus);
    formData.append('description_eng', state.description_eng);
    formData.append('point_geom', state.point_geom);
    formData.append('polygon_geom', state.polygon_geom);

    return formData
  }
  
  const set_name_rus=(event)=>{
      setState({ ...state, name_rus: event.target.value});

}
  const set_name_eng=(event)=>{
      setState({ ...state, name_eng: event.target.value});

}
  const set_description_rus=(event)=>{
      setState({ ...state, description_rus: event.target.value});

}
  const set_description_eng=(event)=>{
      setState({ ...state, description_eng: event.target.value});

}


const set_point_geom=(event)=>{
      const string=event.target.value;      
      setState({ ...state, point_geom_str: string});
      const coordList=string.split(',')
      console.log(coordList)
      if (coordList[0]!==undefined &&coordList[1]!==undefined&&coordList[0]!=='' &&coordList[1]!==''){      
      const pointWKT='POINT('+coordList[1]+' '+coordList[0]+')'
      console.log(pointWKT)
      setState({ ...state, point_geom: pointWKT,
                           point_geom_str: string })
      }
      if (coordList[0]==undefined||coordList[1]==undefined||coordList[0]==''||coordList[1]==''){
        setState({ ...state, point_geom: '',
                             point_geom_str: string })
      }                     

}
  const set_polygon_geom=(file)=>{
    setState({...state, polygon_geom: file,
                        FileName:file.name});
  }


const pushNewPlaceData=()=>{
  
  const form=placeDataJson()
  console.log(form)
  if(state.name_rus!==''&&state.name_eng!==''&&state.description_rus!==''&&state.description_eng!==''&&state.point_geom!==''&&state.polygon_geom!==''){
    postNewPlace(form, props.login, props.password).then(data=>{console.log(data);props.closeAddPlaceDialog()})
  }
}

  return (
    <div className={classes.box}>
      <TextField className={classes.textfield} value={state.name_rus} onChange={(event)=>set_name_rus(event)}  id="name_rus" label="Название (рус)"/>
      <TextField className={classes.textfield} value={state.name_eng} onChange={(event)=>set_name_eng(event)}  id="name_eng" label="Название (англ)"/>
      <TextField className={classes.textfield} value={state.description_rus} onChange={(event)=>set_description_rus(event)}  id="description_rus" label="Описание (рус)"/>
      <TextField className={classes.textfield} value={state.description_eng} onChange={(event)=>set_description_eng(event)}  id="description_eng" label="Описание (англ)"/>
      <TextField className={classes.textfield} value={state.point_geom_str} onChange={(event)=>set_point_geom(event)}  id="point_geom" label="Координаты (широта, долгота - разделитель - ,)"/>              

              <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      style={{ width: "30%", margin:'1% 0 0 0'  }}
                    >
                    Выберите файл
                    <input type="file" style={{ display: "none" }} onChange={(e)=>set_polygon_geom(e.target.files[0])}/>
                   </Button> 
                   <TextField style={{ width: "68%", margin: '0 0 0 2%'}} value={state.FileName} label="Полигон места .geojson"/> 

              <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
                                    onClick={()=>pushNewPlaceData()}>Добавить</Button>


    
    </div>
  )
}