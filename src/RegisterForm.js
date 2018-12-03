// External imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, Grid, Row, Col, Button, Alert } from 'react-bootstrap';

import $ from "jquery";

import * as cookie from './cookies';

// In-app imports
import App from './App';
import Auth from './Auth';
import TextControl from './TextControl';

import './App.css';
import './Form.css';

class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			confirmPassword: '',
			passwordErrorState: '',
			passwordValidationState: null,

			valid: false,
			nameValid: false,
			emailValid: false,
			passwordValid: false,
			confirmPasswordValid: false
		}

		this.setNameValid = this.setNameValid.bind(this);
	}

	updatePasswordState(e) {
		console.log('Password tick');
		this.setState({ password: e.target.value });
		this.setConfirmPasswordValid();
	}

	updateConfirmPasswordState(e) {
		console.log('Confirm password tick');
		this.setState({ confirmPassword: e.target.value });
		this.setConfirmPasswordValid();
	}

	passwordUpdateHandler = (e) => {
		setTimeout(this.updatePasswordState(e) , 1000);
	}

	confirmPasswordUpdateHandler = (e) => {
		setTimeout(this.updateConfirmPasswordState(e) , 1000);
	}
	/*
	================= CALLBACK FUNCTIONS FOR VALIDATION ================
	*/

	setValid() {
		if (this.state.nameValid &&
			this.state.emailValid &&
			this.state.passwordValid &&
			this.state.confirmPasswordValid)

			this.setState({ valid: true });
		else
			this.setState({ valid: false });
	
		console.log('Valid:' + this.state.valid);
	}

	setNameValid(state, value) {
		if (state === 'success') {
			this.setState({ nameValid: true,  nameValue: value });	
			console.log('true');
		}
		else {
			this.setState({ nameValid: false, nameValue: value });
			console.log('false');
		}
		console.log(this.state.nameValid);
		this.setValid();
	}

	setEmailValid = (state, value) => {
		if (state === 'success')
			this.setState({ emailValid: true, emailValue: value });
		else
			this.setState({ emailValid: false, emailValue: value })
		console.log(this.state.emailValid);
		this.setValid();
	}
	
	setPasswordValid = (state, value) => {
		if (state === 'success')
			this.setState({ passwordValid: true, passwordValue: value });
		else
			this.setState({ passwordValid: false, passwordValue: value });
		console.log(this.state.passwordValid);
		this.setValid();
	}

	setConfirmPasswordValid = (state, value) => {
		console.log('Password: ' + this.state.password);
		console.log('Confirm password: ' + this.state.confirmPassword);
		if (this.state.password === this.state.confirmPassword)
			this.setState({ confirmPasswordValid: true, confirmPasswordValue: value });
		else
			this.setState({ confirmPasswordValid: false, confirmPasswordValue: value });
		console.log('Confirm password state: ' + this.state.confirmPasswordValid);
		this.setValid();
	}

	register = (e) => {
		console.log('Sending reg request');
		var url = 'http://localhost:9090/register';

		var name = this.state.nameValue;
		var email = this.state.emailValue;
		var password = this.state.passwordValue;

		console.log(name);
		console.log(email);
		console.log(password);
		var data = JSON.stringify({
			email: email,
			password: password,
			name: name,
			location: {
				latitude: 10.0,
				longitude: 0.5
			}
		});
		$.ajax({
			type: 'POST',
			url: url,
			processData: false,
			dataType: 'JSON',
			data: data,
			headers: {
				"Content-Type": "application/json"
			},
			encode: true,
			success: (response, status, xhr) => {
				if (response.checksum !== '') {
					cookie.setCookie('hashcode', response.checksum, 20);
					ReactDOM.render(<App />, document.getElementById('root'));
				}
				else {
					this.setState({ error: 'registration-failed'});
					console.log('Show error message');
					ReactDOM.render(<Auth />, document.getElementById('root'));
				}
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}
	
	render() {
		var alert;
		if (this.state.error === 'registration-failed')
			alert = (
				<Alert bsStyle="danger">
					Registration failed.
				</Alert>
			);
		else
			alert = null;
		return (
			<div>
				{ alert }
				<Panel className="form-panel">
					<Panel.Heading>
						<Panel.Title componentClass="h3">Register</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<Grid className="form-content">
							<Row>
								<Col md={12}>
									<TextControl
										type="text"
										validation={ true }
										regex={ /[\w\.-_]{1,40}/ }
										error="The name length should not exeed 40 and should contain valid characters"
										placeholder="Your name"
										isValid={ this.setNameValid }
									/>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<TextControl
										type="email"
										validation={ true }
										regex={ /^[\w\.-_]{2,}@\w{2,}\.\w{2,}$/ }
										error="Please enter a valid email address"
										placeholder="Email address"
										isValid={ this.setEmailValid }
									/>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<TextControl
										type="password"
										validation={ true }
										regex={ /.{6,}/ }
										error="Your password should be at least 6 characters long"
										placeholder="Password"

										getPassword={ this.passwordUpdateHandler }
										isValid={ this.setPasswordValid }
									/>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									{/* <FormGroup validationState={ this.state.passwordValidationState }>
										<FormControl
											type="password"
											placeholder="Confirm"
											onKeyUp={ this.passwordUpdateHandler }
										/>
										<HelpBlock>{ this.state.passwordErrorState }</HelpBlock>
									</FormGroup> */}
									<TextControl
										type="confirm-password"
										validation={ true }
										valid={ this.state.confirmPasswordValid }
										regex={ null }
										error="Given passwords are different"
										placeholder="Confirm password"

										getPassword={ this.confirmPasswordUpdateHandler }
										isValid={ this.setConfirmPasswordValid }
									/>
								</Col>
							</Row>
							<Row>
								<Col md={6}>
									<Button onClick={ this.props.disappear } className="form-button" bsStyle="link">Sign in</Button>
								</Col>
								<Col md={6}>
									<Button onClick={ this.register }
											className="form-button"
											bsStyle="success"
											disabled={ !this.state.valid }>
											Register
									</Button>
								</Col>
							</Row>
						</Grid>
					</Panel.Body>
				</Panel>
			</div>
		);
	}
}

export default RegisterForm;