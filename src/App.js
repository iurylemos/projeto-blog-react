import React, { Component } from 'react';
import './global.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './view/home';
import Header from './components/header';
import firebase from './firebase';

class App extends Component {

  state = {
    firebaseInitialized: false
  };

  componentDidMount() {
    firebase.isAuthenticated().then((resultado) => {
      // Devolve o usuário
      this.setState({ firebaseInitialized: resultado })
    })
  }

  render() {
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
    )
  }
}

export default App;
