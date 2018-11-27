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
// CSS import
import './Form.css';

class LoginForm extends Component {
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
								<FormControl
									type="email"
									placeholder="Email"
								/>
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
								<Button className="form-button" bsStyle="link">Register</Button>
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