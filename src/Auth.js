// External imports
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

// In-app imports
import Header from './Header';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'login'
    };
  }

  /**
   * Switches from register view to login view and vice versa
   * This function is called when link is clicked in the LoginForm and RegisterForm components
   */
  toggleView = (e) => {
    if (this.state.view === 'login') {
      this.setState({view: 'register'});
    }
    else {
      this.setState({view: 'login'});
    }
  }

  render() {
    if (this.state.view === 'login') {
      return (
        <div className="App">
          <Header />
          <Grid className="App-content">
            <Row>
              <Col mdOffset={4} md={4}>
                <LoginForm disappear={ this.toggleView } />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <Header />
          <Grid className="App-content">
            <Row>
              <Col mdOffset={4} md={4}>
                <RegisterForm disappear={ this.toggleView } />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}

export default App;
