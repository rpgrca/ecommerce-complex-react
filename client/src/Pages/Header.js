import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Configuration from '../configuration';

class Header extends Component {
    token;
    name;

    constructor(props) {
        super(props);

        this.token = localStorage.getItem('token');
        this.name = localStorage.getItem('name');
/*
        this.state = {
            name
        }

        if (token) {
            fetch(Configuration.buildServerUrl("/usuarios/validarToken"), {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': token
                }
            })
            .then(res => res.json())
            .then(result => {
                if (result.status === "error") {
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    this.state = {
                        name: ""
                    }
                }
            },
            error => {
            });
        }*/
    }

    render() {
       if (this.token) {
            return (
                <React.Fragment>
                    <header className="header">
                        {this.props.page !== "_index"? <span><Link to="/">P&aacute;gina principal</Link>&nbsp;|&nbsp;</span> : <span>P&aacute;gina principal | </span>}
                        {this.props.page !== "cart"? <span><Link to="/cart">Ir al carrito</Link>&nbsp;|&nbsp;</span> : <span>Carrito | </span>}
                        <span>Bienvenido {this.name}!</span>&nbsp;|&nbsp;
                        <Link to="/logout">Salir</Link>
                    </header>
                    <h1>{Configuration.getTitle()}</h1>
                    <h3>{this.props.page === "searchByCategory"? "Buscando por categoría " + this.props.category : ""}</h3>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <header className="header">
                        {this.props.page !== "_index"? <span><Link to="/">P&aacute;gina principal</Link>&nbsp;|&nbsp;</span> : <span>P&aacute;gina principal | </span>}
                        {this.props.page !== "login"? <span><Link to="/login">Acceder</Link>&nbsp;|&nbsp;</span> : <span>Acceder | </span>}
                        {this.props.page !== "register"? <Link to="/register">Registrarse</Link> : "Registrarse"}
                    </header>
                    <h1>{Configuration.getTitle()}</h1>
                    <h3>{this.props.page === "searchByCategory"? "Buscando por categoría " + this.props.category : ""}</h3>
                </React.Fragment>
            );
        }
    }
}

export default Header;