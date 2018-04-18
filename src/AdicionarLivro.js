import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class AdicionarLivro extends Component {
    state = {
        pesquisa: ''
    }
    render() {
        return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search" >Voltar</Link>
                        <div className="search-books-input-wrapper">
                            <input value={this.state.pesquisa} type="text" placeholder="Pesquise por titulo ou autor"/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            //todo livros encontrados
                        </ol>
                    </div>
                </div>
                )
    }
}

export default AdicionarLivro
