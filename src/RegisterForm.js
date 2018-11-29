import React, { Component } from 'react';
import './App.css';

// React-Bootstrap component
import { Panel } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormControl, HelpBlock, FormGroup } from 'react-bootstrap';

// In app imports
import TextControl from './TextControl';

// CSS import
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

	asdf(e) {
		if (this.state.password !== e.target.value) {
			this.setState({ passwordErrorState: 'Given password are different', passwordValidationState: 'error' });
			this.setState({ confirmPasswordValid: false });
		}
		else {
			this.setState({ passwordErrorState: '', passwordValidationState: 'success' });
			this.setState({ confirmPasswordValid: true });
		}
		this.setValid();
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

	setNameValid(state) {
		if (state === 'success') {
			this.setState({ nameValid: true });	
			console.log('true');
		}
		else {
			this.setState({ nameValid: false });
			console.log('false');
		}
		console.log(this.state.nameValid);
		this.setValid();
	}

	setEmailValid = (state) => {
		if (state === 'success')
			this.setState({ emailValid: true });
		else
			this.setState({ emailValid: false })
		console.log(this.state.emailValid);
		this.setValid();
	}
	
	setPasswordValid = (state) => {
		if (state === 'success')
			this.setState({ passwordValid: true });
		else
			this.setState({ passwordValid: false });
		console.log(this.state.passwordValid);
		this.setValid();
	}

	setConfirmPasswordValid = () => {
		console.log('Password: ' + this.state.password);
		console.log('Confirm password: ' + this.state.confirmPassword);
		if (this.state.password === this.state.confirmPassword)
			this.setState({ confirmPasswordValid: true });
		else
			this.setState({ confirmPasswordValid: false });
		console.log('Confirm password state: ' + this.state.confirmPasswordValid);
		this.setValid();
	}
	
	render() {
		return (
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
								<Button className="form-button" bsStyle="success" disabled={ !this.state.valid }>Register</Button>
							</Col>
						</Row>
					</Grid>
				</Panel.Body>
			</Panel>
		);
	}
}

export default RegisterForm;