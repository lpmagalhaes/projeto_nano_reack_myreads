import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Livro from './Livro';

class AdicionarLivro extends Component {
    state = {
        pesquisa: '',
        livrosEncontrados: []
    }
    atualizarPesquisa = (pesquisa) => {
        const {apiLivros} = this.props;
        this.setState({
            pesquisa: pesquisa.trim(),
            livrosEncontrados: []
        });

        apiLivros.search(pesquisa).then((resposta) => {
            console.log(resposta);
            this.setState({
                pesquisa: pesquisa.trim(),
                livrosEncontrados: resposta
            });
        })
    }
    render() {
        const {pesquisa, livrosEncontrados} = this.state;
        return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/' className="close-search" >Voltar</Link>
                        <div className="search-books-input-wrapper">
                            <input 
                                value={pesquisa} 
                                type="text" 
                                placeholder="Pesquise por titulo ou autor"
                                onChange={(event) => {
                        this.atualizarPesquisa(event.target.value)
                                                }}/>
                        </div>
                    </div>
                
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {livrosEncontrados.map((livro, indexLivro) => (
                                            <Livro 
                                                key={indexLivro}
                                                livro={livro}
                                                pratileiraAtual={'none'}
                                                mudarLivroDePratileira={this.moverLivroParaUmaPratileira}
                                                />
                                                ))}
                        </ol>
                    </div>
                </div>
                    );
    }
    moverLivroParaUmaPratileira = (livroParaMover, pratileiraAtual, pratileiraNova) => {
        if (pratileiraNova !== 'none') {
            this.setState({pesquisa: '', livrosEncontrados: []});
            const {quandoAdicionarUmLivro} = this.props;
            let valores= [livroParaMover, pratileiraAtual, pratileiraNova];
            quandoAdicionarUmLivro(valores);             
        }
    }
}

export default AdicionarLivro
