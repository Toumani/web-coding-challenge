import React, { Component } from 'react';

// React-Bootstrap component
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';

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
	 * Sets email input form group validation state
	 * Trigerred when email input value is changed after first validation
	 * so user doesn't have error message before finishing typing
	 */
	setErrorState = (e) => {
		if (this.state.displayErrorState) {
			var errorMessage = e.target.value.match(this.props.regex) ? '' : this.props.error;
			this.setState({ errorState: errorMessage});
		}
	}

	/**
	 * Set email input form group validaiton state
	 * Trigerred when email input value is changed
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

	render() {
		return (
			<FormGroup validationState={ this.state.validationState }>
				<FormControl
					type={ this.props.type }
					placeholder={ this.props.placeholder }
					onChange={ this.props.validation && this.setValidationState }
				/>
				<HelpBlock>{ this.state.errorState }</HelpBlock>
			</FormGroup>
		)
	}
}

export default TextControl;