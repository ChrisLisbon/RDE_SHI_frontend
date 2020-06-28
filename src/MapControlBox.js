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

const useStyles = makeStyles(theme => ({
  
  box:{
    height: '3vh',

  },
  margin: {
    margin: '0 0 0 0',
    
    minHeight:0,
    height: '4.5vh'
  },

}));

export default function MapControlBox(props) {
  const classes = useStyles();
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
     <Card style={{height: '4.5vh'}}>
    <div className={classes.box}>
      <FormControlLabel className={classes.margin}
        control={
          <Checkbox
            checked={props.regionsBordersActive}
            onChange={handleChange('checkedA')}
            value="checkedB"
            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: '2.5vh', margin:'0'}} />}
            checkedIcon={<CheckBoxIcon style={{ fontSize: '2.5vh', margin:'0' }} />}
          />
        }
      label={<span style={{ fontSize: '1.8vh', margin: '0', height: '1.8vh' }}>Отобразить границы регионов</span>}
      />
      </div>
      
       </Card> 
     
   
  );
}