import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './newpost.css';

class NewPost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titulo: '',
      imagem: null,
      descricao: '',
      alert: '',
      url: '',
    }

    this.cadastrar = this.cadastrar.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }

  componentDidMount() {

    if (!firebase.getCurrentUser()) {
      this.props.history.replace('/login')
    }

  }

  handleFile = async (event) => {
    if (event.target.files[0]) {
      const imagem = event.target.files[0];
      if (imagem.type === 'image/png' || imagem.type === 'image/jpeg') {
        console.log(imagem)
        await this.setState({ imagem: imagem })
        const id_user = firebase.getCurrentID()
        const uploadImagem = firebase.storage
          .ref(`imagens/${id_user}/${imagem.name}`)
          .put(imagem)

        // await uploadImagem.on('state_changed', (snapshot) => {
        //   //Progresso
        // }, (error) => {
        //   //Error
        //   console.log('Imagem com errror',error)
        // }, () => {
        //   //Sucesso
        // })
      } else {
        alert('Envie uma imagem do tipo PNG ou JPG')
        this.setState({ imagem: null })
        return null
      }
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
          <input type="file" onChange={this.handleFile} />
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