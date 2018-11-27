// React imports
import React, { Component } from 'react';

// React-Bootstrap imports
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

// In-app imports
import Header from './Header';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Grid className="App-content">
          <Row>
            <Col mdOffset={4} md={4}>
              <LoginForm />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
