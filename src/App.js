// External imports
import React, { Component } from 'react';

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
