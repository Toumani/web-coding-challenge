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

// CSS import
import './Form.css';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			emailError: '',
			emailValidation: null,
			displayEmailError: false
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
								<FormGroup validationState={ this.state.emailValidation }>
									<FormControl
										type="email"
										placeholder="Email"
										onChange={ this.setEmailState }
									/>
									<HelpBlock>{ this.state.emailError }</HelpBlock>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<FormControl
									type="password"
									placeholder="Password"
								/>
							</Col>
						</Row>
						<Row>
							<Col md={6}>
								<Button onClick={ this.props.disappear } className="form-button" bsStyle="link">Register</Button>
							</Col>
							<Col md={6}>
								<Button className="form-button" bsStyle="success">Sign in</Button>
							</Col>
						</Row>
					</Grid>
				</Panel.Body>
			</Panel>
		);
	}
}

export default LoginForm