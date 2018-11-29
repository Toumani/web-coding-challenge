import React, { Component } from 'react';

// React-Bootstrap component
import { FormControl, HelpBlock, FormGroup } from 'react-bootstrap';

// CSS import
import './Form.css';

/**
 * Stands for text, email and password input embedding validation functions.
 * props are
 * type: value is eithter text, email or password. Default is text
 * validation: a boolean indicating wether validations has to happen or not. Default is true
 * regex: the regex against which the input value shall be compared
 * error: the message printed right below the input if the input is invalid
 * placeholder: the input placeholder
 * getPassword: Available only for password type. Allows to retrieve the input value
 * isValid: Retrie component state validity
 */
class TextControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errorState: '',
			validationState: null,
			displayErrorState: false,
		}
	}

	/**
	 * Starts displaying error message
	 * Triggered when when control looses focus with invalid value
	 */
	setDisplayErrorState = (e) => {
		if (this.state.validationState === 'error')
			this.setState({ errorState: this.props.error, displayErrorState: true })
	}

	/**
	 * Sets global validation visible or not
	 * Trigerred when input value is changed after first validation
	 * so user doesn't have error message before finishing typing
	 */
	setErrorState = (e) => {
		if (this.state.displayErrorState) {
			var errorMessage = e.target.value.match(this.props.regex) ? '' : this.props.error;
			this.setState({ errorState: errorMessage});
		}
	}

	/**
	 * Sets global validaiton state
	 * Trigerred when input value is updated
	 */
	setValidationState = (e) => {
		this.setErrorState(e);
		if (e.target.value.match(this.props.regex)) {
			this.setState({ validationState: 'success', displayErrorState: true })
		}
		else {
			this.setState({ validationState: 'error' })
		}
	}

	handleValidation = (e) => {
		// Timed out to keep state up to date
		setTimeout(() => {
			if (this.props.type === 'confirm-password')
				this.props.isValid();
			else
				this.props.isValid(this.state.validationState);
		}, 400);
	}

	render() {
		return (
			<FormGroup validationState={ this.props.type === 'confirm-password' ? (this.props.valid ? 'sucess' : 'error') : this.state.validationState }>
				<FormControl
					type={ this.props.type === 'password-confirm' ? 'password' : this.props.type }
					placeholder={ this.props.placeholder }
					onChange={ this.props.validation ? this.setValidationState : undefined }
					// If control is password
					// This is necessary to make password confirm available
					onKeyUp={ this.props.type === 'password' || this.props.type === 'confirm-password' ? this.props.getPassword : undefined }
					onKeyDown={ this.handleValidation }
					onBlur={ this.setDisplayErrorState }
				/>
				<HelpBlock>{ this.props.type === 'confirm-password' ? this.state.errorState : this.state.errorState }</HelpBlock>
			</FormGroup>
		)
	}
}

export default TextControl;