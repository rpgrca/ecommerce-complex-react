import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Configuration from '../configuration';
import './Product.css';

class Product extends Component {
    useLink;
    timeoutCallback;
    mustLogin;       

    constructor(props) {
        super(props);

        if (this.props.filterByCategory) {
            this.filterByCategory = this.props.filterByCategory.bind(this);
            this.useLink = true;
        }
        else {
            this.useLink = false;
        }

        this.mustLogin = false;
        this.state = {
            code: this.props.product.codigo,
            token: localStorage.getItem("token"),
        }

        this.addToCart = this.addToCart.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutCallback);
    }

    render() {
        if (this.mustLogin) {
            this.mustLogin = false;
            return <Navigate to="/cart" />
        }
        else {
            if (this.state.message) {
                this.timeoutCallback = setTimeout(() => this.setState({message: ""}), 2000);
            }

            let categories = [];

            if (this.useLink) {
                categories = this.props.product.categorias.map(function(category, index) {
                    return (
                        <span className="blue-link" key={category}>
                        <button onClick={this.filterByCategory}>{category}</button>
                        </span>
                    );
                }, this);
            }
            else {
                categories = this.props.product.categorias.map(function(category, index) {
                    return (
                        <span key={category}>{category}&nbsp;</span>
                    );
                });
            }

            const imageUrl = Configuration.buildServerUrl(this.props.product.imagen);
            const productUrl = "/product/" + this.props.product.codigo;

            return (
                <div id={this.props.product.codigo} key={this.props.product.codigo} className='div-item'>
                    <Link to={productUrl}>
                        <img alt={this.props.product.nombre} className='img-thumbnail' src={imageUrl} />
                    </Link>
                    <p><span className='span-title'>Marca:</span> {this.props.product.marca}</p>
                    <p><span className='span-title'>Nombre:</span> {this.props.product.nombre}</p>
                    <p><span className='span-title'>Descripci&oacute;n:</span> <span className='span-description'>{this.props.product.descripcion}</span></p>
                    <p><span className='span-title'>Precio de lista:</span> <span className='span-strike'>${this.props.product.precioLista}</span></p>
                    <p><span className='span-title'>Precio con descuento:</span> ${this.props.product.precioFinal}</p>
                    <p><span className='span-title'>C&oacute;digo:</span> {this.props.product.codigo}</p>
                    <p><span className='span-title'>Categor&iacute;as:</span> {categories}</p>
                    {this.state.token? <button className='button-add' onClick={this.addToCart}>Agregar al carrito</button> : ""}
                    {this.state.message? <div className="error-message">{this.state.message}</div> : ""}
                </div>
           );
        }
    }

    addToCart(e) {
        fetch(Configuration.buildServerUrl("/mercado/agregar"), {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': this.state.token
            },
            body: JSON.stringify({ codigo: this.state.code, cantidad: 1 })
        })
        .then(res => res.json())
        .then(result => {
            clearTimeout(this.timeoutCallback);

            if (result.status === "success") {
                this.setState({
                    message: result.message
                });
            }
            else {
                let token = this.state.token;

                if (result.data && result.data.tokenExpired) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    token = "";

                    this.mustLogin = true;
                }
                else {
                    this.mustLogin = false;
                }

                this.setState({
                    isLoaded: true,
                    message: result.message,
                    token,
                });
            }
        },
        error => {
            this.setState({
                message: error.message
            })
        });
    }
}

export default Product;