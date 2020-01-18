import React, { Component } from 'react';
import firebase from '../../firebase';
import { Link, withRouter } from 'react-router-dom';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: localStorage.nome
    }

    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    if (!firebase.getCurrentUser()) {
      return this.props.history.replace('/login')
    }

    await firebase.getUserName((user) => {
      localStorage.nome = user.val().nome
      this.setState({ nome: localStorage.nome })
    })
  }

  logout() {

  }

  render() {
    return (
      <div id='dashboard'>
        <div className='user-info'>
          <h1>Olá {this.state.nome}</h1>
          <Link to="/dashboard/newpost">Novo post</Link>
        </div>
        <p>Logado com: iury@lanlink.com.br</p>
        <button onClick={() => this.logout()}>Deslogar</button>
      </div>
    )
  }
}

export default withRouter(Dashboard)