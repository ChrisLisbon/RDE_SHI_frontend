import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: '0 0 0 5%',
    minWidth: 0,
    height: '5.58vh',
    minHeight: 0,

  },

}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const stationType=props.stationType;
  const valueType=props.valueType
  
 
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
      <FormControl className={classes.formControl}>

        <Select style={{height:'5.58vh'}}
          value={valueType}
          onChange={handleChange}
          
		>

          <MenuItem value={'water_discharge'}>{<span style={{ fontSize: '1.8vh' }}>Расход воды</span>}</MenuItem>
          <MenuItem value={'water_level'}>{<span style={{ fontSize: '1.8vh' }}>Уровень воды</span>}</MenuItem>

        </Select>
        
      </FormControl>
    
	)
	}
	if (stationType=='Метеостанция'){
		if (valueType==null||valueType=='water_discharge'||valueType=='water_level'){
  				props.setNewValueTypeAfterChangingStationType()

  			}
	  	return (
	      <FormControl className={classes.formControl}>

	        <Select style={{height:'5.58vh'}}
	          value={valueType}
	          onChange={handleChange}
	          
			>

	          <MenuItem value={'air_temperature'}>{<span style={{ fontSize: '1.8vh' }}>Температура воздуха</span>}</MenuItem>
	          <MenuItem value={'precipitations'}>{<span style={{ fontSize: '1.8vh' }}>Количество осадков</span>}</MenuItem>

	        </Select>
	        
	      </FormControl>
	    
		)
		}
	}
	if (stationType==null){
		return <div></div>
		}
  
  
	}