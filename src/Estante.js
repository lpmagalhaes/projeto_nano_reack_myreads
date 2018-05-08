import React, { Component } from 'react';
import Livro from './Livro';
import { Link } from 'react-router-dom';

class Estante extends Component {
        
        render() {            
                
        return (
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
                            {this.props.estante.map((estante, indexEstante) => (
                            <div key={indexEstante} className="bookshelf">
                                <h2 className="bookshelf-title">{estante.pratilheira}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {estante.livros.map((livro, indexLivro) => (
                                            <Livro 
                                                key={indexLivro} 
                                                pratileiraAtual={indexEstante}
                                                livro={livro}
                                                mudarLivroDePratileira={this.props.mudarLivroDePratileira}
                                            />
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            ))}
                        </div>              
                    </div>
                </div>
            );
        }
} 

export default Estante
