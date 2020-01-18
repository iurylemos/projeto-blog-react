import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './newpost.css';

class NewPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titulo: '',
      imagem: '',
      descricao: '',
      alert: ''
    }

    this.cadastrar = this.cadastrar.bind(this)
  }

  componentDidMount() {

    if (!firebase.getCurrentUser()) {
      this.props.history.replace('/login')
    }

  }


  cadastrar = async (event) => {
    event.preventDefault()

    if (this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== '') {
      let posts = firebase.firebase.ref('posts');
      //Criando uma chave dentro da referência
      let chave = posts.push().key;
      await posts.child(chave).set({
        titulo: this.state.titulo,
        imagem: this.state.imagem,
        descricao: this.state.descricao,
        autor: localStorage.nome
      });

      this.props.history.push('/dashboard')
    } else {
      this.setState({ alert: 'Preencha todos os campos' })
    }

  }

  render() {

    const { titulo, imagem, descricao } = this.state

    return (
      <div>
        <header id='newpost'>
          <Link to="/dashboard">Voltar</Link>
        </header>
        <form id="newformpost" onSubmit={this.cadastrar}>
          <span>{this.state.alert}</span>
          <label>Titulo:</label><br />
          <input type="text" placeholder="Nome do post" value={titulo} onChange={(e) => this.setState({ titulo: e.target.value })} />
          <br />
          <label>URL da imagem:</label><br />
          <input type="text" placeholder="URL da imagem" value={imagem} onChange={(e) => this.setState({ imagem: e.target.value })} />
          <br />
          <label>Descrição:</label><br />
          <textarea type="text" placeholder="Descrição post" value={descricao} onChange={(e) => this.setState({ descricao: e.target.value })} />
          <br />

          <button type='submit'>Cadastrar</button>

        </form>
      </div>
    )
  }
}

export default withRouter(NewPost)