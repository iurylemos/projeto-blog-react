import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './newpost.css';

class NewPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titulo: '',
      imagem: '',
      descricao: ''
    }

    this.cadastrar = this.cadastrar.bind(this)
  }


  cadastrar() {

  }

  render() {

    const { titulo, imagem, descricao } = this.state

    return (
      <div>
        <header id='newpost'>
          <Link to="/dashboard">Voltar</Link>
        </header>
        <form id="newformpost" onSubmit={this.cadastrar}>
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

export default NewPost