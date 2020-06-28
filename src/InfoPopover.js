import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import EventInfoText from './EventInfoText'

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

  return (
    <div style={{height:'5.58vh', width:'5.58vh'}}>
    <IconButton  style={{height:'5.58vh', width:'5.58vh', padding:0}} aria-describedby={id}  onClick={handleClick}  className={classes.button} >
            <HelpOutlineIcon style={{height:'3vh', width:'3vh', padding:0}}/>
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