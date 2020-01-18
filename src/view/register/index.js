import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './register.css';

//O withRouter vai possibilitar ver o histórico
//Dar um replace no histórico quando estiver logado, para mandar para o painel por exemplo

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      email: '',
      password: ''
    }

    this.cadastrar = this.cadastrar.bind(this)
  }

  componentDidMount() {
    // firebase.getCurrentUser() ? this.props.history.replace('/dashboard') : null

    if (firebase.getCurrentUser()) {
      return this.props.history.replace('/dashboard')
    }
  }


  cadastrar = async (event) => {
    event.preventDefault()

    const { nome, email, password } = this.state

    try {

      await firebase.register(nome, email, password).then((result) => {
        console.log(result)
        this.props.history.replace('/dashboard')
      })


    } catch (error) {
      alert('ERROR', error)
    }


  }


  render() {

    const { nome, email, password } = this.state

    return (
      <div>
        <h1 className="register-h1">Novo usuário</h1>
        <form onSubmit={this.cadastrar} id='register'>
          <label>Nome:</label><br />
          <input type="text" value={nome} autoFocus autoComplete='off' placeholder="Digite seu nome.."
            onChange={(e) => this.setState({ nome: e.target.value })} />
          <br />
          <label>E-mail:</label><br />
          <input type="email" value={email} autoComplete='off' placeholder="Digite seu e-mail.."
            onChange={(e) => this.setState({ email: e.target.value })} />
          <br />
          <label>Senha:</label><br />
          <input type="password" value={password} autoComplete='off' placeholder="Digite sua senha.."
            onChange={(e) => this.setState({ password: e.target.value })} />
          <br />

          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Register);