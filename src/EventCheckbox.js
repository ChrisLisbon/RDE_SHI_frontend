import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {font_size} from './system_functions.js' 

const useStyles = makeStyles(theme => ({
  margin: {
    margin: '0 0 0 0',
    fontSize: 11,
    
  },

}));

export default function EventCheckbox(props) {
  const classes = useStyles();
  const vh = window.innerHeight
  const name=props.name
  const id = props.id
  const categ=props.categ
  const [state, setState] = React.useState({
      'Станции наблюдения': true,
      });
  

  const handleChange = (name, id) => event => {
    setState({ ...state, [name]: event.target.checked });
    props.setCheckedLayers(name,id, categ)
  };
  
  return (
    
      <FormControlLabel className={classes.margin}
        control={
          <Checkbox
            checked={state[name]}
            onChange={handleChange(name, id, categ)}
            value={name}
            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: font_size(vh, 2.5) }} />}
            checkedIcon={<CheckBoxIcon style={{ fontSize: font_size(vh, 2.5) }} />}
          />
        }
      label={<span style={{ fontSize: font_size(vh, 1.8) }}>{props.name}</span>}
      />
      
      )
    }