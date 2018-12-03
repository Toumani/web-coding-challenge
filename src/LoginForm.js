// External imports
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Panel, Grid, Row, Col, Button } from 'react-bootstrap';

import $ from "jquery";

import * as cookie from './cookies';

// In app imports
import App from './App';
import TextControl from './TextControl';

import logo from './logo.svg';
import './App.css';

// CSS import
import './Form.css';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			emailError: '',
			emailValidation: null,
			displayEmailError: false,

			valid: false,
			emailValid: false
		};
	}

	/**
	 * Checks the email input against regex and @returns true if correct
	 */
	checkEmail(email) {
		var emailRegex = /^[\w\.-_]{2,}@\w{2,}\.\w{2,}$/;
		return (email.match(emailRegex));
	}

	/**
	 * Sets email input form group validation state
	 * Trigerred when email input value is changed after first validation
	 * so user doesn't have error message before finishing typing
	 */
	setEmailError = (e) => {
		if (this.state.displayEmailError) {
			var errorMessage = this.checkEmail(e.target.value) ? '' : 'Please enter a valid email address';
			this.setState({ emailError: errorMessage});
		}
	}

	/**
	 * Set email input form group validation state
	 * Trigerred when email input value is changed
	 */
	setEmailState = (e) => {
		this.setEmailError(e);
		if (this.checkEmail(e.target.value)) {
			this.setState({ emailValidation: 'success', displayEmailError: true })
		}
		else {
			this.setState({ emailValidation: 'error' })
		}
	}

	setEmailValid = (state, value) => {
		if (state === 'success') {
			this.setState({ emailValid: true, emailValue: value })
		}
		else
			this.setState({ emailValid: false })
		this.setValid();
	}

	setPasswordValid = (state, value) => {
		this.setState({ passwordValue: value })
	}

	setValid() {
		if (this.state.emailValid)
			this.setState({ valid: true });
		else
			this.setState({ valid: false })
	}

	signIn = (e) => {
		console.log('Sending auth request');
		var url = 'http://localhost:9090/sign-in';
		var email = this.state.emailValue;
		var password = this.state.passwordValue;
		var data = JSON.stringify({
			email: email,
			password: password,
			location: {
				latitude: 10.0,
				longitude: 0.5
			}
		});
		var datas = "{\
			\"email\": \"toumani49@gmail.com\",\
			\"password\": \"hello\",\
			\"location\": {\
				\"latitude\": 10.0,\
				\"longitude\": 0.5\
			}\
		}";
		console.log(data);
		console.log(datas);
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
				if (response !== null) {
					cookie.setCookie('hashcode', response.hashcode, 20);
					ReactDOM.render(<App />, document.getElementById('root'));
				}
				else {
					console.log('Show error message');
				}
			},
			error: function(xhr, status, error) {
				console.log("Something went wrong!");
			}
		});
	}

	render() {
		return (
			<Panel className="form-panel">
				<Panel.Heading>
					<Panel.Title componentClass="h3">Login</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					<Grid className="form-content">
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
									validation={ false }
									regex={ null }
									error=""
									placeholder="Password"
									isValid={ this.setPasswordValid }
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Button onClick={ this.props.disappear } className="form-button" bsStyle="link">Register</Button>
							</Col>
							<Col md={6}>
								<Button className="form-button"
										bsStyle="success"
										disabled={ !this.state.valid }
										onClick={ this.signIn }>
										Sign in
								</Button>
							</Col>
						</Row>
					</Grid>
				</Panel.Body>
			</Panel>
		);
	}
}

export default LoginForm