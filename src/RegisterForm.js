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
			password: ''
		}
	}

	updatePasswordState = (e) => {
		console.log('Hey ho!');
		this.setState({ password: e.target.value });
		console.log(e.target.value);
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

									getPassword={ this.updatePasswordState }
								/>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<TextControl
									type="password"
									validation={ true }
									regex={ new RegExp(this.state.password) }
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