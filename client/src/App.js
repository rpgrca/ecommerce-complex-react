import React, { Component } from 'react';
import './App.css';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import Home from './Pages/Home';

class App extends Component {
    render() {
        let category = this.props.match.params.category;

        return (
            <div className="App">
                <Header page="index" />
                <Home category={category} />
                <Footer />
            </div>
        );
    }
}

export default App;
