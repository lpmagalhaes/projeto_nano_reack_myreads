import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Livro from './Livro';
import AdicionarLivro from './AdicionarLivro';
import './App.css';

class App extends Component {

    componentDidMount() {
        BooksAPI.getAll().then((livrosEncotradosJaNaAPI) => {
            const estanteCurrentlyReading = 0;
            const estanteWantToRead = 1;
            const estanteRead = 2;
            let livrosAjustados = [];
            livrosAjustados[estanteCurrentlyReading] = {
                pratilheira:'Currently Reading',
                livros:livrosEncotradosJaNaAPI.filter((livro) => (livro.shelf === 'currentlyReading'))
            };            
            livrosAjustados[estanteWantToRead] = {
                pratilheira:'Want to Read',
                livros:livrosEncotradosJaNaAPI.filter((livro) => (livro.shelf === 'wantToRead'))   
            };
            livrosAjustados[estanteRead] = {
                pratilheira:'Read',
                livros:livrosEncotradosJaNaAPI.filter((livro) => (livro.shelf === 'read'))   
            };                   
            this.setState({estante: livrosAjustados});
        });
    }

    state = {
        estante: []
    }

    render() {
        const {estante} = this.state;
        return (
        <div className="app">               
            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">                    
                        <div>
                            <div className="open-search">
                                <Link to='/search'>
                                Adicionar um livro
                                </Link>
                            </div>
                            {estante.map((estante, indexEstante) => (
                            <div key={indexEstante} className="bookshelf">
                                <h2 className="bookshelf-title">{estante.pratilheira}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {estante.livros.map((livro, indexLivro) => (
                                            <Livro 
                                                key={indexLivro} 
                                                pratileiraAtual={indexEstante}
                                                livro={livro}
                                                mudarLivroDePratileira={this.mudarLivroDePratileira}
                                            />
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            ))}
                        </div>              
                    </div>
                </div>
            )}/>
            <Route path='/search' render={({history}) => ( 
                    <div>
                        <AdicionarLivro 
                        quandoAdicionarUmLivro={(valores)=>{
                            this.mudarLivroDePratileira(valores[0],valores[1],valores[2])
                            history.push('/')
                            }}
                        apiLivros={BooksAPI} 
                        />             
                    </div>
            )}/>
               
        </div>)
    }
    
     mudarLivroDePratileira = (livroParaMover, pratileiraAtual, pratileiraNova) => {
        if (pratileiraNova !== 'none') {
            let estanteAtualizada = this.state.estante;
            if(pratileiraAtual !== 'none'){
                let livrosDaPratileiraAtualRemovidoOPassado =
                    estanteAtualizada[pratileiraAtual].livros.filter((livroAtuais) => (livroAtuais.title !== livroParaMover.title));
                estanteAtualizada[pratileiraAtual].livros = livrosDaPratileiraAtualRemovidoOPassado;
            }
            let livrosDaPratileiraNova = estanteAtualizada[pratileiraNova].livros.concat(livroParaMover);
            estanteAtualizada[pratileiraNova].livros = livrosDaPratileiraNova;

            this.setState({estante: estanteAtualizada});
            
            let estanteEmIngles = '';
            switch(pratileiraNova){
                case 0: estanteEmIngles = 'currentlyReading'; break;
                case 1: estanteEmIngles = 'wantToRead'; break;
                case 2: estanteEmIngles = 'read'; break;
            }
            BooksAPI.update(livroParaMover, estanteEmIngles);
        }
    }
}

export default App;

