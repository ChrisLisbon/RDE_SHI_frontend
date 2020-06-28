import React, {Component} from 'react';
import Authorization from './Authorization.js'
import EditMode from './EditMode.js'

import {getAccess} from './request_functions.js'

		
export default class AdminApp extends Component{
	constructor(props){
		super(props)
		this.state = {
			accsessDataGetState: false,
			userData: null,
			login:null,
			password:null,
		}
	}
	getAccessData=(login, password)=>{	
		this.setState((prevState) => {
					return {login: login,
							password:password}});
		getAccess(login, password).then(data=>

					this.setState((prevState) => {
					return {userData: data,
							accsessDataGetState: data.status
						    }
			
				}))
	}	
	returnAuthorization=(access, userData)=>{
		if (access!=='ok' && userData!== null){			
				return <Authorization getAccessData={(login, password)=>this.getAccessData(login, password)} accessDenied={true}/>
			}
		
		if (access!=='ok'){			
				return <Authorization getAccessData={(login, password)=>this.getAccessData(login, password)} accessDenied={false}/>
			}
	}
	returnEditMode=(access)=>{
		if (access=='ok'){
				return <EditMode login={this.state.login} password={this.state.password}/>
			}
	}
		render(){		
			return(
				<div>
				{this.returnAuthorization(this.state.accsessDataGetState, this.state.userData)}
				{this.returnEditMode(this.state.accsessDataGetState)}
				</div>
				)
		}
}