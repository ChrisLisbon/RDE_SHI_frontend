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
  box: {
    height: '3vh',
    
  },
  margin: {
    margin: '0 0 0 0',
    fontSize: 11,
    
  },

}));

export default function EventCheckbox(props) {
  const classes = useStyles();
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
    <div className={classes.box}>
      <FormControlLabel className={classes.margin}
        control={
          <Checkbox
            checked={state[name]}
            onChange={handleChange(name, id, categ)}
            value={name}
            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: '2.5vh' }} />}
            checkedIcon={<CheckBoxIcon style={{ fontSize: '2.5vh' }} />}
          />
        }
      label={<span style={{ fontSize: '1.8vh' }}>{props.name}</span>}
      />
      </div>
      )
    }