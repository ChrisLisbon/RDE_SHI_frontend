import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import EventInfoText from './EventInfoText'
import {font_size} from './system_functions.js'

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
  button:{    
    margin: '0 2%'
  },

}));

export default function InfoPopover(props) {
  const name=props.name;
  const dataStart=props.dataStart;
  const dataEnd=props.dataEnd;
  const description=props.description;
  const area=props.area;
  const cost=props.cost;
  const maxDepth=props.maxDepth;
  const meanDepth=props.meanDepth;
  const maxSpeed=props.maxSpeed;
  const meanSpeed=props.meanSpeed;
  const reason=props.reason;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const vh = window.innerHeight

  return (
    <div style={{height:font_size(vh, 5.58), width:font_size(vh, 5.58)}}>
    <IconButton  style={{height:font_size(vh, 5.58), width:font_size(vh, 5.58), padding:0}} aria-describedby={id}  onClick={handleClick}  className={classes.button} >
            <HelpOutlineIcon style={{height:font_size(vh, 3), width:font_size(vh, 3), padding:0}}/>
    </IconButton>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        
        <EventInfoText name={name}
                         dataStart={dataStart}
                         dataEnd={dataEnd}
                         description={description}
                         area={area}
                         cost={cost}
                         maxDepth={maxDepth}
                         meanDepth={meanDepth}
                         maxSpeed={maxSpeed}
                         meanSpeed={meanSpeed}
                         reason={reason}
                         style={{margin: '0 0'}}/>
      </Popover>
    </div>
  );
}