import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


export default class EventLayerControl extends Component{
  constructor(props){
    super(props)
    this.state = {
     
    }
  }


    render(){
      const eventData=this.props.eventData

      return(
        <div className='event-layer-menu'>
        <Paper style={{maxHeight: '45vh', height:'100vh', overflow: 'auto', background: '#97C8B3'}}>
          
         </Paper>
          
          
        </div>
        )
    }
}


