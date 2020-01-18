import React, { Component } from 'react';
import './global.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './view/home';
import Header from './components/header';
import firebase from './firebase';
import Login from './view/login';
import Dashboard from './view/dashboard';
import Register from './view/register';
import NewPost from './view/newpost';

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
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/newpost" component={NewPost} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    ) : (
        <h1>Carregando...</h1>
      )
  }
}

export default App;
