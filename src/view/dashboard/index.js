import React, { Component } from 'react';
import './dashboard.css'
import firebase from '../../firebase';
import { Link, withRouter } from 'react-router-dom';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: localStorage.nome,
      email: ''
    }

    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    if (!firebase.getCurrentUser()) {
      return this.props.history.replace('/login')
    } else {
      this.setState({ email: firebase.getCurrentUser() })
    }

    await firebase.getUserName((user) => {
      localStorage.nome = user.val().nome
      this.setState({ nome: localStorage.nome })
    })
  }

  logout = async () => {
    await firebase.logout().catch((error) => {
      console.log(error)
    });

    localStorage.removeItem("nome")
    this.props.history.push('/')
  }

  render() {

    const { nome, email } = this.state

    return (
      <div id='dashboard'>
        <div className='user-info'>
          <h1>Olá {nome}</h1>
          <Link to="/dashboard/newpost">Novo post</Link>
        </div>
        <p>Logado com: {email}</p>
        <button onClick={() => this.logout()}>Deslogar</button>
      </div>
    )
  }
}

export default withRouter(Dashboard)