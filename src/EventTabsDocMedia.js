import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EventNews from './EventNews.js'
import EventMediaMenu from './EventMediaMenu.js'
import ThemeProvider  from '@material-ui/styles/ThemeProvider';
import ZeroPadding from './ZeroPadding.js'
import { withStyles } from '@material-ui/core/styles';
import EventCommonLinks from './EventCommonLinks'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '50%',
    width: '100%',
    


  },
  bar:{
    backgroundColor:'#1D8A6B',
    minHeight: 0,
    height: '5.58vh',
    
  },
    bar2:{
    backgroundColor:'#1D8A6B',
    minHeight: 0,
    height: '5.58vh',
    
  },
  barlabel:{
    margin: '0.5%',
    height: '5.58vh',
    minHeight: 0,
    width: '49%',
    minWidth:'20px'
  },
box:{
	padding: 0,
	margin: 0,
  height: '88%',
  maxHeight: '88%',
  overflow: 'auto',
}

}));
  export default function EventTabsDocMedia(props) {
	  const eventData = props.eventData
	  const classes = useStyles();
	  const [value, setValue] = React.useState(0);

	  const handleChange = (event, newValue) => {
	    setValue(newValue);
	  };

	  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">                
        <Tabs className={classes.bar2} value={value} onChange={handleChange} indicatorColor="primary" aria-label="simple tabs example">  
          <Tab className={classes.barlabel}label={<span style={{ fontSize: '1.5vh' }}>Новости</span>} {...a11yProps(0)} />
          <Tab className={classes.barlabel} wrapped label={<span style={{ fontSize: '1.5vh' }}>Вспомогательные ссылки</span>} {...a11yProps(1)} />

                              
        </Tabs>
      </AppBar>
      <ThemeProvider theme={ZeroPadding}>
      <TabPanel  className={classes.box} value={value} index={0}>
        	<EventNews eventData = {eventData}/>
      </TabPanel>
      <TabPanel  className={classes.box} value={value} index={1}>
      		<EventCommonLinks eventData = {eventData} />
      </TabPanel>

      </ThemeProvider>
    </div>
  );
  }