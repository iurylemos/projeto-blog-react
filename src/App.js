import React, { Component } from 'react';
import './global.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './view/home';
import Header from './components/header';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
