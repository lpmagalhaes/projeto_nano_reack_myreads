import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Livro extends Component {
        static propTypes = {
		livro: PropTypes.object.isRequired,
		mudarLivroDePratileira: PropTypes.func.isRequired,
		pratileiraAtual: PropTypes.number.isRequired
	}
        render() {            
        const { livro, mudarLivroDePratileira, pratileiraAtual } = this.props;            
        return (
<li>
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ 
                width: 128,           
                height: 193,
                backgroundImage: `url(${livro.book_cover})` }}></div>
            <div className="book-shelf-changer">
                <select value={pratileiraAtual} onChange={(event) => {mudarLivroDePratileira(livro, pratileiraAtual, event.target.value)}}>
                    <option value="none" disabled>Mover para...</option>
                    <option value="0">Lendo</option>
                    <option value="1">Quero Ler</option>
                    <option value="2">Lido</option>
                    <option value="none">Fazer Nada</option>
                </select>
            </div>
        </div>
        <div className="book-title">{livro.book_title}</div>
        <div className="book-authors">{livro.book_authors}</div>
    </div>
</li>
                );
        }
} 

export default Livro
