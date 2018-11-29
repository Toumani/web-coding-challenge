import React, { Component } from 'react';
import { Button} from 'react-bootstrap';

import './Links.css';

class Links extends Component {
	render() {
		return (
			<div className="links">
				<Button bsStyle="link" onClick={ this.props.nearby }>Nearby shops</Button>
				<Button bsStyle="link" onClick={ this.props.favorite }>Favorite shops</Button>
			</div>
		);
	}
}

export default Links;