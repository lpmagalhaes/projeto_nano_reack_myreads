import React, { Component } from 'react';
import './App.css';
import Livro from './Livro';
import {Link} from 'react-router-dom';

class EstanteDeLivros extends Component {
    state = {
        estante: [
            {
                pratileira: 'Lendo',
                livros: [
                    {
                        book_cover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
                        book_title: "Ender's Game",
                        book_authors: 'Orson Scott Card',
                    }
                ]
            },
            {
                pratileira: 'Quero Ler',
                livros: []
            },
            {
                pratileira: 'Lido',
                livros: [
                    {
                        book_cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
                        book_title: 'To Kill a Mockingbird',
                        book_authors: 'Harper Lee',
                    },
                ]
            },
        ]
    }
    render() {
        const {estante} = this.state;

        return (
                <div>
                    <div className="open-search">
                        <Link to='/search'>
                        Adicionar um livro
                        </Link>
                    </div>
                    {estante.map((estante, indexEstante) => (
                                                <div key={indexEstante} className="bookshelf">
                                                    <h2 className="bookshelf-title">{estante.pratileira}</h2>
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
                )
    }
    mudarLivroDePratileira = (livroParaMover, pratileiraAtual, pratileiraNova) => {
        if (pratileiraNova !== 'none') {
            let estanteAtualizada = this.state.estante;
            let livrosDaPratileiraAtualRemovidoOPassado =
                    estanteAtualizada[pratileiraAtual].livros.filter((livroAtuais) =>
                (livroAtuais.book_title !== livroParaMover.book_title)
            )
            estanteAtualizada[pratileiraAtual].livros = livrosDaPratileiraAtualRemovidoOPassado;

            let livrosDaPratileiraNova =
                    estanteAtualizada[pratileiraNova].livros.concat(livroParaMover)
            estanteAtualizada[pratileiraNova].livros = livrosDaPratileiraNova;

            this.setState((state) => ({
                    estante: estanteAtualizada
                }));
        }
    }
}

export default EstanteDeLivros
