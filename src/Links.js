import React, { Component } from 'react';
import { Button} from 'react-bootstrap';

class Links extends Component {
	render() {
		return (
			<div className="links">
				<Button bsStyle="link">Nearby shops</Button>
				<Button bsStyle="link">Favorite shops</Button>
			</div>
		);
	}
}

export default Links;