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
import { HelpBlock } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';

// In app imports
import TextControl from './TextControl';

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

	setEmailValid = (state) => {
		if (state === 'success')
			this.setState({ emailValid: true })
		else
			this.setState({ emailValid: false })
		this.setValid();
	}

	setValid() {
		if (this.state.emailValid)
			this.setState({ valid: true });
		else
			this.setState({ valid: false })
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
									isValid={ () => {} }
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Button onClick={ this.props.disappear } className="form-button" bsStyle="link">Register</Button>
							</Col>
							<Col md={6}>
								<Button className="form-button" bsStyle="success" disabled={ !this.state.valid }>Sign in</Button>
							</Col>
						</Row>
					</Grid>
				</Panel.Body>
			</Panel>
		);
	}
}

export default LoginForm