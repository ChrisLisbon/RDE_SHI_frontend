import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



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

export default function AdminReasonBlock(props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
      
      descEng: null,
      descRus: null,
      nameEng: null,
      nameRus: null,
      type:null,
      leafletSt: '{"color": "#ff7800", "opacity": 0.65}',
      });

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
  const setType=(event)=>{
      setState({ ...state, type: event.target.value });
      
  }
  const setLeafletSt=(event)=>{
      setState({ ...state, leafletSt: event.target.value });
      
  }
  const typeJson=[{
                     "description_eng": state.descEng,
                     "description_rus": state.descRus,
                     "alias_eng": state.nameEng, 
                     "alias_rus": state.nameRus,
                     "type":state.type,
                     "leaflet_style": JSON.stringify(JSON.parse(state.leafletSt))
  }]

  return (
    <div className={classes.box}>
      <TextField className={classes.textfield} value={state.nameRus} id="nameRus" label="Название на русском" onChange={(event)=>setNameRus(event)}/>
      <TextField className={classes.textfield} value={state.nameEng} id="nameEng" label="Название на английском" onChange={(event)=>setNameEng(event)}/>
      <TextField className={classes.textfield} value={state.descRus} id="descRus" label="Описание на русском" onChange={(event)=>setDescRus(event)}/>
      <TextField className={classes.textfield} value={state.descEng} id="descEng" label="Описание на английском" onChange={(event)=>setDescEng(event)}/>
           
      
      <TextField className={classes.textfield} value={state.type} id="type" label="Тип" onChange={(event)=>setType(event)}/>
      <TextField className={classes.textfield} value={state.leafletSt} id="nameRus" label="Leaflet-style" onChange={(event)=>setLeafletSt(event)}/>
      <div style={{height: "5vh"}}></div>
      <Button variant="contained" color="primary" size="small" startIcon={<SendIcon />} style={{float: 'right'}}
              onClick={()=>props.addNewType(typeJson)} 
      >Добавить</Button>     
    </div>
      )
    }