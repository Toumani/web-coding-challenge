import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// React-Bootstrap component
import { Panel } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';

// In app imports
import TextControl from './TextControl';

// CSS import
import './Form.css';

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameError: '',
			displayNameError: false,
			nameValidation: null,

			emailError: '',
			displayEmailError: false,
			emailValidation: null,

			passwordError: '',
			displayPasswordError: false,
			passwordValidation: null,

			confirmPasswordError: '',
			displayConfirmPasswordError: false,
			confirmPasswordValidation: null
		}
	}

	/**
	 * Checks the name input against regex and @returns true if correct
	 * Typically shall contain alphanumerical characters and not exeed 50 character
	 */
	checkName(name) {
		var nameRegex = /^[\w\.-_]{,50}$/;
		return (name.match(nameRegex));
	}

	/**
	 * Sets name input form group validation state
	 * Trigerred when name input value is changed after first validation
	 * so user doesn't have error message before finishing typing
	 */
	setNameError = (e) => {
		if (this.state.displayNameError) {
			var errorMessage = this.checkName(e.target.value) ? '' : 'Please enter a valid name';
			this.setState({ nameError: errorMessage});
		}
	}

	/**
	 * Set email input form group validaiton state
	 * Trigerred when email input value is changed
	 */
	setNameState = (e) => {
		this.setNameError(e);
		if (this.checkName(e.target.value)) {
			this.setState({ nameValidation: 'success', displayNameError: true })
		}
		else {
			this.setState({ nameValidation: 'error' })
		}
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
	 * Set email input form group validaiton state
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
								/>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<TextControl
									type="password"
									validation={ true }
									regex={ /.{6,}/ }
									error="You password should be at least 6 characters long"
									placeholder="Password"
								/>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<TextControl
									type="password"
									validation={ false }
									regex={ new RegExp('toumani') }
									error="The given email addresses are different"
									placeholder="Confirm password"
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Button onClick={ this.props.disappear } className="form-button" bsStyle="link">Sign in</Button>
							</Col>
							<Col md={6}>
								<Button className="form-button" bsStyle="success">Register</Button>
							</Col>
						</Row>
					</Grid>
				</Panel.Body>
			</Panel>
		);
	}
}

export default RegisterForm;