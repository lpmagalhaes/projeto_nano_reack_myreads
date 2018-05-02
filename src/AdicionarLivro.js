import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class AdicionarLivro extends Component {
    state = {
        pesquisa: ''
    }
    atualizarPesquisa = (pesquisa) => {
        const {apiLivros} = this.props;
        this.setState({
            pesquisa: pesquisa.trim()
        });

        apiLivros.search(pesquisa).then((resposta) => {
            this.props.quandoEncontrarOsLivros(resposta);
        })
    }
    render() {
        const {pesquisa} = this.state;
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
                </div>
                    );
    }
}

export default AdicionarLivro
