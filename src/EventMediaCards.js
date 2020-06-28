import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default class EventMediaCards extends Component {
  constructor(props){
    super(props);
  }
  path='http://'+this.props.path
  id=this.props.id
  componentDidMount() {

    try {
      document.getElementById(this.id).setAttribute("allowfullscreen", "true")
      document.getElementById(this.id).setAttribute("src", this.path)
    } catch (error) {

    }
  }
    render(){
    return (
    <Card style={{width: '29vw', minHeight: '29vh', margin: 0}}>
      <CardContent style={{width: '28vw', minHeight: '28vh', margin: '0.5vh 0.5vw', padding: 0}}>

        <CardMedia style={{width: '28vw', minHeight: '28vh', }} 
          id ={this.id}
          
          component={this.props.type}
          alt={this.props.title}
          
        />
        <Typography variant="body2" align='center' component="p">
          <span style={{ fontSize: '1.5vh' }}>{this.props.title}</span>
        </Typography>
        
      </CardContent>

    </Card>

  );}
}  

