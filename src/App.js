// React imports
import React, { Component } from 'react';

// React-Bootstrap imports
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

// In-app imports
import Header from './Header';
import AppContent from './AppContent';

import './App.css';

class App extends Component {
  constructor(props) {
	super(props);
  }

	render() {
		return (
			<div>
				<Header />
				<AppContent />
			</div>
		);
	}
}

export default App;
