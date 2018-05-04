import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Livro extends Component {
        static propTypes = {
		livro: PropTypes.object.isRequired
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
                            backgroundImage: `url(${livro.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={pratileiraAtual} onChange={(event) => {mudarLivroDePratileira(livro, pratileiraAtual, event.target.value)}}>
                                <option value="none" disabled>Move to...</option>
                                <option value="0">Currently Reading</option>
                                <option value="1">Want To Read</option>
                                <option value="2">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{livro.title}</div>
                    <div className="book-authors">{livro.authors ? (livro.authors.map((autor, indiceAutor) => (<p key={indiceAutor}>{autor}</p>))):('')}</div>
                </div>
            </li>
            );
        }
} 

export default Livro
