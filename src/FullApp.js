import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from './App.js'
import Header from './Header.js'
import EventApp from './EventApp.js'
import AdminApp from './AdminApp.js'
import DownloadFilesComponent from './DownloadFilesComponent.js'


export default class FullApp extends Component{
	constructor(props){
		super(props)
		this.state = {
			
		}
	}
setEventData=(event_id)=>{
	this.setState((prevState) => {
		return {eventId: event_id}
})}


	render(){
		
		const eventPath="/eventid/"+this.state.eventId
		

		return(
			<div className='App'>
			<Router>
			<div>
				<Route exact path="/"  render={() => <App setEventData={(event_id)=>this.setEventData(event_id)}/>}/>
				<Route path="/eventid/" component={EventApp}/>
				<Route path="/admin/" component={AdminApp}/>
				<Route path="/download/" component={DownloadFilesComponent}/>

			</div>
			</Router>
			</div>
			)
	}
}