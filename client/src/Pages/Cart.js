import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Cart.css';
import Configuration from '../configuration';

class Cart extends React.Component {
    products;

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            total: 0,
            isLoaded: false,
            products: []
        };

        this.substract = this.substract.bind(this);
        this.purge = this.purge.bind(this);
    }

    render() {
            let { error, isLoaded, total, products } = this.state;

            if (error) {
                return (
                    <React.Fragment>
                        <Header page="cart" />
                        <div>Error: {error.message}</div>
                        <Footer />
                    </React.Fragment>
                );
            }
            else if (!isLoaded) {
                return <div>Loading...</div>;
            }
            else {
                if (products) {
                    var items = products.map((product, index) => {
                        return <div key={product.codigo} className='divTableRow'>
                            <div className='divTableCell'>{product.nombre}</div>
                            <div className='divTableCell'>{product.codigo}</div>
                            <div className='divTableCell'>{product.precioUnidad}</div>
                            <div className='divTableCell'>{product.cantidad}</div>
                            <div className='divTableCell'>{product.precioTotal}</div>
                            <div className='divTableCell'><button value={product.codigo} onClick={this.substract}>Restar</button></div>
                            </div>
                    });
                }

                return (
                    <React.Fragment>
                        <Header page="cart" />
                        <div className='divTable'>
                            <div className='divTableBody'>
                                <div className='divTableRow'>
                                    <div className='divTableCell'>Nombre</div>
                                    <div className='divTableCell'>Codigo</div>
                                    <div className='divTableCell'>Precio Unitario</div>
                                    <div className='divTableCell'>Cantidad</div>
                                    <div className='divTableCell'>Precio Total</div>
                                    <div className='divTableCell'></div>
                                </div>
                                {items}
                                <div className='divTableRow'>
                                    <div className='divTableCell'></div>
                                    <div className='divTableCell'></div>
                                    <div className='divTableCell'></div>
                                    <div className='divTableCell'></div>
                                    <div className='divTableCell'>$ {total}</div>
                                    <div className='divTableCell'><button value="all" onClick={this.purge}>Purgar</button></div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </React.Fragment>
                );
            }
    }

    /**
     * Si hay un listado memorizado mostrarlo porque tal vez esta filtrado.
     * Si no hacer el query al REST API filtrando por categoria si existiese
     * una.
     */
    componentDidMount() {
        fetch(Configuration.buildServerUrl("/mercado/listar"),{
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
        })
        .then(res => res.json())
        .then(
            (response) => {
                if (response.status === "success") {
                    this.setState({
                        isLoaded: true,
                        total: response.data.total,
                        products: response.data.productos
                    });
                }
                else {
                    if (response.data && response.data.tokenExpired) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('name');
                    }

                    this.setState({
                        isLoaded: true,
                        error: { message: response.message }
                    });
                }
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    substract(e) {
        fetch(Configuration.buildServerUrl("/mercado/remover"), {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ codigo: e.target.value, cantidad: 1 })
        })
        .then(res => res.json())
        .then(
            (response) => {
                if (response.status === "success") {
                    this.setState({
                        isLoaded: true,
                        total: response.data.total,
                        products: response.data.productos
                    });
                }
                else {
                    if (response.data && response.data.tokenExpired) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('name');
                    }

                    this.setState({
                        isLoaded: true,
                        error: { message: response.message }
                    });
                }
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }

    purge(e) {
        fetch(Configuration.buildServerUrl("/mercado/purgar"), {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(
            (response) => {
                if (response.status === "success") {
                    this.setState({
                        isLoaded: true,
                        total: response.data.total,
                        products: response.data.productos
                    });
                }
                else {
                    if (response.data && response.data.tokenExpired) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('name');
                    }

                    this.setState({
                        isLoaded: true,
                        error: { message: response.message }
                    });
                }
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }
}

export default Cart;