import React, { Component } from 'react';
import './App.css';
//import Livro from './Livro';

class LivrosEncontrados extends Component {
    render() {
       
        return (
                <div className="search-books">                    
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.props.livrosEncontrados.map((livro, indiceDeLivros) => (
                                                <li key={indiceDeLivros}>					
                                                    <p>{livro.title}</p>
                                                </li>
                                                    ))}
                        </ol>
                    </div>
                </div>
                );
    }
}

export default LivrosEncontrados
