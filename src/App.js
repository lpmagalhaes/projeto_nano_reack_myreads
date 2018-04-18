import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import EstanteDeLivros from './EstanteDeLivros';
import AdicionarLivro from './AdicionarLivro';

class App extends Component {
    
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
                        <AdicionarLivro /> 
                )}/>
       
    </div>
    )
    }
}

export default App;

