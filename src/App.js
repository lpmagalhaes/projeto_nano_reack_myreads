import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Estante from './Estante';
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
                <Estante
                estante={estante}
                mudarLivroDePratileira={this.mudarLivroDePratileira}        
                />
            )}/>
            <Route path='/search' render={({history}) => (
                <AdicionarLivro 
                estante={estante}
                quandoAdicionarUmLivro={(valores)=>{
                    this.mudarLivroDePratileira(valores[0],valores[1],valores[2])
                    history.push('/')
                    }}
                />
            )}/>
               
        </div>)
    }
    
     mudarLivroDePratileira = (livroParaMover, pratileiraAtual, pratileiraNova) => {
        if (pratileiraNova !== 'none') {
            let estanteEmIngles = '';
            switch(pratileiraNova){
                case '0': estanteEmIngles = 'currentlyReading'; break;
                case '1': estanteEmIngles = 'wantToRead'; break;
                case '2': estanteEmIngles = 'read'; break;
                default: estanteEmIngles = 'none'; break;
            }
            livroParaMover.shelf = estanteEmIngles;        
            let estanteAtualizada = this.state.estante;
            if(pratileiraAtual !== 'none'){
                let livrosDaPratileiraAtualRemovidoOPassado =
                    estanteAtualizada[pratileiraAtual].livros.filter((livroAtuais) => (livroAtuais.id !== livroParaMover.id));
                estanteAtualizada[pratileiraAtual].livros = livrosDaPratileiraAtualRemovidoOPassado;
            }
            let livrosDaPratileiraNova = estanteAtualizada[pratileiraNova].livros.concat(livroParaMover);
            estanteAtualizada[pratileiraNova].livros = livrosDaPratileiraNova;
            this.setState({estante: estanteAtualizada});
            
            BooksAPI.update(livroParaMover, livroParaMover.shelf);
        }
    }
}

export default App;

