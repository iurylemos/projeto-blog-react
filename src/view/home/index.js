import React, { Component } from 'react';
import './home.css';
import firebase from '../../firebase';

class Home extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        firebase.firebase.ref('posts').on('value', (snapshot) => {
            let state = this.state;
            state.posts = [];
            snapshot.forEach((item) => {
                state.posts.push({
                    key: item.key,
                    titulo: item.val().titulo,
                    imagem: item.val().imagem,
                    descricao: item.val().descricao,
                    autor: item.val().autor
                });
            });

            //Com esse reverse eu consigo fazer com que os últimos a serem inseridos
            //Sejam os primeiros
            state.posts.reverse();

            this.setState(state);
        })
    }

    render() {

        const { posts } = this.state

        return (
            <section id='post'>
                {
                    posts.map((post) => {
                        return (
                            <article key={post.key}>
                                <header>
                                    <div className='title'>
                                        <strong>Nome: {post.titulo}</strong>
                                        <span>Autor: {post.autor}</span>
                                    </div>
                                </header>
                                <img src={post.imagem} alt="Capa do post" />
                                <footer>
                                    <p>{post.descricao}</p>
                                </footer>
                            </article>
                        )
                    })
                }
            </section>
        );
    }
}

export default Home;
