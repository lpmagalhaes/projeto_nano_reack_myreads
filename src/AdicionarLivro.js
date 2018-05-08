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
        this.setState({pesquisa: pesquisa});
        if (pesquisa) {
            const {apiLivros} = this.props;
            apiLivros.search(pesquisa).then((resposta) => {
                let livrosAjustados = [];
                if (resposta.length > 0) {
                    const estante = this.props.estante;
                    livrosAjustados = resposta.map((livroDaPesquisa)=>{
                        estante.forEach((pratileira)=>{
                               pratileira.livros.forEach((livroNaEstante)=>{
                                   if(livroDaPesquisa.id === livroNaEstante.id){
                                       livroDaPesquisa.shelf = livroNaEstante.shelf;
                                   }
                               }) 
                        })                        
                        return(livroDaPesquisa);
                    })
                }
                this.setState({livrosEncontrados: livrosAjustados});
            });
        }
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
                            {livrosEncontrados.length > 0 ? livrosEncontrados.map((livro, indexLivro) => (
                                            <Livro 
                                                key={indexLivro}
                                                livro={livro}
                                                pratileiraAtual={livro.shelf}
                                                mudarLivroDePratileira={this.moverLivroParaUmaPratileira}
                                                />
                                    )) : ''}
                        </ol>
                    </div>
                </div>
                    );
    }
    moverLivroParaUmaPratileira = (livroParaMover, pratileiraAtual, pratileiraNova) => {
        if (pratileiraNova !== 'none') {
            this.setState({pesquisa: '', livrosEncontrados: []});
            const {quandoAdicionarUmLivro} = this.props;
            let valores = [livroParaMover, pratileiraAtual, pratileiraNova];
            quandoAdicionarUmLivro(valores);
        }
    }
}

export default AdicionarLivro
