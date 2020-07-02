import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {font_size} from './system_functions.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: '0 0 0 5%',
    minWidth: 0,
    minHeight: 0,

  },

}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const stationType=props.stationType;
  const valueType=props.valueType
  const vh = window.innerHeight;
  
 
  const handleChange = event => {
    const a= event.target.value
    props.setValueType(a)

  };

  if (stationType!=null){
  		if (stationType=='Гидропост'){
  			if (valueType==null||valueType=='air_temperature'||valueType=='precipitations'){
  				props.setNewValueTypeAfterChangingStationType()         
   
  			}
  	return (
      <FormControl style={{height: font_size(vh, 5.58)}} className={classes.formControl}>

        <Select style={{height: font_size(vh, 5.58)}}
          value={valueType}
          onChange={handleChange}
          
		>

          <MenuItem value={'water_discharge'}>{<span style={{ fontSize: font_size(vh, 1.8, 'text') }}>Расход воды</span>}</MenuItem>
          <MenuItem value={'water_level'}>{<span style={{ fontSize: font_size(vh, 1.8, 'text') }}>Уровень воды</span>}</MenuItem>

        </Select>
        
      </FormControl>
    
	)
	}
	if (stationType=='Метеостанция'){
		if (valueType==null||valueType=='water_discharge'||valueType=='water_level'){
  				props.setNewValueTypeAfterChangingStationType()

  			}
	  	return (
	      <FormControl style={{height: font_size(vh, 5.58)}} className={classes.formControl}>

	        <Select style={{height: font_size(vh, 5.58)}}
	          value={valueType}
	          onChange={handleChange}
	          
			>

	          <MenuItem value={'air_temperature'}>{<span style={{ fontSize: font_size(vh, 1.8, 'text') }}>Температура воздуха</span>}</MenuItem>
	          <MenuItem value={'precipitations'}>{<span style={{ fontSize: font_size(vh, 1.8, 'text') }}>Количество осадков</span>}</MenuItem>

	        </Select>
	        
	      </FormControl>
	    
		)
		}
	}
	if (stationType==null){
		return <div></div>
		}
  
  
	}