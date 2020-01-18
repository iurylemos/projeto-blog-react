import React, { Component } from 'react';
import './login.css';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

//O withRouter vai possibilitar ver o histórico
//Dar um replace no histórico quando estiver logado, para mandar para o painel por exemplo

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    //Verificar se existe usuário logado
    if (firebase.getCurrentUser()) {
      return this.props.history.replace('/dashboard')
    }
  }

  login = async (event) => {
    event.preventDefault();

    const { email, password } = this.state

    try {
      await firebase.login(email, password).then((result) => {
        console.log(result)
      }).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('Esse usuário não existe')
        } else {
          alert('Código de erro' + error.code)
          return null
        }
      });
      //Com o withRouter eu tenho acesso ao historico de navegação
      this.props.history.replace('/dashboard')
    } catch (error) {
      console.log('Error', error)
      alert('error' + error)
    }
  }


  render() {

    const { email, password } = this.state

    return (
      <div>
        <form onSubmit={this.login} id="login">
          <label>E-mail:</label><br />
          <input type='email' autoComplete='off' placeholder='Digite o seu e-mail' autoFocus value={email}
            onChange={(e) => this.setState({ email: e.target.value })} />
          <br />
          <label>Senha:</label><br />
          <input type='password' autoComplete='off' value={password} placeholder='Digite sua senha'
            onChange={(e) => this.setState({ password: e.target.value })} />

          <button type='submit'>Entrar</button>
          <Link to="/register">Ainda não possui uma conta?</Link>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);