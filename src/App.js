import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import EstanteDeLivros from './EstanteDeLivros';
import AdicionarLivro from './AdicionarLivro';
import LivrosEncontrados from './LivrosEncontrados';
import * as BooksAPI from './BooksAPI';

class App extends Component {
    
   state = { 
       livrosEncontrados:[]
   }
   
    render() {
return (
    <div className="app">             
            <Route exact path='/' render={() => (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MinhasLeituras</h1>
                    </div>
                    <div className="list-books-content">                    
                        <EstanteDeLivros />                    
                    </div>
                </div>
            )}/>
            <Route path='/search' render={() => ( 
                    <div>
                        <AdicionarLivro quandoEncontrarOsLivros={(livrosEncontrados)=>{this.atualizarLivrosEncontrados(livrosEncontrados)}} apiLivros={BooksAPI} />             
                        <LivrosEncontrados livrosEncontrados={this.state.livrosEncontrados} /> 
                    </div>
            )}/>
       
    </div>
    )
    }
    
    
atualizarLivrosEncontrados = (livrosEncontrados) => {
     console.log('atualizarLivrosEncontrados');
	this.setState({livrosEncontrados: livrosEncontrados})
  }
}


export default App;

