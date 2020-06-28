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
  },

}));

export default function MapControlBox(props) {
  const classes = useStyles();
  const vh = window.innerHeight;

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked })
    const a=event.target.checked
    props.onRegionsBorders(a);
  };

  return (
     <Card style={{overflow: 'auto'}}>
      <CardContent style={{padding: '0 0'}}>
    
      <FormControlLabel className={classes.margin}
        control={
          <Checkbox
            checked={props.regionsBordersActive}
            onChange={handleChange('checkedA')}
            value="checkedB"
            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: font_size(vh, 2.5), margin:'0'}} />}
            checkedIcon={<CheckBoxIcon style={{ fontSize: font_size(vh, 2.5), margin:'0' }} />}
          />
        }
      label={<span style={{ fontSize: font_size(vh, 1.8), margin: '0', height: font_size(vh, 1.8) }}>Отобразить границы регионов</span>}
      />
      
      </CardContent>
       </Card> 
     
   
  );
}